# @project/analytics

Shared application analytics and Prometheus metrics for the Project monorepo.
The package records low-cardinality metrics and emits structured analytics
events through `@project/logger` for querying in Loki.

## Features

- Application event counters with structured event logging
- Express middleware for HTTP request counts and duration histograms
- A Prometheus-compatible metrics endpoint handler
- Default Node.js process metrics with an `app_` prefix
- A shared registry for application-specific Prometheus metrics
- Re-exported `Counter`, `Gauge`, and `Histogram` metric types

## Installation

This is a private workspace package. Add it to the consuming application's or
library's dependencies:

```json
{
  "dependencies": {
    "@project/analytics": "workspace:*"
  }
}
```

Install dependencies from the repository root:

```sh
pnpm install
```

## Configuration

The package does not read environment variables or load a separate `.env`
file. Analytics events use `@project/logger`, so its output and optional Loki
delivery follow the logger configuration in the consuming application.

See [`@project/logger`](../logger/README.md) for the available logging and Loki
environment variables.

## Usage

### Tracking application events

Use `trackEvent` to increment the `app_analytics_events_total` Prometheus
counter and write the same event as a structured log entry:

```typescript
import { trackEvent } from "@project/analytics";

trackEvent("document_created", {
  documentId,
  userId,
});
```

Event names become Prometheus label values and must remain low-cardinality. Do
not include user IDs, document IDs, timestamps, or other unbounded values in an
event name. Put those values in the properties object instead; properties are
included in the structured log but not in Prometheus labels.

### HTTP metrics and metrics endpoint

Register `metricsMiddleware` before application routes, then expose
`metricsHandler` on an endpoint that Prometheus can scrape:

```typescript
import {
  metricsHandler,
  metricsMiddleware,
} from "@project/analytics";
import express from "express";

const app = express();

app.use(metricsMiddleware);
app.get("/metrics", metricsHandler);
```

The middleware records request counts and durations after each response
finishes. It labels requests with the HTTP method, matched Express route, and
status code. Requests without a matched route use `unmatched` as the route
label.

Protect the metrics endpoint at the network or application layer when it is
not intended to be public.

### Custom metrics

Create custom metrics with one of the re-exported constructors and register
them with `metricsRegistry` so they appear in `metricsHandler` output:

```typescript
import { Gauge, metricsRegistry } from "@project/analytics";

const queuedJobs = new Gauge({
  help: "Number of jobs waiting to be processed",
  name: "app_queued_jobs",
  registers: [metricsRegistry],
});

queuedJobs.set(3);
```

Keep all custom metric labels low-cardinality. Avoid identifiers, arbitrary
URLs, email addresses, and other values whose number can grow without bound.

## Built-in metrics

| Metric | Type | Labels | Purpose |
| --- | --- | --- | --- |
| `app_analytics_events_total` | Counter | `event` | Number of tracked application events |
| `app_http_requests_total` | Counter | `method`, `route`, `status_code` | Number of completed HTTP requests |
| `app_http_request_duration_seconds` | Histogram | `method`, `route`, `status_code` | HTTP response duration in seconds |
| `app_*` process metrics | Various | Metric-specific | Default Node.js runtime and process measurements |

## Public API

| Export | Purpose |
| --- | --- |
| `trackEvent(event, properties?)` | Records an event metric and emits a structured analytics log |
| `AnalyticsProperties` | Type for structured event properties |
| `metricsMiddleware` | Express middleware that records request counts and durations |
| `metricsHandler` | Express handler that returns the Prometheus exposition payload |
| `metricsRegistry` | Shared registry containing built-in and custom metrics |
| `Counter` | Re-exported Prometheus counter constructor |
| `Gauge` | Re-exported Prometheus gauge constructor |
| `Histogram` | Re-exported Prometheus histogram constructor |

## Development

Run repository checks from the repository root:

```sh
pnpm check
pnpm fix
```

## Dependencies

- `@prometheus-io/client` - Prometheus metric collection and exposition
- `@project/logger` - Structured analytics event logging and optional Loki delivery
- `express` - Middleware and handler types supplied by the consuming application

## License

Private - Internal use only
