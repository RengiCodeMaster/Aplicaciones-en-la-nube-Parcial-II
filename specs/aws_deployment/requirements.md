# Requisitos: despliegue automático en AWS

## Objetivo

Publicar el sistema validado en Kubernetes dentro de Amazon EKS y actualizar AWS automáticamente después de cada `push` a `main`.

## Requisitos funcionales

### R1. Clúster EKS documentado

Debe existir una configuración reproducible del clúster EKS `parcial2-eks` en `us-east-1`, con su node group y comandos de conexión mediante el perfil `eks-admin`.

### R2. Acceso OIDC

GitHub Actions debe autenticarse mediante OIDC y un rol IAM propio de este repositorio. El pipeline no debe usar Access Keys guardadas en GitHub.

### R3. Imágenes publicadas

Las imágenes de Service 1, Service 2 y frontend deben construirse y publicarse en ECR. Los manifests de AWS deben usar referencias completas a ECR y etiquetas identificables.

### R4. Pipeline CI/CD

Después de un `push` a `main`, GitHub Actions debe ejecutar pruebas, construir imágenes, publicarlas en ECR y aplicar el overlay AWS mediante `kubectl`.

### R5. Acceso público y operación

El frontend debe exponerse mediante un Service `LoadBalancer` y responder públicamente. Deben documentarse comandos para revisar Pods, Services, eventos, logs y rollback.

## Criterios de aceptación

- El clúster EKS está documentado y accesible.
- El rol OIDC tiene Access Entry y permisos para desplegar en EKS.
- Las imágenes se encuentran en ECR.
- Un `push` a `main` inicia el despliegue reproducible.
- El frontend responde desde la dirección pública del LoadBalancer.
- El flujo de cancha, horario, usuario y reserva funciona en AWS.
- Se puede consultar el estado, logs y volver a una revisión anterior.
