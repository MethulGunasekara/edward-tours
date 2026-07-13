'use client';

import { useMemo, useState } from 'react';
import { createBooking } from '@/lib/api';

export default function BookingForm({ pkg }) {
  const [form, setForm] = useState({
    customerName: '', email: '', phone: '', country: '',
    travelDate: '', travelers: 1, specialRequests: ''
  });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const matchedTier = useMemo(() => {
    const travelers = Number(form.travelers) || 0;
    return (pkg.pricingTiers || []).find(
      (t) => travelers >= t.minPax && travelers <= t.maxPax
    );
  }, [form.travelers, pkg.pricingTiers]);

  const totalPrice = matchedTier ? matchedTier.pricePerPersonUSD * Number(form.travelers) : null;

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
      await createBooking({
        packageId: pkg._id,
        ...form,
        travelers: Number(form.travelers),
        totalPrice
      });
      setStatus('success');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-green-800 text-sm">
        Booking request received — status: <strong>Pending</strong>. We'll confirm details and
        send deposit payment instructions by email.
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
        {matchedTier
          ? <>Estimated total: <strong>${totalPrice} USD</strong> ({matchedTier.groupSizeLabel})</>
          : <span className="text-amber-600">No pricing tier found for that group size yet.</span>}
      </div>

      {status === 'error' && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={status === 'loading'}
        className="bg-ceylon-gold text-white text-sm font-medium px-5 py-2.5 rounded-md hover:opacity-90 disabled:opacity-50">
        {status === 'loading' ? 'Submitting...' : 'Request Booking'}
      </button>
    </form>
  );
}