import { logger } from "@project/logger";

/** biome-ignore lint/performance/noBarrelFile: logger is setuped here */
export { logger } from "@project/logger";

import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import pinoHttp from "pino-http";
import { documentsRouter } from "@/api/documents/documents-router";
import { storageRouter } from "@/api/storage/storage-router";
import { itemsRouter } from "@/api/v1/items/items-router";
import { auth } from "@/auth/auth";
import { env } from "@/config/env";

export const app: Express = express();

const origins = env.CORS_ORIGINS.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
app.use(
  cors({ origin: origins.length > 0 ? origins : true, credentials: true })
);
app.use(helmet());
app.use(pinoHttp({ logger }));
app.use(express.json());
app.get("/api/auth/me", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  if (!session?.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  res.json({
    id: session.user.id,
    email: session.user.email,
    fullName: session.user.name,
    avatarUrl: session.user.image ?? null,
    createdAt: session.user.createdAt,
    timezone: "UTC",
    aiProviderKeysSet: { openai: false },
    legalAcceptances: {},
  });
});
app.all("/api/auth/*", toNodeHandler(auth));

app.get("/api/hello", (_req, res) => {
  res.json({ message: "Hello from project-back" });
});
app.use("/api/items", itemsRouter);
app.use("/api/documents", documentsRouter);
app.use("/api/storage", storageRouter);

app.use((_req, res) => res.status(404).json({ error: "Not found" }));
