//middleware es una función que se ejecuta entre la ruta y el controlador

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    try {
        let token

        // PASO 1: Revisar si el header Authorization existe y empieza con "Bearer"
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        // PASO 2: Extraer solo el token (la parte después de "Bearer ")
        token = req.headers.authorization.split(' ')[1]
        }

        // PASO 3: Si no hay token, rechazar
        if (!token) {
        return res.status(401).json({ message: 'No autorizado, token requerido' })
        }

        // PASO 4: Verificar el token (si es falso, lanza excepción)
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // decoded = { id: 'abc123', iat: 123, exp: 456 }

        // PASO 5: Buscar el usuario en BD (excluyendo password)
        req.user = await User.findById(decoded.id).select('-password')

        // PASO 6: Si el usuario no existe (fue borrado), rechazar
        if (!req.user) {
        return res.status(401).json({ message: 'Token inválido, usuario no encontrado' })
        }

        // PASO 7: Todo bien, pasar al controlador
        next()

    } catch (error) {
        res.status(401).json({ message: 'No autorizado, token inválido' })
    }
}

module.exports = { protect };