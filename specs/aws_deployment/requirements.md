# Requisitos: despliegue en AWS

## Objetivo

Publicar el sistema validado en Kubernetes dentro de Amazon EKS y permitir el acceso público al frontend.

## Requisitos funcionales

### R1. Clúster documentado

Debe existir una configuración reproducible del clúster EKS, región, nombre y nodos requeridos. El acceso debe poder configurarse con `aws eks update-kubeconfig`.

### R2. Imágenes publicadas

Las imágenes de Service 1, Service 2 y frontend deben construirse y publicarse en ECR. Los manifests de AWS deben usar referencias completas a ECR y etiquetas identificables.

### R3. Despliegue reproducible

Debe existir un overlay o configuración de Kubernetes para AWS que reutilice los manifests funcionales y ajuste imágenes, almacenamiento y configuración necesaria para EKS.

### R4. Acceso público y operación

El frontend debe exponerse mediante un Service `LoadBalancer` y responder públicamente. Deben documentarse comandos para revisar Pods, Services, eventos, logs y rollback.

## Criterios de aceptación

- El clúster EKS está documentado y accesible.
- Las imágenes se encuentran en ECR.
- El despliegue se puede repetir con los archivos y comandos documentados.
- El frontend responde desde la dirección pública del LoadBalancer.
- El flujo de cancha, horario, usuario y reserva funciona en AWS.
- Se puede consultar el estado, logs y volver a una revisión anterior.
