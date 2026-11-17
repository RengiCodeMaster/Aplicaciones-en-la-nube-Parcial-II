import type { Repository } from "./repositories.js";

export async function createUser(repository: Repository, name: string, email: string) {
  return repository.createUser(name, email);
}

export async function createReservation(repository: Repository, userId: string, scheduleId: string) {
  return repository.createReservation(userId, scheduleId);
}

export async function listReservations(repository: Repository, userId: string) {
  return repository.listUserReservations(userId);
}

export async function cancelReservation(repository: Repository, id: string, userId: string) {
  return repository.cancelReservation(id, userId);
}
