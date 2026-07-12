const express = require('express');
const router = express.Router();

// 1. Import your controller functions
const { 
  createBooking, 
  getBookings, 
  updateBookingStatus 
} = require('../controllers/bookingController');

// 2. Import the authentication middleware
const { protect } = require('../middleware/authMiddleware');

// --- Public Routes ---
// @route   POST /api/bookings
// @desc    Create a new booking (used by the frontend checkout)
router.post('/bookings', createBooking);


// --- Protected Admin Routes ---
// @route   GET /api/admin/bookings
// @desc    Get all bookings (used by the Admin dashboard)
router.get('/admin/bookings', protect, getBookings);

// @route   PUT /api/admin/bookings/:id/status
// @desc    Update booking status (e.g., mark as Paid or Confirmed)
router.put('/admin/bookings/:id/status', protect, updateBookingStatus);

module.exports = router;