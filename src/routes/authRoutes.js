const express = require('express')
const router = express.Router()
const { register, registerOwner, login, getUsers } = require('../controllers/authController')
const {protect} = require('../middlewares/authMiddleware');
const {authorize} = require('../middlewares/roleMiddleware');

// Rutas públicas (sin auth)
router.post('/register', register)
router.post('/register/owner', registerOwner)
router.post('/login', login)

// Rutas protegidas (requieren JWT + rol admin)
router.get('/users', protect, authorize('admin'), getUsers);

module.exports = router