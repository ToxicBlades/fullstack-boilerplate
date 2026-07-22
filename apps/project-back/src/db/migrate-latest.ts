import { db } from "./knex.js";

try {
  await db.migrate.latest();
} finally {
  await db.destroy();
}
