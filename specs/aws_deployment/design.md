# Diseño: CI/CD en AWS

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

## Secuencia

```text
push a main
  → GitHub Actions
  → pruebas
  → Docker build
  → ECR
  → kubectl apply -k k8s/overlays/aws
  → EKS
  → LoadBalancer público
```

## Componentes

- `cluster.yaml`: configuración reproducible de EKS y sus nodos.
- ECR: un repositorio por imagen (`courts-service`, `reservations-service`, `frontend`).
- IAM OIDC: rol propio del repositorio `RengiCodeMaster/Aplicaciones-en-la-nube-Parcial-II`.
- GitHub Actions: workflow `.github/workflows/deploy-aws.yml`.
- Overlay AWS: reutiliza la base `k8s/`, reemplaza imágenes por ECR y selecciona la StorageClass EBS existente del clúster.
- Frontend: Service `LoadBalancer` público.
- APIs y bases de datos: Services `ClusterIP` internos.

## Seguridad y datos

No se versionarán credenciales AWS, tokens ni contraseñas. GitHub Actions usará OIDC; las contraseñas de las bases se inyectarán desde Secrets de GitHub. Las bases de datos permanecerán en Kubernetes para el alcance del examen, usando PVCs de AWS.

## Rollback

Cada despliegue usará la SHA del commit como etiqueta de imagen. La operación documentará `kubectl rollout status`, `kubectl rollout history` y `kubectl rollout undo`. Al terminar la demostración se eliminará el clúster temporal con `eksctl delete cluster` para evitar costos.
