const express = require('express');
const router = express.Router();

const { getUploadSignature } = require('../controllers/mediaController');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/admin/media/signature
// @desc    Get a signed Cloudinary upload payload
// @access  Private (Admin)
router.get('/admin/media/signature', protect, getUploadSignature);

module.exports = router;