'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminLogin } from '@/lib/adminApi';

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { token } = await adminLogin(form.username, form.password);
      localStorage.setItem('adminToken', token);
      router.push('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm border rounded-xl p-6 space-y-4">
        <h1 className="font-serif text-xl font-bold text-ceylon-teal">Admin Login</h1>
        <input
          placeholder="Username" value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="border rounded-md px-3 py-2 text-sm w-full" required
        />
        <input
          placeholder="Password" type="password" value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border rounded-md px-3 py-2 text-sm w-full" required
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit" disabled={loading}
          className="bg-ceylon-teal text-white text-sm font-medium px-4 py-2.5 rounded-md w-full disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}