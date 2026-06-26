# Clipper - Backend

## Routes

### Health

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/api/health` | ❌ | Server health check |

### Auth (`/api/auth`)

| Method | Route | Auth | Role | Body (JSON) | Description |
|--------|-------|------|------|-------------|-------------|
| POST | `/api/auth/register` | ❌ | — | `{ "nombre": "string", "email": "string", "password": "string", "rol": "admin \| barbero" }` | Register new user |
| POST | `/api/auth/register/owner` | ❌ | — | `{ "nombre": "string", "email": "string", "password": "string", "barberia": { "nombre": "string*", "direccion": "string*", "telefono": "string*", "email": "string*" } }` | Register owner + create barbershop |
| POST | `/api/auth/login` | ❌ | — | `{ "email": "string", "password": "string" }` | Login, returns JWT |
| GET | `/api/auth/users` | ✅ | admin | — | List all users |

### Clients (`/api/clients`)

| Method | Route | Auth | Role | Body (JSON) | Description |
|--------|-------|------|------|-------------|-------------|
| GET | `/api/clients` | ✅ | admin, barbero | — | List all clients |
| POST | `/api/clients` | ✅ | admin, barbero | `{ "nombre": "string*", "telefono": "string*", "email": "string?", "direccion": "string?", "notas": "string?" }` | Create client |
| GET | `/api/clients/:id` | ✅ | admin, barbero | — | Get client by ID |
| PUT | `/api/clients/:id` | ✅ | admin, barbero | `{ "nombre"?, "telefono"?, "email"?, "direccion"?, "notas"? }` | Update client |
| DELETE | `/api/clients/:id` | ✅ | admin, barbero | — | Delete client |

### Barbers (`/api/barbers`)

| Method | Route | Auth | Role | Body (JSON) | Description |
|--------|-------|------|------|-------------|-------------|
| POST | `/api/barbers` | ✅ | admin | `{ "nombre": "string*", "email": "string*", "password": "string*" }` | Create barber (linked to admin's barbershop) |
| GET | `/api/barbers` | ✅ | admin | — | List barbers of my barbershop |

> `*` = required | `?` = optional