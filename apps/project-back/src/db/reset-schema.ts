import { db } from "@/db/knex.js";

if (process.env.ALLOW_DB_NUKE !== "1") {
  throw new Error("Set ALLOW_DB_NUKE=1 to reset the schema");
}
try {
  await db.raw("DROP SCHEMA public CASCADE");
  await db.raw("CREATE SCHEMA public");
} finally {
  await db.destroy();
}
