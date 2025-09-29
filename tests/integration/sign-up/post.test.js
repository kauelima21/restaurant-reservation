import { LOCAL_URL } from "../../../src/config.js";
import orchestrator from "../../orchestrator.js";

beforeEach(async () => {
  await orchestrator.clearDatabase();
});

describe("POST - Sign Up", () => {
  test("with valid input", async () => {
    const userPayload = {
      name: "John Doe",
      email: "john.doe@email.com",
      password: "pass12345678",
      role: "admin",
    };

    const response = await fetch(`${LOCAL_URL}/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userPayload),
    });

    expect(response.status).toBe(201);

    const responseBody = await response.json();
    expect(responseBody.id).toBeTruthy();
  });
});
