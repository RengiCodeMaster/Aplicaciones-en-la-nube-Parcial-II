# Arquitectura inicial

El proyecto tendrá dos microservicios independientes, cada uno con lenguaje y base de datos propios. El frontend será un cliente estático de HTML, CSS y JavaScript que consumirá las APIs mediante contratos documentados.

```text
Frontend → Service 1 → Database 1
         ↘ Service 2 → Database 2
```

Las tecnologías concretas de cada servicio se decidirán en sus respectivas specs. Kubernetes ejecutará los componentes y AWS alojará el clúster.

Tecnologías decididas:

- Servicio 1: Python, FastAPI y PostgreSQL.
- Servicio 2: Node.js, TypeScript, Express y MongoDB.
- Frontend: HTML, CSS y JavaScript sin framework.
