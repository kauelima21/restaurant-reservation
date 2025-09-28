import bcrypt from "bcryptjs";
import { User } from "../models/user.js";
import database from "./../libs/database.js";

export class CreateUser {
  async execute(userInput) {
    const user = new User(userInput);
    user.password = await bcrypt.hash(user.password, 10);

    const { rows } = await database.query({
      text: `
        INSERT INTO users(name, email, password, role)
        VALUES ($1, $2, $3, $4)
        RETURNING
          *;
      `,
      values: [user.name, user.email, user.password, user.role],
    });

    return rows[0];
  }
}
