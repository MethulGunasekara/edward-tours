const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function getPackages() {
  const res = await fetch(`${API_URL}/public/packages`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch packages');
  return res.json();
}

export async function getPackageBySlug(slug) {
  const res = await fetch(`${API_URL}/public/packages/${slug}`, { next: { revalidate: 60 } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Failed to fetch package');
  return res.json();
}

export async function submitInquiry(data) {
  const res = await fetch(`${API_URL}/inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message || 'Failed to submit inquiry');
  return result;
}

export async function createBooking(data) {
  const res = await fetch(`${API_URL}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message || 'Failed to create booking');
  return result;
}
export async function getSettings() {
  const res = await fetch(`${API_URL}/public/settings`, { next: { revalidate: 30 } });
  if (!res.ok) return { heroVideoUrl: '' };
  return res.json();
}

export async function getGalleryImages() {
  const res = await fetch(`${API_URL}/public/gallery`, { next: { revalidate: 60 } });
  if (!res.ok) return [];
  return res.json();
}

export async function initiatePayment(bookingId) {
  const res = await fetch(`${API_URL}/payments/initiate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ bookingId })
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message || 'Failed to initiate payment');
  return result;
}

export { API_URL };