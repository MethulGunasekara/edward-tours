const express = require('express');
const router = express.Router();
const { getGalleryImages } = require('../controllers/galleryController');

router.get('/public/gallery', getGalleryImages);

module.exports = router;