const crypto = require('crypto');
const Booking = require('../models/Booking');

function md5Upper(str) {
  return crypto.createHash('md5').update(str).digest('hex').toUpperCase();
}

// @desc    Build a signed PayHere checkout payload for a booking's deposit
// @route   POST /api/payments/initiate
// @access  Public
const initiatePayment = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const booking = await Booking.findById(bookingId).populate('packageId', 'title');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    const merchantId = process.env.PAYHERE_MERCHANT_ID;
    const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET;
    const orderId = booking._id.toString();
    const amount = booking.depositAmount.toFixed(2);
    const currency = 'USD';

    // PayHere's required hash: MD5(merchant_id + order_id + amount + currency + MD5(secret).toUpperCase()).toUpperCase()
    const hashedSecret = md5Upper(merchantSecret);
    const hash = md5Upper(`${merchantId}${orderId}${amount}${currency}${hashedSecret}`);

    const [firstName, ...rest] = booking.customerName.trim().split(' ');
    const lastName = rest.join(' ') || firstName;

    res.status(200).json({
      checkoutUrl:
        process.env.PAYHERE_MODE === 'live'
          ? 'https://www.payhere.lk/pay/checkout'
          : 'https://sandbox.payhere.lk/pay/checkout',
      params: {
        merchant_id: merchantId,
        return_url: `${process.env.FRONTEND_URL}/payment/success`,
        cancel_url: `${process.env.FRONTEND_URL}/payment/cancelled`,
        notify_url: `${process.env.BACKEND_URL}/api/payments/notify`,
        order_id: orderId,
        items: booking.packageId?.title || 'Edward Tours Booking Deposit',
        currency,
        amount,
        first_name: firstName,
        last_name: lastName,
        email: booking.email,
        phone: booking.phone,
        address: booking.country,
        city: booking.country,
        country: booking.country,
        hash
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to initiate payment', error: error.message });
  }
};

// @desc    PayHere server-to-server payment confirmation (not called by the browser)
// @route   POST /api/payments/notify
// @access  Public (but signature-verified)
const notifyPayment = async (req, res) => {
  try {
    const { merchant_id, order_id, payhere_amount, payhere_currency, status_code, md5sig } = req.body;

    const hashedSecret = md5Upper(process.env.PAYHERE_MERCHANT_SECRET);
    const localSig = md5Upper(
      `${merchant_id}${order_id}${payhere_amount}${payhere_currency}${status_code}${hashedSecret}`
    );

    // Reject anything not actually signed by PayHere — without this check,
    // anyone could POST a fake "payment succeeded" request to this URL.
    if (localSig !== md5sig) {
      return res.status(400).send('Invalid signature');
    }

    const booking = await Booking.findById(order_id);
    if (!booking) return res.status(404).send('Booking not found');

    // status_code '2' = successful payment. Guard on current status so a
    // retried webhook (PayHere resends on timeout) can't double-process.
    if (status_code === '2' && booking.paymentStatus === 'Unpaid') {
      booking.paymentStatus = 'Deposit Paid';
      booking.bookingStatus = 'Confirmed';
      await booking.save();
    }

    res.status(200).send('OK');
  } catch (error) {
    res.status(500).send('Error processing notification');
  }
};

module.exports = { initiatePayment, notifyPayment };