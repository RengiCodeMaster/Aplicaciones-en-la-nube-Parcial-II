# Diseño: despliegue en Kubernetes

## Estructura propuesta

```text
k8s/
├── namespace.yaml
├── configmap.yaml
├── secret.example.yaml
├── postgres.yaml
├── mongodb.yaml
├── service-1.yaml
├── service-2.yaml
├── frontend.yaml
└── kustomization.yaml
```

## Red

- `frontend`: Service `LoadBalancer`, puerto 80.
- `service-1`: Service `ClusterIP`, puerto 8000.
- `service-2`: Service `ClusterIP`, puerto 8001.
- `postgres`: Service `ClusterIP`, puerto 5432.
- `mongodb`: Service `ClusterIP`, puerto 27017.

La URL de Service 1 para Service 2 será `http://service-1:8000`. El frontend usará URLs configurables apropiadas para el entorno; no se deben asumir `localhost` dentro de un Pod.

## Datos y configuración

PostgreSQL y MongoDB tendrán un Deployment, un Service y un PersistentVolumeClaim. Las credenciales se inyectarán desde Secret y las URLs desde ConfigMap.

Los Deployments de las aplicaciones tendrán probes sobre sus endpoints `/health`, variables de entorno explícitas y recursos básicos. Se usará `kustomization.yaml` para aplicar el conjunto completo de forma reproducible.

## Alcance

La primera validación será contra un clúster local. EKS, almacenamiento administrado, Ingress y TLS se resolverán en `aws_deployment` sin mezclar responsabilidades con esta feature.
