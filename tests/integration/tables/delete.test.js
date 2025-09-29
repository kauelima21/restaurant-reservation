import { LOCAL_URL } from "../../../src/config.js";
import { CreateTable } from "../../../src/services/createTable.js";
import orchestrator from "../../orchestrator.js";

beforeEach(async () => {
  await orchestrator.clearDatabase();
});

describe("DELETE - Tables", () => {
  describe("with authenticated user", () => {
    test("with valid input", async () => {
      const tablePayload = {
        name: "Table #1",
        capacity: 6,
      };

      const { id } = await new CreateTable().execute(tablePayload);

      const { accessToken } = await orchestrator.createAndAuthenticateUser({
        role: "admin",
      });

      const response = await fetch(`${LOCAL_URL}/tables/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      expect(response.status).toBe(204);
    });
  });

  describe("with unauthenticated user", () => {
    test("with valid input", async () => {
      const tablePayload = {
        name: "Table #1",
        capacity: 6,
      };

      const { id } = await new CreateTable().execute(tablePayload);

      const { accessToken } = "unreal token";

      const response = await fetch(`${LOCAL_URL}/tables/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
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

      const { id } = await new CreateTable().execute(tablePayload);

      const { accessToken } = await orchestrator.createAndAuthenticateUser({
        role: "customer",
      });

      const response = await fetch(`${LOCAL_URL}/tables/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      expect(response.status).toBe(403);
    });
  });
});
