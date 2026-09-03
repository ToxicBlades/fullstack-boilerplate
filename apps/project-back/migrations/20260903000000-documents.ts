import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("documents", (table) => {
    table.string("id", 36).primary();
    table.string("title", 255).notNullable();
    table.string("storage_key", 1024).notNullable().unique();
    table.string("mime_type", 255).notNullable();
    table.bigInteger("size_bytes").notNullable();
    table.string("uploaded_by", 36).notNullable().index();
    table.boolean("upload_confirmed").notNullable().defaultTo(false);
    table
      .timestamp("created_at", { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
    table.timestamp("expires_at", { useTz: true }).nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("documents");
}
