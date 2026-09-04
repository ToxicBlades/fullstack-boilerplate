# End-to-end tests

The Playwright suite exercises authentication plus the item and document CRUD
flows against the real frontend and backend.

From the repository root:

```sh
pnpm e2e:install
pnpm --filter @project/back db:setup
pnpm e2e
```

Playwright starts `@project/back` on port 3010 and `@project` on port 3000 when
they are not already running. Set `E2E_SKIP_WEBSERVER=1` to use services you
started yourself, or override their URLs with `E2E_WEB_URL` and
`E2E_BACK_HEALTH_URL`.

Credentials default to `demo@example.com` / `demo@example.com`; override them
with `E2E_USER_EMAIL` and `E2E_USER_PASSWORD`.

## Failure artifacts

Failed tests retain:

- the Playwright screenshot, video, and trace under `test-results/`;
- an additional full-page screenshot under `screenshots/failures/<project>/`;
- an HTML report under `playwright-report/`.

Open the last report with `pnpm --filter @project/e2e report`.
