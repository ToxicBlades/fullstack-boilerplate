# @project/typescript-config

Shared TypeScript configurations for the Project monorepo. The package keeps compiler settings consistent across applications and libraries while allowing each package to add its own project-specific options.

## Features

- Reusable base and Next.js TypeScript presets
- Strict, consistent compiler settings across workspace packages
- Monorepo path aliases for consuming applications and libraries

## Installation

This is a private workspace package. Add it to the consuming package's
development dependencies:

```json
{
  "devDependencies": {
    "@project/typescript-config": "workspace:*"
  }
}
```

Install dependencies from the repository root:

```sh
pnpm install
```

## Configuration

This library does not use environment variables. It provides JSON
configuration presets that are loaded by the consuming package's
`tsconfig.json`.

## Usage

This package is already available through the workspace. Extend the preset
from a package's `tsconfig.json`:

### Presets

### `base.json`

The default preset for TypeScript projects. It provides:

- Strict type checking
- ES2022 target and library support
- NodeNext module and module resolution settings
- JSON module imports
- Declaration and declaration map generation
- Consistent casing and isolated module checks
- DOM and iterable DOM types

### `nextjs.json`

The Next.js preset extends `base.json` and adds settings required by Next.js projects, including the Next.js TypeScript plugin, JSX preservation, bundler module resolution, and no-output type checking.

It also defines the monorepo path aliases:

- `@/*` — resolves from the consuming project
- `@project/*` — resolves to a package under `libs/`

### Next.js application or library

```json
{
  "extends": "@project/typescript-config/nextjs.json",
  "compilerOptions": {
    "strictNullChecks": true
  },
  "include": ["**/*.ts", "**/*.tsx"]
}
```

### Non-Next.js project

```json
{
  "extends": "@project/typescript-config/base.json",
  "include": ["**/*.ts"]
}
```

The consuming package can override inherited options when necessary. Keep shared or cross-package changes in this library so all consumers remain aligned.

## Development

Update the shared JSON presets here when compiler settings should apply across
multiple consuming packages. Verify affected packages with the repository
checks:

```sh
pnpm check
pnpm fix
```

## Dependencies

This package has no runtime dependencies.

## License

Private - Internal use only
