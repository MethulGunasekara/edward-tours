'use client';

import { createElement } from 'react';

export default function WhatsAppButton() {
  const phoneNumber = '94779382746';
  const message = encodeURIComponent("Hi! I'd like to know more about your tour packages.");
  const href = `https://wa.me/${phoneNumber}?text=${message}`;

  return createElement(
    'a',
    {
      href,
      target: '_blank',
      rel: 'noopener noreferrer',
      'aria-label': 'Chat with us on WhatsApp',
      className:
        'fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-ceylon-teal hover:bg-ceylon-gold transition-colors shadow-lg flex items-center justify-center'
    },
    createElement(
      'svg',
      { viewBox: '0 0 32 32', className: 'w-7 h-7 fill-white' },
      createElement('path', {
        d: 'M16.001 3C9.373 3 4 8.373 4 15c0 2.34.653 4.522 1.789 6.393L4 29l7.805-1.746A11.94 11.94 0 0 0 16.001 27C22.628 27 28 21.627 28 15S22.628 3 16.001 3zm0 21.75c-1.972 0-3.822-.549-5.397-1.5l-.386-.23-4.63 1.036 1.062-4.51-.253-.398A9.71 9.71 0 0 1 5.25 15c0-5.936 4.815-10.75 10.751-10.75S26.75 9.064 26.75 15 21.937 24.75 16.001 24.75zm5.834-8.1c-.318-.16-1.882-.928-2.174-1.034-.291-.106-.503-.16-.715.16-.212.318-.822 1.034-1.008 1.246-.185.212-.371.239-.688.08-.318-.159-1.343-.495-2.559-1.578-.946-.844-1.585-1.887-1.77-2.205-.185-.318-.02-.49.14-.649.144-.143.318-.371.477-.557.16-.185.212-.318.318-.53.106-.212.053-.398-.027-.557-.08-.16-.715-1.724-.98-2.362-.258-.62-.52-.536-.715-.546l-.609-.011c-.212 0-.557.08-.848.398-.291.318-1.113 1.088-1.113 2.652 0 1.564 1.14 3.075 1.298 3.287.16.212 2.245 3.428 5.44 4.808.76.328 1.353.524 1.816.671.763.243 1.457.209 2.006.127.612-.091 1.882-.769 2.147-1.512.265-.743.265-1.379.185-1.512-.08-.132-.291-.212-.609-.371z'
      })
    )
  );
}
