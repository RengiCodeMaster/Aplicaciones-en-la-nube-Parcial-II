# Sesión actual

Estado: `kubernetes` completado y revisado.

`containerization` quedó completado y revisado. La spec de Kubernetes fue aprobada y sus manifests están en `k8s/`.

Se añadió proxy Nginx en el frontend para consumir los Services internos sin exponer las APIs.

Validación completada: manifests renderizados, Docker Compose saludable, clúster Docker Desktop operativo y flujo de reserva confirmado dentro de Kubernetes.

La spec de `aws_deployment` fue revisada para alinearse con el flujo CI/CD de la guía del compañero y está pendiente de aprobación humana.

El workflow queda preparado para GitHub Actions; el despliegue no debe ejecutarse desde una carpeta local.

El intento anterior de AWS fue limpiado. El nuevo flujo usa `parcial2-eks`, el rol OIDC propio y el driver EBS CSI del proyecto.
