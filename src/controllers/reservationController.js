import { CreateReservation } from "../services/createReservation.js";

export class ReservationController {
  static async createReservation(req, res) {
    const { body } = req;
    const { user } = req.metadata;

    try {
      const response = await new CreateReservation().execute({
        ...body,
        user_id: user.sub,
      });

      res.status(201).json({ id: response.id });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async fetchReservations(req, res) {
    res.status(200).json([]);
  }

  static async cancelReservation(req, res) {
    res.status(204).send();
  }
}
