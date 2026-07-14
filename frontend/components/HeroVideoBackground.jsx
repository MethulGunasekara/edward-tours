'use client';

import { useEffect, useRef, useState } from 'react';

export default function HeroVideoBackground({
  videoUrl,
  posterUrl,
  overlayClassName = 'bg-black/40',
  className = 'bg-ceylon-teal',
  children,
  minDisplayMs = 600
}) {
  const videoRef = useRef(null);
  const [ready, setReady] = useState(!videoUrl);
  const [showLoader, setShowLoader] = useState(!!videoUrl);

  useEffect(() => {
    if (!videoUrl) return;
    const start = Date.now();
    const video = videoRef.current;
    if (!video) return;

    const markReady = () => {
      const elapsed = Date.now() - start;
      const wait = Math.max(0, minDisplayMs - elapsed);
      setTimeout(() => {
        setReady(true);
        setTimeout(() => setShowLoader(false), 500);
      }, wait);
    };

    if (video.readyState >= 3) {
      markReady();
    } else {
      video.addEventListener('canplay', markReady);
    }

    // Safety net in case the video URL is broken and never fires an event
    const fallback = setTimeout(markReady, 6000);

    return () => {
      video.removeEventListener('canplay', markReady);
      clearTimeout(fallback);
    };
  }, [videoUrl, minDisplayMs]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {showLoader && (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center bg-ceylon-teal transition-opacity duration-500 ${
            ready ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-14 h-14 border-4 border-white/30 border-t-ceylon-gold rounded-full animate-spin" />
            <p className="text-white font-serif text-sm tracking-widest uppercase">Edward Tours</p>
          </div>
        </div>
      )}

      {videoUrl ? (
        <video
          ref={videoRef}
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : posterUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={posterUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
      ) : null}

      <div className={`absolute inset-0 ${overlayClassName}`} />
      <div className="relative">{children}</div>
    </div>
  );
}