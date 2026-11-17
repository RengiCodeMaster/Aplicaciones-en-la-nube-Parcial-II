# Requirements — containerization

## R1 — Imágenes reproducibles

EL SISTEMA DEBE tener una imagen Docker reproducible para el servicio 1, el servicio 2 y el frontend, usando versiones explícitas y comandos de inicio verificables.

## R2 — Protección de secretos

LAS IMÁGENES Docker y los archivos versionados DEBEN excluir contraseñas, tokens y cadenas de conexión sensibles; la configuración DEBE inyectarse mediante variables de entorno o archivos locales ignorados por Git.

## R3 — Ejecución local documentada

EL SISTEMA DEBE poder ejecutarse localmente con un único flujo documentado que levante frontend, servicios y sus bases de datos PostgreSQL y MongoDB, con redes, volúmenes y health checks definidos.
