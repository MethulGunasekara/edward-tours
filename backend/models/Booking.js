const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  packageId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Package', 
    required: true 
  },
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  country: { type: String, required: true },
  travelDate: { type: Date, required: true },
  travelers: { type: Number, required: true, min: 1 },
  totalPrice: { type: Number, required: true },
  specialRequests: { type: String },
  bookingStatus: { 
    type: String, 
    enum: ['Pending', 'Confirmed', 'Cancelled'], 
    default: 'Pending' 
  },
  paymentStatus: { 
    type: String, 
    enum: ['Unpaid', 'Deposit Paid', 'Fully Paid'], 
    default: 'Unpaid' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);