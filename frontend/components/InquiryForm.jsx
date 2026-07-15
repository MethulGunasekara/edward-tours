'use client';

import { useState } from 'react';
import { submitInquiry } from '@/lib/api';
import { countries } from '@/lib/countries';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function InquiryForm({ packageId = null, packageTitle = null }) {
  const [form, setForm] = useState({
    customerName: '',
    email: '',
    country: '',
    preferredDates: '',
    groupSize: 1,
    message: packageTitle ? `Hi, I'd like more info about "${packageTitle}".` : ''
  });
  const [emailError, setEmailError] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!EMAIL_REGEX.test(form.email)) {
      setEmailError('Enter a valid email address');
      return;
    }
    setEmailError('');
    setStatus('loading');
    setError('');
    try {
      await submitInquiry({ ...form, packageId, groupSize: Number(form.groupSize) });
      setStatus('success');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-green-800 text-sm">
        Thanks — your inquiry has been sent. We'll get back to you by email shortly.
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
            className={`border rounded-md px-3 py-2 text-sm w-full ${emailError ? 'border-red-400' : ''}`}
          />
          {emailError && <p className="text-xs text-red-600 mt-1">{emailError}</p>}
        </div>
        <select name="country" value={form.country} onChange={handleChange}
          className="border rounded-md px-3 py-2 text-sm">
          {countries.map((c) => (
            <option key={c.code} value={c.name}>{c.name}</option>
          ))}
        </select>
        <input name="preferredDates" type="date" required value={form.preferredDates}
          onChange={handleChange} className="border rounded-md px-3 py-2 text-sm" />
        <input name="groupSize" type="number" min="1" required placeholder="Group size"
          value={form.groupSize} onChange={handleChange}
          className="border rounded-md px-3 py-2 text-sm sm:col-span-2" />
      </div>
      <textarea name="message" required rows={3} placeholder="Tell us what you're looking for..."
        value={form.message} onChange={handleChange}
        className="border rounded-md px-3 py-2 text-sm w-full" />
      {status === 'error' && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={status === 'loading'}
        className="bg-ceylon-teal text-white text-sm font-medium px-5 py-2.5 rounded-md hover:opacity-90 disabled:opacity-50">
        {status === 'loading' ? 'Sending...' : 'Send Inquiry'}
      </button>
    </form>
  );
}