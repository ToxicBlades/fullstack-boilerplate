# @project/landing

Public marketing site for Project. The application presents the studio's
positioning, capabilities, and contact calls to action in a focused Next.js
page.

## Features

- Responsive marketing landing page
- Shared Project design-system components and theme tokens
- Shared SEO metadata helpers
- Server-rendered Next.js App Router application
- Production-ready Docker image definition

## Prerequisites

- Node.js and pnpm versions compatible with the repository
- Workspace dependencies installed from the repository root

```sh
pnpm install
```

## Configuration

The landing application does not currently require environment variables.
Update the page content and contact links in `app/page.tsx`; update global
metadata in `app/layout.tsx`.

## Development

Start the development server from the repository root:

```sh
pnpm --filter @project/landing dev
```

Open <http://localhost:3000>. If another application already uses port 3000,
pass a different port to Next.js:

```sh
pnpm --filter @project/landing dev -- --port 3002
```

## Build and run

```sh
pnpm --filter @project/landing build
pnpm --filter @project/landing start
```

The production build is written to `.next/`. The included `Dockerfile` can be
used by the repository's container build workflow.

## Testing

The application does not currently have a dedicated test suite. Run the
repository checks before committing changes:

```sh
pnpm check
pnpm fix
```

## Project structure

- `app/page.tsx` - Landing-page content and sections
- `app/layout.tsx` - Root document, fonts, and metadata
- `app/styles.css` - Application styles and design-system imports
- `public/` - Static files served from the site root
- `next.config.ts` - Next.js configuration
- `Dockerfile` - Container build definition

## Key dependencies

- Next.js provides routing, rendering, and production builds.
- `@project/design-system` provides shared components and styling primitives.
- `@project/seo` provides shared metadata helpers.
- `@project/services` provides shared application contracts when needed.

## License

Private - Internal use only
