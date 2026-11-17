# Implementación: service_contracts

Estado: completada.

Se documentaron los contratos HTTP y se conectó el flujo de validación de horarios: el servicio 2 consulta al servicio 1 sin acceder a su base de datos. También se creó el cliente JavaScript común con timeout y manejo de errores.

Archivos principales:

- `docs/api-contracts.md`
- `services/service-1/app/api/courts.py`
- `services/service-1/app/services/court_service.py`
- `services/service-2/src/service1Client.ts`
- `services/service-2/src/app.ts`
- `frontend/api.js`
- `services/service-2/tests/app.test.ts`

Trazabilidad:

- R1: `docs/api-contracts.md` y contratos OpenAPI del servicio 1.
- R2: `frontend/api.js` y prueba de creación de usuario/reserva.
- R3: timeout del cliente y respuesta 503 ante servicio 1 no disponible.
- R4: pruebas de servicio 1 y servicio 2 con flujo de contrato.

Verificación:

- Servicio 1: Ruff PASS, formato PASS, mypy PASS, 3 pruebas PASS.
- Servicio 2: TypeScript PASS, ESLint PASS, 3 pruebas PASS.
- Frontend `api.js`: sintaxis JavaScript PASS.
- Flujo real en Docker con PostgreSQL, MongoDB y ambos servicios: PASS.
- Se creó una cancha, un horario, un usuario y una reserva mediante las APIs reales.
