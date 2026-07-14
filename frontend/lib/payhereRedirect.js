'use client';

// PayHere's hosted checkout requires a real HTML form POST, not fetch —
// this builds one on the fly and submits it, which redirects the browser away.
export function redirectToPayHere({ checkoutUrl, params }) {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = checkoutUrl;

  Object.entries(params).forEach(([key, value]) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = value;
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
}