import * as request from "supertest";
import app from "../app";

describe("Parse data from GPIS website", () => {
  it("should parse data", async () => {
    const response = await request(app).get("/api/alerts/data");
    expect(response.statusCode).toBe(200);
  });
});
