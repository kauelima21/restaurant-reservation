import database from "../libs/database.js";

export class FetchTables {
  async execute() {
    const { rows } = await database.query({
      text: `
        SELECT id, name, capacity, status FROM tables;
      `,
    });

    return rows;
  }
}
