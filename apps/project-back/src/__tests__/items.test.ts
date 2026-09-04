import request from "supertest";
import { db } from "@/db/knex";
import { app } from "@/server";

describe("items CRUD", () => {
  beforeAll(async () => {
    await db.migrate.latest();
    await db("items").del();
  });

  afterAll(async () => {
    await db.destroy();
  });

  it("rejects an empty item name", async () => {
    const response = await request(app).post("/api/items").send({ name: " " });

    expect(response.status).toBe(400);
  });

  it("creates, reads, updates, and deletes an item", async () => {
    const created = await request(app)
      .post("/api/items")
      .send({ name: "First item" });
    expect(created.status).toBe(201);
    const id = created.body.id;
    expect((await request(app).get("/api/items")).body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id, name: "First item" }),
      ])
    );
    expect(
      (
        await request(app)
          .patch(`/api/items/${id}`)
          .send({ name: "Updated item" })
      ).body.name
    ).toBe("Updated item");
    expect((await request(app).delete(`/api/items/${id}`)).status).toBe(204);

    const metrics = await request(app).get("/metrics");
    expect(metrics.text).toContain(
      'app_analytics_events_total{event="item_created"} 1'
    );
    expect(metrics.text).toContain(
      'app_analytics_events_total{event="item_deleted"} 1'
    );
  });
});
