'use client';

import { useEffect, useState } from 'react';
import { getAdminBookings, updateBookingStatus } from '@/lib/adminApi';

const bookingStatuses = ['Pending', 'Confirmed', 'Cancelled'];
const paymentStatuses = ['Unpaid', 'Deposit Paid', 'Fully Paid'];

function amountPaid(booking) {
  if (booking.paymentStatus === 'Fully Paid') return booking.totalPrice;
  if (booking.paymentStatus === 'Deposit Paid') return booking.depositAmount;
  return 0;
}

function buildConfirmationEmail(booking) {
  const due = booking.totalPrice - amountPaid(booking);
  const travelDate = new Date(booking.travelDate).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
  const subject = `Booking Confirmed — ${booking.packageId?.title || 'Your Tour'}`;
  const body =
    `Hi ${booking.customerName},\n\n` +
    `We've received your payment of $${amountPaid(booking)} USD and your booking is now confirmed.\n\n` +
    `Tour: ${booking.packageId?.title || ''}\n` +
    `Travel date: ${travelDate}\n` +
    `Travelers: ${booking.travelers}\n` +
    `Remaining balance due: $${due} USD (payable before or during your tour)\n\n` +
    `Looking forward to hosting you!\n\nEdward Tours`;
  return `mailto:${booking.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]);

  const load = () => getAdminBookings().then(setBookings);
  useEffect(() => { load(); }, []);

  const handleUpdate = async (id, field, value) => {
    const booking = bookings.find((b) => b._id === id);
    await updateBookingStatus(id, {
      bookingStatus: field === 'bookingStatus' ? value : booking.bookingStatus,
      paymentStatus: field === 'paymentStatus' ? value : booking.paymentStatus
    });
    load();
  };

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-ceylon-teal mb-6">Bookings</h1>
      <div className="space-y-4">
        {bookings.map((b) => {
          const due = b.totalPrice - amountPaid(b);
          return (
            <div key={b._id} className="bg-white border rounded-xl p-5">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                <div>
                  <p className="font-semibold text-ceylon-teal">{b.customerName}</p>
                  <p className="text-xs text-gray-500">{b.packageId?.title || 'Custom request'}</p>
                </div>
                <div className="flex gap-2">
                  <select value={b.bookingStatus} onChange={(e) => handleUpdate(b._id, 'bookingStatus', e.target.value)}
                    className="border rounded-md px-2 py-1.5 text-xs">
                    {bookingStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <select value={b.paymentStatus} onChange={(e) => handleUpdate(b._id, 'paymentStatus', e.target.value)}
                    className="border rounded-md px-2 py-1.5 text-xs">
                    {paymentStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Contact</p>
                  <a href={`mailto:${b.email}`} className="text-ceylon-teal hover:underline block">{b.email}</a>
                  <a href={`tel:${b.phone}`} className="text-ceylon-teal hover:underline block">{b.phone}</a>
                  <p className="text-gray-500 text-xs mt-0.5">{b.country}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Trip</p>
                  <p>{new Date(b.travelDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  <p className="text-gray-500 text-xs">{b.travelers} traveler{b.travelers > 1 ? 's' : ''}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Payment</p>
                  <p>Total: <strong>${b.totalPrice}</strong></p>
                  <p className="text-gray-500 text-xs">Paid: ${amountPaid(b)} · Due: ${due}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Special Requests</p>
                  <p className="text-gray-600 text-xs">{b.specialRequests || '—'}</p>
                </div>
              </div>

              {b.paymentStatus !== 'Unpaid' && (
                <a
                  href={buildConfirmationEmail(b)}
                  className="inline-block mt-4 text-xs font-medium text-ceylon-teal border border-ceylon-teal rounded-md px-3 py-1.5 hover:bg-ceylon-teal hover:text-white transition-colors"
                >
                  ✉ Send Payment Confirmation Email
                </a>
              )}
            </div>
          );
        })}
        {bookings.length === 0 && (
          <p className="bg-white border rounded-xl p-4 text-sm text-gray-500">No bookings yet.</p>
        )}
      </div>
    </div>
  );
}