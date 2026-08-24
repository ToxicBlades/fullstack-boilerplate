//TODO: make default value for libs (cause they are taken from app which lib are running)
import { logger } from "@project/logger";
import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import { envEmail } from "../env-config";
import type { SendEmailInput } from "./types";

let transporter: nodemailer.Transporter | null | undefined;

function getTransporter(): nodemailer.Transporter | null {
  if (!envEmail.SMTP_HOST) {
    return null;
  }
  if (transporter) {
    return transporter;
  }
  const smtpConfig: SMTPTransport.Options = {
    host: envEmail.SMTP_HOST,
    port: envEmail.SMTP_PORT,
    secure: envEmail.SMTP_SECURE,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
    auth:
      envEmail.SMTP_USER && envEmail.SMTP_PASS
        ? {
            user: envEmail.SMTP_USER,
            pass: envEmail.SMTP_PASS,
          }
        : undefined,
  };

  transporter = nodemailer.createTransport(smtpConfig);
  return transporter;
}

export async function sendTransactionalEmail(
  input: SendEmailInput
): Promise<void> {
  const mailer = getTransporter();
  if (!mailer) {
    if (envEmail.isDevelopment || envEmail.isTest) {
      logger.info(
        { to: input.to, subject: input.subject, text: input.text },
        "SMTP_HOST unset — email logged instead of sent (set localhost:1025 for Mailpit)"
      );
      return;
    }
    throw new Error("SMTP is not configured");
  }

  const send = mailer.sendMail({
    from: envEmail.SMTP_FROM,
    to: input.to,
    subject: input.subject,
    text: input.text,
    html: input.html,
    attachments: input.attachments?.map((attachment) => ({
      filename: attachment.filename,
      content: attachment.content,
      contentType: attachment.contentType,
    })),
  });

  await Promise.race([
    send,
    new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new Error("SMTP send timed out"));
      }, 15_000);
    }),
  ]);

  logger.info(
    { to: input.to, subject: input.subject },
    "transactional email sent"
  );
}
