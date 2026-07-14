const Package = require('../models/Package');
const MediaAsset = require('../models/MediaAsset');

// @desc    Pool of gallery images across all published packages,
//          used for the homepage mosaic section
// @route   GET /api/public/gallery
// @access  Public
const getGalleryImages = async (req, res) => {
  try {
    const publishedPackages = await Package.find({ status: 'Published' }).select('_id title');
    const packageIds = publishedPackages.map((p) => p._id);
    const titleById = Object.fromEntries(publishedPackages.map((p) => [p._id.toString(), p.title]));

    // MediaAsset has no timestamps field, so sort by _id descending —
    // ObjectIds embed their creation time, giving us "newest first" for free.
    const images = await MediaAsset.find({ packageId: { $in: packageIds }, type: 'image' })
      .sort({ _id: -1 })
      .limit(30);

    const withPackageTitle = images.map((img) => ({
      _id: img._id,
      cloudinaryUrl: img.cloudinaryUrl,
      packageTitle: titleById[img.packageId.toString()] || ''
    }));

    res.status(200).json(withPackageTitle);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch gallery images' });
  }
};

module.exports = { getGalleryImages };