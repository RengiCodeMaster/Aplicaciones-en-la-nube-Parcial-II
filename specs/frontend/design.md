# Design — frontend

## Responsabilidad

Responsable del proyecto individual.

## Tecnología

- HTML semántico.
- CSS sencillo y responsive.
- JavaScript moderno sin framework.
- `fetch` mediante el cliente común de `frontend/api.js`.

No se usará React porque el frontend solo necesita consumir dos APIs y mostrar el flujo de canchas y reservas.

## Estructura

```text
frontend/
├── index.html
├── styles.css
├── app.js
├── api.js
├── config.js
└── tests/
```

## Pantallas y flujo

1. Lista de canchas obtenida del servicio 1.
2. Horarios disponibles de la cancha seleccionada.
3. Formulario simple para crear usuario mediante el servicio 2.
4. Formulario para crear reserva con `userId`, `courtId` y `scheduleId`.
5. Resultado de la reserva y mensaje de error cuando corresponda.

## Configuración

`config.js` expondrá `SERVICE_1_URL`, `SERVICE_2_URL` y `REQUEST_TIMEOUT_MS` usando valores generados para el entorno. No se guardarán secretos en el frontend.

## Accesibilidad y errores

- Usar etiquetas `label`, botones y regiones con `aria-live` para mensajes.
- Deshabilitar acciones mientras una solicitud esté en progreso.
- Mostrar errores sin exponer trazas internas.
