# @project/seo

Shared SEO utilities for the Project monorepo. This package provides reusable Next.js metadata defaults and a type-safe JSON-LD component.

## Features

- Consistent page titles, descriptions, Open Graph, Twitter, and Apple web app metadata
- Metadata base URL and author URL support
- Type-safe schema.org JSON-LD using `schema-dts`
- HTML-safe escaping of JSON-LD content before it is rendered

## Installation

This is a private workspace package. Add it to the consuming application's
dependencies:

```json
{
  "dependencies": {
    "@project/seo": "workspace:*"
  }
}
```

Install dependencies from the repository root:

```sh
pnpm install
```

Run commands for the application that uses the library with its workspace
filter, for example:

```sh
pnpm --filter <app-name> dev
pnpm --filter <app-name> test
```

## Configuration

The library reads configuration from the application that uses it. It does
not load a separate `.env` file from `libs/seo`.

| Variable | Required | Description | Default / example |
| --- | --- | --- | --- |
| `NODE_ENV` | No | Selects `http` or `https` for generated metadata URLs | `development` |
No other environment variables are currently read by this library.

The current implementation uses the `productionUrl` constant in
`libs/seo/metadata.ts` for the metadata base and author URL. Update that
constant or wire it to the consuming application's environment before using a
production domain.

## Usage

### Metadata

Use `createMetadata` from `@project/seo/metadata` in a Next.js layout or page:

```tsx
import type { Metadata } from "next";
import { createMetadata } from "@project/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "About us",
  description: "Learn more about Project.",
  image: "/images/about-og.png",
});
```

The `title` and `description` fields are required. The title is rendered as `<title> | Project`; `image` is optional and is added to Open Graph metadata with a 1200 × 630 image size and the page title as its alt text.

Additional Next.js `Metadata` fields can be passed to override or extend the defaults:

```tsx
export const metadata = createMetadata({
  title: "Blog",
  description: "News and ideas from Project.",
  openGraph: {
    type: "article",
  },
  robots: {
    index: true,
    follow: true,
  },
});
```

## JSON-LD

Render structured data with the `JsonLd` component from `@project/seo/json-ld`:

```tsx
import { JsonLd } from "@project/seo/json-ld";

export function OrganizationSchema() {
  return (
    <JsonLd
      code={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Project",
        url: "https://example.com",
      }}
    />
  );
}
```

`code` accepts a `schema-dts` `WithContext<Thing>` value. The module also re-exports `schema-dts` types for defining structured data in application code.

## Development

Use the repository checks before committing changes:

```sh
pnpm check
pnpm fix
```

## Dependencies

- `next` - Metadata types and Next.js integration
- `schema-dts` - Type-safe schema.org definitions
- `lodash.merge` - Merging default and page-specific metadata
- `react` - JSON-LD component runtime

## License

Private - Internal use only
