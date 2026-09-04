# @project/logger

Shared structured logging for the Project monorepo. The package wraps Pino with
environment-based defaults, readable development output, child loggers, and a
small router for sending each log entry to additional destinations.

## Features

- A shared `logger` instance for application and library code
- Structured, leveled logging powered by Pino
- Pretty, colorized output in an interactive development terminal
- JSON output in production, tests, and non-interactive environments
- Named child loggers with contextual bindings
- Multiple writable log destinations without replacing console output
- Optional batched delivery directly to Loki's HTTP push API
- Silent logging by default when `NODE_ENV=test`

## Installation

This is a private workspace package. Add it to the consuming application's or
library's dependencies:

```json
{
  "dependencies": {
    "@project/logger": "workspace:*"
  }
}
```

Install dependencies from the repository root:

```sh
pnpm install
```

## Configuration

The logger reads configuration from the consuming application's environment.
It does not load a separate `.env` file from `libs/logger`.

| Variable | Required | Description | Default |
| --- | --- | --- | --- |
| `LOG_LEVEL` | No | Minimum Pino log level: `fatal`, `error`, `warn`, `info`, `debug`, `trace`, or `silent` | `info`, or `silent` in tests |
| `LOG_NAME` | No | Name used by loggers created with `createLogger()` when no `name` option is supplied | `app` |
| `LOKI_URL` | No | Loki base URL; when set, every shared log is also pushed to Loki | disabled |
| `LOKI_BATCH_INTERVAL_MS` | No | Maximum delay before a buffered Loki batch is sent | `1000` |
| `LOKI_MAX_BATCH_SIZE` | No | Number of entries that triggers an immediate Loki push | `100` |
| `LOKI_MAX_QUEUE_SIZE` | No | Maximum buffered entries while Loki is unavailable | `10000` |
| `LOKI_USERNAME` / `LOKI_PASSWORD` | No | Basic authentication credentials for a hosted Loki instance | empty |
| `LOKI_TENANT_ID` | No | Value sent as Loki's `X-Scope-OrgID` header | empty |
| `NODE_ENV` | No | Output mode: `development`, `production`, or `test` | `development` |

`LOG_NAME` names the exported shared logger and custom logger instances created
without an explicit name. It is also used as the stable Loki `service` label.

Environment values are validated when the package is imported. Invalid values
cause startup to fail with a configuration error.

## Usage

### Shared logger

Import the shared logger for most application logging:

```typescript
import { logger } from "@project/logger";

logger.info("server started");
logger.info({ port: 3000 }, "server listening");
logger.warn({ userId }, "user profile is incomplete");
logger.error({ err }, "request failed");
```

Pass structured data as the first argument so it remains searchable and
machine-readable. When logging an `Error`, use the `err` property so Pino
serializes its useful fields.

The shared logger can also be passed to integrations that accept a Pino logger:

```typescript
import { logger } from "@project/logger";
import pinoHttp from "pino-http";

app.use(pinoHttp({ logger }));
```

### Child loggers

Use a child logger to identify a module and attach context to every message:

```typescript
import { createChildLogger } from "@project/logger";

const logger = createChildLogger("billing", { service: "invoices" });

logger.info({ invoiceId }, "invoice created");
```

### Custom logger instances

Use `createLogger` when code needs an independent Pino instance or custom Pino
options:

```typescript
import { createLogger } from "@project/logger";

const { logger, addDestination, router } = createLogger({
  name: "worker",
  level: "debug",
  base: { service: "email-worker" },
});

logger.debug({ jobId }, "processing job");
```

Options accepted by `createLogger` are standard Pino logger options plus an
optional `destinations` array. Explicit `level` and `name` options override the
environment defaults. The result contains the logger, its router, and a helper
for adding destinations later.

### Additional destinations

A destination only needs a `write(msg)` method. It receives each serialized log
line as a string:

```typescript
import { addLogDestination, type LogDestination } from "@project/logger";

const capturedLogs: string[] = [];

const destination: LogDestination = {
  write(message) {
    capturedLogs.push(message);
  },
};

addLogDestination(destination);
```

`addLogDestination` affects the shared logger. For an isolated logger, provide
destinations during creation or use the returned `addDestination` function:

```typescript
import { createLogger } from "@project/logger";

const destination = {
  write(message: string) {
    process.stderr.write(message);
  },
};

const { logger } = createLogger({ destinations: [destination] });
logger.info("written to the console and the additional destination");
```

The console destination is always included. Destinations run synchronously in
registration order, so their `write` methods should return quickly and avoid
throwing errors.

### Standalone router

`createLogRouter` can fan out string messages independently of a Pino logger:

```typescript
import { createLogRouter } from "@project/logger";

const router = createLogRouter([process.stdout]);
router.add(process.stderr);
router.write("message\n");
```

## Public API

| Export | Purpose |
| --- | --- |
| `logger` | Shared Pino logger named `main` |
| `createChildLogger(name, bindings?)` | Creates a child of the shared logger |
| `addLogDestination(destination)` | Adds a destination to the shared logger |
| `flushLogs()` | Flushes buffered asynchronous destinations during shutdown |
| `createLogger(options?)` | Creates an independent logger and router |
| `createLogRouter(destinations?)` | Creates a standalone writable fan-out router |
| `Logger` | Re-exported Pino logger type |
| `CreateLoggerOptions` | Pino options extended with `destinations` |
| `LogDestination` | Minimal writable destination interface |
| `LogRouter` | Writable destination with an `add` method |

## Development

Run repository checks from the repository root:

```sh
pnpm check
pnpm fix
```

## Dependencies

- `pino` - structured logging API and serialization
- `pino-pretty` - readable output in interactive development terminals
- `envalid` - environment variable validation and defaults

## License

Private - Internal use only
