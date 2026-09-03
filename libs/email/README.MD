# @project/email

Shared email utilities and React Email templates for the Project monorepo.
Email is sent through an SMTP server using [Nodemailer](https://nodemailer.com/).
In local development, the repository's Docker setup provides [Mailpit](https://github.com/axllent/mailpit)
as the SMTP server.

## Features

- SMTP email delivery through Nodemailer
- Local email capture with Mailpit
- React Email templates with Tailwind CSS support
- Environment variable validation with Envalid
- Type-safe email input and attachments

## Installation

This is a private workspace package. Add it to the consuming application's
dependencies:

```json
{
  "dependencies": {
    "@project/email": "workspace:*"
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
pnpm --filter project-back dev
pnpm --filter project-back test
```

## Configuration

The variables below are read from the application that uses this library. Copy
the example values from [`libs/email/.env.example`](.env.example) into that
application's environment; the library does not load a separate `.env` file.

| Variable | Required | Description | Default / example |
| --- | --- | --- | --- |
| `SMTP_HOST` | Yes outside development/test | SMTP server hostname | `mailpit` in development/test |
| `SMTP_PORT` | Yes outside development/test | SMTP server port | `1025` |
| `SMTP_USER` | Yes outside development/test | SMTP username | `mailpit-user` in development/test |
| `SMTP_PASS` | Yes outside development/test | SMTP password | `mailpit-pass` in development/test |
| `SMTP_FROM` | Yes outside development/test | Default sender address | `Company <noreply@company.app>` |
| `SMTP_SECURE` | No | Enables TLS-secured SMTP | `false` |
| `EMAIL_SMTP_VERIFY_ENABLED` | No | Enables SMTP recipient verification | `false` |

In development and tests, the library has Mailpit-oriented defaults. If
`SMTP_HOST` is not configured, `sendTransactionalEmail` logs the email instead
of sending it. In non-development environments, missing SMTP configuration is
an error.

## Usage

### Library-specific service: Mailpit

Start the repository service with Docker Compose:

```bash
docker compose up mailpit
```

Then open the Mailpit inbox at <http://localhost:8025>. Applications running
inside Docker should use `SMTP_HOST=mailpit`; applications running on the host
should use `SMTP_HOST=localhost`.

### Sending an email

```typescript
import { sendTransactionalEmail } from "@project/email/src/smtp/send-email";

await sendTransactionalEmail({
  to: "recipient@example.com",
  subject: "Hello World",
  text: "Email content",
  html: "<p>Email content</p>",
});
```

The sender is always taken from `SMTP_FROM`. The input also supports optional
attachments:

```typescript
await sendTransactionalEmail({
  to: "recipient@example.com",
  subject: "Your report",
  text: "Your report is attached.",
  attachments: [
    {
      filename: "report.pdf",
      content: pdfContent,
      contentType: "application/pdf",
    },
  ],
});
```

`content` is a string containing the attachment data. The function resolves
after the SMTP server accepts the message and applies a 15-second timeout.

### Using an email template

```tsx
import { render } from "@react-email/render";
import { sendTransactionalEmail } from "@project/email/src/smtp/send-email";
import { ContactTemplate } from "@project/email/src/templates/contact";

const html = await render(
  <ContactTemplate
    name="John Doe"
    email="john@example.com"
    message="Hello, I'm interested in your services."
  />
);

await sendTransactionalEmail({
  to: "recipient@example.com",
  subject: "New Contact Form Submission",
  text: "John Doe sent a new contact form message.",
  html,
});
```

## Available templates

### `ContactTemplate`

The contact form template is available at
`@project/email/src/templates/contact`.

Props:

- `name: string` - sender's name
- `email: string` - sender's email address
- `message: string` - message content

The component includes preview props for React Email development tools.

## Development

To add a template, create a file in `src/templates/`, compose it with React
Email components, export the component, and add `PreviewProps` for previews.

Useful repository commands:

- `pnpm check` - check formatting and lint rules
- `pnpm fix` - apply repository formatting and lint fixes

## Dependencies

- `nodemailer` - SMTP transport and delivery
- `react-email` - email template components and rendering support
- `envalid` - environment validation
- `react` and `react-dom` - React runtime for templates
- `@project/logger` - development and delivery logging

## License

Private - Internal use only
