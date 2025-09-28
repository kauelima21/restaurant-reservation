import { Table } from "../../../src/models/table.js";

describe("Create Table Model", () => {
  test("with valid input", () => {
    const tablePayload = {
      name: "table #1",
      capacity: 10,
      status: "available",
    };

    const table = new Table(tablePayload);

    expect(table.id).toBeDefined();

    expect(table).toEqual({
      id: table.id,
      name: tablePayload.name,
      capacity: tablePayload.capacity,
      status: tablePayload.status,
    });
  });

  test("with invalid status", () => {
    const tablePayload = {
      name: "table #1",
      capacity: 10,
      status: "done",
    };

    expect(() => new Table(tablePayload)).toThrow("Invalid status");
  });
});
