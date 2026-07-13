require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const AdminUser = require('./models/AdminUser');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  const passwordHash = await bcrypt.hash('1234', 10);

  await AdminUser.create({
    username: 'admin',
    email: 'edwardtours.lk@gmail.com',
    passwordHash
  });

  console.log('Admin user created: username=admin, password=1234');
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});