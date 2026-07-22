import path from "node:path";
import { fileURLToPath } from "node:url";
import knex from "knex";
import { env } from "@/config/env.js";

export const db = knex({
  client: "pg",
  connection: env.DATABASE_URL,
  pool: { min: 0, max: 10 },
  migrations: {
    directory: path.resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      "../../migrations"
    ),
    tableName: "project_back_knex_migrations",
  },
});
