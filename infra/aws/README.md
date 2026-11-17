# Operación AWS

El clúster usado para esta validación es `hola-mundo-demo` en `us-east-1`. La configuración reproducible para crear un clúster nuevo está en `cluster.yaml`; no se debe aplicar si ya existe un clúster disponible.

## Conexión

```powershell
aws eks update-kubeconfig --region us-east-1 --name hola-mundo-demo
kubectl get nodes
```

## ECR

Repositorios usados:

```text
901799140785.dkr.ecr.us-east-1.amazonaws.com/courts-service
901799140785.dkr.ecr.us-east-1.amazonaws.com/reservations-service
901799140785.dkr.ecr.us-east-1.amazonaws.com/frontend
```

## Despliegue

Crear el Secret fuera de Git y aplicar el overlay:

```powershell
kubectl apply -f k8s/secret.yaml
kubectl apply -k k8s/overlays/aws
kubectl -n microservicios rollout status deployment/frontend
kubectl -n microservicios get pods,svc,pvc
```

El frontend queda publicado por el Service `LoadBalancer`. Para operación:

```powershell
kubectl -n microservicios get service frontend
kubectl -n microservicios logs deployment/service-1
kubectl -n microservicios logs deployment/service-2
kubectl -n microservicios rollout history deployment/frontend
kubectl -n microservicios rollout undo deployment/frontend
```
