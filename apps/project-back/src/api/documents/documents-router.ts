import express, { type Router } from "express";
import { requireAuth } from "@/common/middleware/auth";
import { documentsController } from "./documents-controller";

export const documentsRouter: Router = express.Router();
documentsRouter.use(requireAuth);
documentsRouter.get("/", documentsController.list);
documentsRouter.post("/presign", documentsController.presign);
documentsRouter.post("/:id/confirm", documentsController.confirm);
documentsRouter.patch("/:id", documentsController.update);
documentsRouter.delete("/:id", documentsController.remove);
documentsRouter.get("/:id/download-url", documentsController.downloadUrl);
