# @project/email

A shared email library for the Project monorepo, providing email sending capabilities and reusable email templates using Resend and React Email.

## Features

- 📧 Email sending via [Resend](https://resend.com)
- 🎨 React Email templates with Tailwind CSS support
- 🔒 Environment variable validation using Envalid
- 📦 Type-safe email templates

## Installation

This package is part of the Project monorepo and is automatically available to other packages in the workspace.

## Environment Variables

The following environment variables are required:

- `RESEND_TOKEN` - Your Resend API token
- `RESEND_FROM` - The default "from" email address

These are validated using Envalid and will throw errors if missing or invalid.

## Usage

### Basic Setup

```typescript
import { resend } from "@project/email";

// Send an email
await resend.emails.send({
  from: "onboarding@resend.dev",
  to: "delivered@resend.dev",
  subject: "Hello World",
  html: "<p>Email content</p>",
});
```

### Using Email Templates

```typescript
import { ContactTemplate } from "@project/email/templates/contact";
import { render } from "@react-email/render";
import { resend } from "@project/email";

const html = await render(
  ContactTemplate({
    name: "John Doe",
    email: "john@example.com",
    message: "Hello, I'm interested in your services.",
  })
);

await resend.emails.send({
  from: process.env.RESEND_FROM!,
  to: "recipient@example.com",
  subject: "New Contact Form Submission",
  html,
});
```

## Available Templates

### ContactTemplate

A template for contact form submissions.

**Props:**
- `name` (string) - The sender's name
- `email` (string) - The sender's email address
- `message` (string) - The message content

**Example:**
```typescript
import { ContactTemplate } from "@project/email/templates/contact";

<ContactTemplate
  name="Jane Smith"
  email="jane@example.com"
  message="I'm interested in your services."
/>
```

## Development

### Scripts

- `pnpm lint` - Run Biome linter
- `pnpm lint:fix` - Fix linting issues automatically
- `pnpm format` - Format code with Biome

### Adding New Templates

1. Create a new template file in `src/templates/`
2. Use React Email components from `@react-email/components`
3. Export the template component
4. Add PreviewProps for development preview

Example:
```typescript
import { Html, Body, Container, Text } from "@react-email/components";

export const MyTemplate = ({ prop1, prop2 }: MyTemplateProps) => (
  <Html>
    <Body>
      <Container>
        <Text>{prop1}</Text>
      </Container>
    </Body>
  </Html>
);

MyTemplate.PreviewProps = {
  prop1: "Preview value",
  prop2: "Another preview value",
};
```

## Dependencies

- `resend` - Email sending service
- `@react-email/components` - React components for building email templates
- `envalid` - Environment variable validation
- `react` & `react-dom` - React runtime for email templates

## License

Private - Internal use only

