import { NotEmptyStringValidator, URLValidator } from "@project/services";
import { cleanEnv, testOnly } from "envalid";

// this needed is because nodejs env handler inside nextjs is wroking not how envalid expect
const processEnv = {
  RESEND_FROM: process.env.RESEND_FROM || "",
  RESEND_TOKEN: process.env.RESEND_TOKEN || "",
};

export const envEmail = cleanEnv(processEnv, {
  RESEND_FROM: NotEmptyStringValidator({
    devDefault: testOnly("test"),
    choices: ["development", "production", "test"],
  }),
  RESEND_TOKEN: URLValidator({ devDefault: testOnly("http://localhost:1337") }),
});
