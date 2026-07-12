const ItineraryDay = require('../models/ItineraryDay');
const Package = require('../models/Package');
const PricingTier = require('../models/PricingTier');
const MediaAsset = require('../models/MediaAsset');

// @desc    Get all published packages (Public Marketing Site)
// @route   GET /api/public/packages
// @access  Public
const getPackages = async (req, res) => {
  try {
    const packages = await Package.find({ status: 'Published' }).sort({ createdAt: -1 });
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ message: 'Server Error trying to fetch packages' });
  }
};

// @desc    Get every package regardless of status (Admin CMS list)
// @route   GET /api/admin/packages
// @access  Private (Admin)
const getAllPackagesAdmin = async (req, res) => {
  try {
    const packages = await Package.find({}).sort({ createdAt: -1 });
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ message: 'Server Error trying to fetch packages' });
  }
};

// @desc    Create a new base package (Admin CMS)
// @route   POST /api/admin/packages
// @access  Private (Admin)
const createPackage = async (req, res) => {
  try {
    const newPackage = await Package.create(req.body);
    res.status(201).json(newPackage);
  } catch (error) {
    res.status(400).json({ message: 'Invalid package data', error: error.message });
  }
};

// @desc    Get single published package by slug, with itinerary/pricing/media attached
// @route   GET /api/public/packages/:slug
// @access  Public
const getPackageBySlug = async (req, res) => {
  try {
    const tourPackage = await Package.findOne({
      slug: req.params.slug,
      status: 'Published'
    });

    if (!tourPackage) {
      return res.status(404).json({ message: 'Package not found or not published' });
    }

    // Itinerary/pricing/media live in separate collections, so the detail
    // page needs all three merged onto the base package before it's useful.
    const [itinerary, pricingTiers, media] = await Promise.all([
      ItineraryDay.find({ packageId: tourPackage._id }).sort({ dayNumber: 1 }),
      PricingTier.find({ packageId: tourPackage._id }).sort({ minPax: 1 }),
      MediaAsset.find({ packageId: tourPackage._id }).sort({ sortOrder: 1 })
    ]);

    res.status(200).json({ ...tourPackage.toObject(), itinerary, pricingTiers, media });
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching package detail' });
  }
};

// @desc    Get a single package by ID with itinerary/pricing/media (Admin edit screen)
// @route   GET /api/admin/packages/:id
// @access  Private (Admin)
const getPackageByIdAdmin = async (req, res) => {
  try {
    const tourPackage = await Package.findById(req.params.id);
    if (!tourPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }

    const [itinerary, pricingTiers, media] = await Promise.all([
      ItineraryDay.find({ packageId: tourPackage._id }).sort({ dayNumber: 1 }),
      PricingTier.find({ packageId: tourPackage._id }).sort({ minPax: 1 }),
      MediaAsset.find({ packageId: tourPackage._id }).sort({ sortOrder: 1 })
    ]);

    res.status(200).json({ ...tourPackage.toObject(), itinerary, pricingTiers, media });
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching package' });
  }
};

// @desc    Add or update itinerary days for a package
// @route   POST /api/admin/packages/:id/itinerary
// @access  Private (Admin)
const addItinerary = async (req, res) => {
  try {
    const { id: packageId } = req.params;
    const itineraryDays = req.body;

    await ItineraryDay.deleteMany({ packageId });
    const daysToInsert = itineraryDays.map((day) => ({ ...day, packageId }));
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
    const pricingTiers = req.body;

    await PricingTier.deleteMany({ packageId });
    const tiersToInsert = pricingTiers.map((tier) => ({ ...tier, packageId }));
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
    const mediaItems = req.body;

    await MediaAsset.deleteMany({ packageId });
    const mediaToInsert = mediaItems.map((media) => ({ ...media, packageId }));
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
    const updatedPackage = await Package.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }

    res.status(200).json(updatedPackage);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update package', error: error.message });
  }
};

// @desc    Delete a package (cascades to itinerary/pricing/media)
// @route   DELETE /api/admin/packages/:id
// @access  Private (Admin)
const deletePackage = async (req, res) => {
  try {
    const tourPackage = await Package.findById(req.params.id);
    if (!tourPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }

    await Promise.all([
      ItineraryDay.deleteMany({ packageId: tourPackage._id }),
      PricingTier.deleteMany({ packageId: tourPackage._id }),
      MediaAsset.deleteMany({ packageId: tourPackage._id })
    ]);

    await tourPackage.deleteOne();

    res.status(200).json({ message: 'Package and related data removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting package' });
  }
};

module.exports = {
  getPackages,
  getAllPackagesAdmin,
  createPackage,
  getPackageBySlug,
  getPackageByIdAdmin,
  addItinerary,
  addPricingTiers,
  addMedia,
  updatePackage,
  deletePackage
};