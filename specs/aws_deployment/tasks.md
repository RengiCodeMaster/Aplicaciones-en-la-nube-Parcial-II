# Tareas: CI/CD y despliegue en AWS

- [ ] T1. Confirmar el clúster `parcial2-eks`, región `us-east-1`, node group y conexión con el perfil `eks-admin`.
- [ ] T2. Crear el rol IAM OIDC propio del repositorio y registrarlo mediante Access Entry en EKS.
- [ ] T3. Crear los repositorios ECR propios del proyecto.
- [ ] T4. Configurar Secrets de GitHub y permisos OIDC sin subir credenciales al repositorio.
- [ ] T5. Validar el workflow: pruebas, build y push de imágenes con la SHA del commit.
- [ ] T6. Ejecutar el deploy del workflow con `kubectl apply -k k8s/overlays/aws`.
- [ ] T7. Verificar rollouts, probes, PVCs, Services y eventos del namespace `microservicios`.
- [ ] T8. Obtener la dirección pública del LoadBalancer y comprobar el frontend.
- [ ] T9. Ejecutar el flujo completo de cancha, horario, usuario y reserva desde AWS.
- [ ] T10. Documentar logs, historial, rollback y eliminación del clúster temporal al finalizar.

La implementación comienza después de la aprobación humana de esta spec.
