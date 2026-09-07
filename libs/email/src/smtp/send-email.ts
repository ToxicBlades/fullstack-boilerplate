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
    auth:
      envEmail.SMTP_USER && envEmail.SMTP_PASS
        ? {
            pass: envEmail.SMTP_PASS,
            user: envEmail.SMTP_USER,
          }
        : undefined,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    host: envEmail.SMTP_HOST,
    port: envEmail.SMTP_PORT,
    secure: envEmail.SMTP_SECURE,
    socketTimeout: 15_000,
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
        { subject: input.subject, text: input.text, to: input.to },
        "SMTP_HOST unset — email logged instead of sent (set localhost:1025 for Mailpit)"
      );
      return;
    }
    throw new Error("SMTP is not configured");
  }

  const send = mailer.sendMail({
    attachments: input.attachments?.map((attachment) => ({
      content: attachment.content,
      contentType: attachment.contentType,
      filename: attachment.filename,
    })),
    from: envEmail.SMTP_FROM,
    html: input.html,
    subject: input.subject,
    text: input.text,
    to: input.to,
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
    { subject: input.subject, to: input.to },
    "transactional email sent"
  );
}
