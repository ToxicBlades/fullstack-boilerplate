import { logger } from "@project/logger";

/** biome-ignore lint/performance/noBarrelFile: logger is setuped here */
export { logger } from "@project/logger";

import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import pinoHttp from "pino-http";
import { storageRouter } from "@/api/storage/storage-router.js";
import { itemsRouter } from "@/api/v1/items/items-router.js";
import { auth } from "@/auth/auth.js";
import { env } from "@/config/env.js";

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
app.all("/api/auth/*", toNodeHandler(auth));

app.get("/api/hello", (_req, res) => {
  res.json({ message: "Hello from project-back" });
});
app.use("/api/items", itemsRouter);
app.use("/api/storage", storageRouter);

app.use((_req, res) => res.status(404).json({ error: "Not found" }));
