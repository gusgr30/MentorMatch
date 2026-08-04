# MentorMatch

Backend de MentorMatch: API REST en Node.js/Express para conectar mentores y alumnos, gestionar usuarios, reservas de sesiones y generación de descripciones de perfil mediante IA (Google Gemini).

## Stack

- **Node.js** con módulos ES (`type: module`)
- **Express 5**
- **MongoDB** (driver oficial `mongodb`)
- **JWT** (`jsonwebtoken`) para autenticación
- **bcryptjs** para hash de contraseñas
- **Joi** para validación de datos
- **Multer** para carga de imágenes de perfil
- **Nodemailer** para envío de emails (confirmación de reservas)
- **@google/genai** (Gemini) para generación de descripciones de perfil
- **Mocha + Chai + Supertest** para testing

## Estructura del proyecto

```
├── controller/       # Lógica de las rutas (usuario, auth, reserva, ia)
├── middleware/        # Autenticación (JWT) y carga de archivos (Multer)
├── model/
│   ├── DAO/            # Acceso a datos (usuarios, reservas)
│   ├── constants/      # Constantes compartidas (ej. SKILLS)
│   ├── DBMongo.js      # Conexión a MongoDB
│   ├── Usuario.js
│   └── Reserva.js
├── router/             # Definición de rutas Express por recurso
├── service/            # Servicios (auth, email, ia, reserva, usuario)
├── test/               # Tests unitarios, de integración y e2e
├── uploads/            # Imágenes de perfil subidas
├── config.js           # Carga de variables de entorno
├── server.js           # Clase Server (configuración de Express)
└── index.js            # Punto de entrada de la aplicación
```

## Requisitos previos

- Node.js 18+
- Una instancia de MongoDB (local o remota)

## Instalación

```bash
npm install
```

## Configuración

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

| Variable | Descripción |
|---|---|
| `PORT` | Puerto donde escucha el servidor (default `8080`) |
| `MODELO_PERSISTENCIA` | `MONGODB` para conectar a la base de datos; vacío para correr sin persistencia |
| `STRCNX` | Cadena de conexión a MongoDB |
| `BASE` | Nombre de la base de datos |
| `JWT_SECRET` | Secreto usado para firmar/verificar tokens JWT |
| `ETHEREAL_USER` / `ETHEREAL_PASS` | Credenciales de [Ethereal](https://ethereal.email/) para envío de emails de prueba |
| `FRONT_URL` | URL del frontend, usada en los links de los emails |
| `GEMINI_API_KEY` | API key de Google Gemini para generar descripciones con IA |

## Uso

```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
```

El servidor queda disponible en `http://localhost:<PORT>`.

## Testing

```bash
npm test                    # corre todos los tests (*.test.js)
npm run test-e2e-api-int    # tests e2e de integración
npm run test-e2e-api-ext    # tests e2e externos
npm run test-unit-api-mail  # tests de email de confirmación
npm run test-manual         # script manual de prueba de la API
```

## Endpoints principales

### Auth (`/api/auth`)
| Método | Ruta | Descripción |
|---|---|---|
| POST | `/login` | Login de usuario, devuelve JWT |
| GET | `/me` | Datos del usuario autenticado (requiere token) |

### Usuarios (`/api/usuarios`)
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/` o `/:id` | Obtener usuario(s) (requiere token) |
| POST | `/` | Registrar usuario (con foto de perfil opcional) |
| PUT | `/:id` | Actualizar usuario (requiere token) |
| DELETE | `/:id` | Eliminar usuario |

### Reservas (`/api/reservas`)
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/usuario/:userId` | Reservas de un usuario (requiere token) |
| GET | `/` o `/:id` | Obtener reserva(s) (requiere token) |
| POST | `/` | Crear reserva (requiere token) |
| PUT | `/:id` | Actualizar reserva (requiere token) |
| PUT | `/:id/cancelar` | Cancelar reserva (requiere token) |
| PUT | `/:id/confirmar` | Confirmar reserva (requiere token) |

### IA (`/api/ia`)
| Método | Ruta | Descripción |
|---|---|---|
| POST | `/generar-descripcion` | Genera una descripción de perfil con Gemini |

### Config (`/api/config`)
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/skills` | Lista de skills/habilidades disponibles |

### Otros
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/health` | Healthcheck del servidor |
| GET | `/uploads/:archivo` | Acceso estático a imágenes de perfil subidas |

## Autenticación

Las rutas protegidas requieren un header `Authorization: Bearer <token>` con un JWT obtenido en `/api/auth/login`.
