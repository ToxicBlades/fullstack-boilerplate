import {
  NotEmptyNumberValidator,
  NotEmptyStringValidator,
} from "@project/services";
import { bool, cleanEnv, testOnly } from "envalid";

// this needed is because nodejs env handler inside nextjs is wroking not how envalid expect
const processEnv = {
  EMAIL_SMTP_VERIFY_ENABLED: process.env.EMAIL_SMTP_VERIFY_ENABLED,
  SMTP_FROM: process.env.SMTP_FROM || "",
  SMTP_HOST: process.env.SMTP_HOST || "",
  SMTP_PASS: process.env.SMTP_PASS || "",
  SMTP_PORT: process.env.SMTP_PORT || "",
  SMTP_SECURE: process.env.SMTP_SECURE,
  SMTP_USER: process.env.SMTP_USER || "",
};

export const envEmail = cleanEnv(processEnv, {
  EMAIL_SMTP_VERIFY_ENABLED: bool({ default: false }),
  SMTP_FROM: NotEmptyStringValidator({
    devDefault: testOnly("Company <noreply@company.app>"),
  }),
  SMTP_HOST: NotEmptyStringValidator({ devDefault: testOnly("mailpit") }),
  SMTP_PASS: NotEmptyStringValidator({ devDefault: testOnly("mailpit-pass") }),
  SMTP_PORT: NotEmptyNumberValidator({ devDefault: testOnly(1025) }),
  SMTP_SECURE: bool({ default: false }),
  SMTP_USER: NotEmptyStringValidator({ devDefault: testOnly("mailpit-user") }),
});
