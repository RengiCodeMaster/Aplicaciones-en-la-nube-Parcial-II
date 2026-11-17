import express, { type Request, type Response } from "express";

import { mongoRepository, type Repository } from "./repositories.js";
import {
  cancelReservation,
  createReservation,
  createUser,
  listReservations,
} from "./services.js";
import { createScheduleClient, type ScheduleClient, ScheduleUnavailableError } from "./service1Client.js";

export function createApp(
  repository: Repository = mongoRepository,
  scheduleClient: ScheduleClient = createScheduleClient(
    process.env.SERVICE_1_URL ?? "http://localhost:8000",
    Number(process.env.SERVICE_TIMEOUT_MS ?? 5000),
  ),
) {
  const app = express();
  app.use(express.json());
  app.use((_request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
    response.header("Access-Control-Allow-Headers", "Content-Type,x-user-id");
    if (_request.method === "OPTIONS") return response.sendStatus(204);
    return next();
  });

  app.get("/health", (_request: Request, response: Response) => {
    response.json({ status: "ok" });
  });

  app.post("/users", async (request: Request, response: Response) => {
    const { name, email } = request.body as { name?: string; email?: string };
    if (!name || !email) return response.status(400).json({ detail: "name y email son obligatorios" });
    const user = await createUser(repository, name, email);
    return response.status(201).json({ id: user._id.toString(), name: user.name, email: user.email });
  });

  app.post("/reservations", async (request: Request, response: Response) => {
    const { userId, scheduleId } = request.body as { userId?: string; scheduleId?: string };
    if (!userId || !scheduleId) {
      return response.status(400).json({ detail: "userId y scheduleId son obligatorios" });
    }
    try {
      await scheduleClient.verifySchedule(String(request.body.courtId ?? ""), scheduleId);
    } catch (error) {
      if (error instanceof ScheduleUnavailableError) {
        return response.status(503).json({ detail: error.message });
      }
      return response.status(502).json({ detail: "No se pudo validar el horario" });
    }
    const reservation = await createReservation(repository, userId, scheduleId);
    return response.status(201).json({ id: reservation._id.toString(), userId, scheduleId, status: reservation.status });
  });

  app.get("/users/:userId/reservations", async (request: Request, response: Response) => {
    const reservations = await listReservations(repository, String(request.params.userId));
    return response.json(reservations);
  });

  app.delete("/reservations/:reservationId", async (request: Request, response: Response) => {
    const userId = request.header("x-user-id");
    if (!userId) return response.status(401).json({ detail: "x-user-id es obligatorio" });
    const reservation = await cancelReservation(
      repository,
      String(request.params.reservationId),
      userId,
    );
    if (!reservation) return response.status(404).json({ detail: "Reserva no encontrada" });
    return response.json(reservation);
  });

  return app;
}
