# Diseño: despliegue en AWS

## Archivos propuestos

```text
infra/aws/
├── cluster.yaml
└── README.md

k8s/overlays/aws/
├── kustomization.yaml
├── postgres-pvc.yaml
└── mongodb-pvc.yaml
```

## Componentes

- `cluster.yaml`: configuración reproducible de EKS y sus nodos.
- ECR: un repositorio por imagen (`courts-service`, `reservations-service`, `frontend`).
- Overlay AWS: reutiliza la base `k8s/`, reemplaza imágenes por ECR y selecciona la StorageClass EBS existente del clúster.
- Frontend: Service `LoadBalancer` público.
- APIs y bases de datos: Services `ClusterIP` internos.

## Seguridad y datos

No se versionarán credenciales AWS, tokens ni contraseñas. El Secret se creará durante la preparación del entorno. Las bases de datos permanecerán en Kubernetes para el alcance del examen, usando PVCs de AWS.

## Rollback

Cada despliegue usará una etiqueta de imagen identificable. La operación documentará `kubectl rollout status`, `kubectl rollout history` y `kubectl rollout undo` para recuperar una revisión anterior.
