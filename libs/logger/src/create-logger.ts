import pino, { type Logger, type LoggerOptions } from "pino";
import pretty from "pino-pretty";
import { envLogger } from "./env-config";
import {
  createLogRouter,
  type LogDestination,
  type LogRouter,
} from "./log-router";
import { createLokiDestination } from "./loki-destination";

export type CreateLoggerOptions = LoggerOptions & {
  destinations?: LogDestination[];
};

export function createConsoleDestination(): LogDestination {
  if (envLogger.NODE_ENV === "development" && process.stdout.isTTY) {
    return pretty({
      colorize: true,
      ignore: "pid,hostname",
      translateTime: "SYS:standard",
    });
  }

  return process.stdout;
}

export function createLogger(options: CreateLoggerOptions = {}): {
  addDestination: (destination: LogDestination) => void;
  logger: Logger;
  router: LogRouter;
} {
  const { destinations = [], ...pinoOptions } = options;
  const defaultDestinations: LogDestination[] = [createConsoleDestination()];
  if (envLogger.LOKI_URL) {
    defaultDestinations.push(
      createLokiDestination({
        batchIntervalMs: envLogger.LOKI_BATCH_INTERVAL_MS,
        labels: {
          environment: envLogger.NODE_ENV,
          service: pinoOptions.name ?? envLogger.LOG_NAME,
        },
        maxBatchSize: envLogger.LOKI_MAX_BATCH_SIZE,
        maxQueueSize: envLogger.LOKI_MAX_QUEUE_SIZE,
        password: envLogger.LOKI_PASSWORD,
        tenantId: envLogger.LOKI_TENANT_ID,
        url: envLogger.LOKI_URL,
        username: envLogger.LOKI_USERNAME,
      })
    );
  }
  const router = createLogRouter([...defaultDestinations, ...destinations]);

  const logger = pino(
    {
      level: envLogger.LOG_LEVEL,
      name: envLogger.LOG_NAME,
      ...pinoOptions,
    },
    router
  );

  return {
    addDestination: (destination) => {
      router.add(destination);
    },
    logger,
    router,
  };
}
