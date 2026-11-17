# Implementación: service_2_setup

Estado: completada.

Se implementó el segundo microservicio con Node.js, TypeScript, Express, Mongoose y MongoDB. Gestiona usuarios y reservas, manteniendo su propia conexión mediante `MONGODB_URI`.

Archivos principales:

- `services/service-2/src/`
- `services/service-2/tests/app.test.ts`
- `services/service-2/package.json`
- `services/service-2/Dockerfile`

Trazabilidad:

- R1: prueba de health y ejecución real del contenedor.
- R2: prueba HTTP de usuarios y reservas; API Express documentada en el código.
- R3: modelos Mongoose, `MONGODB_URI` y prueba con MongoDB en contenedor separado.
- R4: pruebas Vitest y validación TypeScript.

Verificación:

- TypeScript: PASS
- ESLint: PASS
- Vitest: 2 passed
- Docker build: PASS
- MongoDB + API en contenedores: PASS
