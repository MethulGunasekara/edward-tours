const Booking = require('../models/Booking');

// @desc    Create a new booking (deposit is auto-calculated as 30% of total)
// @route   POST /api/bookings
// @access  Public
const createBooking = async (req, res) => {
  try {
    const depositAmount = Number((req.body.totalPrice * 0.3).toFixed(2));
    const newBooking = await Booking.create({ ...req.body, depositAmount });
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({
      message: 'Failed to create booking. Please check your inputs.',
      error: error.message
    });
  }
};

// @desc    Get all bookings (Admin CMS)
// @route   GET /api/admin/bookings
// @access  Private (Admin)
const getBookings = async (req, res) => {
  try {
    // Fetch all bookings, sort by newest first, and populate the package details.
    // We pass a second string argument to populate() to only grab the 'title' and 'slug' 
    // to keep the payload lightweight.
    const bookings = await Booking.find({})
      .populate('packageId', 'title slug')
      .sort({ createdAt: -1 });
      
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
};

// @desc    Update booking status (e.g., Pending -> Confirmed)
// @route   PUT /api/admin/bookings/:id/status
// @access  Private (Admin)
const updateBookingStatus = async (req, res) => {
  try {
    const { bookingStatus, paymentStatus } = req.body;
    
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { bookingStatus, paymentStatus },
      { new: true, runValidators: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update booking status' });
  }
};

module.exports = {
  createBooking,
  getBookings,
  updateBookingStatus
};