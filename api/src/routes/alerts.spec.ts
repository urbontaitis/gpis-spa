import * as request from "supertest";
import app from "../app";

describe("Test alerts API endpoinrs", () => {
  it("It should response the GET method", async () => {
    const response = await request(app).get("/api/alerts");
    expect(response.statusCode).toBe(200);
  });
  it("It should response with english alert", async () => {
    const response = await request(app).get("/api/alerts?lang=en");
    expect(response.body.alerts[0].title).toBe("Message");
  });
  it("It should response with lithuanian alert", async () => {
    const response = await request(app).get("/api/alerts?lang=lt");
    expect(response.body.alerts[0].title).toBe("Pranešimas");
  });
  it("It should response with russian alert", async () => {
    const response = await request(app).get("/api/alerts?lang=ru");
    expect(response.body.alerts[0].title).toBe("Cообщениe");
  });
});
