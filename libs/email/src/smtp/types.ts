export interface EmailAttachment {
  content: string;
  contentType?: string;
  filename: string;
}

export interface SendEmailInput {
  attachments?: EmailAttachment[];
  html?: string;
  subject: string;
  text: string;
  to: string;
}
