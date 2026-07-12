const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  packageId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Package', 
    default: null // Allow null for general inquiries not tied to a specific tour
  },
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  country: { type: String, required: true },
  preferredDates: { type: Date, required: true },
  groupSize: { type: Number, required: true },
  message: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['New', 'Quoted', 'Confirmed', 'Declined'], 
    default: 'New' 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Inquiry', inquirySchema);