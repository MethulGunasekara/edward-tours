'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-ceylon-sand">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 font-serif text-xl font-bold text-ceylon-teal">
          <Image
            src="/logo.jpg"
            alt="Edward Tours logo"
            width={36}
            height={36}
            className="rounded-full object-cover"
          />
          Edward Tours
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-ceylon-teal">Home</Link>
          <Link href="/packages" className="hover:text-ceylon-teal">Packages</Link>
          <Link href="/#about" className="hover:text-ceylon-teal">About</Link>
          <Link href="/#contact" className="hover:text-ceylon-teal">Contact</Link>
        </nav>

        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {open && (
        <div className="md:hidden flex flex-col gap-4 px-4 pb-4 text-sm font-medium text-gray-700">
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/packages" onClick={() => setOpen(false)}>Packages</Link>
          <Link href="/#about" onClick={() => setOpen(false)}>About</Link>
          <Link href="/#contact" onClick={() => setOpen(false)}>Contact</Link>
        </div>
      )}
    </header>
  );
}