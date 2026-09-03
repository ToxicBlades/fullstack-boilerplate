import type { Request, RequestHandler } from "express";
import {
  ObjectKeyQuerySchema,
  PresignUploadBodySchema,
} from "./storage-model.js";
import { storageService } from "./storage-service.js";

function wildcardKey(req: Request): string {
  return String((req.params as Record<string, string>)["0"] ?? "");
}

class StorageController {
  health: RequestHandler = async (_req, res) => {
    if (!storageService.isConfigured()) {
      res.status(503).json({ configured: false, connected: false });
      return;
    }
    try {
      await storageService.checkConnection();
      res.json({ configured: true, connected: true });
    } catch {
      res.status(503).json({ configured: true, connected: false });
    }
  };

  list: RequestHandler = async (req, res, next) => {
    try {
      res.json(await storageService.list(String(req.query.prefix ?? "")));
    } catch (error) {
      next(error);
    }
  };

  presignUpload: RequestHandler = async (req, res, next) => {
    try {
      const body = PresignUploadBodySchema.safeParse(req.body);
      if (!body.success) {
        res.status(400).json({ error: body.error.flatten() });
        return;
      }
      res.json({
        key: body.data.key,
        uploadUrl: await storageService.presignUpload(
          body.data.key,
          body.data.contentType
        ),
      });
    } catch (error) {
      next(error);
    }
  };

  presignDownload: RequestHandler = async (req, res, next) => {
    try {
      const query = ObjectKeyQuerySchema.safeParse(req.query);
      if (!query.success) {
        res.status(400).json({ error: query.error.flatten() });
        return;
      }
      res.json({
        key: query.data.key,
        downloadUrl: await storageService.presignDownload(query.data.key),
      });
    } catch (error) {
      next(error);
    }
  };

  upload: RequestHandler = async (req, res, next) => {
    try {
      const key = wildcardKey(req);
      await storageService.upload(
        key,
        Buffer.isBuffer(req.body) ? req.body : Buffer.alloc(0),
        req.header("content-type") ?? undefined
      );
      res.status(201).json({ key });
    } catch (error) {
      next(error);
    }
  };

  download: RequestHandler = async (req, res, next) => {
    try {
      const object = await storageService.download(wildcardKey(req));
      res.type(object.ContentType ?? "application/octet-stream");
      if (object.ContentLength !== undefined) {
        res.set("Content-Length", String(object.ContentLength));
      }
      if (object.Body) {
        res.send(await object.Body.transformToByteArray());
        return;
      }
      res.sendStatus(404);
    } catch (error) {
      next(error);
    }
  };

  remove: RequestHandler = async (req, res, next) => {
    try {
      await storageService.remove(wildcardKey(req));
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };
}

export const storageController = new StorageController();
