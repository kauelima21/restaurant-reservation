import { randomUUID } from "node:crypto";

export class Table {
  constructor(tablePayload) {
    this.id = tablePayload.id ?? randomUUID();
    this.name = tablePayload.name;
    this.capacity = tablePayload.capacity;
    this.status = tablePayload.status ?? "available";

    if (!this.verifyStatus(this.status)) {
      throw new Error("Invalid status");
    }
  }

  verifyStatus(status) {
    const availableStatus = ["available", "reserved", "inactive"];
    return availableStatus.includes(status);
  }
}
