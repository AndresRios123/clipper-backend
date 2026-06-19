//Rutas para clientes
const express = require('express');
const router = express.Router();
const {register, getClients} = require('../controllers/clientController');
const { protect } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');

router.get('/clients', protect, authorize('admin'))
router.post('/register/client', register)

module.exports = router