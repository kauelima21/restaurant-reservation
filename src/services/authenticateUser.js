import bcrypt from "bcryptjs";
import database from "../libs/database.js";
import jsonwebtoken from "jsonwebtoken";

export class AuthenticateUser {
  async execute(userInput) {
    const { rows } = await database.query({
      text: `SELECT id, email, password, role FROM users WHERE email = $1`,
      values: [userInput.email],
    });

    const user = rows[0];

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const doesPasswordMatch = await bcrypt.compare(
      userInput.password,
      user.password
    );

    if (!doesPasswordMatch) {
      throw new Error("Invalid credentials");
    }

    const accessToken = jsonwebtoken.sign(
      { sub: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return { accessToken };
  }
}
