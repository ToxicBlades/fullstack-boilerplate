# @project/back

Express API for the Project applications. It provides Better Auth sessions,
PostgreSQL-backed item and document workflows, and optional S3-compatible
object storage.

## Features

- Email and password authentication with Better Auth
- Item CRUD API
- Authenticated document metadata and upload workflows
- Raw and presigned S3-compatible storage operations
- PostgreSQL migrations and development seed data
- Structured request and application logging

## Prerequisites

- Node.js and pnpm versions compatible with the repository
- PostgreSQL available through `DATABASE_URL`
- Optional S3-compatible storage for file uploads

Install workspace dependencies and start PostgreSQL from the repository root:

```sh
pnpm install
docker compose up -d db
```

## Configuration

Copy the example configuration before starting the API:

```sh
cp apps/project-back/.env.example apps/project-back/.env
```

The main variables are:

| Variable | Required | Description | Development default / example |
| --- | --- | --- | --- |
| `BACK_HOST` | In production | Interface used by the HTTP server | `localhost` |
| `BACK_PORT` | In production | HTTP server port | `3010` in `.env.example` |
| `CORS_ORIGINS` | No | Comma-separated allowed browser origins | `http://localhost:3000` |
| `DATABASE_URL` | In production | PostgreSQL connection string | Local `postgres` database |
| `BETTER_AUTH_SECRET` | In production | Secret used to sign authentication data | Development-only example secret |
| `BETTER_AUTH_URL` | In production | Public base URL of the auth server | `http://localhost:3010` |
| `AUTH_SESSION_CACHE_TTL_MS` | No | In-memory session cache lifetime | `30000` |
| `AUTH_SESSION_COOKIE_CACHE_MAX_AGE_SEC` | No | Better Auth cookie cache lifetime | `300` |
| `AUTH_DEV_BYPASS` | No | Enables development/test `X-User-Id` authentication | `false` |
| `DEFAULT_USER_EMAIL` | No | Email created by the seed command | `demo@example.com` |
| `DEFAULT_USER_PASSWORD` | No | Password created by the seed command | `demo@example.com` |
| `DEFAULT_USER_NAME` | No | Display name created by the seed command | `Demo User` |
| `AWS_REGION` | No | S3 region | `us-east-1` |
| `AWS_ACCESS_KEY_ID` | For storage | S3 access key | Empty |
| `AWS_SECRET_ACCESS_KEY` | For storage | S3 secret key | Empty |
| `S3_BUCKET` | For storage | Bucket used for uploaded objects | Empty |
| `S3_ENDPOINT` | No | Custom S3-compatible endpoint | AWS S3 when empty |
| `S3_PUBLIC_BASE_URL` | No | Stable public base URL for stored objects | Empty |

Logger configuration is documented in `libs/logger/README.md`. Keep production
secrets out of source control.

## Database setup

Apply the application and authentication migrations, then create the default
development user:

```sh
pnpm --filter @project/back db:setup
pnpm --filter @project/back db:seed
```

Useful database commands include:

```sh
pnpm --filter @project/back db:rollback
pnpm --filter @project/back db:make <migration-name>
pnpm --filter @project/back db:seed:reset
```

`db:reset-schema` destroys the configured schema and is deliberately guarded;
use it only when a full local reset is intended.

## Development

Start the API with file watching:

```sh
pnpm --filter @project/back dev
```

With `.env.example`, the health endpoint is available at
<http://localhost:3010/api/hello>.

For local object storage, configure the `S3_*` variables and initialize RustFS
from the repository root:

```sh
pnpm docker:rustfs:init
```

Use `S3_ENDPOINT=http://127.0.0.1:9000` when the API runs on the host. Custom
endpoints automatically use path-style S3 requests.

## API overview

- `GET /api/hello` - Health check
- `/api/auth/*` - Better Auth endpoints
- `GET /api/auth/me` - Current authenticated user
- `GET|POST /api/items` and `PATCH|DELETE /api/items/:id` - Item CRUD
- `/api/documents` - Authenticated document metadata and upload lifecycle
- `/api/storage` - Storage health, listing, upload, download, delete, and
  presigned URL operations

Raw storage uploads are limited to 25 MB. Presigned upload and download URLs
expire after 15 minutes.

## Build, run, and test

```sh
pnpm --filter @project/back build
pnpm --filter @project/back start
pnpm --filter @project/back test
```

The production bundle is written to `dist/`. Tests use Jest and Supertest and
expect PostgreSQL to be available through `DATABASE_URL`.

## Project structure

- `src/api/` - Route-specific controllers, services, models, and routers
- `src/auth/` - Better Auth runtime and migration configuration
- `src/common/` - Shared middleware, caching, and storage adapters
- `src/config/env.ts` - Validated environment schema
- `src/db/` - Knex connection, migration runner, and seed commands
- `migrations/` - Ordered PostgreSQL schema migrations
- `knexfile.ts` - Knex CLI configuration

## Key dependencies

- Express provides the HTTP application and routing.
- Better Auth provides authentication and session management.
- Knex and `pg` provide PostgreSQL migrations and access.
- AWS SDK provides S3-compatible object storage.
- `@project/logger` and `pino-http` provide structured logging.
- Envalid and Zod validate environment values and API input.

## License

Private - Internal use only
