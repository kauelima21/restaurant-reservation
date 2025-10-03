import database from "../libs/database.js";

export class FetchReservations {
  async execute(reservationInput) {
    // TODO: add table name
    const { rows } = await database.query({
      text: `
        SELECT id, reserved_at, status
        FROM reservations
        WHERE user_id = $1;
      `,
      values: [reservationInput.user_id],
    });

    return rows;
  }
}
