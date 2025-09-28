import database from "../libs/database.js";

export class DeleteTable {
  async execute(tableInput) {
    const { rows } = await database.query({
      text: `
        DELETE FROM tables
        WHERE id = $1;
      `,
      values: [tableInput.id],
    });

    return rows[0];
  }
}
