const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { 
    type: String, 
    enum: ['Cultural', 'Wildlife', 'Beach', 'Adventure', 'Hill Country'], 
    required: true 
  },
  summary: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Draft', 'Published', 'Archived'], 
    default: 'Draft' 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Package', packageSchema);