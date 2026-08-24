import {
  NotEmptyNumberValidator,
  NotEmptyStringValidator,
} from "@project/services";
import { bool, cleanEnv, testOnly } from "envalid";

// this needed is because nodejs env handler inside nextjs is wroking not how envalid expect
const processEnv = {
  SMTP_HOST: process.env.SMTP_HOST || "",
  SMTP_PORT: process.env.SMTP_PORT || "",
  SMTP_USER: process.env.SMTP_USER || "",
  SMTP_PASS: process.env.SMTP_PASS || "",
  SMTP_FROM: process.env.SMTP_FROM || "",
  SMTP_SECURE: process.env.SMTP_SECURE,
  EMAIL_SMTP_VERIFY_ENABLED: process.env.EMAIL_SMTP_VERIFY_ENABLED,
};

export const envEmail = cleanEnv(processEnv, {
  SMTP_HOST: NotEmptyStringValidator({ devDefault: testOnly("mailpit") }),
  SMTP_PORT: NotEmptyNumberValidator({ devDefault: testOnly(1025) }),
  SMTP_USER: NotEmptyStringValidator({ devDefault: testOnly("mailpit-user") }),
  SMTP_PASS: NotEmptyStringValidator({ devDefault: testOnly("mailpit-pass") }),
  SMTP_FROM: NotEmptyStringValidator({
    devDefault: testOnly("Tetis <noreply@tetis.app>"),
  }),
  SMTP_SECURE: bool({ default: false }),
  EMAIL_SMTP_VERIFY_ENABLED: bool({ default: false }),
});
