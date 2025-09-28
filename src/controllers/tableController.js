import { CreateTable } from "../services/createTable.js";
import { DeleteTable } from "../services/deleteTable.js";
import { EditTable } from "../services/editTable.js";
import { FetchTables } from "../services/fetchTables.js";
import { FindTable } from "../services/findTable.js";

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

  static async editTable(req, res) {
    const { id } = req.params;
    const { body } = req;

    const table = new FindTable().execute({ id });

    await new EditTable().execute({ id, ...table, ...body });

    res.status(204).send();
  }

  static async deleteTable(req, res) {
    const { id } = req.params;

    await new DeleteTable().execute({ id });

    res.status(204).send();
  }
}
