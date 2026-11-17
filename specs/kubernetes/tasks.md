# Tareas: despliegue en Kubernetes

- [x] T1. Crear namespace, `kustomization.yaml`, ConfigMap y plantilla `secret.example.yaml`.
- [x] T2. Crear Deployment, Service y PVC de PostgreSQL con credenciales desde Secret y probe de salud.
- [x] T3. Crear Deployment, Service y PVC de MongoDB con credenciales desde Secret y probe de salud.
- [x] T4. Crear Deployment y Service de Service 1 con `DATABASE_URL`, probes y recursos básicos.
- [x] T5. Crear Deployment y Service de Service 2 con `MONGODB_URI`, `SERVICE_1_URL`, timeout, probes y recursos básicos.
- [x] T6. Crear Deployment y Service del frontend con el puerto 80 y configuración de URLs para el entorno Kubernetes.
- [x] T7. Validar que cada aplicación solo acceda a la base de datos que le corresponde y que Service 2 alcance a Service 1 por DNS interno.
- [x] T8. Aplicar los manifests en un clúster local y revisar Pods, Services, PVCs, eventos y logs.
- [x] T9. Ejecutar el flujo completo: listar/crear cancha, crear horario, registrar usuario y crear reserva.
- [x] T10. Documentar comandos de aplicación, verificación, troubleshooting y limpieza segura sin borrar volúmenes por accidente.

Todas las tareas fueron implementadas y validadas después de la aprobación humana.
