import type { Request, RequestHandler } from "express";
import {
  DocumentIdSchema,
  PatchDocumentSchema,
  PresignDocumentSchema,
} from "./documents-model";
import { documentsService } from "./documents-service";

function userId(req: Request) {
  if (!req.user) {
    throw new Error("Unauthorized");
  }
  return req.user.id;
}

export const documentsController: Record<
  "list" | "presign" | "confirm" | "update" | "remove" | "downloadUrl",
  RequestHandler
> = {
  confirm: (async (req, res, next) => {
    try {
      const params = DocumentIdSchema.safeParse(req.params);
      if (!params.success) {
        res.sendStatus(400);
        return;
      }
      const document = await documentsService.confirm(
        userId(req),
        params.data.id
      );
      if (!document) {
        res.sendStatus(404);
        return;
      }
      res.json(document);
    } catch (error) {
      next(error);
    }
  }) satisfies RequestHandler,
  downloadUrl: (async (req, res, next) => {
    try {
      const params = DocumentIdSchema.safeParse(req.params);
      if (!params.success) {
        res.sendStatus(400);
        return;
      }
      const result = await documentsService.downloadUrl(
        userId(req),
        params.data.id
      );
      if (!result) {
        res.sendStatus(404);
        return;
      }
      res.json(result);
    } catch (error) {
      next(error);
    }
  }) satisfies RequestHandler,
  list: (async (req, res, next) => {
    try {
      res.json(await documentsService.list(userId(req)));
    } catch (error) {
      next(error);
    }
  }) satisfies RequestHandler,
  presign: (async (req, res, next) => {
    try {
      const body = PresignDocumentSchema.safeParse(req.body);
      if (!body.success) {
        res.status(400).json({ error: body.error.flatten() });
        return;
      }
      res.json(await documentsService.presign(userId(req), body.data));
    } catch (error) {
      next(error);
    }
  }) satisfies RequestHandler,
  remove: (async (req, res, next) => {
    try {
      const params = DocumentIdSchema.safeParse(req.params);
      if (!params.success) {
        res.sendStatus(400);
        return;
      }
      res.sendStatus(
        (await documentsService.remove(userId(req), params.data.id)) ? 204 : 404
      );
    } catch (error) {
      next(error);
    }
  }) satisfies RequestHandler,
  update: (async (req, res, next) => {
    try {
      const params = DocumentIdSchema.safeParse(req.params);
      const body = PatchDocumentSchema.safeParse(req.body);
      if (!(params.success && body.success)) {
        res.sendStatus(400);
        return;
      }
      const document = await documentsService.update(
        userId(req),
        params.data.id,
        body.data.title
      );
      if (!document) {
        res.sendStatus(404);
        return;
      }
      res.json(document);
    } catch (error) {
      next(error);
    }
  }) satisfies RequestHandler,
};
