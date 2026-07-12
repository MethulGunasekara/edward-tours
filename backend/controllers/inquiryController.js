const Inquiry = require('../models/Inquiry');

// @desc    Create a new inquiry (from tourist)
// @route   POST /api/inquiries
// @access  Public
const createInquiry = async (req, res) => {
  try {
    // In a later step, we will add express-rate-limit to this route 
    // to prevent spam bots from flooding our database.
    const newInquiry = await Inquiry.create(req.body);
    
    // 201 Created is the correct HTTP status for successfully creating a resource
    res.status(201).json(newInquiry);
  } catch (error) {
    res.status(400).json({ 
      message: 'Failed to submit inquiry. Please check your inputs.', 
      error: error.message 
    });
  }
};

// @desc    Get all inquiries
// @route   GET /api/admin/inquiries
// @access  Private (Admin)
const getInquiries = async (req, res) => {
  try {
    // The empty object {} means "find all". 
    // .sort({ createdAt: -1 }) sorts them from newest to oldest.
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
    
    res.status(200).json(inquiries);
  } catch (error) {
    res.status(500).json({ 
      message: 'Failed to fetch inquiries', 
      error: error.message 
    });
  }
};

module.exports = {
  createInquiry,
  getInquiries
};