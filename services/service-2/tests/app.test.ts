import request from "supertest";
import { describe, expect, it } from "vitest";

import { createApp } from "../src/app.js";
import type { Repository, ReservationRecord, UserRecord } from "../src/repositories.js";
import { ScheduleUnavailableError, type ScheduleClient } from "../src/service1Client.js";

function memoryRepository(): Repository {
  const users: UserRecord[] = [];
  const reservations: ReservationRecord[] = [];
  return {
    async createUser(name, email) {
      const user = { _id: "user-1", name, email };
      users.push(user);
      return user;
    },
    async listUserReservations(userId) {
      return reservations.filter((item) => item.userId === userId);
    },
    async createReservation(userId, scheduleId) {
      const reservation = { _id: "reservation-1", userId, scheduleId, status: "confirmed" as const };
      reservations.push(reservation);
      return reservation;
    },
    async cancelReservation(id, userId) {
      const reservation = reservations.find((item) => item._id === id && item.userId === userId);
      if (!reservation) return null;
      reservation.status = "cancelled";
      return reservation;
    },
  };
}

describe("reservations service", () => {
  const scheduleClient: ScheduleClient = { async verifySchedule() {} };
  const app = createApp(memoryRepository(), scheduleClient);

  it("starts and exposes health", async () => {
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });

  it("creates, lists and cancels a reservation", async () => {
    const user = await request(app).post("/users").send({ name: "Luis", email: "luis@example.com" });
    expect(user.status).toBe(201);
    const reservation = await request(app).post("/reservations").send({
      userId: "user-1",
      courtId: "court-1",
      scheduleId: "schedule-1",
    });
    expect(reservation.status).toBe(201);
    const listed = await request(app).get("/users/user-1/reservations");
    expect(listed.body).toHaveLength(1);
    const cancelled = await request(app).delete("/reservations/reservation-1").set("x-user-id", "user-1");
    expect(cancelled.body.status).toBe("cancelled");
  });

  it("returns a controlled error when service 1 is unavailable", async () => {
    const unavailableClient: ScheduleClient = {
      async verifySchedule() {
        throw new ScheduleUnavailableError("El servicio de canchas no está disponible");
      },
    };
    const unavailableApp = createApp(memoryRepository(), unavailableClient);
    const response = await request(unavailableApp).post("/reservations").send({
      userId: "user-1",
      courtId: "court-1",
      scheduleId: "schedule-1",
    });
    expect(response.status).toBe(503);
    expect(response.body.detail).toContain("no está disponible");
  });
});
