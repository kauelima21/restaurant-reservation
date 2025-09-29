import { randomUUID } from "node:crypto";

export class Reservation {
  constructor(reservationPayload) {
    this.id = reservationPayload.id ?? randomUUID();
    this.user_id = reservationPayload.user_id;
    this.table_id = reservationPayload.table_id;
    this.reserved_at = reservationPayload.reserved_at;
    this.status = reservationPayload.status ?? "active";

    if (!this.verifyStatus(this.status)) {
      throw new Error("Invalid status");
    }
  }

  verifyStatus(status) {
    const availableStatus = ["active", "canceled"];
    return availableStatus.includes(status);
  }
}
