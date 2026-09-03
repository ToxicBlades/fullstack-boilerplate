import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Knex } from "knex";
import { env } from "./src/config/env";

const config: Knex.Config = {
  client: "pg",
  connection: env.DATABASE_URL,
  migrations: {
    directory: path.resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      "migrations"
    ),
    tableName: "project_back_knex_migrations",
  },
};
export default config;
