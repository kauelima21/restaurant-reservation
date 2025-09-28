import { LOCAL_URL } from "../../../src/config.js";
import orchestrator from "../../orchestrator.js";

beforeAll(async () => {
  await orchestrator.clearTables();
});

describe("POST - Tables", () => {
  test("with valid input", async () => {
    const tablePayload = {
      name: "Table #1",
      capacity: 6,
    };

    const response = await fetch(`${LOCAL_URL}/tables`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tablePayload),
    });

    expect(response.status).toBe(201);

    const responseBody = await response.json();
    expect(responseBody.id).toBeTruthy();
  });
});
