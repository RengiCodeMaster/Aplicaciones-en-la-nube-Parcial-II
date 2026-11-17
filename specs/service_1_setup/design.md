# Design — service_1_setup

## Responsabilidad

Persona 1.

## Función del servicio

El servicio 1 administrará canchas deportivas y sus horarios disponibles. No almacenará usuarios ni reservas; esos datos pertenecerán al servicio 2.

## Tecnología aprobada como propuesta

- Python 3.12.
- FastAPI.
- SQLAlchemy 2 y Alembic.
- PostgreSQL como base de datos propia.
- pytest para pruebas.
- Docker para ejecución local.

## Estructura

```text
services/service-1/
├── app/
│   ├── api/
│   ├── models/
│   ├── schemas/
│   ├── repositories/
│   └── services/
├── tests/
├── alembic/
├── Dockerfile
└── pyproject.toml
```

## API inicial

- `GET /health`
- `GET /courts`
- `POST /courts`
- `GET /courts/{court_id}/schedules`
- `POST /courts/{court_id}/schedules`

## Límites

El servicio no implementará reservas, usuarios, autenticación avanzada ni comunicación con el servicio 2 en esta feature. Eso se definirá en specs posteriores.
