const express = require('express');
const router = express.Router();

const { 
  getPackages, 
  createPackage, 
  getPackageBySlug,
  addItinerary,
  addPricingTiers,
  addMedia,
  updatePackage,
  deletePackage
} = require('../controllers/packageController');

const { protect } = require('../middleware/authMiddleware');

// Public Routes
router.get('/public/packages', getPackages);
router.get('/public/packages/:slug', getPackageBySlug);

// Protected Admin Routes
router.post('/admin/packages', protect, createPackage);
router.put('/admin/packages/:id', protect, updatePackage);
router.delete('/admin/packages/:id', protect, deletePackage);

router.post('/admin/packages/:id/itinerary', protect, addItinerary);
router.post('/admin/packages/:id/pricing', protect, addPricingTiers);
router.post('/admin/packages/:id/media', protect, addMedia);

module.exports = router;