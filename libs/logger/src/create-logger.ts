import pino, { type Logger, type LoggerOptions } from "pino";
import pretty from "pino-pretty";
import { envLogger } from "./env-config";
import {
  createLogRouter,
  type LogDestination,
  type LogRouter,
} from "./log-router";

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
  const router = createLogRouter([createConsoleDestination(), ...destinations]);

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
