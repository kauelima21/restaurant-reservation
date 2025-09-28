import { LOCAL_URL } from "../../../src/config.js";
import orchestrator from "../../orchestrator.js";
import { CreateUser } from "../../../src/services/createUser.js";

beforeAll(async () => {
  await orchestrator.clearDatabase();
});

describe("POST - Sign In", () => {
  test("with valid input", async () => {
    const userPayload = {
      name: "User SigIn",
      email: "user.signin@email.com",
      password: "pass123456",
      role: "admin",
    };

    await new CreateUser().execute(userPayload);

    const response = await fetch(`${LOCAL_URL}/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userPayload.email,
        password: userPayload.password,
      }),
    });

    expect(response.status).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.accessToken).toBeTruthy();
  });
});
