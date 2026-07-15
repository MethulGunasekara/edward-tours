'use client';

import { useMemo, useState } from 'react';
import { createBooking, initiatePayment } from '@/lib/api';
import { redirectToPayHere } from '@/lib/payhereRedirect';
import { countries } from '@/lib/countries';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function BookingForm({ pkg }) {
  const [countryCode, setCountryCode] = useState('LK');
  const [localPhone, setLocalPhone] = useState('');
  const [form, setForm] = useState({
    customerName: '', email: '', country: 'Sri Lanka',
    travelDate: '', travelers: 1, specialRequests: ''
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [createdBooking, setCreatedBooking] = useState(null);
  const [payLoading, setPayLoading] = useState(false);

  const selectedCountry = countries.find((c) => c.code === countryCode) || countries[0];

  const matchedTier = useMemo(() => {
    const travelers = Number(form.travelers) || 0;
    return (pkg.pricingTiers || []).find((t) => travelers >= t.minPax && travelers <= t.maxPax);
  }, [form.travelers, pkg.pricingTiers]);

  const totalPrice = matchedTier ? matchedTier.pricePerPersonUSD * Number(form.travelers) : null;
  const depositPreview = totalPrice ? Math.round(totalPrice * 0.3 * 100) / 100 : null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleCountryChange = (e) => {
    const code = e.target.value;
    setCountryCode(code);
    const country = countries.find((c) => c.code === code);
    setForm({ ...form, country: country.name });
  };

  const validate = () => {
    const errors = {};
    if (!EMAIL_REGEX.test(form.email)) {
      errors.email = 'Enter a valid email address';
    }
    const digitsOnly = localPhone.replace(/\D/g, '').replace(/^0+/, '');
    if (digitsOnly.length < 6 || digitsOnly.length > 12) {
      errors.phone = 'Enter a valid phone number (without the leading 0)';
    }
    setFieldErrors(errors);
    return { valid: Object.keys(errors).length === 0, digitsOnly };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!matchedTier) {
      setError('No pricing tier matches that group size — please contact us directly.');
      return;
    }
    const { valid, digitsOnly } = validate();
    if (!valid) return;

    setStatus('loading');
    setError('');
    try {
      const booking = await createBooking({
        ...form,
        phone: `${selectedCountry.dial}${digitsOnly}`,
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

        <div>
          <input
            name="email" type="email" required placeholder="Email" value={form.email}
            onChange={handleChange}
            className={`border rounded-md px-3 py-2 text-sm w-full ${fieldErrors.email ? 'border-red-400' : ''}`}
          />
          {fieldErrors.email && <p className="text-xs text-red-600 mt-1">{fieldErrors.email}</p>}
        </div>

        <div>
          <label className="text-xs text-gray-500 block mb-1">Country</label>
          <select value={countryCode} onChange={handleCountryChange}
            className="border rounded-md px-3 py-2 text-sm w-full">
            {countries.map((c) => (
              <option key={c.code} value={c.code}>{c.name} ({c.dial})</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs text-gray-500 block mb-1">Phone</label>
          <div className="flex">
            <span className="border border-r-0 rounded-l-md px-3 py-2 text-sm bg-gray-50 text-gray-600">
              {selectedCountry.dial}
            </span>
            <input
              type="tel" required placeholder="771234567" value={localPhone}
              onChange={(e) => setLocalPhone(e.target.value)}
              className={`border rounded-r-md px-3 py-2 text-sm flex-1 min-w-0 ${fieldErrors.phone ? 'border-red-400' : ''}`}
            />
          </div>
          {fieldErrors.phone && <p className="text-xs text-red-600 mt-1">{fieldErrors.phone}</p>}
        </div>

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