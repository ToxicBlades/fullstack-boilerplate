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

S3-compatible storage is available under `/api/storage` when the S3 variables
in `.env` are configured. It supports `GET /health`, object listing, raw `PUT`
uploads, downloads, deletes, and 15-minute presigned upload/download URLs.
Set `S3_ENDPOINT=http://127.0.0.1:9000` for local RustFS; leave it empty for
AWS S3. The server uses path-style requests automatically for custom endpoints.
