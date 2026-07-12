require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');

const packageRoutes = require('./routes/packageRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

connectDB();

// Global Middleware
app.use(helmet()); 
app.use(cors()); // We will restrict this to the frontend URL later
app.use(express.json()); // Intercepts requests and parses JSON into req.body

app.use('/api', packageRoutes);
app.use('/api', inquiryRoutes);
app.use('/api/auth', authRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});