const express = require('express')
const router = express.Router()
const { register, login, getUsers } = require('../controllers/authController')
const {protect} = require('../middlewares/authMiddleware');
const {authorize} = require('../middlewares/roleMiddleware');

router.get('/users', protect, authorize('admin'), getUsers);
router.post('/register', register)
router.post('/login', login)

module.exports = router