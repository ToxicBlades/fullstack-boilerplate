# @project/<application-name>

Short description of the application, who it serves, and its role in the
Project monorepo.

## Features

- Feature or workflow one
- Feature or workflow two
- Feature or workflow three

## Prerequisites

- Node.js version required by the repository
- pnpm version declared by the workspace
- Any local services the application needs, such as PostgreSQL or object
  storage

Install workspace dependencies from the repository root:

```sh
pnpm install
```

## Configuration

Copy the application's example environment file when one is provided:

```sh
cp apps/<application-name>/.env.example apps/<application-name>/.env
```

Document every application-specific variable here. Do not document standard
variables such as `NODE_ENV` unless the application gives them special
behavior.

| Variable | Required | Description | Default / example |
| --- | --- | --- | --- |
| `<VARIABLE_NAME>` | Yes | What the variable controls | `<example-value>` |
| `<OPTIONAL_VARIABLE>` | No | What the variable controls | `<default>` |

Keep secrets out of source control and commit only safe example values.

## Development

Run the application from the repository root with its workspace package name:

```sh
pnpm --filter @project/<application-name> dev
```

Open <http://localhost:3000>, replacing the port when the application uses a
different one. Describe any supporting services, migrations, seed data, or
first-run setup required for a working local environment.

## Build and run

```sh
pnpm --filter @project/<application-name> build
pnpm --filter @project/<application-name> start
```

Document generated output, production-only requirements, and deployment steps
when they differ from local development.

## Testing

List the application's unit, integration, or end-to-end commands. If it has no
dedicated tests yet, direct contributors to the repository checks:

```sh
pnpm check
pnpm fix
```

## Project structure

- `<directory>/` - What belongs in this directory
- `<configuration-file>` - What the configuration controls

Add application-specific architecture, route, or content-authoring guidance
below this list when useful.

## Key dependencies

- `<dependency>` - Why the application uses it

## License

Private - Internal use only
