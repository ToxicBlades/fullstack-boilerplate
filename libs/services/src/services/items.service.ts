import { BACK_API_ROUTES } from "../api-routes/back-api-routes";
import type { CreateItemBody, Item, PatchItemBody } from "../types/items";
import BaseService, { type BaseRequestOptions } from "./common/base.service";
import type { StandardResponse } from "./common/response.service";

class ItemsService extends BaseService {
  private base() {
    return BACK_API_ROUTES.ITEMS;
  }

  list(options?: BaseRequestOptions): Promise<StandardResponse<Item[]>> {
    return this.request<Item[]>("GET", this.base(), options);
  }

  create(
    body: CreateItemBody,
    options?: BaseRequestOptions
  ): Promise<StandardResponse<Item>> {
    return this.request<Item>("POST", this.base(), { ...options, body });
  }

  patch(
    id: string,
    body: PatchItemBody,
    options?: BaseRequestOptions
  ): Promise<StandardResponse<Item>> {
    return this.request<Item>("PATCH", `${this.base()}/${id}`, {
      ...options,
      body,
    });
  }

  remove(
    id: string,
    options?: BaseRequestOptions
  ): Promise<StandardResponse<{ id: string }>> {
    return this.request<{ id: string }>(
      "DELETE",
      `${this.base()}/${id}`,
      options
    );
  }
}

export const itemsService = new ItemsService();
