import type { LogDestination } from "./log-router";

type Fetch = typeof globalThis.fetch;

export interface LokiDestinationOptions {
  batchIntervalMs?: number;
  fetch?: Fetch;
  labels?: Record<string, string>;
  maxBatchSize?: number;
  maxQueueSize?: number;
  password?: string;
  tenantId?: string;
  url: string;
  username?: string;
}

type LokiEntry = [timestamp: string, line: string];
const TRAILING_SLASH = /\/$/;

function createHeaders(
  tenantId: string,
  username: string,
  password: string
): Record<string, string> {
  const headers: Record<string, string> = {
    "content-type": "application/json",
  };
  if (tenantId) {
    headers["X-Scope-OrgID"] = tenantId;
  }
  if (username || password) {
    headers.authorization = `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;
  }
  return headers;
}

/**
 * Creates a non-blocking, batching destination for Loki's HTTP push API.
 * Failed batches are put back in the queue and retried on the next flush.
 */
export function createLokiDestination({
  batchIntervalMs = 1000,
  fetch: fetchImplementation = globalThis.fetch,
  labels = {},
  maxBatchSize = 100,
  maxQueueSize = 10_000,
  password = "",
  tenantId = "",
  url,
  username = "",
}: LokiDestinationOptions): LogDestination {
  const queue: LokiEntry[] = [];
  let droppedEntries = 0;
  let flushing: Promise<void> | undefined;
  let lastTimestamp = 0n;
  const pushUrl = `${url.replace(TRAILING_SLASH, "")}/loki/api/v1/push`;

  const flush = async (): Promise<void> => {
    if (flushing) {
      return flushing;
    }
    const batch = queue.splice(0, maxBatchSize);
    if (batch.length === 0) {
      return;
    }

    flushing = (async () => {
      if (droppedEntries > 0) {
        process.stderr.write(
          `[logger] dropped ${droppedEntries} log entries while the Loki queue was full\n`
        );
        droppedEntries = 0;
      }
      try {
        const response = await fetchImplementation(pushUrl, {
          body: JSON.stringify({
            streams: [{ stream: labels, values: batch }],
          }),
          headers: createHeaders(tenantId, username, password),
          method: "POST",
        });
        if (!response.ok) {
          throw new Error(`Loki returned HTTP ${response.status}`);
        }
      } catch (error) {
        queue.unshift(...batch);
        process.stderr.write(
          `[logger] could not send logs to Loki: ${error instanceof Error ? error.message : String(error)}\n`
        );
      } finally {
        flushing = undefined;
      }
    })();

    await flushing;
  };

  const timer = setInterval(() => {
    flush().catch((error: unknown) => {
      process.stderr.write(`[logger] Loki flush failed: ${String(error)}\n`);
    });
  }, batchIntervalMs);
  timer.unref();

  return {
    flush,
    write(line) {
      // Loki expects nanoseconds expressed as a string. Date.now() has millisecond
      // precision, so increment duplicate timestamps to preserve entry ordering.
      const now = BigInt(Date.now()) * 1_000_000n;
      lastTimestamp = now > lastTimestamp ? now : lastTimestamp + 1n;
      if (queue.length >= maxQueueSize) {
        queue.shift();
        droppedEntries += 1;
      }
      queue.push([String(lastTimestamp), line.trimEnd()]);
      if (queue.length >= maxBatchSize) {
        flush().catch((error: unknown) => {
          process.stderr.write(
            `[logger] Loki flush failed: ${String(error)}\n`
          );
        });
      }
    },
  };
}
