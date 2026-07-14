'use client';

import { useEffect, useState } from 'react';
import { getSettings } from '@/lib/api';
import { getUploadSignature, updateAdminSettings } from '@/lib/adminApi';
import { uploadToCloudinary } from '@/lib/cloudinaryUpload';

export default function AdminSettingsPage() {
  const [heroVideoUrl, setHeroVideoUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(null);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getSettings().then((s) => setHeroVideoUrl(s.heroVideoUrl || ''));
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setProgress(0);
    setError('');
    try {
      const signatureData = await getUploadSignature();
      const result = await uploadToCloudinary(file, signatureData, setProgress);
      setHeroVideoUrl(result.secure_url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      setProgress(null);
      e.target.value = '';
    }
  };

  const handleSave = async () => {
    setMsg('');
    setError('');
    try {
      await updateAdminSettings({ heroVideoUrl });
      setMsg('Homepage video updated.');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="font-serif text-2xl font-bold text-ceylon-teal mb-6">Site Settings</h1>

      <section className="bg-white border rounded-xl p-6 space-y-4">
        <h2 className="font-semibold">Homepage Background Video</h2>
        <p className="text-xs text-gray-500">
          Plays behind the hero section. Use a short (10–20s), landscape clip — it autoplays muted.
        </p>

        {heroVideoUrl && (
          <video src={heroVideoUrl} className="w-full h-56 object-cover rounded-lg" controls />
        )}

        <div className="border-2 border-dashed rounded-lg p-4 text-center">
          <input type="file" accept="video/*" onChange={handleFileChange} className="hidden" id="hero-video-upload" />
          <label htmlFor="hero-video-upload" className="cursor-pointer text-sm text-ceylon-teal font-medium">
            {uploading ? `Uploading... ${progress}%` : heroVideoUrl ? 'Replace video' : '+ Upload a video'}
          </label>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {msg && <p className="text-sm text-ceylon-teal">{msg}</p>}

        <button
          onClick={handleSave}
          disabled={!heroVideoUrl}
          className="bg-ceylon-teal text-white text-sm font-medium px-5 py-2.5 rounded-md disabled:opacity-50"
        >
          Save
        </button>
      </section>
    </div>
  );
}