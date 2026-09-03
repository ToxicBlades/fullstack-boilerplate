import request from "supertest";
import { app } from "@/server";

describe("storage request validation", () => {
  it("rejects an invalid presigned upload request", async () => {
    const response = await request(app)
      .post("/api/storage/presign-upload")
      .send({ key: "../private.txt" });

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it("rejects a missing presigned download key", async () => {
    const response = await request(app).get("/api/storage/presign-download");

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });
});
