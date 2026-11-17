# Requisitos: despliegue en Kubernetes

## Objetivo

Ejecutar frontend, ambos microservicios y sus bases de datos en Kubernetes, manteniendo la separación de responsabilidades y la comunicación interna definida en los contratos.

## Requisitos funcionales

### R1. Recursos de ejecución

Debe existir un Deployment y un Service para `frontend`, `service-1`, `service-2`, PostgreSQL y MongoDB. Las aplicaciones deben usar las imágenes producidas por Docker.

### R2. Configuración segura

Las variables no sensibles deben provenir de ConfigMap. Las credenciales y contraseñas deben provenir de Secret. No se deben incluir secretos reales en manifests versionados.

### R3. Salud y consumo

Los componentes deben declarar probes de disponibilidad y salud. Los Deployments de las aplicaciones deben declarar requests y limits básicos de CPU y memoria.

### R4. Comunicación y datos

`service-2` debe comunicarse con `service-1` por el DNS interno del Service. `service-1` solo debe conectarse a PostgreSQL y `service-2` solo a MongoDB. PostgreSQL y MongoDB deben tener almacenamiento persistente.

## Criterios de aceptación

- `kubectl apply -k k8s/` crea los recursos sin errores.
- Los Pods quedan Ready y las probes pasan.
- El frontend puede consultar los dos microservicios dentro del clúster.
- Se puede crear una cancha, un horario, un usuario y una reserva desde el flujo de prueba.
- Al recrear un Pod de base de datos, los datos permanecen en su PVC.
