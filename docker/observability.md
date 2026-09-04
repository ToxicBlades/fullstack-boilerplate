# Local observability

The local stack consists of Loki for logs, Prometheus for metrics, and Grafana
for dashboards and alert evaluation. The application sends structured Pino
logs directly to Loki; Prometheus scrapes the backend's `/metrics` endpoint.

## Start

Start the infrastructure:

```sh
docker compose up -d loki prometheus grafana
```

Run `project-back` with Loki enabled:

```sh
LOG_NAME=project-back LOKI_URL=http://localhost:3100 pnpm --filter @project/back dev
```

Open Grafana at <http://localhost:3002> and sign in with `admin` / `admin`.
Change `GRAFANA_ADMIN_USER` and `GRAFANA_ADMIN_PASSWORD` outside local
development. The **Project observability** dashboard, Loki/Prometheus data
sources, and a backend error-log alert are provisioned automatically.

Prometheus assumes the backend listens on host port `3010`. If `BACK_PORT` is
changed, update `docker/prometheus/prometheus.yml` to match.

## Application analytics

Use the shared package for business events:

```ts
import { trackEvent } from "@project/analytics";

trackEvent("document_created", { documentId, userId });
```

Each call increments `app_analytics_events_total{event="..."}` and writes a
structured event to Loki. Keep event names bounded (for example,
`document_created`); put IDs and other high-cardinality values in properties.

The provisioned alert appears in Grafana Alerting. To deliver notifications,
add a contact point and notification policy in Grafana (email, Slack, webhook,
or another supported integration); this repository cannot safely provide those
credentials.

## Where the data lives

- **Loki** stores application logs. It has an HTTP API on port `3100`, but it is
  normally queried through Grafana rather than opened directly in a browser.
- **Prometheus** stores numeric time-series data from `/metrics`, including the
  `item_created` and `item_deleted` counters. Its local UI is available at
  <http://localhost:9090>.
- **Grafana** reads both data sources and provides dashboards, log exploration,
  and alerts at <http://localhost:3002>.

In Grafana, open **Dashboards → Project → Project observability** to see item
creation/deletion totals for the selected time range. Open **Explore**, select
the **Loki** data source, and use this query to view item lifecycle events:

```logql
{service="project-back"} | json | event=~"item_created|item_deleted"
```

The item totals are successful operations, not attempts. Creating emits
`item_created`; deleting an existing item emits `item_deleted`; invalid
requests and attempts to delete a missing item do not increment either count.

The dashboard renders each application log as one unwrapped summary line. Click
a line when its parsed fields are needed. HTTP logs retain the request ID,
method, URL, remote address, response status, duration, and error information;
headers are deliberately omitted. Successful `/metrics` scrapes are also
excluded from Loki because Prometheus already monitors that endpoint.
