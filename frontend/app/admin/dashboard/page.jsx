'use client';

import { useEffect, useState } from 'react';
import { getDashboardStats } from '@/lib/adminApi';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getDashboardStats().then(setStats).catch((e) => setError(e.message));
  }, []);

  if (error) return <p className="text-red-600 text-sm">{error}</p>;
  if (!stats) return <p className="text-sm text-gray-500">Loading...</p>;

  const cards = [
    { label: 'Total Packages', value: stats.totalPackages },
    { label: 'New Inquiries', value: stats.activeInquiries },
    { label: 'Total Bookings', value: stats.totalBookings },
    { label: 'Revenue (Confirmed)', value: `$${stats.totalRevenue}` }
  ];

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-ceylon-teal mb-6">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map((c) => (
          <div key={c.label} className="bg-white border rounded-xl p-5">
            <p className="text-xs text-gray-500">{c.label}</p>
            <p className="text-2xl font-bold text-ceylon-teal mt-1">{c.value}</p>
          </div>
        ))}
      </div>

      <h2 className="font-semibold text-gray-800 mb-3">Recent Confirmed Bookings</h2>
      <div className="bg-white border rounded-xl divide-y">
        {stats.recentBookings?.length === 0 && (
          <p className="p-4 text-sm text-gray-500">No confirmed bookings yet.</p>
        )}
        {stats.recentBookings?.map((b) => (
          <div key={b._id} className="p-4 text-sm flex justify-between">
            <span>{b.customerName} — {b.country}</span>
            <span className="font-medium">${b.totalPrice}</span>
          </div>
        ))}
      </div>
    </div>
  );
}