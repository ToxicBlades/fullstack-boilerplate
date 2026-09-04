# @project/design-system

Shared React components, styling primitives, and theme utilities for the
Project monorepo. The library is built with Tailwind CSS, shadcn/ui, Radix UI,
and `next-themes`.

## Features

- Reusable UI components under `components/ui`
- Shared light and dark theme tokens
- A root provider for theme and tooltip behavior
- Geist font helpers and typography presets
- `cn` and `capitalize` utility functions
- Storybook support for developing components in isolation

## Installation

This is a private workspace package. Add it to the consuming application's
dependencies:

```json
{
  "dependencies": {
    "@project/design-system": "workspace:*"
  }
}
```

Install dependencies from the repository root:

```sh
pnpm install
```

## Application setup

### Import the shared styles

Import the design system stylesheet from the application's global stylesheet:

```css
@import "tailwindcss";
@import "@project/design-system/styles/globals.css";
```

The shared stylesheet contains the Tailwind theme mapping, animation styles,
base element styles, color tokens, radius tokens, and dark-mode variables.
Applications can override the CSS custom properties in their own global
stylesheet after this import.

### Add the provider

Wrap applications that use tooltips or theme-aware components with
`DesignSystemProvider`. In a Next.js application, add it to the root layout:

```tsx
import { DesignSystemProvider } from "@project/design-system/provider";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <DesignSystemProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          {children}
        </DesignSystemProvider>
      </body>
    </html>
  );
}
```

The provider uses a class on the root element for dark mode and includes the
shared tooltip provider. Its props are passed through to `next-themes`.

### Fonts

The optional `fonts` helper provides the Geist Sans and Geist Mono variables,
along with the default font and rendering utility classes:

```tsx
import { fonts } from "@project/design-system/lib/fonts";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={fonts} lang="en">
      <body>{children}</body>
    </html>
  );
}
```

## Usage

Components are imported from their individual module rather than from a barrel
entry point:

```tsx
import { Button } from "@project/design-system/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@project/design-system/components/ui/card";

export function ExampleCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Design system example</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Continue</Button>
      </CardContent>
    </Card>
  );
}
```

In addition to the UI primitives, the package includes shared components such
as `ThemeSwitcher` and `ReturnButton`:

```tsx
import { ThemeSwitcher } from "@project/design-system/components/theme-switcher";
```

These components, and several interactive UI primitives, are client
components. They can be rendered by Server Components, but event handlers and
client hooks must remain within a client boundary.

### Utilities

Use `cn` to combine conditional class names and resolve conflicting Tailwind
classes:

```tsx
import { cn } from "@project/design-system/lib/utils";

export function Panel({ active }: { active: boolean }) {
  return <div className={cn("rounded-lg p-4", active && "bg-accent")} />;
}
```

The same module exports `capitalize` for capitalizing the first character of a
string.

### Typography presets

The global stylesheet exposes `.typeset-compact` and `.typeset-docs` presets.
Apply one of these classes to a content container that uses the shared typeset
styles:

```tsx
<article className="typeset typeset-docs">{children}</article>
```

## Available components

The `components/ui` directory contains form controls, overlays, navigation,
data display, and layout primitives. This includes buttons, cards, inputs,
forms, dialogs, sheets, menus, tabs, tables, calendars, charts, sidebars,
carousels, and toast notifications. Treat the source modules in
`components/ui` as the authoritative component list and API reference.

## Development

Run Storybook from the repository root to develop and review components:

```sh
pnpm --filter @project/storybook dev
```

Add or update stories in `apps/storybook/stories`. Run the repository checks
before committing changes:

```sh
pnpm check
pnpm fix
```

### Adding shadcn/ui components

The library's `components.json` configures the aliases and shared stylesheet
used by the shadcn CLI. Run the CLI from the design-system directory:

```sh
cd libs/design-system
pnpm dlx shadcn@latest add <component>
```

Review generated dependencies and imports, then add a Storybook story when the
component benefits from visual or interaction coverage. Keep imports scoped to
individual component modules; do not add a barrel export solely for
convenience.

## Key dependencies

- Tailwind CSS provides utility classes and maps the shared design tokens.
- shadcn/ui and Radix UI provide the component conventions and accessible
  primitives.
- `next-themes` manages system, light, and dark themes.
- Lucide supplies component icons.
- `class-variance-authority`, `clsx`, and `tailwind-merge` compose variants and
  class names.

## License

Private - internal use only.
