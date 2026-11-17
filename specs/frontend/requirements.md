# Requirements — frontend

## R1 — URLs configurables

EL frontend DEBE obtener las URLs del servicio 1 y del servicio 2 desde una configuración externa por entorno, sin depender de URLs escritas dentro de la lógica de la interfaz.

## R2 — Consulta de ambos servicios

CUANDO el usuario use la interfaz, el frontend DEBE consultar las canchas y horarios del servicio 1 y las operaciones de usuario y reserva del servicio 2.

## R3 — Estados de interfaz

MIENTRAS una solicitud esté en progreso, el frontend DEBE mostrar un estado de carga; SI la solicitud falla o supera el timeout, DEBE mostrar un mensaje de error comprensible.

## R4 — Pruebas básicas

EL frontend DEBE tener pruebas básicas para configuración, consulta de APIs y presentación de estados de carga y error.
