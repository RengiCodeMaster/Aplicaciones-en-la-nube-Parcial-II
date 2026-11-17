import { ReservationModel, UserModel } from "./models.js";

export type UserRecord = { _id: string; name: string; email: string };
export type ReservationRecord = {
  _id: string;
  userId: string;
  scheduleId: string;
  status: "confirmed" | "cancelled";
};

export interface Repository {
  createUser(name: string, email: string): Promise<UserRecord>;
  listUserReservations(userId: string): Promise<ReservationRecord[]>;
  createReservation(userId: string, scheduleId: string): Promise<ReservationRecord>;
  cancelReservation(id: string, userId: string): Promise<ReservationRecord | null>;
}

export const mongoRepository: Repository = {
  async createUser(name, email) {
    const user = await UserModel.create({ name, email });
    return { _id: user._id.toString(), name: user.name, email: user.email };
  },
  async listUserReservations(userId) {
    const reservations = await ReservationModel.find({ userId }).sort({ createdAt: -1 }).exec();
    return reservations.map((item) => ({
      _id: item._id.toString(), userId: item.userId, scheduleId: item.scheduleId, status: item.status,
    }));
  },
  async createReservation(userId, scheduleId) {
    const reservation = await ReservationModel.create({ userId, scheduleId });
    return {
      _id: reservation._id.toString(), userId: reservation.userId,
      scheduleId: reservation.scheduleId, status: reservation.status,
    };
  },
  async cancelReservation(id, userId) {
    const reservation = await ReservationModel.findOneAndUpdate(
      { _id: id, userId, status: "confirmed" },
      { status: "cancelled" },
      { new: true },
    ).exec();
    if (!reservation) return null;
    return {
      _id: reservation._id.toString(), userId: reservation.userId,
      scheduleId: reservation.scheduleId, status: reservation.status,
    };
  },
};
