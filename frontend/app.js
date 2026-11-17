import { createApiClient } from "./api.js";
import { config } from "./config.js";

const api = createApiClient(config);
let currentUserId = null;

function setStatus(elementId, message, type = "") {
  const element = document.getElementById(elementId);
  element.textContent = message;
  element.className = `status ${type}`.trim();
}

function renderCourts(courts) {
  const container = document.getElementById("courts-list");
  container.replaceChildren();
  courts.forEach((court) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `<strong>${court.name}</strong><br>${court.sport} — ${court.location}`;
    const scheduleButton = document.createElement("button");
    scheduleButton.type = "button";
    scheduleButton.textContent = "Ver horarios";
    scheduleButton.addEventListener("click", () => loadSchedules(court.id));
    card.append(scheduleButton);
    container.append(card);
  });
}

async function loadSchedules(courtId) {
  setStatus("courts-status", "Cargando horarios...");
  try {
    const schedules = await api.listSchedules(courtId);
    const first = schedules[0];
    if (!first) {
      setStatus("courts-status", "No hay horarios disponibles.", "error");
      return;
    }
    document.getElementById("court-id").value = courtId;
    document.getElementById("schedule-id").value = first.id;
    setStatus("courts-status", `Horario seleccionado: ${first.day} ${first.start_time}–${first.end_time}`, "success");
  } catch (error) {
    setStatus("courts-status", error.message, "error");
  }
}

async function loadCourts() {
  setStatus("courts-status", "Cargando canchas...");
  try {
    renderCourts(await api.listCourts());
    setStatus("courts-status", "Canchas cargadas.", "success");
  } catch (error) {
    setStatus("courts-status", error.message, "error");
  }
}

document.getElementById("load-courts").addEventListener("click", loadCourts);

document.getElementById("user-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  setStatus("user-status", "Creando usuario...");
  try {
    const user = await api.createUser({ name: form.get("name"), email: form.get("email") });
    currentUserId = user.id;
    setStatus("user-status", `Usuario creado: ${user.id}`, "success");
  } catch (error) {
    setStatus("user-status", error.message, "error");
  }
});

document.getElementById("reservation-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!currentUserId) {
    setStatus("reservation-status", "Primero crea un usuario.", "error");
    return;
  }
  const form = new FormData(event.currentTarget);
  setStatus("reservation-status", "Creando reserva...");
  try {
    const reservation = await api.createReservation({
      userId: currentUserId,
      courtId: form.get("courtId"),
      scheduleId: form.get("scheduleId"),
    });
    setStatus("reservation-status", `Reserva creada: ${reservation.id}`, "success");
  } catch (error) {
    setStatus("reservation-status", error.message, "error");
  }
});
