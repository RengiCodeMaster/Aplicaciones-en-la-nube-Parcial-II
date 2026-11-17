# Implementación de Kubernetes

## Implementado

- Manifests de Namespace, ConfigMap, Secrets de ejemplo, Deployments, Services, PVCs y Kustomize.
- Probes de startup, readiness y liveness en las aplicaciones.
- Recursos básicos de CPU y memoria.
- Comunicación interna de Service 2 hacia Service 1 mediante DNS Kubernetes.
- Persistencia para PostgreSQL y MongoDB.
- Proxy Nginx del frontend para consumir APIs internas sin exponerlas.

## Validación ejecutada

- `kubectl kustomize k8s`: correcto.
- `kubectl apply --dry-run=client --validate=false -k k8s`: correcto.
- Imágenes Docker reconstruidas correctamente.
- Flujo HTTP completo por el frontend: cancha, horario, usuario y reserva confirmada.

## Pendiente

Aplicar en un clúster Kubernetes real. El contexto disponible apunta a un EKS inexistente/no resoluble y no hay contexto local Docker Desktop o Minikube configurado.
