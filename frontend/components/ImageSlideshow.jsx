'use client';

import { useEffect, useState } from 'react';

export default function ImageSlideshow({ images = [], intervalMs = 3000, heightClassName = 'h-44' }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [images.length, intervalMs]);

  if (images.length === 0) {
    return (
      <div className={`${heightClassName} bg-gray-200 flex items-center justify-center text-gray-400 text-sm`}>
        No image yet
      </div>
    );
  }

  return (
    <div className={`${heightClassName} relative overflow-hidden`}>
      <div
        className="flex h-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((img, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={img._id || i} src={img.cloudinaryUrl} alt="" className="w-full h-full object-cover shrink-0" />
        ))}
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, i) => (
            <span key={i} className={`w-1.5 h-1.5 rounded-full ${i === index ? 'bg-white' : 'bg-white/40'}`} />
          ))}
        </div>
      )}
    </div>
  );
}