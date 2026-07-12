const mongoose = require('mongoose');

const pricingTierSchema = new mongoose.Schema({
  packageId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Package', 
    required: true 
  },
  groupSizeLabel: { type: String, required: true }, // e.g., "Couples (1-2 Pax)", "Families (4-6 Pax)"
  minPax: { type: Number, required: true },
  maxPax: { type: Number, required: true },
  pricePerPersonUSD: { type: Number, required: true }
});

module.exports = mongoose.model('PricingTier', pricingTierSchema);