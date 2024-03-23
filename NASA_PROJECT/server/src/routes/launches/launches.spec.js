const request = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");

describe("Launches API", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe("Test GET /launches", () => {
    test("it should respond with 200 success", async () => {
      const response = await request(app)
        .get("/launches")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("Test POST /launches", () => {
    const completeLauchData = {
      mission: "USS Enterprise",
      rocket: "NCC 1701-D",
      target: "Kepler-62 f",
      launchDate: "january 4, 2028",
    };

    const lauchDataWithoutDate = {
      mission: "USS Enterprise",
      rocket: "NCC 1701-D",
      target: "Kepler-62 f",
    };

    const launchDateWithInvalidDate = {
      mission: "USS Enterprise",
      rocket: "NCC 1701-D",
      target: "Kepler-62 f",
      launchDate: "hootoo",
    };

    test("it should respond with 201 created", async () => {
      const response = await request(app)
        .post("/launches")
        .send(completeLauchData)
        .expect("Content-Type", /json/)
        .expect(201);

      const requestDate = new Date(completeLauchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate.valueOf());
      expect(requestDate).toBe(responseDate);

      expect(response.body).toMatchObject(lauchDataWithoutDate);
    });

    test("it should catch missing required properties!", async () => {
      const response = await request(app)
        .post("/launches")
        .send(lauchDataWithoutDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "missing required launch property",
      });
    });
    test("it should catch invalid launch date", async () => {
      const response = await request(app)
        .post("/launches")
        .send(launchDateWithInvalidDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "invalid launch date",
      });
    });
  });
});
