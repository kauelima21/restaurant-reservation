import { LOCAL_URL } from "../../../src/config.js";
import orchestrator from "../../orchestrator.js";

beforeAll(async () => {
  await orchestrator.clearDatabase();
});

describe("POST - Tables", () => {
  describe("with authenticated user", () => {
    test("with valid input", async () => {
      const tablePayload = {
        name: "Table #1",
        capacity: 6,
      };

      const { accessToken } = await orchestrator.createAndAuthenticateUser({
        role: "admin",
      });

      const response = await fetch(`${LOCAL_URL}/tables`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(tablePayload),
      });

      expect(response.status).toBe(201);

      const responseBody = await response.json();
      expect(responseBody.id).toBeTruthy();
    });
  });

  describe("with unauthenticated user", () => {
    test("with valid input", async () => {
      const tablePayload = {
        name: "Table #1",
        capacity: 6,
      };

      const { accessToken } = "unreal token";

      const response = await fetch(`${LOCAL_URL}/tables`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(tablePayload),
      });

      expect(response.status).toBe(401);
    });
  });

  describe("with unauthorized user role", () => {
    test("with valid input", async () => {
      const tablePayload = {
        name: "Table #1",
        capacity: 6,
      };

      const { accessToken } = await orchestrator.createAndAuthenticateUser({
        role: "customer",
      });

      const response = await fetch(`${LOCAL_URL}/tables`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(tablePayload),
      });

      expect(response.status).toBe(403);
    });
  });
});
