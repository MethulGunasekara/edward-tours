const express = require('express');
const router = express.Router();

const { getSettings, updateSettings } = require('../controllers/settingsController');
const { protect } = require('../middleware/authMiddleware');

router.get('/public/settings', getSettings);
router.put('/admin/settings', protect, updateSettings);

module.exports = router;