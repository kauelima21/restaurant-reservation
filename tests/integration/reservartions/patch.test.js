import { LOCAL_URL } from "../../../src/config.js";
import { CreateTable } from "../../../src/services/createTable.js";
import orchestrator from "../../orchestrator.js";

beforeEach(async () => {
  await orchestrator.clearDatabase();
});

describe("PATCH - Reservations", () => {
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

      const responsePost = await fetch(`${LOCAL_URL}/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(reservationPayload),
      });
      const responsePostBody = await responsePost.json();
      const id = responsePostBody.id;

      const response = await fetch(`${LOCAL_URL}/reservations/${id}/cancel`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      expect(response.status).toBe(204);

      const responseGet = await fetch(`${LOCAL_URL}/reservations`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseBody = await responseGet.json();
      const reservation = responseBody.reservations.find(
        (res) => res.id === id
      );
      expect(reservation.status).toBe("canceled");
    });

    test("with user that did not create the reservation", async () => {
      const table = await new CreateTable().execute({
        name: "Table #1",
        capacity: 6,
      });

      const reservationPayload = {
        table_id: table.id,
        reserved_at: Date.now(),
      };

      const { accessToken } = await orchestrator.createAndAuthenticateUser();

      const responsePost = await fetch(`${LOCAL_URL}/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(reservationPayload),
      });
      const responsePostBody = await responsePost.json();
      const id = responsePostBody.id;

      const newUser = await orchestrator.createAndAuthenticateUser();

      const response = await fetch(`${LOCAL_URL}/reservations/${id}/cancel`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${newUser.accessToken}`,
        },
      });

      expect(response.status).toBe(204);

      const responseGet = await fetch(`${LOCAL_URL}/reservations`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseBody = await responseGet.json();
      const reservation = responseBody.reservations.find(
        (res) => res.id === id
      );
      expect(reservation.status).toBe("active");
    });
  });

  describe("with unauthenticated user", () => {
    test("with valid input", async () => {
      const { accessToken } = "unreal token";

      const response = await fetch(`${LOCAL_URL}/reservations/id/cancel`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      expect(response.status).toBe(401);
    });
  });
});
