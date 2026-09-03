# @project/typescript-config

Shared TypeScript configurations for the Project monorepo. The package keeps compiler settings consistent across applications and libraries while allowing each package to add its own project-specific options.

## Presets

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

## Usage

This package is already available through the workspace. Extend the preset from a package's `tsconfig.json`:

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

Configuration files in this package are consumed directly; there is no build step or runtime export.

When changing a preset, run the repository's type-checking and linting commands to verify every workspace consumer still works.