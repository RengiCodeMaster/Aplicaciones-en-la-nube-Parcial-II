export type ScheduleClient = {
  verifySchedule(courtId: string, scheduleId: string): Promise<void>;
};

export class ScheduleUnavailableError extends Error {}

export function createScheduleClient(baseUrl: string, timeoutMs = 5000): ScheduleClient {
  return {
    async verifySchedule(courtId, scheduleId) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), timeoutMs);
      try {
        const response = await fetch(
          `${baseUrl}/courts/${courtId}/schedules/${scheduleId}`,
          { signal: controller.signal },
        );
        if (!response.ok) throw new ScheduleUnavailableError("El horario no está disponible");
      } catch (error) {
        if (error instanceof ScheduleUnavailableError) throw error;
        throw new ScheduleUnavailableError("El servicio de canchas no está disponible");
      } finally {
        clearTimeout(timeout);
      }
    },
  };
}
