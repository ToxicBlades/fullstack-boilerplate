// Load application environment variables before the shared logger is created.
import "dotenv/config";
import { logger } from "@project/logger";

/** biome-ignore lint/performance/noBarrelFile: logger is setuped here */
export { logger } from "@project/logger";

import { metricsHandler, metricsMiddleware } from "@project/analytics";
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
  cors({ credentials: true, origin: origins.length > 0 ? origins : true })
);
app.use(helmet());
app.use(
  pinoHttp({
    autoLogging: {
      // Prometheus scrapes frequently and does not need one log entry per scrape.
      ignore: (request) => request.url === "/metrics",
    },
    logger,
    serializers: {
      req: (request) => ({
        id: request.id,
        method: request.method,
        remoteAddress: request.remoteAddress,
        url: request.url,
      }),
      res: (response) => ({ statusCode: response.statusCode }),
    },
  })
);
app.get("/metrics", metricsHandler);
app.use(metricsMiddleware);
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
    aiProviderKeysSet: { openai: false },
    avatarUrl: session.user.image ?? null,
    createdAt: session.user.createdAt,
    email: session.user.email,
    fullName: session.user.name,
    id: session.user.id,
    legalAcceptances: {},
    timezone: "UTC",
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
