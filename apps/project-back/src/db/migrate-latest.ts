import { db } from "@/db/knex";

try {
  await db.migrate.latest();
} finally {
  await db.destroy();
}
