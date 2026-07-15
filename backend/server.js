require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');

const packageRoutes = require('./routes/packageRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const mediaRoutes = require('./routes/mediaRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const healthRoutes = require('./routes/healthRoutes');

const app = express();

connectDB();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api', packageRoutes);
app.use('/api', inquiryRoutes);
app.use('/api', bookingRoutes);
app.use('/api', dashboardRoutes);
app.use('/api', mediaRoutes);
app.use('/api', settingsRoutes);
app.use('/api', galleryRoutes);
app.use('/api', paymentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', healthRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});