const express = require('express');
const router = express.Router();
const { loginUser, registerUser, updateProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', loginUser);
router.post('/register', registerUser);
router.put('/profile', protect, updateProfile);

module.exports = router;
