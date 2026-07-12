const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const AdminUser = require('../models/AdminUser');

// @desc    Authenticate admin & get token
// @route   POST /api/auth/login
// @access  Public
const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1. Check if the admin user exists
    const user = await AdminUser.findOne({ username });
    if (!user) {
      // Always return a generic 401 message so attackers don't know WHICH field was wrong
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 2. Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 3. Generate the JWT (expires in 1 day for security)
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error during authentication' });
  }
};

module.exports = { loginAdmin };