'use client';

import { useRef, useState } from 'react';
import { getUploadSignature } from '@/lib/adminApi';
import { uploadToCloudinary } from '@/lib/cloudinaryUpload';

// Drops a new { type, cloudinaryUrl, sortOrder, isHero } item into the
// parent's media array via onUploaded — parent still owns the array/save logic.
export default function MediaUploader({ onUploaded, nextSortOrder }) {
  const inputRef = useRef(null);
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError('');
    setProgress(0);
    try {
      const signatureData = await getUploadSignature();
      const result = await uploadToCloudinary(file, signatureData, setProgress);

      onUploaded({
        type: result.resource_type === 'video' ? 'video' : 'image',
        cloudinaryUrl: result.secure_url,
        sortOrder: nextSortOrder,
        isHero: false
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setProgress(null);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div className="border-2 border-dashed rounded-lg p-4 text-center">
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        onChange={handleFileChange}
        className="hidden"
        id="media-upload-input"
      />
      <label
        htmlFor="media-upload-input"
        className="cursor-pointer text-sm text-ceylon-teal font-medium"
      >
        {progress !== null ? `Uploading... ${progress}%` : '+ Click to upload a photo or video'}
      </label>
      {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
    </div>
  );
}