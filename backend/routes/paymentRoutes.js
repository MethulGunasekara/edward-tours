const express = require('express');
const router = express.Router();
const { initiatePayment, notifyPayment } = require('../controllers/paymentController');

router.post('/payments/initiate', initiatePayment);
router.post('/payments/notify', notifyPayment);

module.exports = router;