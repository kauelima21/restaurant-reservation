import { LOCAL_URL } from "../../../src/config.js";
import { CreateTable } from "../../../src/services/createTable.js";
import orchestrator from "../../orchestrator.js";

beforeEach(async () => {
  await orchestrator.clearDatabase();
});

describe("GET - Reservations", () => {
  describe("with authenticated user", () => {
    test("with valid input", async () => {
      const table = await new CreateTable().execute({
        name: "Table #1",
        capacity: 6,
      });

      const reservationPayload = {
        table_id: table.id,
        reserved_at: Date.now(),
      };

      const { accessToken } = await orchestrator.createAndAuthenticateUser();

      await fetch(`${LOCAL_URL}/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(reservationPayload),
      });

      const response = await fetch(`${LOCAL_URL}/reservations`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      expect(response.status).toBe(200);

      const responseBody = await response.json();
      expect(responseBody.reservations.length).toBeGreaterThan(0);
    });
  });

  describe("with unauthenticated user", () => {
    test("with valid input", async () => {
      const reservationPayload = {
        user_id: "user123",
        table_id: "table123",
        reserved_at: Date.now(),
      };

      const { accessToken } = "unreal token";

      const response = await fetch(`${LOCAL_URL}/reservations`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      expect(response.status).toBe(401);
    });
  });
});
