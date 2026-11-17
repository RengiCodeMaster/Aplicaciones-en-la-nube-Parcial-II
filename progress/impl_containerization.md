# Implementación: containerization

Estado: completada.

Se creó el entorno reproducible con Docker Compose para frontend, servicio 1, servicio 2, PostgreSQL y MongoDB. Las bases de datos usan volúmenes separados y los servicios usan nombres internos de Compose.

Archivos principales:

- `docker-compose.yml`
- `.dockerignore`
- `.env.example`
- `frontend/Dockerfile`
- `docs/containerization.md`

Verificación:

- `docker compose config`: PASS.
- Imágenes de los tres componentes: PASS.
- Cinco contenedores saludables: PASS.
- Frontend HTTP: 200.
- Servicio 1 health: PASS.
- Servicio 2 health: PASS.
- Flujo real cancha → horario → usuario → reserva: PASS.
