//Rutas para citas
const express = require('express');
const router = express.Router();
const { createAppointment, getAppointments, getAppointmentById, updateAppointment, deleteAppointment } = require('../controllers/appointmentController');
const { protect } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');

router.get('/citas', protect, authorize('admin', 'barbero'), getAppointments)
router.post('/citas', protect, authorize('admin', 'barbero'), createAppointment)
router.get('/citas/:id', protect, authorize('admin', 'barbero'), getAppointmentById)
router.put('/citas/:id', protect, authorize('admin', 'barbero'), updateAppointment)
router.delete('/citas/:id', protect, authorize('admin'), deleteAppointment)

module.exports = router
