# AGENTS.md — Harness del proyecto de microservicios

## Objetivo

Este repositorio coordina un sistema con dos servicios independientes, dos bases de datos, un frontend y despliegue en Kubernetes sobre AWS.

## Flujo obligatorio

`leader → spec_author → aprobación humana → implementer → reviewer → done`

Antes de programar una feature:

1. Leer `feature_list.json`, `progress/current.md` y `docs/`.
2. Crear `specs/<feature>/requirements.md`, `design.md` y `tasks.md`.
3. Esperar la aprobación humana.
4. Implementar solo las tareas aprobadas.
5. Ejecutar pruebas y revisión.

No mezclar servicios ni implementar features sin spec aprobada.

## Componentes

- `services/service-1/`: primer backend y su base de datos.
- `services/service-2/`: segundo backend y su base de datos.
- `frontend/`: aplicación que consume ambos servicios.
- `k8s/`: manifests de Kubernetes.
- `infra/`: configuración específica de AWS.
- `specs/`: especificaciones por feature.
- `progress/`: estado y reportes del Harness.
