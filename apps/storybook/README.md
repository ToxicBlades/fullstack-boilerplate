# @project/storybook

Component workshop for the Project design system. It renders shared React
components in isolation with the same Tailwind styles, themes, and Next.js
integration used by the applications.

## Features

- Isolated component development and documentation
- Light and dark theme previews
- Next.js behavior through the Storybook Next.js Vite framework
- Controls and interaction tooling
- Chromatic visual review support

## Prerequisites

- Node.js and pnpm versions compatible with the repository
- Workspace dependencies installed from the repository root

```sh
pnpm install
```

## Configuration

Storybook does not require environment variables for local development.
Chromatic authentication, when used, must be supplied according to the team's
Chromatic project configuration and kept out of source control.

The Storybook configuration aliases `@project/design-system` directly to
`libs/design-system`, imports its global stylesheet, and wraps every story in
the shared theme and tooltip providers.

## Development

Start Storybook from the repository root:

```sh
pnpm --filter @project/storybook dev
```

Open <http://localhost:6006>. Add stories under `stories/` using the
`*.stories.tsx` naming convention.

## Build and visual review

Build the static Storybook site:

```sh
pnpm --filter @project/storybook build
```

The generated site is written to `apps/storybook/storybook-static/`. Publish a
build to the configured Chromatic project with:

```sh
pnpm --filter @project/storybook chromatic
```

Run type checking and repository checks before committing changes:

```sh
pnpm --filter @project/storybook typecheck
pnpm check
```

## Project structure

- `.storybook/main.ts` - Story discovery, addons, framework, and Vite aliases
- `.storybook/preview.tsx` - Global styles, parameters, themes, and decorators
- `stories/` - Component stories
- `public/` - Static assets available to stories
- `storybook-static/` - Generated production build

Do not edit `storybook-static/` by hand.

## Key dependencies

- Storybook provides the component workshop and static build.
- `@storybook/nextjs-vite` integrates Next.js components with Vite.
- `@storybook/addon-themes` previews light and dark themes.
- Chromatic provides hosted visual review.
- `@project/design-system` is the component library documented here.

## License

Private - Internal use only
