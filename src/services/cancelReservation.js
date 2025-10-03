import database from "../libs/database.js";

export class CancelReservation {
  async execute(cancelInput) {
    const { rows } = await database.query({
      text: `
        UPDATE reservations
        SET status = $3
        WHERE id = $1 AND user_id = $2
        RETURNING *;
      `,
      values: [cancelInput.reservationId, cancelInput.userId, "canceled"],
    });

    return rows;
  }
}
