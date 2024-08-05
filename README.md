# Tasker - TLP II

## Setup

1. Clona el repositorio en tu máquina local usando `git clone https://github.com/FacundoMajda/crud-tasks-backend`.
2. Navega a la carpeta del proyecto usando `cd crud-tasks-backend`.
3. Instala todas las dependencias necesarias usando `npm i`.
4. Crea una base de datos MySQL y luego configura las variables de entorno de la base de datos en el archivo `.env`.

## Init

Para iniciar el servidor, sigue estos pasos:

1. Asegúrate de que estás en la carpeta del proyecto en la terminal.
2. Ejecuta `npm run dev`. Esto iniciará el servidor en el puerto que hayas configurado.

## Endpoints

- `GET /tasks`: Obtiene todas las tareas.
- `GET /tasks/:id`: Obtiene una tarea por su ID.
- `POST /tasks`: Crea una nueva tarea. Requiere un cuerpo de solicitud con los campos `title`, `description` y `done`.
- `PUT /tasks/:id`: Actualiza una tarea existente. Requiere un cuerpo de solicitud con los campos `title`, `description` y `done`.
- `DELETE /tasks/:id`: Elimina una tarea por su ID.
