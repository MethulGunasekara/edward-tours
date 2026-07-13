'use client';

import { useEffect, useState } from 'react';
import { getAdminInquiries } from '@/lib/adminApi';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => { getAdminInquiries().then(setInquiries); }, []);

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-ceylon-teal mb-6">Inquiries</h1>
      <div className="bg-white border rounded-xl divide-y">
        {inquiries.map((inq) => (
          <div key={inq._id} className="p-4 text-sm flex justify-between items-start">
            <div>
              <p className="font-medium">{inq.customerName} · {inq.country}</p>
              <p className="text-gray-500">{inq.email}</p>
              <p className="text-gray-700 mt-1">{inq.message}</p>
            </div>
            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-ceylon-sand text-ceylon-teal">
              {inq.status}
            </span>
          </div>
        ))}
        {inquiries.length === 0 && <p className="p-4 text-sm text-gray-500">No inquiries yet.</p>}
      </div>
    </div>
  );
}