const Package = require('../models/Package');

// @desc    Get all published packages (Public Marketing Site)
// @route   GET /api/public/packages
// @access  Public
const getPackages = async (req, res) => {
  try {
    // We only want tourists to see 'Published' packages
    const packages = await Package.find({ status: 'Published' });
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ message: 'Server Error trying to fetch packages' });
  }
};

// @desc    Create a new base package (Admin CMS)
// @route   POST /api/admin/packages
// @access  Private (Admin) - We will secure this with JWT later
const createPackage = async (req, res) => {
  try {
    // req.body contains the JSON payload intercepted by express.json()
    const newPackage = await Package.create(req.body);
    res.status(201).json(newPackage);
  } catch (error) {
    // A 400 Bad Request is returned if Mongoose validation fails (e.g., missing required fields)
    res.status(400).json({ message: 'Invalid package data', error: error.message });
  }
};

module.exports = {
  getPackages,
  createPackage
};