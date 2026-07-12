require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

// Global Middleware
app.use(helmet()); 
app.use(cors()); // We will restrict this to the frontend URL later
app.use(express.json()); // Intercepts requests and parses JSON into req.body

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});