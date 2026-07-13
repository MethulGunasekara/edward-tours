'use client';

// Uploads a single file directly to Cloudinary using a signature obtained
// from our own backend. Cloudinary's `resource_type: auto` endpoint will
// correctly detect and route both images and videos.
export async function uploadToCloudinary(file, signatureData, onProgress) {
  const { signature, timestamp, folder, apiKey, cloudName } = signatureData;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', apiKey);
  formData.append('timestamp', timestamp);
  formData.append('signature', signature);
  formData.append('folder', folder);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = () => {
      const data = JSON.parse(xhr.responseText);
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(data); // includes secure_url, resource_type ('image' | 'video'), etc.
      } else {
        reject(new Error(data.error?.message || 'Cloudinary upload failed'));
      }
    };

    xhr.onerror = () => reject(new Error('Network error during upload'));
    xhr.send(formData);
  });
}