import { randomUUID } from "node:crypto";

export class User {
  constructor(userPayload) {
    if (!this.verifyEmail(userPayload.email)) {
      throw new Error("Invalid email");
    }

    if (!this.verifyPassword(userPayload.password)) {
      throw new Error("Invalid password");
    }

    this.id = userPayload.id ?? randomUUID();
    this.name = userPayload.name;
    this.email = userPayload.email;
    this.password = userPayload.password;
    this.role = userPayload.role;
  }

  verifyEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  verifyPassword(password) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  }
}
