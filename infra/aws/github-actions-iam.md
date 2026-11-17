# Permisos de GitHub Actions con OIDC

El workflow usa OIDC y no guarda claves AWS estáticas. En GitHub se configura únicamente el ARN del rol en el secreto `AWS_ROLE_ARN`.

El rol debe confiar solo en:

- proveedor: `token.actions.githubusercontent.com`;
- repositorio: `RengiCodeMaster/Aplicaciones-en-la-nube-Parcial-II`;
- rama: `main`.

El rol necesita permisos mínimos para:

- autenticarse en ECR y publicar las tres imágenes;
- describir el clúster EKS y actualizar el kubeconfig;
- usar el Access Entry de EKS para aplicar recursos en el namespace `microservicios`.

No se deben guardar `AWS_ACCESS_KEY_ID` ni `AWS_SECRET_ACCESS_KEY` en GitHub.

Antes de activar el workflow, el administrador debe crear el Access Entry de ese rol en EKS y asociarle la política de administración necesaria para el despliegue. También debe verificar que el clúster tenga el driver EBS CSI y capacidad suficiente para los Pods.
