const SiteSettings = require('../models/SiteSettings');

// @desc    Get public site settings (currently just the homepage hero video)
// @route   GET /api/public/settings
// @access  Public
const getSettings = async (req, res) => {
  try {
    const settings = await SiteSettings.findOne({});
    // No settings saved yet is not an error — homepage should render fine
    // with no hero video, so return a safe default instead of a 404.
    res.status(200).json(settings || { heroVideoUrl: '' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch site settings' });
  }
};

// @desc    Update site settings (upsert — creates the singleton on first save)
// @route   PUT /api/admin/settings
// @access  Private (Admin)
const updateSettings = async (req, res) => {
  try {
    const settings = await SiteSettings.findOneAndUpdate(
      {},
      { $set: req.body },
      { new: true, upsert: true, runValidators: true }
    );
    res.status(200).json(settings);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update site settings', error: error.message });
  }
};

module.exports = { getSettings, updateSettings };