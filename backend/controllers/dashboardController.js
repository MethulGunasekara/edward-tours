const Package = require('../models/Package');
const Inquiry = require('../models/Inquiry');
const Booking = require('../models/Booking');

// @desc    Get admin dashboard statistics
// @route   GET /api/admin/dashboard/stats
// @access  Private (Admin)
const getDashboardStats = async (req, res) => {
  try {
    // Run all database queries in parallel for maximum performance
    const [
      totalPackages,
      activeInquiries,
      totalBookings,
      confirmedBookings
    ] = await Promise.all([
      Package.countDocuments(),
      Inquiry.countDocuments({ status: 'New' }),
      Booking.countDocuments(),
      Booking.find({ bookingStatus: 'Confirmed' })
    ]);

    // Calculate total revenue from confirmed bookings
    const totalRevenue = confirmedBookings.reduce((sum, booking) => {
      return sum + booking.totalPrice;
    }, 0);

    res.status(200).json({
      totalPackages,
      activeInquiries,
      totalBookings,
      totalRevenue,
      recentBookings: confirmedBookings.slice(0, 5) // Send the 5 most recent for a quick-glance widget
    });

  } catch (error) {
    res.status(500).json({ 
      message: 'Failed to fetch dashboard statistics', 
      error: error.message 
    });
  }
};

module.exports = { getDashboardStats };