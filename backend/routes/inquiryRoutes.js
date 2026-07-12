const express = require('express');
const router = express.Router();

const { createInquiry, getInquiries } = require('../controllers/inquiryController');
const { protect } = require('../middleware/authMiddleware');

const rateLimit = require('express-rate-limit');// Rate limiting middleware to prevent spam bots from flooding the database

const inquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 inquiry submissions per `window` (here, per 15 minutes)
  message: {
    message: 'Too many inquiries sent from this IP, please try again after 15 minutes.'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// @route   POST /api/inquiries
// @desc    Create a new inquiry from a visitor
// @access  Public
router.post('/inquiries', inquiryLimiter, createInquiry);

// @route   GET /api/admin/inquiries
// @desc    Get all inquiries sorted by newest
// @access  Private (Admin)
router.get('/admin/inquiries', protect, getInquiries);

module.exports = router;