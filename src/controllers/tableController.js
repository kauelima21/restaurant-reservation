import { CreateTable } from "../services/createTable.js";
import { FetchTables } from "../services/fetchTables.js";

export class TableController {
  static async fetchTables(req, res) {
    const tables = await new FetchTables().execute();

    res.status(200).json({ tables });
  }

  static async createTable(req, res) {
    const { body } = req;

    const response = await new CreateTable().execute(body);

    res.status(201).json({ id: response.id });
  }
}
