/** biome-ignore-all lint/performance/noBarrelFile: public analytics API */

import { createChildLogger } from "@project/logger";
import {
  Counter,
  collectDefaultMetrics,
  Histogram,
  Registry,
} from "@prometheus-io/client";
import type { NextFunction, Request, RequestHandler, Response } from "express";

export const metricsRegistry = new Registry();

collectDefaultMetrics({ prefix: "app_", register: metricsRegistry });

const analyticsEvents = new Counter({
  help: "Number of application analytics events",
  labelNames: ["event"] as const,
  name: "app_analytics_events_total",
  registers: [metricsRegistry],
});

const httpRequests = new Counter({
  help: "Number of HTTP requests",
  labelNames: ["method", "route", "status_code"] as const,
  name: "app_http_requests_total",
  registers: [metricsRegistry],
});

const httpDuration = new Histogram({
  buckets: [0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],
  help: "HTTP request duration in seconds",
  labelNames: ["method", "route", "status_code"] as const,
  name: "app_http_request_duration_seconds",
  registers: [metricsRegistry],
});

const analyticsLogger = createChildLogger("analytics");

export type AnalyticsProperties = Record<string, unknown>;

/** Records a low-cardinality metric and a searchable structured Loki event. */
export function trackEvent(
  event: string,
  properties: AnalyticsProperties = {}
): void {
  analyticsEvents.inc({ event });
  analyticsLogger.info({ ...properties, analytics: true, event }, event);
}

export const metricsHandler: RequestHandler = async (_request, response) => {
  response.setHeader("content-type", metricsRegistry.contentType);
  response.end(await metricsRegistry.metrics());
};

export function metricsMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const startedAt = process.hrtime.bigint();
  response.on("finish", () => {
    const route = request.route?.path
      ? `${request.baseUrl}${String(request.route.path)}`
      : "unmatched";
    const labels = {
      method: request.method,
      route,
      status_code: String(response.statusCode),
    };
    httpRequests.inc(labels);
    httpDuration.observe(
      labels,
      Number(process.hrtime.bigint() - startedAt) / 1e9
    );
  });
  next();
}

export { Counter, Gauge, Histogram } from "@prometheus-io/client";
