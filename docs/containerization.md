# Ejecución local con Docker Compose

## Requisitos

- Docker Desktop encendido.
- Puertos 8080, 8000 y 8001 disponibles.

## Inicio

Desde la raíz del Harness:

```bash
docker compose up --build
```

URLs locales:

- Frontend: `http://localhost:8080`
- Servicio 1: `http://localhost:8000/docs`
- Servicio 2: `http://localhost:8001/health`

PostgreSQL y MongoDB no se exponen al host; solo son accesibles dentro de la red Compose.

## Datos y persistencia

Los volúmenes `postgres_data` y `mongo_data` conservan los datos entre reinicios.

Para detener el entorno:

```bash
docker compose down
```

Para eliminar también los datos locales:

```bash
docker compose down -v
```

No ejecutes el segundo comando si necesitas conservar la información.
