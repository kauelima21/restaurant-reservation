import database from "./../libs/database.js";

export class FindTable {
  async execute(tableInput) {
    const { rows } = await database.query({
      text: `
        SELECT name, capacity, status
        FROM tables
        WHERE id = $1;
      `,
      values: [tableInput.id],
    });

    return rows[0];
  }
}
