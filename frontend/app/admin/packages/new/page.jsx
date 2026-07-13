'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createAdminPackage } from '@/lib/adminApi';

const categories = ['Cultural', 'Wildlife', 'Beach', 'Adventure', 'Hill Country'];

export default function NewPackagePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '', slug: '', category: categories[0], summary: '', status: 'Draft'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const pkg = await createAdminPackage(form);
      router.push(`/admin/packages/${pkg._id}/edit`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl">
      <h1 className="font-serif text-2xl font-bold text-ceylon-teal mb-6">New Package</h1>
      <form onSubmit={handleSubmit} className="bg-white border rounded-xl p-6 space-y-4">
        <input name="title" placeholder="Title" required value={form.title} onChange={handleChange}
          className="border rounded-md px-3 py-2 text-sm w-full" />
        <input name="slug" placeholder="slug-like-this" required value={form.slug} onChange={handleChange}
          className="border rounded-md px-3 py-2 text-sm w-full" />
        <select name="category" value={form.category} onChange={handleChange}
          className="border rounded-md px-3 py-2 text-sm w-full">
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <textarea name="summary" placeholder="Short summary" required rows={3}
          value={form.summary} onChange={handleChange}
          className="border rounded-md px-3 py-2 text-sm w-full" />
        <select name="status" value={form.status} onChange={handleChange}
          className="border rounded-md px-3 py-2 text-sm w-full">
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
        </select>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={loading}
          className="bg-ceylon-teal text-white text-sm font-medium px-5 py-2.5 rounded-md disabled:opacity-50">
          {loading ? 'Creating...' : 'Create & Continue'}
        </button>
      </form>
    </div>
  );
}