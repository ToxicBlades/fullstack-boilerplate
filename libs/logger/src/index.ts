/** biome-ignore-all lint/performance/noBarrelFile: public logger API */
import type { Bindings, Logger } from "pino";
import { createLogger } from "./create-logger";
import type { LogDestination } from "./log-router";

const { addDestination, logger, router } = createLogger();

export function addLogDestination(destination: LogDestination): void {
  addDestination(destination);
}

/** Sends any entries currently buffered by asynchronous destinations. */
export async function flushLogs(): Promise<void> {
  await router.flush();
}

export function createChildLogger(
  name: string,
  bindings: Bindings = {}
): Logger {
  return logger.child({ name, ...bindings });
}

export type { Logger } from "pino";
export type { CreateLoggerOptions } from "./create-logger";
export { createLogger } from "./create-logger";
export type { LogDestination, LogRouter } from "./log-router";
export { createLogRouter } from "./log-router";
export type { LokiDestinationOptions } from "./loki-destination";
export { createLokiDestination } from "./loki-destination";
export { logger };
