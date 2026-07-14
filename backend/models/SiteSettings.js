const mongoose = require('mongoose');

// Singleton document — there is only ever one of these in the collection.
const siteSettingsSchema = new mongoose.Schema({
  heroVideoUrl: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);