# Implementación: service_1_setup

Estado: completada.

Se implementó el primer microservicio de canchas y horarios con Python, FastAPI, SQLAlchemy, Alembic y PostgreSQL mediante `DATABASE_URL`.

Archivos principales:

- `services/service-1/app/`
- `services/service-1/alembic/`
- `services/service-1/tests/test_service.py`
- `services/service-1/Dockerfile`

Trazabilidad:

- R1: `test_service_starts_and_exposes_health_route`
- R2: `test_court_and_schedule_persist_in_service_database` y `test_api_contract_contains_required_routes`
- R3: migración y prueba de persistencia aislada
- R4: las tres pruebas automatizadas

Verificación:

- Ruff: PASS
- Ruff format: PASS
- mypy: PASS
- pytest: 3 passed
- Alembic upgrade head: PASS
- Docker build: PASS.
- Contenedor temporal y `/health`: PASS.
- Migración PostgreSQL y endpoint de contrato verificados en flujo Docker: PASS.
