import { User } from "../../../src/models/user.js";

describe("Create User Model", () => {
  test("with valid input", () => {
    const userPayload = {
      name: "John Doe",
      email: "john.doe@email.com",
      password: "pass12345678",
      role: "admin",
    };

    const user = new User(userPayload);

    expect(user.id).toBeDefined();

    expect(user).toEqual({
      id: user.id,
      name: userPayload.name,
      email: userPayload.email,
      password: user.password,
      role: userPayload.role,
    });
  });

  test("with invalid email", () => {
    const userPayload = {
      name: "John Doe",
      email: "john.doe",
      password: "12345678",
      role: "admin",
    };

    expect(() => new User(userPayload)).toThrow("Invalid email");
  });

  test("with invalid password", () => {
    const userPayload = {
      name: "John Doe",
      email: "john.doe@email.com",
      password: "123456",
      role: "admin",
    };

    expect(() => new User(userPayload)).toThrow("Invalid password");
  });
});
