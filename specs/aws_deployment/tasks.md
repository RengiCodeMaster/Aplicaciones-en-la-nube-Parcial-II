# Tareas: despliegue en AWS

- [ ] T1. Definir región, nombre del clúster, nombre de ECR y configuración de nodos sin incluir credenciales.
- [ ] T2. Crear la configuración reproducible de EKS y documentar requisitos de AWS CLI, `kubectl` y permisos mínimos.
- [ ] T3. Crear los repositorios ECR y publicar las tres imágenes con una etiqueta identificable.
- [ ] T4. Crear el overlay de Kubernetes para AWS con imágenes ECR y StorageClass/PVC compatible con EBS.
- [ ] T5. Crear el Secret de AWS y aplicar el overlay sin subir credenciales al repositorio.
- [ ] T6. Verificar rollouts, probes, PVCs, Services y eventos del namespace.
- [ ] T7. Obtener la dirección pública del LoadBalancer y comprobar que el frontend responde.
- [ ] T8. Ejecutar el flujo completo de cancha, horario, usuario y reserva desde AWS.
- [ ] T9. Documentar consulta de logs, historial de despliegues y rollback.
- [ ] T10. Ejecutar la revisión final y marcar la feature como `done` únicamente con todas las pruebas exitosas.

La implementación comienza después de la aprobación humana de esta spec.
