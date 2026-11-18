# Diseño — Rediseño del frontend de reservas

## Decisiones

- Mantener HTML, CSS y JavaScript modular sin introducir React ni otra dependencia.
- Reutilizar `frontend/api.js`; los endpoints y payloads permanecen sin cambios.
- Convertir la pantalla en un flujo visual de tres pasos: **1. Elige cancha**, **2. Elige horario**, **3. Completa tus datos y reserva**.
- Cargar canchas al iniciar y conservar un botón `Actualizar` para reintentos manuales.
- Renderizar tarjetas de cancha con un botón o control de selección. Al seleccionar, cargar horarios y representarlos como opciones legibles; guardar `courtId` y `scheduleId` en el estado, no en campos editables.
- Mantener el formulario de usuario y reserva en una sola acción guiada. El botón de reserva se habilita únicamente cuando hay usuario válido, cancha y horario seleccionados.
- Mantener mensajes accesibles mediante una región `aria-live` y estados visuales de carga, vacío, error y éxito.

## Dirección visual

- Usar una identidad de complejo deportivo: verde cancha como color principal, azul oscuro para navegación y texto, y un acento amarillo para disponibilidad y acciones importantes.
- Incorporar una cabecera tipo hero con el nombre del servicio, una frase breve orientada a la acción y un indicador visual de disponibilidad; evitar una página plana de formularios.
- Presentar las canchas como tarjetas con nombre destacado, deporte, ubicación y una acción primaria `Ver horarios`; cada tarjeta debe tener estados visuales para seleccionada, disponible y sin horarios.
- Mostrar el flujo como pasos numerados y visibles, con el paso actual resaltado: `Cancha → Horario → Datos → Confirmación`.
- Usar botones con verbos claros (`Ver horarios`, `Elegir horario`, `Confirmar reserva`) y eliminar textos técnicos como `ID de cancha`, `ID de horario` o mensajes de API.
- Mantener suficiente espacio, bordes suaves, contraste AA, estados de foco y una composición de una columna en móvil y dos columnas cuando el ancho lo permita.
- No añadir imágenes externas obligatorias ni una librería visual pesada; la identidad debe construirse con CSS y elementos semánticos para que el contenedor siga siendo simple.

## Estado del cliente

```text
courts: []
selectedCourt: null
schedules: []
selectedSchedule: null
user: null
status: idle | loading | error | success
```

## Flujo

1. `loadCourts()` consulta `GET /courts` al iniciar.
2. `selectCourt(court)` consulta `GET /courts/{courtId}/schedules`.
3. El usuario elige un horario mostrado con fecha y horas.
4. El formulario valida nombre y correo.
5. `createUser()` llama `POST /users` y guarda el ID retornado.
6. `createReservation()` llama `POST /reservations` con `userId`, `courtId` y `scheduleId`.
7. Se muestra la confirmación y se actualiza la vista sin exponer IDs técnicos.

## Verificación

- Pruebas unitarias del comportamiento de carga, selección, validación y reserva con `createApiClient` simulado.
- Prueba manual contra el DNS del frontend en AWS.
- `npm test --prefix frontend` antes de construir la imagen.
