const express = require('express');
const { getPrivateData } = require('../controllers/privateControllers');
const { protect } = require('../middleware/authHandler');
const router = express.Router();

router.route('/get/userdata').get(protect, getPrivateData);

module.exports = router;