# Design — service_contracts

## Responsabilidad

Responsable del proyecto individual.

## Objetivo

Definir el contrato mínimo que conectará el frontend, el servicio 1 y el servicio 2, manteniendo las bases de datos aisladas.

## Contratos HTTP

### Servicio 1 — Canchas

- `GET /health` → `{ "status": "ok" }`
- `GET /courts` → lista de canchas.
- `GET /courts/{court_id}/schedules` → horarios disponibles de una cancha.

### Servicio 2 — Reservas

- `GET /health` → `{ "status": "ok" }`
- `POST /users` → crea un usuario y devuelve su identificador.
- `POST /reservations` → crea una reserva con `userId` y `scheduleId`.
- `GET /users/{user_id}/reservations` → lista las reservas del usuario.
- `DELETE /reservations/{reservation_id}` → cancela una reserva mediante `x-user-id`.

## Comunicación

El frontend estático consumirá ambos servicios mediante `fetch`. Las URLs serán configuradas con un archivo de configuración generado para cada entorno; no se guardarán URLs fijas dentro de la lógica de la interfaz.

El servicio 2 recibirá el `scheduleId` del servicio 1. La validación avanzada de disponibilidad y la coordinación de ocupación se implementarán en esta feature sin compartir bases de datos.

## Errores y timeout

- El frontend usará un timeout de 5 segundos por solicitud.
- Errores HTTP 4xx y 5xx se convertirán en mensajes visibles.
- Fallos de red mostrarán un mensaje de servicio no disponible.
- Las respuestas JSON de error usarán `{ "detail": "..." }`.

## Pruebas

Se usarán pruebas de integración con ambos servicios ejecutándose en contenedores temporales o con dobles controlados. Se comprobarán respuestas, errores, timeout y flujo mínimo.

## Fuera de alcance

No se agregará un gateway, service mesh, autenticación avanzada, pagos ni comunicación directa entre bases de datos.
