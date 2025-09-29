import { LOCAL_URL } from "../../../src/config.js";
import { CreateTable } from "../../../src/services/createTable.js";
import orchestrator from "../../orchestrator.js";

beforeEach(async () => {
  await orchestrator.clearDatabase();
});

describe("POST - Reservations", () => {
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

      const response = await fetch(`${LOCAL_URL}/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(reservationPayload),
      });

      expect(response.status).toBe(201);

      const responseBody = await response.json();
      expect(responseBody.id).toBeTruthy();
    });

    test("with fulfilled table", async () => {
      const table = await new CreateTable().execute({
        name: "Table #2",
        capacity: 0,
      });

      const reservationPayload = {
        table_id: table.id,
        reserved_at: Date.now(),
      };

      const { accessToken } = await orchestrator.createAndAuthenticateUser();

      const response = await fetch(`${LOCAL_URL}/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(reservationPayload),
      });

      const responseBody = await response.json();
      expect(responseBody.message).toBe("Table is full");
    });

    test("with reserved table", async () => {
      const table = await new CreateTable().execute({
        name: "Table #3",
        capacity: 6,
        status: "reserved",
      });

      const reservationPayload = {
        table_id: table.id,
        reserved_at: Date.now(),
      };

      const { accessToken } = await orchestrator.createAndAuthenticateUser();

      const response = await fetch(`${LOCAL_URL}/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(reservationPayload),
      });

      const responseBody = await response.json();
      expect(responseBody.message).toBe("Table is unavailable");
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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(reservationPayload),
      });

      expect(response.status).toBe(401);
    });
  });
});
