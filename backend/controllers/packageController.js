const ItineraryDay = require('../models/ItineraryDay');
const Package = require('../models/Package');
const PricingTier = require('../models/PricingTier');
const MediaAsset = require('../models/MediaAsset');

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
// @desc    Get single package by slug
// @route   GET /api/public/packages/:slug
// @access  Public
const getPackageBySlug = async (req, res) => {
  try {
    // We use findOne instead of find to return a single object instead of an array
    const tourPackage = await Package.findOne({ 
      slug: req.params.slug, 
      status: 'Published' 
    });

    if (!tourPackage) {
      // 404 is the correct HTTP status code for a missing resource
      return res.status(404).json({ message: 'Package not found or not published' });
    }

    res.status(200).json(tourPackage);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching package detail' });
  }
};

// @desc    Add or update itinerary days for a package
// @route   POST /api/admin/packages/:id/itinerary
// @access  Private (Admin)
const addItinerary = async (req, res) => {
  try {
    const { id: packageId } = req.params;
    const itineraryDays = req.body; // We expect an array of day objects from the frontend

    // 1. Wipe existing days for this specific package to prevent duplicates
    await ItineraryDay.deleteMany({ packageId });

    // 2. Map through the array and attach the packageId to each day object
    const daysToInsert = itineraryDays.map(day => ({
      ...day,
      packageId
    }));

    // 3. Bulk insert the new days
    const savedDays = await ItineraryDay.insertMany(daysToInsert);

    res.status(201).json(savedDays);
  } catch (error) {
    res.status(400).json({ message: 'Failed to save itinerary', error: error.message });
  }
};

// @desc    Add or update pricing tiers for a package
// @route   POST /api/admin/packages/:id/pricing
// @access  Private (Admin)
const addPricingTiers = async (req, res) => {
  try {
    const { id: packageId } = req.params;
    const pricingTiers = req.body; // We expect an array of pricing objects from the frontend

    // 1. Wipe existing tiers for this specific package
    await PricingTier.deleteMany({ packageId });

    // 2. Map through the array and attach the packageId to each tier object
    const tiersToInsert = pricingTiers.map(tier => ({
      ...tier,
      packageId
    }));

    // 3. Bulk insert the new tiers
    const savedTiers = await PricingTier.insertMany(tiersToInsert);

    res.status(201).json(savedTiers);
  } catch (error) {
    res.status(400).json({ message: 'Failed to save pricing tiers', error: error.message });
  }
};

// @desc    Save Cloudinary URL references to the database
// @route   POST /api/admin/packages/:id/media
// @access  Private (Admin)
const addMedia = async (req, res) => {
  try {
    const { id: packageId } = req.params;
    const mediaItems = req.body; // Expects an array of media objects from frontend

    // Map through the array to ensure the packageId is attached to each asset
    const mediaToInsert = mediaItems.map(media => ({
      ...media,
      packageId
    }));

    // Bulk insert the new media references
    const savedMedia = await MediaAsset.insertMany(mediaToInsert);

    res.status(201).json(savedMedia);
  } catch (error) {
    res.status(400).json({ message: 'Failed to save media assets', error: error.message });
  }
};

// @desc    Update a package's base details
// @route   PUT /api/admin/packages/:id
// @access  Private (Admin)
const updatePackage = async (req, res) => {
  try {
    // findByIdAndUpdate takes 3 arguments: ID, the data to update, and an options object
    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id,
      req.body,
      { 
        new: true, // Returns the modified document rather than the original
        runValidators: true // Ensures the update adheres to our Mongoose schema rules
      }
    );

    if (!updatedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }

    res.status(200).json(updatedPackage);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update package', error: error.message });
  }
};

// @desc    Delete a package
// @route   DELETE /api/admin/packages/:id
// @access  Private (Admin)
const deletePackage = async (req, res) => {
  try {
    const tourPackage = await Package.findById(req.params.id);

    if (!tourPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }

    // Note for scale: In a production environment, we would also query and delete
    // related ItineraryDay, PricingTier, and MediaAsset documents here to prevent bloat.
    await tourPackage.deleteOne();

    res.status(200).json({ message: 'Package and base details removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting package' });
  }
};

module.exports = {
  getPackages,
  createPackage,
  getPackageBySlug,
  addItinerary,
  addPricingTiers,
  addMedia,
  updatePackage, 
  deletePackage  
};