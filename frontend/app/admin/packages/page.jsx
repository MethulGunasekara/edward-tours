'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getAdminPackages, deleteAdminPackage } from '@/lib/adminApi';

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState([]);
  const [error, setError] = useState('');

  const load = () => getAdminPackages().then(setPackages).catch((e) => setError(e.message));

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this package and all its itinerary/media/pricing data?')) return;
    try {
      await deleteAdminPackage(id);
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-serif text-2xl font-bold text-ceylon-teal">Packages</h1>
        <Link href="/admin/packages/new" className="bg-ceylon-teal text-white text-sm px-4 py-2 rounded-md">
          + New Package
        </Link>
      </div>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      <div className="bg-white border rounded-xl divide-y">
        {packages.map((pkg) => (
          <div key={pkg._id} className="p-4 flex justify-between items-center text-sm">
            <div>
              <p className="font-medium">{pkg.title}</p>
              <p className="text-xs text-gray-500">{pkg.category} · {pkg.status}</p>
            </div>
            <div className="flex gap-3">
              <Link href={`/admin/packages/${pkg._id}/edit`} className="text-ceylon-teal font-medium">
                Edit
              </Link>
              <button onClick={() => handleDelete(pkg._id)} className="text-red-600 font-medium">
                Delete
              </button>
            </div>
          </div>
        ))}
        {packages.length === 0 && <p className="p-4 text-sm text-gray-500">No packages yet.</p>}
      </div>
    </div>
  );
}