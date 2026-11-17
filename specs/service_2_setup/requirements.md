# Requirements — service_2_setup

## R1 — Inicio del servicio

CUANDO se ejecute el servicio 2 con su configuración válida, el sistema DEBE iniciar y responder en su puerto configurado.

## R2 — Lenguaje independiente

EL servicio 2 DEBE utilizar un lenguaje diferente al servicio 1 y exponer una API HTTP documentada para usuarios y reservas.

## R3 — Base de datos independiente

EL servicio 2 DEBE conectarse únicamente a su propia base de datos MongoDB mediante variables de entorno y no DEBE conectarse a la base de datos del servicio 1.

## R4 — Pruebas automatizadas

EL servicio 2 DEBE incluir pruebas automatizadas para su inicio, endpoints principales y persistencia aislada.
