# project-back

Minimal Express API example following the conventions used by `apps/back`.

```sh
pnpm --filter project-back dev
curl http://localhost:3001/api/hello
pnpm --filter project-back test
```

Database/auth setup:

```sh
cp .env.example .env
pnpm --filter project-back db:migrate
pnpm --filter project-back auth:migrate
pnpm --filter project-back db:seed
```

The CRUD example is `GET|POST /api/items` plus `PATCH|DELETE /api/items/:id`.
`AUTH_DEV_BYPASS=true` enables the same development-only `X-User-Id` flow used
by `apps/back` for protected routes.
