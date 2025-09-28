import { Table } from "../models/table.js";
import database from "./../libs/database.js";

export class EditTable {
  async execute(tableInput) {
    const table = new Table(tableInput);

    const { rows } = await database.query({
      text: `
        UPDATE tables
        SET name = $2, capacity = $3, status = $4
        WHERE id = $1
        RETURNING *;
      `,
      values: [table.id, table.name, table.capacity, table.status],
    });

    return rows[0];
  }
}
