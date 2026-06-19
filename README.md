# Routes:

## Authentication

- Register
   - Método: POST
   - URL: http://localhost:3000/api/auth/register
        Body → JSON:
        {
          "nombre": "Barbero 1",
          "email": "barbero1@mail.com",
          "password": "123456"
        }


- Login:
  - Método: POST
  - URL: http://localhost:3000/api/auth/login
      Body → JSON:
      {
        "email": "barbero1@mail.com",
        "password": "123456"
      }


- Get All Users (requires Admin LogIn):
  - Métofo: GET
  - URL: http://localhost:3000/api/auth/users
  - Headers: - Header: Authorization - Value: Bearer <token>
  
