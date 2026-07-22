import { Router, type Router as RouterType } from "express";
import { db } from "../../db/knex.js";

export const itemsRouter: RouterType = Router();
itemsRouter.get("/", async (_req, res, next) => {
  try {
    res.json(
      await db("items")
        .select("id", "name", "created_at", "updated_at")
        .orderBy("created_at", "desc")
    );
  } catch (err) {
    next(err);
  }
});
itemsRouter.post("/", async (req, res, next) => {
  try {
    const [item] = await db("items")
      .insert({ name: req.body.name })
      .returning(["id", "name", "created_at", "updated_at"]);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
});
itemsRouter.patch("/:id", async (req, res, next) => {
  try {
    const [item] = await db("items")
      .where({ id: req.params.id })
      .update({ name: req.body.name, updated_at: db.fn.now() })
      .returning(["id", "name", "created_at", "updated_at"]);
    if (!item) {
      res.sendStatus(404);
      return;
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
});
itemsRouter.delete("/:id", async (req, res, next) => {
  try {
    const count = await db("items").where({ id: req.params.id }).del();
    res.sendStatus(count ? 204 : 404);
  } catch (err) {
    next(err);
  }
});
