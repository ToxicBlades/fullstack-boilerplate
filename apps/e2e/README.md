# @project/e2e

Playwright end-to-end suite for the Project frontend and backend. It exercises
authentication, sign-out, item CRUD, and document CRUD in a real browser.

## Features

- Authenticated and unauthenticated Chromium projects
- Reusable page objects and signed-in storage state
- Automatic frontend and backend development servers
- Screenshots, videos, and traces retained for failures
- HTML test report

## Prerequisites

- Workspace dependencies installed
- Playwright's Chromium browser installed
- PostgreSQL running with the backend schema and seed user prepared
- S3-compatible storage configured for document tests

From the repository root:

```sh
pnpm install
pnpm e2e:install
docker compose up -d db
pnpm --filter @project/back db:setup
pnpm --filter @project/back db:seed
```

Configure `apps/project-back/.env` before preparing the database. Document
tests also require the backend storage variables described in
`apps/project-back/README.md`.

## Configuration

| Variable | Required | Description | Default |
| --- | --- | --- | --- |
| `E2E_WEB_URL` | No | Frontend base URL | `http://localhost:3000` |
| `E2E_BACK_HEALTH_URL` | No | Backend URL polled before tests | `http://localhost:3010/api/hello` |
| `E2E_SKIP_WEBSERVER` | No | Use already-running services instead of starting them | Unset |
| `E2E_USER_EMAIL` | No | Seeded user's email | `demo@example.com` |
| `E2E_USER_PASSWORD` | No | Seeded user's password | `demo@example.com` |
| `CI` | No | Enables CI retries, one worker, and stricter focused-test checks | Unset |

When the test runner starts the applications, their own environment files must
point the frontend and backend at compatible URLs.

## Running tests

Run the complete suite from the repository root:

```sh
pnpm e2e
```

Playwright starts `@project/back` and `@project` when they are not already
running. To use services started separately:

```sh
E2E_SKIP_WEBSERVER=1 pnpm e2e
```

Additional modes are available through the workspace package:

```sh
pnpm --filter @project/e2e test:ui
pnpm --filter @project/e2e test:headed
pnpm --filter @project/e2e test:debug
```

## Failure artifacts

Failed tests retain:

- Playwright screenshots, videos, and traces under `test-results/`
- Additional full-page screenshots under `screenshots/failures/<project>/`
- An HTML report under `playwright-report/`

Open the most recent HTML report with:

```sh
pnpm --filter @project/e2e report
```

These directories are generated and should not be edited by hand.

## Project structure

- `src/tests/` - Test specifications and global authentication setup
- `src/pages/` - Page objects for application workflows
- `src/fixtures/` - Shared Playwright fixtures
- `src/helpers/` - Paths and failure-artifact helpers
- `src/.auth/` - Generated authenticated browser state
- `fixtures/` - Static files uploaded by tests
- `playwright.config.ts` - Projects, servers, reporters, and runtime defaults
- `coverage.md` - Feature coverage notes

## Key dependencies

- Playwright Test provides browser automation, fixtures, assertions, and
  reports.
- `@project/typescript-config` supplies the shared TypeScript configuration.

## License

Private - Internal use only
