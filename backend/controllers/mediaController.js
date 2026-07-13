const cloudinary = require('../config/cloudinary');

// @desc    Generate a signed payload so the admin's browser can upload
//          directly to Cloudinary without exposing our API secret client-side
// @route   GET /api/admin/media/signature
// @access  Private (Admin)
const getUploadSignature = (req, res) => {
  try {
    const timestamp = Math.round(Date.now() / 1000);
    const folder = 'edward-tours';

    // Only params listed here are covered by the signature — the frontend
    // must send back exactly these same values or Cloudinary will reject the upload.
    const paramsToSign = { timestamp, folder };

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET
    );

    res.status(200).json({
      signature,
      timestamp,
      folder,
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate upload signature' });
  }
};

module.exports = { getUploadSignature };