# Contratos HTTP entre componentes

## Servicio 1 — Canchas

- `GET /health`
- `GET /courts`
- `GET /courts/{court_id}/schedules`
- `GET /courts/{court_id}/schedules/{schedule_id}`

## Servicio 2 — Reservas

- `GET /health`
- `POST /users` con `{ "name": "Luis", "email": "luis@example.com" }`.
- `POST /reservations` con `{ "userId": "...", "courtId": "...", "scheduleId": "..." }`.
- `GET /users/{user_id}/reservations`
- `DELETE /reservations/{reservation_id}` con header `x-user-id`.

## Comunicación

El servicio 2 valida el `scheduleId` consultando al servicio 1. Ningún servicio accede a la base de datos del otro.

El frontend usa `frontend/api.js` y recibe las URLs por configuración. Todas las solicitudes tienen un timeout de 5 segundos y transforman errores HTTP, de red y timeout en errores manejables.
