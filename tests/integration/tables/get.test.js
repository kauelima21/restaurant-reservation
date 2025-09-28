import { LOCAL_URL } from "../../../src/config.js";
import { CreateTable } from "../../../src/services/createTable.js";
import orchestrator from "../../orchestrator.js";

beforeAll(async () => {
  await orchestrator.clearTables();
});

describe("GET - Tables", () => {
  test("with valid input", async () => {
    const tablePayload = {
      name: "Table #1",
      capacity: 6,
    };

    await new CreateTable().execute(tablePayload);

    const response = await fetch(`${LOCAL_URL}/tables`);

    expect(response.status).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.tables.length).toBeGreaterThan(0);
  });
});
