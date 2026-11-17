export function createApiClient({ service1Url, service2Url, timeoutMs = 5000 }) {
  async function request(url, options = {}) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.detail || "La solicitud falló");
      return body;
    } catch (error) {
      if (error.name === "AbortError") throw new Error("La solicitud excedió el tiempo límite");
      throw error;
    } finally {
      clearTimeout(timeout);
    }
  }

  return {
    listCourts: () => request(`${service1Url}/courts`),
    listSchedules: (courtId) => request(`${service1Url}/courts/${courtId}/schedules`),
    createUser: (data) => request(`${service2Url}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),
    createReservation: (data) => request(`${service2Url}/reservations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),
    listReservations: (userId) => request(`${service2Url}/users/${userId}/reservations`),
  };
}
