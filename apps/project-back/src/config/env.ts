import "dotenv/config";
import { bool, cleanEnv, host, num, port, str, testOnly } from "envalid";

export const env = cleanEnv(process.env, {
  NODE_ENV: str({
    choices: ["development", "production", "test"],
    devDefault: testOnly("development"),
  }),
  BACK_HOST: host({ devDefault: testOnly("localhost") }),
  BACK_PORT: port({ devDefault: testOnly(3001) }),
  CORS_ORIGINS: str({ default: "" }),
  DATABASE_URL: str({
    devDefault: testOnly(
      "postgresql://postgres:postgres@localhost:5432/postgres"
    ),
  }),
  BETTER_AUTH_SECRET: str({
    devDefault: testOnly("dev-better-auth-secret-min-32-chars!!"),
  }),
  BETTER_AUTH_URL: str({ devDefault: testOnly("http://localhost:3001") }),
  AUTH_SESSION_CACHE_TTL_MS: num({ default: 30_000 }),
  AUTH_SESSION_COOKIE_CACHE_MAX_AGE_SEC: num({ default: 300 }),
  AUTH_DEV_BYPASS: bool({ default: false }),
  DEFAULT_USER_EMAIL: str({ default: "demo@example.com" }),
  DEFAULT_USER_PASSWORD: str({ default: "demo@example.com" }),
  DEFAULT_USER_NAME: str({ default: "Demo User" }),
  AWS_REGION: str({ default: "us-east-1" }),
  AWS_ACCESS_KEY_ID: str({ default: "" }),
  AWS_SECRET_ACCESS_KEY: str({ default: "" }),
  S3_BUCKET: str({ default: "" }),
  S3_ENDPOINT: str({ default: "" }),
  S3_PUBLIC_BASE_URL: str({ default: "" }),
});
