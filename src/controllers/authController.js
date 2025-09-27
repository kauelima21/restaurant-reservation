import { CreateUser } from "../services/createUser.js";
import { AuthenticateUser } from "../services/authenticateUser.js";

export class AuthController {
  static async signUp(req, res) {
    const { body } = req;

    const response = await new CreateUser().execute(body);

    res.status(201).json({ id: response.id });
  }

  static async signIn(req, res) {
    const { body } = req;

    const response = await new AuthenticateUser().execute(body);

    res.status(200).json(response);
  }
}
