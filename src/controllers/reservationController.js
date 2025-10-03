import { CancelReservation } from "../services/cancelReservation.js";
import { CreateReservation } from "../services/createReservation.js";
import { FetchReservations } from "../services/fetchReservations.js";

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
    const { user } = req.metadata;

    const reservations = await new FetchReservations().execute({
      user_id: user.sub,
    });

    res.status(200).json({ reservations });
  }

  static async cancelReservation(req, res) {
    const { id: reservationId } = req.params;
    const { user } = req.metadata;

    await new CancelReservation().execute({
      userId: user.sub,
      reservationId,
    });

    res.status(204).send();
  }
}
