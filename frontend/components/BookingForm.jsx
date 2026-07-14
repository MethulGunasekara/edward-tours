'use client';

import { useMemo, useState } from 'react';
import { createBooking, initiatePayment } from '@/lib/api';
import { redirectToPayHere } from '@/lib/payhereRedirect';

export default function BookingForm({ pkg }) {
  const [form, setForm] = useState({
    customerName: '', email: '', phone: '', country: '',
    travelDate: '', travelers: 1, specialRequests: ''
  });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [createdBooking, setCreatedBooking] = useState(null);
  const [payLoading, setPayLoading] = useState(false);

  const matchedTier = useMemo(() => {
    const travelers = Number(form.travelers) || 0;
    return (pkg.pricingTiers || []).find((t) => travelers >= t.minPax && travelers <= t.maxPax);
  }, [form.travelers, pkg.pricingTiers]);

  const totalPrice = matchedTier ? matchedTier.pricePerPersonUSD * Number(form.travelers) : null;
  const depositPreview = totalPrice ? Math.round(totalPrice * 0.3 * 100) / 100 : null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!matchedTier) {
      setError('No pricing tier matches that group size — please contact us directly.');
      return;
    }
    setStatus('loading');
    setError('');
    try {
      const booking = await createBooking({
        packageId: pkg._id,
        ...form,
        travelers: Number(form.travelers),
        totalPrice
      });
      setCreatedBooking(booking);
      setStatus('success');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  };

  const handlePayDeposit = async () => {
    setPayLoading(true);
    setError('');
    try {
      const { checkoutUrl, params } = await initiatePayment(createdBooking._id);
      redirectToPayHere({ checkoutUrl, params });
    } catch (err) {
      setError(err.message);
      setPayLoading(false);
    }
  };

  if (status === 'success' && createdBooking) {
    return (
      <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-green-800 text-sm space-y-3">
        <p>
          Booking request received. To confirm your dates, pay a{' '}
          <strong>${createdBooking.depositAmount} USD deposit</strong> now — the balance is
          settled separately before or during your tour.
        </p>
        <button
          onClick={handlePayDeposit}
          disabled={payLoading}
          className="bg-ceylon-gold text-white text-sm font-medium px-5 py-2.5 rounded-md hover:opacity-90 disabled:opacity-50"
        >
          {payLoading ? 'Redirecting to PayHere...' : 'Pay Deposit via PayHere'}
        </button>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <input name="customerName" required placeholder="Full name" value={form.customerName}
          onChange={handleChange} className="border rounded-md px-3 py-2 text-sm" />
        <input name="email" type="email" required placeholder="Email" value={form.email}
          onChange={handleChange} className="border rounded-md px-3 py-2 text-sm" />
        <input name="phone" required placeholder="Phone (with country code)" value={form.phone}
          onChange={handleChange} className="border rounded-md px-3 py-2 text-sm" />
        <input name="country" required placeholder="Country" value={form.country}
          onChange={handleChange} className="border rounded-md px-3 py-2 text-sm" />
        <input name="travelDate" type="date" required value={form.travelDate}
          onChange={handleChange} className="border rounded-md px-3 py-2 text-sm" />
        <input name="travelers" type="number" min="1" required value={form.travelers}
          onChange={handleChange} className="border rounded-md px-3 py-2 text-sm" />
      </div>
      <textarea name="specialRequests" rows={2} placeholder="Special requests (optional)"
        value={form.specialRequests} onChange={handleChange}
        className="border rounded-md px-3 py-2 text-sm w-full" />

      <div className="text-sm text-gray-700">
        {matchedTier ? (
          <>
            Estimated total: <strong>${totalPrice} USD</strong> ({matchedTier.groupSizeLabel}) ·
            Deposit due now: <strong>${depositPreview} USD</strong>
          </>
        ) : (
          <span className="text-amber-600">No pricing tier found for that group size yet.</span>
        )}
      </div>

      {status === 'error' && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={status === 'loading'}
        className="bg-ceylon-gold text-white text-sm font-medium px-5 py-2.5 rounded-md hover:opacity-90 disabled:opacity-50">
        {status === 'loading' ? 'Submitting...' : 'Request Booking'}
      </button>
    </form>
  );
}