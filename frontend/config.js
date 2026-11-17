export const config = {
  service1Url: globalThis.FRONTEND_CONFIG?.SERVICE_1_URL ?? "http://localhost:8000",
  service2Url: globalThis.FRONTEND_CONFIG?.SERVICE_2_URL ?? "http://localhost:8001",
  timeoutMs: Number(globalThis.FRONTEND_CONFIG?.REQUEST_TIMEOUT_MS ?? 5000),
};
