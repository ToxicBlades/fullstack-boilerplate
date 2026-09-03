import { db } from "@/db/knex.js";
import { ItemSelectColumns } from "./items-model.js";

export const itemsService = {
  list() {
    return db("items")
      .select(...ItemSelectColumns)
      .orderBy("created_at", "desc");
  },

  async create(name: string) {
    const [item] = await db("items")
      .insert({ name })
      .returning(ItemSelectColumns as unknown as string[]);
    return item;
  },

  async update(id: string, name: string) {
    const [item] = await db("items")
      .where({ id })
      .update({ name, updated_at: db.fn.now() })
      .returning(ItemSelectColumns as unknown as string[]);
    return item ?? null;
  },

  async remove(id: string) {
    return (await db("items").where({ id }).del()) > 0;
  },
};
