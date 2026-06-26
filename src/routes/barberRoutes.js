const express = require('express');
const router = express.Router();
const { createBarber, getBarbers } = require('../controllers/barberController');
const { protect } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');

router.post('/', protect, authorize('admin'), createBarber)
router.get('/', protect, authorize('admin'), getBarbers)

module.exports = router
