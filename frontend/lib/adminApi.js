'use client';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('adminToken');
}

async function adminFetch(path, options = {}) {
  const token = getToken();
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    }
  });

  if (res.status === 401) {
    localStorage.removeItem('adminToken');
    if (typeof window !== 'undefined') window.location.href = '/admin/login';
    throw new Error('Session expired, please log in again');
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

export async function adminLogin(username, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Login failed');
  return data;
}

export const getDashboardStats = () => adminFetch('/admin/dashboard/stats');
export const getAdminPackages = () => adminFetch('/admin/packages');
export const getAdminPackage = (id) => adminFetch(`/admin/packages/${id}`);
export const createAdminPackage = (data) =>
  adminFetch('/admin/packages', { method: 'POST', body: JSON.stringify(data) });
export const updateAdminPackage = (id, data) =>
  adminFetch(`/admin/packages/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteAdminPackage = (id) => adminFetch(`/admin/packages/${id}`, { method: 'DELETE' });
export const saveItinerary = (id, days) =>
  adminFetch(`/admin/packages/${id}/itinerary`, { method: 'POST', body: JSON.stringify(days) });
export const savePricing = (id, tiers) =>
  adminFetch(`/admin/packages/${id}/pricing`, { method: 'POST', body: JSON.stringify(tiers) });
export const saveMedia = (id, media) =>
  adminFetch(`/admin/packages/${id}/media`, { method: 'POST', body: JSON.stringify(media) });
export const getAdminInquiries = () => adminFetch('/admin/inquiries');
export const getAdminBookings = () => adminFetch('/admin/bookings');
export const updateBookingStatus = (id, data) =>
  adminFetch(`/admin/bookings/${id}/status`, { method: 'PUT', body: JSON.stringify(data) });
export const getUploadSignature = () => adminFetch('/admin/media/signature');