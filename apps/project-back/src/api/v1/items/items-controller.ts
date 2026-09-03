import type { RequestHandler } from "express";
import {
  CreateItemBodySchema,
  ItemIdParamsSchema,
  PatchItemBodySchema,
} from "./items-model";
import { itemsService } from "./items-service";

class ItemsController {
  list: RequestHandler = async (_req, res, next) => {
    try {
      res.json(await itemsService.list());
    } catch (error) {
      next(error);
    }
  };

  create: RequestHandler = async (req, res, next) => {
    try {
      const body = CreateItemBodySchema.safeParse(req.body);
      if (!body.success) {
        res.status(400).json({ error: body.error.flatten() });
        return;
      }
      res.status(201).json(await itemsService.create(body.data.name));
    } catch (error) {
      next(error);
    }
  };

  update: RequestHandler = async (req, res, next) => {
    try {
      const params = ItemIdParamsSchema.safeParse(req.params);
      const body = PatchItemBodySchema.safeParse(req.body);
      if (!(params.success && body.success)) {
        res.status(400).json({ error: "Invalid item request" });
        return;
      }
      const item = await itemsService.update(params.data.id, body.data.name);
      if (!item) {
        res.sendStatus(404);
        return;
      }
      res.json(item);
    } catch (error) {
      next(error);
    }
  };

  remove: RequestHandler = async (req, res, next) => {
    try {
      const params = ItemIdParamsSchema.safeParse(req.params);
      if (!params.success) {
        res.status(400).json({ error: "Invalid item id" });
        return;
      }
      res.sendStatus((await itemsService.remove(params.data.id)) ? 204 : 404);
    } catch (error) {
      next(error);
    }
  };
}

export const itemsController = new ItemsController();
