# Node + Express + Cloudinary + Manejo de Archivos

Proyecto para la "Hackathon Halloween" organizada por Midudev y Cloudinary.
La consigna del proyecto es usar los servicios de Cloudinary para generar una aplicación con temática "Halloween 🎃".

ℹ️ Proyecto Frontend: [Repositorio](https://github.com/felipejoq/halloween-masks)

## Tecnologías utilizadas

- Node.js
- Express
- Cloudinary
- PG (PostgreSQL)
- express-fileupload
- entre otras...

## Instalación

1. Clonar el repositorio
2. Instalar las dependencias con `npm install`
3. Crear un archivo `.env` en la raíz del proyecto con las variables de entorno. Tomar como ejemplo el archivo `.env.example`

Nota: considerar que la variable de entorno PASS_GET_TOKEN es una contraseña encriptada con el paquete argon2 y así debe ser guardada en el archivo `.env`

## Servicios que incluye

- Login: para obtener un token de acceso. Se debe enviar un POST a la ruta `/login` con un body que contenga un email y una contraseña. Si el usuario existe, se devolverá un token que deberá ser enviado en el header de las peticiones que requieran autenticación.

Request de ejemplo:
```http request
POST http://localhost:3000/login
Content-Type: application/json

{
    "user": "usurio-definido-en-el-archivo-env",
    "pass": "password-definido-en-el-archivo-env-sin-encriptar"
}
```

- Upload de imágenes: se puede subir una imagen a Cloudinary. Se debe enviar un POST a la ruta `/upload` con un body que contenga un archivo de tipo `file`.

Request de ejemplo:
```http request
### enviar un form con un input de tipo file con el nombre "file" en el body
POST https://examples.http-client.intellij.net/post
Content-Type: multipart/form-data; boundary=WebAppBoundary
```

- Obtener una imagen posteada: se puede obtener una imagen posteada en Cloudinary. Se debe enviar un GET a la ruta `/post-images/:public_id` donde `:public_id` es el ID público de la imagen en Cloudinary (sin el folder).

Request de ejemplo:
```http request
GET http://localhost:3000/post-images/{public_id}
```

## Para la base de datos
La base de datos debe contener una tabla llamada `post_images` con la siguiente estructura:

```sql
CREATE TABLE post_images (
    id SERIAL PRIMARY KEY,
    secure_url TEXT NOT NULL,
    public_id TEXT NOT NULL,
    face_masks TEXT[] NOT NULL
);
```

## Para ejecutar el proyecto
Ejecutar el comando `npm run dev` para iniciar el servidor en modo desarrollo.

## About me
- [Felipe](https://uncodigo.com/)
