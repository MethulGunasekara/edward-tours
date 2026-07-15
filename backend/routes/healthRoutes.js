const express = require('express');
const router = express.Router();

// @desc    Cheap health check for uptime pingers — doesn't touch the DB,
//          just proves the process is alive and keeps Render from sleeping
// @route   GET /api/health
// @access  Public
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

module.exports = router;