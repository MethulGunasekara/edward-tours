'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  getAdminPackage, updateAdminPackage, saveItinerary, savePricing, saveMedia
} from '@/lib/adminApi';
import MediaUploader from '@/components/MediaUploader';

const categories = ['Cultural', 'Wildlife', 'Beach', 'Adventure', 'Hill Country'];
const emptyDay = { dayNumber: 1, title: '', description: '', overnightLocation: '', mealsIncluded: '' };
const emptyTier = { groupSizeLabel: '', minPax: 1, maxPax: 2, pricePerPersonUSD: 0 };
const emptyMedia = { type: 'image', cloudinaryUrl: '', sortOrder: 0, isHero: false };

export default function EditPackagePage() {
  const { id } = useParams();
  const [base, setBase] = useState(null);
  const [itinerary, setItinerary] = useState([]);
  const [pricing, setPricing] = useState([]);
  const [media, setMedia] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    getAdminPackage(id).then((pkg) => {
      setBase(pkg);
      setItinerary(pkg.itinerary?.length ? pkg.itinerary : [emptyDay]);
      setPricing(pkg.pricingTiers?.length ? pkg.pricingTiers : [emptyTier]);
      setMedia(pkg.media?.length ? pkg.media : [emptyMedia]);
    });
  }, [id]);

  if (!base) return <p className="text-sm text-gray-500">Loading...</p>;

  const saveAll = async () => {
    setMsg('');
    try {
      await updateAdminPackage(id, {
        title: base.title, slug: base.slug, category: base.category,
        summary: base.summary, status: base.status
      });
      await saveItinerary(id, itinerary);
      await savePricing(id, pricing);
      await saveMedia(id, media);
      setMsg('Saved successfully.');
    } catch (e) {
      setMsg(e.message);
    }
  };

  const updateRow = (setter, rows, idx, field, value) => {
    const next = [...rows];
    next[idx] = { ...next[idx], [field]: value };
    setter(next);
  };

  return (
    <div className="max-w-3xl space-y-10">
      <h1 className="font-serif text-2xl font-bold text-ceylon-teal">Edit: {base.title}</h1>

      <section className="bg-white border rounded-xl p-6 space-y-4">
        <h2 className="font-semibold">Basic Details</h2>
        <input value={base.title} onChange={(e) => setBase({ ...base, title: e.target.value })}
          className="border rounded-md px-3 py-2 text-sm w-full" placeholder="Title" />
        <input value={base.slug} onChange={(e) => setBase({ ...base, slug: e.target.value })}
          className="border rounded-md px-3 py-2 text-sm w-full" placeholder="Slug" />
        <select value={base.category} onChange={(e) => setBase({ ...base, category: e.target.value })}
          className="border rounded-md px-3 py-2 text-sm w-full">
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <textarea value={base.summary} onChange={(e) => setBase({ ...base, summary: e.target.value })}
          rows={3} className="border rounded-md px-3 py-2 text-sm w-full" placeholder="Summary" />
        <select value={base.status} onChange={(e) => setBase({ ...base, status: e.target.value })}
          className="border rounded-md px-3 py-2 text-sm w-full">
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
          <option value="Archived">Archived</option>
        </select>
      </section>

      <section className="bg-white border rounded-xl p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">Itinerary</h2>
          <button onClick={() => setItinerary([...itinerary, { ...emptyDay, dayNumber: itinerary.length + 1 }])}
            className="text-sm text-ceylon-teal font-medium">+ Add Day</button>
        </div>
        {itinerary.map((day, idx) => (
          <div key={idx} className="grid sm:grid-cols-2 gap-2 border-b pb-4">
            <input type="number" value={day.dayNumber} placeholder="Day #"
              onChange={(e) => updateRow(setItinerary, itinerary, idx, 'dayNumber', Number(e.target.value))}
              className="border rounded-md px-3 py-2 text-sm" />
            <input value={day.title} placeholder="Title"
              onChange={(e) => updateRow(setItinerary, itinerary, idx, 'title', e.target.value)}
              className="border rounded-md px-3 py-2 text-sm" />
            <textarea value={day.description} placeholder="Description" rows={2}
              onChange={(e) => updateRow(setItinerary, itinerary, idx, 'description', e.target.value)}
              className="border rounded-md px-3 py-2 text-sm sm:col-span-2" />
            <input value={day.overnightLocation} placeholder="Overnight location"
              onChange={(e) => updateRow(setItinerary, itinerary, idx, 'overnightLocation', e.target.value)}
              className="border rounded-md px-3 py-2 text-sm" />
            <input value={day.mealsIncluded} placeholder="Meals included"
              onChange={(e) => updateRow(setItinerary, itinerary, idx, 'mealsIncluded', e.target.value)}
              className="border rounded-md px-3 py-2 text-sm" />
          </div>
        ))}
      </section>

      <section className="bg-white border rounded-xl p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">Pricing Tiers</h2>
          <button onClick={() => setPricing([...pricing, emptyTier])}
            className="text-sm text-ceylon-teal font-medium">+ Add Tier</button>
        </div>
        {pricing.map((tier, idx) => (
          <div key={idx} className="grid sm:grid-cols-4 gap-2">
            <input value={tier.groupSizeLabel} placeholder="Label (e.g. Couples)"
              onChange={(e) => updateRow(setPricing, pricing, idx, 'groupSizeLabel', e.target.value)}
              className="border rounded-md px-3 py-2 text-sm" />
            <input type="number" value={tier.minPax} placeholder="Min pax"
              onChange={(e) => updateRow(setPricing, pricing, idx, 'minPax', Number(e.target.value))}
              className="border rounded-md px-3 py-2 text-sm" />
            <input type="number" value={tier.maxPax} placeholder="Max pax"
              onChange={(e) => updateRow(setPricing, pricing, idx, 'maxPax', Number(e.target.value))}
              className="border rounded-md px-3 py-2 text-sm" />
            <input type="number" value={tier.pricePerPersonUSD} placeholder="Price/person USD"
              onChange={(e) => updateRow(setPricing, pricing, idx, 'pricePerPersonUSD', Number(e.target.value))}
              className="border rounded-md px-3 py-2 text-sm" />
          </div>
        ))}
      </section>

      <section className="bg-white border rounded-xl p-6 space-y-4">
        <h2 className="font-semibold">Media</h2>
        <p className="text-xs text-gray-500">
          Upload directly — files go straight to Cloudinary, no URLs to copy-paste.
        </p>

        <MediaUploader
          nextSortOrder={media.length}
          onUploaded={(newItem) => setMedia([...media, newItem])}
        />

        <div className="grid sm:grid-cols-2 gap-3 pt-2">
          {media.map((m, idx) => (
            <div key={idx} className="border rounded-lg p-3 space-y-2">
              {m.type === 'video' ? (
                <video src={m.cloudinaryUrl} className="w-full h-32 object-cover rounded-md" controls />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.cloudinaryUrl} alt="" className="w-full h-32 object-cover rounded-md" />
              )}
              <div className="flex justify-between items-center text-xs">
                <label className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={m.isHero}
                    onChange={(e) => updateRow(setMedia, media, idx, 'isHero', e.target.checked)}
                  />
                  Hero
                </label>
                <button
                  type="button"
                  onClick={() => setMedia(media.filter((_, i) => i !== idx))}
                  className="text-red-600 font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {msg && <p className="text-sm text-ceylon-teal">{msg}</p>}
      <button onClick={saveAll} className="bg-ceylon-teal text-white text-sm font-medium px-6 py-3 rounded-md">
        Save All Changes
      </button>
    </div>
  );
}