const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // We will define MONGO_URI in our .env file in the next step
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    process.exit(1); // Exit the Node process with a failure code
  }
};

module.exports = connectDB;