import { LOCAL_URL } from "../../../src/config.js";
import { CreateTable } from "../../../src/services/createTable.js";
import orchestrator from "../../orchestrator.js";

beforeEach(async () => {
  await orchestrator.clearDatabase();
});

describe("GET - Tables", () => {
  describe("with authenticated user", () => {
    test("with valid input", async () => {
      const tablePayload = {
        name: "Table #1",
        capacity: 6,
      };

      await new CreateTable().execute(tablePayload);

      const { accessToken } = await orchestrator.createAndAuthenticateUser();

      const response = await fetch(`${LOCAL_URL}/tables`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(responseBody.tables.length).toBeGreaterThan(0);
    });
  });

  describe("with unauthenticated user", () => {
    test("with valid input", async () => {
      const tablePayload = {
        name: "Table #1",
        capacity: 6,
      };

      await new CreateTable().execute(tablePayload);

      const accessToken = "unreal token";

      const response = await fetch(`${LOCAL_URL}/tables`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      expect(response.status).toBe(401);
    });
  });
});
