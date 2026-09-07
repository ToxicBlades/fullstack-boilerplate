import { trackEvent } from "@project/analytics";
import { db } from "@/db/knex";
import { ItemSelectColumns } from "./items-model";

export const itemsService = {
  async create(name: string) {
    const [item] = await db("items")
      .insert({ name })
      .returning(ItemSelectColumns as unknown as string[]);
    trackEvent("item_created", { itemId: item.id });
    return item;
  },
  list() {
    return db("items")
      .select(...ItemSelectColumns)
      .orderBy("created_at", "desc");
  },

  async remove(id: string) {
    const removed = (await db("items").where({ id }).del()) > 0;
    if (removed) {
      trackEvent("item_deleted", { itemId: id });
    }
    return removed;
  },

  async update(id: string, name: string) {
    const [item] = await db("items")
      .where({ id })
      .update({ name, updated_at: db.fn.now() })
      .returning(ItemSelectColumns as unknown as string[]);
    return item ?? null;
  },
};
