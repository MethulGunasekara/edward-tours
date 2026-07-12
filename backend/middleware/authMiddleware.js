const jwt = require('jsonwebtoken');
const AdminUser = require('../models/AdminUser');

const protect = async (req, res, next) => {
  let token;

  // 1. Check if the authorization header exists and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 2. Extract the token from the string (Format: "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // 3. Verify the token using our secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Find the user by ID and attach it to the request object (excluding the password hash)
      req.adminUser = await AdminUser.findById(decoded.id).select('-passwordHash');

      // 5. Move to the next middleware or controller function
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

module.exports = { protect };