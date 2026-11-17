# Implementación: frontend

Estado: completada.

Se implementó un frontend estático con HTML, CSS y JavaScript puro. Consume ambos servicios mediante `api.js`, muestra canchas, crea usuarios y registra reservas.

Archivos principales:

- `frontend/index.html`
- `frontend/styles.css`
- `frontend/app.js`
- `frontend/api.js`
- `frontend/config.js`
- `frontend/config.runtime.example.js`
- `frontend/tests/api.test.js`

Trazabilidad:

- R1: configuración externa y cliente API.
- R2: consultas y formularios de ambos servicios.
- R3: estados de carga, éxito, error y timeout.
- R4: pruebas del cliente API y timeout.

Verificación: `npm test` — 2 passed; sintaxis JavaScript PASS.
