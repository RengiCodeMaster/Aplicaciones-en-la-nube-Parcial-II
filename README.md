# Sistema de reservas de canchas

## 🎥 Video de demostración

👉 **[Ver video del despliegue y funcionamiento del sistema](https://drive.google.com/file/d/16A6aL1YqpHw8Pnt-s2gnIY8FnBJ_AfyD/view?usp=sharing)**

## Descripción

Sistema de reservas deportivas compuesto por dos microservicios independientes, un frontend web y dos bases de datos. Permite consultar canchas, revisar horarios, registrar usuarios y crear reservas.

## Arquitectura

- **Service 1:** Python, FastAPI y PostgreSQL. Administra canchas y horarios.
- **Service 2:** TypeScript, Node.js, Express y MongoDB. Administra usuarios y reservas.
- **Frontend:** HTML, CSS y JavaScript. Consume ambos microservicios mediante un proxy Nginx.
- **Contenedores:** Docker.
- **Orquestación:** Kubernetes sobre AWS EKS.
- **Imágenes:** Amazon ECR.
- **CI/CD:** GitHub Actions con autenticación OIDC.

## Flujo principal

1. El usuario consulta las canchas disponibles.
2. Selecciona una cancha y un horario.
3. Registra sus datos.
4. El frontend crea el usuario y registra la reserva.
5. Los microservicios se comunican para validar el horario.

## Estructura principal

```text
services/service-1/  Servicio de canchas y horarios
services/service-2/  Servicio de usuarios y reservas
frontend/            Interfaz web
k8s/                 Manifests de Kubernetes
infra/aws/           Configuración de AWS y OIDC
specs/               Requisitos, diseño y tareas del Harness
agents/              Agentes del flujo Harness
```

## Despliegue

El workflow de GitHub Actions ejecuta las pruebas, construye las imágenes Docker, las publica en ECR y despliega los manifests en el clúster EKS mediante Kubernetes.

El desarrollo sigue el flujo Harness definido en [AGENTS.md](AGENTS.md):

```text
leader → spec_author → aprobación humana → implementer → reviewer → done
```
