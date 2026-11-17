export const config = {
  port: Number(process.env.PORT ?? 8001),
  mongoUri: process.env.MONGODB_URI ?? "mongodb://localhost:27017/reservations_service",
  service1Url: process.env.SERVICE_1_URL ?? "http://localhost:8000",
  serviceTimeoutMs: Number(process.env.SERVICE_TIMEOUT_MS ?? 5000),
};
