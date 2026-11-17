# Design — containerization

## Responsabilidad

Responsable del proyecto individual.

## Componentes contenedorizados

```text
frontend      → servidor HTTP estático
service-1     → Python/FastAPI
postgres      → base exclusiva de service-1
service-2     → Node.js/TypeScript/Express
mongodb       → base exclusiva de service-2
```

## Imágenes

- `services/service-1/Dockerfile`: instala dependencias Python y ejecuta Uvicorn.
- `services/service-2/Dockerfile`: instala dependencias Node, compila TypeScript y ejecuta el servidor compilado.
- `frontend/Dockerfile`: sirve los archivos estáticos con un servidor HTTP pequeño.
- PostgreSQL y MongoDB usarán imágenes oficiales con versiones fijadas en `docker-compose.yml`.

## Docker Compose

`docker-compose.yml` creará una red interna y servicios para las tres imágenes propias y las dos bases de datos. Las APIs se comunicarán por nombres de servicio, no por `localhost`.

Se usarán volúmenes separados:

- `postgres_data` solo para PostgreSQL.
- `mongo_data` solo para MongoDB.

## Configuración

- `DATABASE_URL` solo en service-1.
- `MONGODB_URI` solo en service-2.
- `SERVICE_1_URL` solo en service-2.
- URLs públicas del frontend mediante configuración runtime sin secretos.

Los valores de ejemplo irán en `.env.example`; el `.env` real quedará ignorado por Git.

## Health checks

- service-1: `GET /health` en el puerto 8000.
- service-2: `GET /health` en el puerto 8001.
- frontend: comprobación HTTP de su página principal.
- Las bases de datos usarán sus comandos nativos de health check.

## Ejecución

```bash
docker compose up --build
```

La documentación indicará cómo revisar logs, detener el entorno y eliminar volúmenes solo cuando sea necesario.
