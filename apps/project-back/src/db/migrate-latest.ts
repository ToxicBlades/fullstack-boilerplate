import { db } from "@/db/knex.js";

try {
  await db.migrate.latest();
} finally {
  await db.destroy();
}
