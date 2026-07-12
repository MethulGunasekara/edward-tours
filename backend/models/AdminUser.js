const mongoose = require('mongoose');

const adminUserSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  passwordHash: { 
    type: String, 
    required: true 
  }
}, { 
  // Mongoose will automatically manage createdAt and updatedAt fields
  timestamps: true 
});

module.exports = mongoose.model('AdminUser', adminUserSchema);