import request from "supertest";
import { app } from "@/server";

describe("health endpoints", () => {
  it("returns the hello response", async () => {
    const response = await request(app).get("/api/hello");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Hello from project-back" });
  });

  it("reports unconfigured storage without contacting S3", async () => {
    const response = await request(app).get("/api/storage/health");

    expect(response.status).toBe(503);
    expect(response.body).toEqual({ configured: false, connected: false });
  });

  it("exposes Prometheus metrics", async () => {
    const response = await request(app).get("/metrics");

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain("text/plain");
    expect(response.text).toContain("app_process_cpu_user_seconds_total");
    expect(response.text).toContain("app_http_requests_total");
  });
});
