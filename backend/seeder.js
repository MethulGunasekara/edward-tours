require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const AdminUser = require('./models/AdminUser');

const seedAdmin = async () => {
  try {
    // 1. Connect to MongoDB
    await connectDB();

    // 2. Check if an admin already exists to prevent duplicate seeding
    const adminExists = await AdminUser.findOne({ email: 'admin@wanderlust.com' });

    if (adminExists) {
      console.log('⚠️ Admin user already exists in the database.');
      process.exit(0);
    }

    // 3. Create the initial admin payload
    // Note: Because we set up a pre-save hook in our AdminUser model earlier,
    // this plain-text password will automatically be hashed by bcrypt before saving!
    const admin = new AdminUser({
      username: 'Main Administrator',
      email: 'edshantha@hotmal.com',
      passwordHash: '1234' 
    });

    // 4. Save to database
    await admin.save();
    
    console.log('✅ Admin user seeded successfully!');
    process.exit(0); // Exit process with success code
  } catch (error) {
    console.error('❌ Error seeding admin:', error);
    process.exit(1); // Exit process with failure code
  }
};

seedAdmin();