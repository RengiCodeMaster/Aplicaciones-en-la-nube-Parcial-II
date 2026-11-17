# Requirements — service_1_setup

## R1 — Inicio del servicio

CUANDO se ejecute el servicio 1 con su configuración válida, el sistema DEBE iniciar y responder en su puerto configurado.

## R2 — API documentada

EL servicio 1 DEBE exponer una API HTTP documentada para consultar canchas y horarios disponibles.

## R3 — Base de datos independiente

EL servicio 1 DEBE conectarse únicamente a su propia base de datos PostgreSQL mediante variables de entorno y no DEBE depender de la base de datos del servicio 2.

## R4 — Pruebas automatizadas

EL servicio 1 DEBE incluir pruebas automatizadas para su inicio, endpoints principales y acceso a su base de datos.
