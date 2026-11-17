# Contexto para Kubernetes

## Topología

- `frontend` consume las APIs de `service-1` y `service-2`.
- `service-1` usa únicamente PostgreSQL.
- `service-2` usa únicamente MongoDB y consulta a `service-1` para validar horarios.
- Las bases de datos no se exponen públicamente.

## Puertos y nombres internos

| Componente | Puerto del contenedor | Nombre interno esperado |
|---|---:|---|
| frontend | 80 | `frontend` |
| service-1 | 8000 | `service-1` |
| service-2 | 8001 | `service-2` |
| PostgreSQL | 5432 | `postgres` |
| MongoDB | 27017 | `mongodb` |

Los nombres de los Services serán los nombres DNS usados por los contenedores. `service-2` debe usar `SERVICE_1_URL=http://service-1:8000`.

## Configuración y persistencia

- Las URLs internas y valores no sensibles van en un ConfigMap.
- Las credenciales de PostgreSQL y MongoDB van en un Secret; el repositorio solo contiene una plantilla sin valores reales.
- PostgreSQL y MongoDB necesitan un PVC para conservar datos durante la recreación de Pods.
- Las imágenes deben corresponder a las imágenes construidas en la feature `containerization`.

## Acceso y salud

El frontend será el único componente expuesto mediante un Service `LoadBalancer` para la validación local o futura publicación. Los microservicios y las bases de datos serán `ClusterIP`.

Cada aplicación tendrá `startupProbe`, `readinessProbe` y `livenessProbe` contra `/health` cuando aplique. Se declararán requests y limits básicos para evitar Pods sin límites de consumo.

Esta feature crea manifests y valida el despliegue en un clúster Kubernetes. La configuración específica de EKS, dominio y observabilidad pertenece a `aws_deployment`.

## Preparación local

1. Copiar `k8s/secret.example.yaml` como `k8s/secret.yaml`.
2. Reemplazar los valores de ejemplo por credenciales locales.
3. Aplicar el Secret y los manifests:

```bash
kubectl apply -f k8s/secret.yaml
kubectl apply -k k8s/
kubectl -n microservicios get pods,svc,pvc
```

El archivo `k8s/secret.yaml` está ignorado por Git. No debe subirse al repositorio.
