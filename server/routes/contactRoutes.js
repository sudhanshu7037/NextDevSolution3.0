const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { submitContact, getContacts } = require('../controllers/contactController');

router.post('/', submitContact);
router.get('/', protect, getContacts);

module.exports = router;
