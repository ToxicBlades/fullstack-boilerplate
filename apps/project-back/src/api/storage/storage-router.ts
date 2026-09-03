import express, { type Router } from "express";
import { storageController } from "./storage-controller.js";

export const storageRouter: Router = express.Router();
storageRouter.get("/health", storageController.health);
storageRouter.get("/objects", storageController.list);
storageRouter.post("/presign-upload", storageController.presignUpload);
storageRouter.get("/presign-download", storageController.presignDownload);
storageRouter.put(
  "/objects/*",
  express.raw({ type: "*/*", limit: "25mb" }),
  storageController.upload
);
storageRouter.get("/objects/*", storageController.download);
storageRouter.delete("/objects/*", storageController.remove);
