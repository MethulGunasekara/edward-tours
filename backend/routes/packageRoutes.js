const express = require('express');
const router = express.Router();
const { getPackages, createPackage } = require('../controllers/packageController');

// @route   GET /api/public/packages
// @desc    Get all published packages (Public)
router.get('/public/packages', getPackages);

// @route   POST /api/admin/packages
// @desc    Create a new base package (Admin CMS)
router.post('/admin/packages', createPackage);

module.exports = router;