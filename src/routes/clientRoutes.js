//Rutas para clientes
const express = require('express');
const router = express.Router();
const {createClient, getClients, getClientById, updateClient, deleteClient} = require('../controllers/clientController');
const { protect } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');

router.get('/clients', protect, authorize('admin', 'barbero'), getClients)
router.post('/clients', protect, authorize('admin', 'barbero'), createClient)
router.get('/clients/:id', protect, authorize('admin', 'barbero', getClientById))
router.put('/clients/:id', protect, authorize('admin', 'barbero'), updateClient)
router.delete('/clients/:id', protect, authorize('admin', 'barbero'), deleteClient)

module.exports = router