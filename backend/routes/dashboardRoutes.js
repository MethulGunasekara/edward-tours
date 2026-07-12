const express = require('express');
const router = express.Router();

const { getDashboardStats } = require('../controllers/dashboardController');

const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/admin/dashboard/stats
// @desc    Get aggregated statistics for the admin dashboard
// @access  Private (Admin)
router.get('/admin/dashboard/stats', protect, getDashboardStats);

module.exports = router;