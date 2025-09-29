import { Reservation } from "../models/reservation.js";
import database from "./../libs/database.js";

export class CreateReservation {
  async execute(reservationInput) {
    const reservation = new Reservation(reservationInput);

    const { rows: tableRows } = await database.query({
      text: `
        SELECT capacity, status
        FROM tables
        WHERE id = $1;
      `,
      values: [reservation.table_id],
    });
    const tableCapacity = tableRows[0].capacity;

    if (
      tableRows[0].status === "reserved" ||
      tableRows[0].status === "inactive"
    ) {
      throw new Error("Table is unavailable");
    }

    const { rows: reservationRows } = await database.query({
      text: `
        SELECT COUNT(id)
        FROM reservations
        WHERE table_id = $1;
      `,
      values: [reservation.table_id],
    });
    const totalReservations = reservationRows[0].count;

    if (totalReservations >= tableCapacity) {
      throw new Error("Table is full");
    }

    const { rows } = await database.query({
      text: `
        INSERT INTO reservations(user_id, table_id, status)
        VALUES ($1, $2, $3)
        RETURNING
          *;
      `,
      values: [reservation.user_id, reservation.table_id, reservation.status],
    });

    return rows[0];
  }
}
