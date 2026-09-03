import { authPool } from "@/auth/auth";
import { env } from "@/config/env";
import { db } from "@/db/knex";
import { app, logger } from "@/server";

const server = app.listen(env.BACK_PORT, env.BACK_HOST, () => {
  logger.info(
    `Server (${env.NODE_ENV}) running on http://${env.BACK_HOST}:${env.BACK_PORT}`
  );
});

const shutdown = () =>
  server.close(async () => {
    await db.destroy();
    await authPool.end();
    process.exit(0);
  });
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
