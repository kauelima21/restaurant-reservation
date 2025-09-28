import { Table } from "../models/table.js";
import database from "./../libs/database.js";

export class CreateTable {
  async execute(tableInput) {
    const table = new Table(tableInput);

    const { rows } = await database.query({
      text: `
        INSERT INTO tables(name, capacity, status)
        VALUES ($1, $2, $3)
        RETURNING
          *;
      `,
      values: [table.name, table.capacity, table.status],
    });

    return rows[0];
  }
}
