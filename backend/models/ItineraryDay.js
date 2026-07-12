const mongoose = require('mongoose');

const itineraryDaySchema = new mongoose.Schema({
  packageId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Package', 
    required: true 
  },
  dayNumber: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  overnightLocation: { type: String, required: true },
  mealsIncluded: { type: String, required: true }
});

module.exports = mongoose.model('ItineraryDay', itineraryDaySchema);