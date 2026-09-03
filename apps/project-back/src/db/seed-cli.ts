import { db } from "@/db/knex";

try {
  if (process.argv.includes("--reset")) {
    await db("items").del();
  }
  await db("items")
    .insert({ name: "Example item" })
    .onConflict("name")
    .ignore();
} finally {
  await db.destroy();
}
