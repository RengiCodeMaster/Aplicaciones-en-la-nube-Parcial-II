import { createApiClient } from "./api.js";
import { config } from "./config.js";

const api = createApiClient(config);
const state = { court: null, schedule: null, loading: false };
const $ = (id) => document.getElementById(id);

function setStatus(id, message, type = "") {
  const element = $(id);
  element.textContent = message;
  element.className = `status ${type}`.trim();
}

function setStep(step) {
  document.querySelectorAll(".step").forEach((element) => {
    element.classList.toggle("active", Number(element.dataset.step) <= step);
  });
}

function renderCourts(courts) {
  const container = $("courts-list");
  container.replaceChildren();
  $("courts-empty").hidden = courts.length > 0;
  courts.forEach((court) => {
    const card = document.createElement("article");
    card.className = "court-card";
    const name = document.createElement("h3");
    name.textContent = court.name;
    const details = document.createElement("p");
    details.textContent = `${court.sport} · ${court.location}`;
    const button = document.createElement("button");
    button.className = "button button-card";
    button.type = "button";
    button.textContent = "Ver horarios";
    button.addEventListener("click", () => selectCourt(court));
    card.append(name, details, button);
    container.append(card);
  });
}

function renderSchedules(schedules) {
  const container = $("schedules-list");
  container.replaceChildren();
  schedules.forEach((schedule) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "schedule-option";
    button.dataset.scheduleId = schedule.id;
    const date = new Date(`${schedule.day}T00:00:00`).toLocaleDateString("es-PE", { weekday: "long", day: "numeric", month: "short" });
    button.innerHTML = `<span>${date}</span><strong>${schedule.start_time.slice(0, 5)} – ${schedule.end_time.slice(0, 5)}</strong>`;
    button.addEventListener("click", () => selectSchedule(schedule));
    container.append(button);
  });
}

async function loadCourts() {
  setStatus("courts-status", "Buscando canchas disponibles...");
  $("load-courts").disabled = true;
  try {
    const courts = await api.listCourts();
    renderCourts(courts);
    setStatus("courts-status", courts.length ? `${courts.length} cancha${courts.length === 1 ? " disponible" : "s disponibles"}.` : "No hay canchas disponibles.", courts.length ? "success" : "error");
  } catch {
    renderCourts([]);
    setStatus("courts-status", "No pudimos cargar las canchas. Intenta nuevamente.", "error");
  } finally {
    $("load-courts").disabled = false;
  }
}

async function selectCourt(court) {
  state.court = court;
  state.schedule = null;
  setStep(2);
  $("selected-court").textContent = `${court.name} · selecciona un horario disponible`;
  $("reservation-summary").textContent = `${court.name} · elige un horario`;
  $("reserve-button").disabled = true;
  setStatus("schedules-status", "Cargando horarios...");
  try {
    const schedules = await api.listSchedules(court.id);
    renderSchedules(schedules);
    setStatus("schedules-status", schedules.length ? "Selecciona el horario que prefieras." : "Esta cancha no tiene horarios disponibles.", schedules.length ? "success" : "error");
    $("schedules-title").scrollIntoView({ behavior: "smooth", block: "center" });
  } catch {
    renderSchedules([]);
    setStatus("schedules-status", "No pudimos cargar los horarios. Intenta nuevamente.", "error");
  }
}

function selectSchedule(schedule) {
  state.schedule = schedule;
  document.querySelectorAll(".schedule-option").forEach((element) => element.classList.toggle("selected", element.dataset.scheduleId === String(schedule.id)));
  setStep(3);
  $("reservation-summary").textContent = `${state.court.name} · ${schedule.day} · ${schedule.start_time.slice(0, 5)} – ${schedule.end_time.slice(0, 5)}`;
  $("reserve-button").disabled = false;
  setStatus("schedules-status", "Horario seleccionado. Completa tus datos para reservar.", "success");
  $("user-name").focus();
}

$("load-courts").addEventListener("click", loadCourts);
$("reservation-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!state.court || !state.schedule || state.loading) return;
  const form = new FormData(event.currentTarget);
  state.loading = true;
  $("reserve-button").disabled = true;
  $("reserve-button").textContent = "Confirmando...";
  setStatus("reservation-status", "Estamos confirmando tu reserva...");
  try {
    const user = await api.createUser({ name: form.get("name"), email: form.get("email") });
    await api.createReservation({ userId: user.id, courtId: state.court.id, scheduleId: state.schedule.id });
    setStatus("reservation-status", "¡Reserva confirmada! Te esperamos en la cancha.", "success");
  } catch (error) {
    setStatus("reservation-status", error.message.includes("duplicate") ? "Ese correo ya está registrado. Usa otro correo." : "No pudimos confirmar la reserva. Intenta nuevamente.", "error");
    $("reserve-button").disabled = false;
  } finally {
    state.loading = false;
    $("reserve-button").textContent = "Confirmar reserva";
  }
});

loadCourts();
