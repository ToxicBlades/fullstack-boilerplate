import { cleanEnv, str } from "envalid";

const processEnv = {
  LOG_LEVEL: process.env.LOG_LEVEL,
  LOG_NAME: process.env.LOG_NAME,
  NODE_ENV: process.env.NODE_ENV,
};

export const envLogger = cleanEnv(processEnv, {
  LOG_LEVEL: str({
    choices: ["fatal", "error", "warn", "info", "debug", "trace", "silent"],
    default: process.env.NODE_ENV === "test" ? "silent" : "info",
  }),
  LOG_NAME: str({ default: "app" }),
  NODE_ENV: str({
    choices: ["development", "production", "test"],
    default: "development",
  }),
});
