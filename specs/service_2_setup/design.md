# Design — service_2_setup

## Responsabilidad

Responsable del proyecto individual.

## Función del servicio

El servicio 2 administrará usuarios y reservas de horarios. No almacenará canchas ni horarios maestros; esa información pertenecerá al servicio 1.

## Tecnología propuesta

- Node.js 22.
- Express y TypeScript.
- MongoDB como base de datos propia.
- Mongoose para persistencia.
- Jest y Supertest para pruebas.
- Docker para ejecución local.

Esto cumple el requisito de usar un lenguaje diferente al servicio 1, que utiliza Python.

## Estructura

```text
services/service-2/
├── src/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── models/
│   └── config/
├── tests/
├── Dockerfile
├── package.json
└── tsconfig.json
```

## API inicial

- `GET /health`
- `POST /users`
- `POST /reservations`
- `GET /users/{user_id}/reservations`
- `DELETE /reservations/{reservation_id}`

## Límites

El servicio no gestionará canchas ni horarios maestros en esta feature. La comunicación con el servicio 1 y la validación de disponibilidad se definirán en `service_contracts`.
