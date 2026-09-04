# @project/docs

Docusaurus site for Project documentation and long-form technical content.
It supports versionable MDX documentation, a blog, generated navigation, and
syntax-highlighted code examples.

## Features

- Documentation pages authored in Markdown or MDX
- Automatically generated sidebars and navigation
- A built-in blog with RSS and Atom feeds
- Light and dark themes with syntax highlighting
- Static output suitable for any static hosting provider

## Prerequisites

- Node.js 20 or newer
- pnpm and the repository workspace dependencies

Install dependencies from the repository root:

```sh
pnpm install
```

## Configuration

The site does not currently use environment variables. Before deploying,
replace the starter values in `docusaurus.config.ts`, including the title,
tagline, production URL, organization and repository names, social image, and
edit links.

Navigation and content behavior are configured in:

- `docusaurus.config.ts` for site metadata, themes, plugins, and deployment
- `sidebars.ts` for documentation navigation

## Development

Start the local development server from the repository root:

```sh
pnpm --filter @project/docs start
```

Docusaurus opens the site in a browser and reloads most content changes. Add
documentation under `docs/`, blog posts under `blog/`, and public assets under
`static/`.

## Build and serve

Create the production site and preview it locally:

```sh
pnpm --filter @project/docs build
pnpm --filter @project/docs serve
```

The static site is written to `apps/docs/build/`. Run the type checker before
publishing changes:

```sh
pnpm --filter @project/docs typecheck
```

## Deployment

The `deploy` script uses Docusaurus deployment settings. Configure the real
repository and production URL in `docusaurus.config.ts` before running it:

```sh
pnpm --filter @project/docs deploy
```

For other static hosts, deploy the contents of `apps/docs/build/`.

## Project structure

- `docs/` - Documentation pages and categories
- `blog/` - Blog posts, authors, and tags
- `src/` - Site-specific React components and CSS
- `static/` - Files copied directly into the generated site
- `docusaurus.config.ts` - Site and theme configuration
- `sidebars.ts` - Documentation sidebar definitions

Do not edit `.docusaurus/` or `build/`; both are generated directories.

## Key dependencies

- Docusaurus provides the documentation, blog, routing, and build system.
- MDX allows React components inside Markdown content.
- Prism React Renderer provides code syntax highlighting.

## License

Private - Internal use only
