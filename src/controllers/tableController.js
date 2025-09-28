import { CreateTable } from "../services/createTable.js";

export class TableController {
  static async createTable(req, res) {
    const { body } = req;

    const response = await new CreateTable().execute(body);

    res.status(201).json({ id: response.id });
  }
}
