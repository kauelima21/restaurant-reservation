import { Reservation } from "../../../src/models/reservation.js";

describe("Create Reservation Model", () => {
  test("with valid input", () => {
    const reservationPayload = {
      user_id: "user123",
      table_id: "table123",
      reserved_at: Date.now(),
    };

    const reservation = new Reservation(reservationPayload);

    expect(reservation.id).toBeDefined();

    expect(reservation).toEqual({
      id: reservation.id,
      user_id: reservationPayload.user_id,
      table_id: reservationPayload.table_id,
      reserved_at: reservationPayload.reserved_at,
      status: reservation.status,
    });
  });

  test("with invalid status", () => {
    const reservationPayload = {
      user_id: "user123",
      table_id: "table123",
      reserved_at: Date.now(),
      status: "done",
    };

    expect(() => new Reservation(reservationPayload)).toThrow("Invalid status");
  });
});
