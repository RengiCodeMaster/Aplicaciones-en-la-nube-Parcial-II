# Requirements — service_contracts

## R1 — Contratos documentados

EL SISTEMA DEBE documentar los endpoints, métodos HTTP, parámetros, respuestas exitosas y errores de los servicios 1 y 2.

## R2 — Consulta desde el frontend

CUANDO el frontend solicite información, DEBE poder consultar el catálogo de canchas y horarios del servicio 1, además de usuarios y reservas del servicio 2, usando URLs configurables.

## R3 — Errores y timeouts

SI un servicio responde con error, no responde o supera el tiempo límite ENTONCES el consumidor DEBE mostrar un error controlado y no quedar bloqueado indefinidamente.

## R4 — Integración verificable

EL SISTEMA DEBE tener pruebas de integración que validen la comunicación entre servicios y el flujo básico de consulta de canchas, creación de usuario y creación de reserva.
