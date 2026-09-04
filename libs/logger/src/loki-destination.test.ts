import assert from "node:assert/strict";
import { test } from "node:test";
import { createLokiDestination } from "./loki-destination";

test("batches structured log lines for Loki", async () => {
  const requests: Array<{ body: string; url: string }> = [];
  const fetchMock: typeof fetch = (input, init) => {
    requests.push({ body: String(init?.body), url: String(input) });
    return Promise.resolve(new Response(undefined, { status: 204 }));
  };
  const destination = createLokiDestination({
    batchIntervalMs: 60_000,
    fetch: fetchMock,
    labels: { environment: "test", service: "project-back" },
    url: "http://loki:3100/",
  });

  destination.write('{"level":30,"msg":"hello"}\n');
  destination.write('{"level":30,"msg":"again"}\n');
  await destination.flush?.();

  assert.equal(requests.length, 1);
  assert.equal(requests[0]?.url, "http://loki:3100/loki/api/v1/push");
  const payload = JSON.parse(requests[0]?.body ?? "") as {
    streams: Array<{
      stream: Record<string, string>;
      values: [string, string][];
    }>;
  };
  assert.deepEqual(payload.streams[0]?.stream, {
    environment: "test",
    service: "project-back",
  });
  assert.equal(
    payload.streams[0]?.values[0]?.[1],
    '{"level":30,"msg":"hello"}'
  );
  assert.equal(
    payload.streams[0]?.values[1]?.[1],
    '{"level":30,"msg":"again"}'
  );
  assert.ok(
    BigInt(payload.streams[0]?.values[1]?.[0] ?? "0") >
      BigInt(payload.streams[0]?.values[0]?.[0] ?? "0")
  );
});
