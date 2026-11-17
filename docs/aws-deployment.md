# Contexto para AWS

## Objetivo

Publicar en AWS los mismos contenedores y manifests validados en Kubernetes local, usando Amazon EKS como clúster y Amazon ECR como registro de imágenes.

## Flujo de publicación

```text
Código → Docker build → ECR → EKS → Service LoadBalancer → Frontend público
```

Las imágenes `courts-service`, `reservations-service` y `frontend` deben existir en ECR antes de aplicar el overlay de AWS. Los nombres de las imágenes serán configurables por variables, no valores pegados en el código.

## AWS y Kubernetes

- EKS ejecutará los Deployments y Services ya validados.
- El frontend conservará un Service `LoadBalancer` para obtener una dirección pública.
- Service 1, Service 2 y las bases de datos permanecerán como `ClusterIP`.
- Los PVC de AWS usarán una StorageClass compatible con EBS; no se usará `hostpath`.
- Las credenciales se crearán como Secret fuera del repositorio.

## Reproducibilidad y operación

La creación del clúster, repositorios ECR y despliegue debe quedar documentada con comandos y archivos de configuración. Se deben registrar comandos para consultar eventos y logs, comprobar la URL pública y volver a la revisión anterior mediante `kubectl rollout undo`.

El alcance no incluye dominio, TLS, base de datos administrada ni observabilidad avanzada; se mantienen fuera para no complicar el examen.
