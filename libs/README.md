# @project/<library-name>

Short description of what this library provides and which applications or
other libraries should use it.

## Features

- Feature or capability one
- Feature or capability two
- Feature or capability three

## Installation

This is a private workspace package. Add it to the consuming application's
dependencies:

```json
{
  "dependencies": {
    "@project/<library-name>": "workspace:*"
  }
}
```

Install dependencies from the repository root:

```sh
pnpm install
```

Replace `<app-name>` with the workspace application that uses this library
when running application-specific commands:

```sh
pnpm --filter <app-name> dev
pnpm --filter <app-name> test
```

## Configuration

Environment variables are owned by the application that uses this library.
The library reads them from that application's environment; it does not load
or build a separate `.env` file from the library directory.

Copy the variables required by this library from its `.env.example` file into
the consuming application's environment file, for example:

```sh
cp libs/<library-name>/.env.example apps/<app-name>/.env
```

If the application already has a `.env`, add the variables to that file
instead of replacing it. Document every variable here:

| Variable | Required | Description | Default / example |
| --- | --- | --- | --- |
| `<VARIABLE_NAME>` | Yes | What the variable controls | `<example-value>` |
| `<OPTIONAL_VARIABLE>` | No | What the variable controls | `<default>` |

Configuration should be validated when the consuming application starts. Keep
secrets and service credentials out of this library's source tree and commit
only safe example values.

## Usage

Import the public API from the library's documented entry point:

```typescript
import { someFunction } from "@project/<library-name>";

const result = someFunction({
  // library-specific options
});
```

Add the main library-specific workflows below. Include required setup,
runtime behavior, error handling, and links to the relevant source files when
useful.

### Library-specific services

If the library depends on a local service, document how to start it and which
configuration the consuming application should use. For example, an email
library using Mailpit can document:

```sh
docker compose up mailpit
```

Open the Mailpit inbox at <http://localhost:8025>. Applications running inside
Docker should use `SMTP_HOST=mailpit`; applications running on the host should
use `SMTP_HOST=localhost`. Mailpit accepts SMTP connections on port `1025` by
default.

### Additional examples

Add examples for the library's other public functions, components, or common
integration patterns here.

## Development

Document library-specific development commands, tests, generated files, and
any conventions contributors should follow.

```sh
pnpm check
pnpm fix
```

## Dependencies

- `<dependency>` - Why the library uses it

## License

Private - Internal use only
