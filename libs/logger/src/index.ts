/** biome-ignore-all lint/performance/noBarrelFile: public logger API */
import type { Bindings, Logger } from "pino";
import { createLogger } from "./create-logger";
import type { LogDestination } from "./log-router";

const { addDestination, logger } = createLogger({ name: "main" });

export function addLogDestination(destination: LogDestination): void {
  addDestination(destination);
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
export { logger };
