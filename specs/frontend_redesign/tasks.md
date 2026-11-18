# Tareas — Rediseño del frontend de reservas

- [x] **T1 — Reestructurar la pantalla** (R1, R2, R3, R8)
  - Cambiar la jerarquía HTML a un flujo de tres pasos.
  - Reemplazar los campos editables de IDs por selección visual de cancha y horario.
  - Criterio de prueba: la interfaz no solicita `courtId` ni `scheduleId` al usuario.

- [x] **T2 — Implementar el flujo de estado y mensajes** (R1, R3, R4, R5, R6, R7)
  - Cargar canchas al iniciar, cargar horarios al seleccionar y enviar usuario/reserva en orden.
  - Manejar estados vacío, carga, error, reintento, éxito y prevención de doble envío.
  - Criterio de prueba: una reserva completa usa los IDs internamente y muestra confirmación.

- [x] **T3 — Identidad visual, accesibilidad y responsive** (R2, R5, R8, R9)
  - Crear la identidad deportiva definida en `design.md`, tarjetas, pasos visibles, controles de selección, foco visible, mensajes y diseño para móvil/escritorio.
  - Criterio de prueba: navegación por teclado y visualización correcta desde 360 px.

- [x] **T4 — Pruebas del frontend** (R1–R8)
  - Ampliar las pruebas para carga inicial, cancha sin horarios, error/reintento, validación y reserva.
  - Criterio de prueba: `npm test --prefix frontend` pasa sin errores.

- [x] **T5 — Validación y despliegue** (R1–R8)
  - Ejecutar pruebas, construir la imagen y validar el flujo contra AWS mediante GitHub Actions.
  - Criterio de prueba: el frontend publicado permite reservar sin IDs y la ejecución CI/CD termina correctamente.
