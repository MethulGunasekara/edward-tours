'use client';

import { useRef } from 'react';

export default function HorizontalScroller({ children }) {
  const trackRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e) => {
    isDown.current = true;
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
  };
  const onMouseLeaveOrUp = () => { isDown.current = false; };
  const onMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    trackRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const scrollByAmount = (amount) => {
    trackRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <div className="relative group">
      <button
        onClick={() => scrollByAmount(-320)}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow items-center justify-center opacity-0 group-hover:opacity-100 transition"
        aria-label="Scroll left"
      >
        ‹
      </button>

      <div
        ref={trackRef}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeaveOrUp}
        onMouseUp={onMouseLeaveOrUp}
        onMouseMove={onMouseMove}
        className="flex gap-5 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-2 cursor-grab active:cursor-grabbing"
      >
        {children}
      </div>

      <button
        onClick={() => scrollByAmount(320)}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow items-center justify-center opacity-0 group-hover:opacity-100 transition"
        aria-label="Scroll right"
      >
        ›
      </button>
    </div>
  );
}