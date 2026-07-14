'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const links = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/packages', label: 'Packages' },
  { href: '/admin/inquiries', label: 'Inquiries' },
  { href: '/admin/bookings', label: 'Bookings' },
  { href: '/admin/settings', label: 'Settings' }
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (pathname === '/admin/login') {
      setChecked(true);
      return;
    }
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.replace('/admin/login');
    } else {
      setChecked(true);
    }
  }, [pathname, router]);

  if (pathname === '/admin/login') return children;
  if (!checked) return null;

  const logout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen flex">
      <aside className="w-56 bg-ceylon-teal text-white flex flex-col p-4">
        <p className="font-serif font-bold text-lg mb-6">Edward Tours · Admin</p>
        <nav className="flex flex-col gap-1 text-sm flex-1">
          {links.map((l) => (
            <Link
              key={l.href} href={l.href}
              className={`px-3 py-2 rounded-md ${pathname === l.href ? 'bg-white/15' : 'hover:bg-white/10'}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <button onClick={logout} className="text-sm text-left px-3 py-2 rounded-md hover:bg-white/10">
          Log out
        </button>
      </aside>
      <main className="flex-1 p-8 bg-gray-50">{children}</main>
    </div>
  );
}