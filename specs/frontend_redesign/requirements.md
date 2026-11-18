# Requisitos — Rediseño del frontend de reservas

## Alcance

Mejorar únicamente la interfaz estática existente (`frontend/`) sin cambiar los contratos de los dos microservicios.

## Requisitos funcionales

- **R1 — Carga inicial:** Cuando el usuario abra la aplicación, el frontend DEBE solicitar automáticamente la lista de canchas y mostrar un estado de carga mientras espera.
- **R2 — Canchas comprensibles:** Cuando la lista se reciba correctamente, el frontend DEBE mostrar cada cancha con nombre, deporte y ubicación en una tarjeta visible; NO DEBE mostrar IDs técnicos como información principal.
- **R3 — Selección de cancha:** Cuando el usuario seleccione una cancha, el frontend DEBE cargar sus horarios disponibles y mostrar una opción seleccionable por fecha y rango horario.
- **R4 — Reserva guiada:** Cuando el usuario complete nombre, correo, cancha y horario, el frontend DEBE enviar la creación del usuario y luego la reserva usando los IDs internamente, sin pedirlos manualmente.
- **R5 — Estados:** Mientras una operación esté en curso, el control que la inició DEBE reflejarlo y evitar envíos duplicados; al terminar, DEBE mostrarse un mensaje de éxito o error comprensible.
- **R6 — Validación:** Si faltan datos o el correo no es válido, el frontend DEBE indicar el campo que debe corregirse antes de llamar a la API.
- **R7 — Recuperación:** Si falla la carga de canchas u horarios, el frontend DEBE mostrar la causa en lenguaje sencillo y ofrecer una acción para reintentar.
- **R8 — Accesibilidad y responsive:** La interfaz DEBE conservar etiquetas asociadas a los campos, foco visible, navegación por teclado y una presentación usable en pantallas de 360 px o más.
- **R9 — Identidad visual:** La interfaz DEBE tener una identidad visual deportiva propia, con jerarquía visual, colores y componentes consistentes; NO DEBE parecer un formulario HTML genérico ni depender de estilos predeterminados del navegador.

## No incluido

- No se modifica el modelo de datos ni los endpoints backend.
- No se añade un framework frontend.
- No se incluye autenticación ni panel administrativo.

## Criterios de aceptación

1. Una persona puede abrir la página, elegir la cancha `Cancha Central`, elegir un horario y reservar sin escribir ningún ID.
2. La interfaz comunica carga, error, éxito y reserva confirmada.
3. Las pruebas cubren carga de canchas, selección de horario, validación y envío de reserva.
4. La pantalla comunica visualmente que es un servicio de reservas deportivas local y mantiene la misma identidad en escritorio y móvil.
