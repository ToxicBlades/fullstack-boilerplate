"use server";

import type { CreateItemBody } from "@project/services";
import { itemsService } from "@project/services/server";
import { sessionOptions } from "../../auth/lib/session-options";

export async function saveItem(name: string, id?: string) {
  const options = await sessionOptions();
  return id
    ? itemsService.patch(id, { name }, options)
    : itemsService.create(
        { id: crypto.randomUUID(), name } as unknown as CreateItemBody,
        options
      );
}
export async function deleteItem(id: string) {
  return itemsService.remove(id, await sessionOptions());
}
