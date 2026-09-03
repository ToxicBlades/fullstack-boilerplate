"use server";

import { itemsService } from "@project/services/server";
import type { CreateItemBody } from "@project/services";
import { sessionOptions } from "../../auth/lib/session-options";

export async function saveItem(name: string, id?: string) {
  const options = await sessionOptions();
  return id
    ? itemsService.patch(id, { name }, options)
    : itemsService.create(
        { name, id: crypto.randomUUID() } as unknown as CreateItemBody,
        options
      );
}
export async function deleteItem(id: string) {
  return itemsService.remove(id, await sessionOptions());
}
