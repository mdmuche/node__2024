const request = require("supertest");
const app = require("../../app");

describe("Test GET /launches", () => {
  test("it should respond with 200 success", async () => {
    const response = await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("Test POST /launches", () => {
  test("it should respond with 200 success", () => {});

  test("it should catch missing require properties!", () => {});
  test("it should catch invalid launch date", () => {});
});
