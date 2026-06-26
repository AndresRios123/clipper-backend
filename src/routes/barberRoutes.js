const express = require('express');
const router = express.Router();
const { createBarber, getBarbers } = require('../controllers/barberController');
const { protect } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');

// El orden de middlewares es: autenticar (protect) -> autorizar (authorize) -> controlador
// protect: verifica el JWT y pone req.user
// authorize('admin'): verifica que req.user.rol sea 'admin'

router.post('/', protect, authorize('admin'), createBarber)
router.get('/', protect, authorize('admin'), getBarbers)

module.exports = router
