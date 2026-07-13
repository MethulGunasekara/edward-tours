'use client';

import { useEffect, useState } from 'react';
import { getAdminBookings, updateBookingStatus } from '@/lib/adminApi';

const bookingStatuses = ['Pending', 'Confirmed', 'Cancelled'];
const paymentStatuses = ['Unpaid', 'Deposit Paid', 'Fully Paid'];

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
      <div className="bg-white border rounded-xl divide-y">
        {bookings.map((b) => (
          <div key={b._id} className="p-4 text-sm grid sm:grid-cols-4 gap-3 items-center">
            <div>
              <p className="font-medium">{b.customerName}</p>
              <p className="text-gray-500 text-xs">{b.packageId?.title}</p>
            </div>
            <p>${b.totalPrice}</p>
            <select value={b.bookingStatus} onChange={(e) => handleUpdate(b._id, 'bookingStatus', e.target.value)}
              className="border rounded-md px-2 py-1.5 text-xs">
              {bookingStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <select value={b.paymentStatus} onChange={(e) => handleUpdate(b._id, 'paymentStatus', e.target.value)}
              className="border rounded-md px-2 py-1.5 text-xs">
              {paymentStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        ))}
        {bookings.length === 0 && <p className="p-4 text-sm text-gray-500">No bookings yet.</p>}
      </div>
    </div>
  );
}