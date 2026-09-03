# @project/services

Shared service-layer utilities for the Project monorepo. This package provides
reusable validation helpers and shared API route definitions for applications.

## Features

- Envalid-compatible validation for non-empty strings and numbers
- URL validation with environment-aware behavior
- Shared backend API route constants
- Generated barrel exports for reusable validators

## Installation

This is a private workspace package. Add it to the consuming application's
dependencies:

```json
{
  "dependencies": {
    "@project/services": "workspace:*"
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

Environment variables are read from the application that uses this library.
The library does not load a separate `.env` file from `libs/services`.

| Variable | Required | Description | Default / example |
| --- | --- | --- | --- |
| `NODE_ENV` | No | Selects production-aware validation behavior | `development` |

## Usage

### Validators

Import validators from the package entry point:

```typescript
import {
  NotEmptyNumberValidator,
  NotEmptyStringValidator,
  URLValidator,
} from "@project/services";
```

The validators are also available from their source modules under
`@project/services/src/zod-validators/` when a direct import is preferable.

### API route constants

Use shared route names instead of duplicating string literals:

```typescript
import { BACK_API_ROUTES } from "@project/services/src/api-routes/back-api-routes";

const usersPath = `/api/${BACK_API_ROUTES.USERS}`;
```

## Development

Regenerate the validator barrel file after adding or removing a validator:

```sh
pnpm --filter @project/services generate-index
```

Use the repository checks before committing changes:

```sh
pnpm check
pnpm fix
```

## Dependencies

- `envalid` - Environment-aware validation helpers
- `http-status-codes` - Shared HTTP status code support
- `qs` - Query-string support
- `tslib` - TypeScript runtime helpers

## License

Private - Internal use only
