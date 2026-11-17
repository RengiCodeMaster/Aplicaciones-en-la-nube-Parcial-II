import { model, Schema, type InferSchemaType } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true, minlength: 2, maxlength: 120 },
    email: { type: String, required: true, unique: true, lowercase: true },
  },
  { timestamps: true },
);

const reservationSchema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    scheduleId: { type: String, required: true },
    status: { type: String, enum: ["confirmed", "cancelled"], default: "confirmed" },
  },
  { timestamps: true },
);

export type UserDocument = InferSchemaType<typeof userSchema>;
export type ReservationDocument = InferSchemaType<typeof reservationSchema>;
export const UserModel = model("User", userSchema);
export const ReservationModel = model("Reservation", reservationSchema);
