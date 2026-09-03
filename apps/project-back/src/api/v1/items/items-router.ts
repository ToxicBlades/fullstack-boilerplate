import express, { type Router } from "express";
import { itemsController } from "./items-controller";

export const itemsRouter: Router = express.Router();
itemsRouter.get("/", itemsController.list);
itemsRouter.post("/", itemsController.create);
itemsRouter.patch("/:id", itemsController.update);
itemsRouter.delete("/:id", itemsController.remove);
