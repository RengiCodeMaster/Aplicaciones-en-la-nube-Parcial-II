# Revisión de Kubernetes

## Resultado

- Manifests renderizados con `kubectl kustomize k8s`: correcto.
- Validación cliente sin consultar el clúster: correcta.
- Imágenes Docker disponibles para el despliegue local: correcto.
- Compose con proxy Nginx y cinco contenedores saludables: correcto.
- Flujo completo por el frontend: correcto; la reserva fue confirmada.
- Pruebas: Service 1 `3 passed`, Service 2 `3 passed`, frontend `2 passed`.

## Estado de la feature

Completada. En Docker Desktop Kubernetes se verificaron cinco Pods `1/1 Running`, PVCs `Bound`, Services creados y una reserva confirmada mediante el frontend LoadBalancer.
