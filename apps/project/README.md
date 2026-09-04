# @project

Authenticated Project web application. It is a Next.js frontend for signing
in, managing items, and uploading, renaming, downloading, and deleting
documents through `@project/back`.

## Features

- Email and password authentication with cookie-backed sessions
- Protected dashboard with server-side session checks
- Item creation, editing, and deletion
- Document upload, rename, download, and deletion
- Shared components and API contracts from workspace libraries

## Prerequisites

- Node.js and pnpm versions compatible with the repository
- A running `@project/back` API with its database initialized
- Workspace dependencies installed from the repository root

```sh
pnpm install
```

## Configuration

Create `apps/project/.env` and configure the backend API when it is not
available at the development default:

| Variable | Required | Description | Default |
| --- | --- | --- | --- |
| `BACK_API_BASE_URL` | No | Server-side base URL for the backend API | `http://localhost:3010/api` |

Do not expose this value with a `NEXT_PUBLIC_` prefix: API calls are made by
Server Components and Server Actions.

## Development

Prepare and start the backend first. When using the backend example
configuration on port 3010, set `BACK_API_BASE_URL=http://localhost:3010/api`
in this application's `.env`.

Start the frontend from the repository root:

```sh
pnpm --filter @project dev
```

Open <http://localhost:3000>. Sign in with the user configured or created by
the backend seed command.

## Build and run

```sh
pnpm --filter @project build
pnpm --filter @project start
```

Set `BACK_API_BASE_URL` to an address reachable by the Next.js server in the
deployment environment.

## Testing

The end-to-end suite in `apps/e2e` covers authentication and the dashboard
workflows. From the repository root:

```sh
pnpm e2e
```

Run repository checks before committing changes:

```sh
pnpm check
pnpm fix
```

## Project structure

- `app/` - App Router pages, layouts, and global styles
- `modules/auth/` - Authentication actions, UI, session helpers, and types
- `modules/dashboard/` - Authenticated dashboard composition
- `modules/items/` - Item actions, UI, and types
- `modules/documents/` - Document actions, UI, and types
- `modules/structure.md` - Feature-module directory conventions
- `proxy.ts` - Request proxy and access-control behavior

Each feature module can contain `actions`, `component`, `hooks`, `lib`,
`static`, and `types` directories. Keep feature-owned code inside its module.

## Key dependencies

- Next.js provides the App Router, Server Components, and Server Actions.
- `@project/design-system` provides shared UI components and styles.
- `@project/services` provides API contracts and server-side service clients.

## License

Private - Internal use only
