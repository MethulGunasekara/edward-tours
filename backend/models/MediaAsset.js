const mongoose = require('mongoose');

const mediaAssetSchema = new mongoose.Schema({
  packageId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Package', 
    required: true 
  },
  type: { 
    type: String, 
    enum: ['image', 'video'], 
    required: true 
  },
  cloudinaryUrl: { 
    type: String, 
    required: true 
  },
  sortOrder: { 
    type: Number, 
    required: true 
  },
  isHero: { 
    type: Boolean, 
    default: false 
  }
});

module.exports = mongoose.model('MediaAsset', mediaAssetSchema);