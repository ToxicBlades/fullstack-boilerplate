process.env.NODE_ENV = "test";
// Keep local/hosted observability data free from test-generated events.
process.env.LOKI_URL = "";
process.env.AUTH_DEV_BYPASS = "false";
process.env.DATABASE_URL ??=
  "postgresql://postgres:postgres@localhost:5432/postgres";
process.env.BETTER_AUTH_SECRET ??= "test-better-auth-secret-min-32-chars!!";
process.env.BETTER_AUTH_URL ??= "http://localhost:3010";
process.env.S3_BUCKET ??= "";
process.env.AWS_ACCESS_KEY_ID ??= "";
process.env.AWS_SECRET_ACCESS_KEY ??= "";
