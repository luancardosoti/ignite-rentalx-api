import request from "supertest";

import { app } from "../../../../shared/infra/http/app";

describe("Create Category Controller", () => {
  it("get cars available", async () => {
    await request(app).get("/cars/available").expect(200);
  });
});
