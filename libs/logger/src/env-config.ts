import { cleanEnv, num, str } from "envalid";

const processEnv = {
  LOG_LEVEL: process.env.LOG_LEVEL,
  LOG_NAME: process.env.LOG_NAME,
  LOKI_BATCH_INTERVAL_MS: process.env.LOKI_BATCH_INTERVAL_MS,
  LOKI_MAX_BATCH_SIZE: process.env.LOKI_MAX_BATCH_SIZE,
  LOKI_MAX_QUEUE_SIZE: process.env.LOKI_MAX_QUEUE_SIZE,
  LOKI_PASSWORD: process.env.LOKI_PASSWORD,
  LOKI_TENANT_ID: process.env.LOKI_TENANT_ID,
  LOKI_URL: process.env.LOKI_URL,
  LOKI_USERNAME: process.env.LOKI_USERNAME,
  NODE_ENV: process.env.NODE_ENV,
};

export const envLogger = cleanEnv(processEnv, {
  LOG_LEVEL: str({
    choices: ["fatal", "error", "warn", "info", "debug", "trace", "silent"],
    default: process.env.NODE_ENV === "test" ? "silent" : "info",
  }),
  LOG_NAME: str({ default: "app" }),
  LOKI_BATCH_INTERVAL_MS: num({ default: 1000 }),
  LOKI_MAX_BATCH_SIZE: num({ default: 100 }),
  LOKI_MAX_QUEUE_SIZE: num({ default: 10_000 }),
  LOKI_PASSWORD: str({ default: "" }),
  LOKI_TENANT_ID: str({ default: "" }),
  LOKI_URL: str({ default: "" }),
  LOKI_USERNAME: str({ default: "" }),
  NODE_ENV: str({
    choices: ["development", "production", "test"],
    default: "development",
  }),
});
