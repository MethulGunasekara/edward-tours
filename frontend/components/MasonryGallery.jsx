// Deterministic size pattern (not truly random) so server and client render
// identically — a real random() here would cause a hydration mismatch.
const SIZE_PATTERN = [
  'col-span-2 row-span-2',
  'col-span-2 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-2',
  'col-span-2 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-2',
  'col-span-2 row-span-2',
  'col-span-1 row-span-1',
  'col-span-2 row-span-1'
];

export default function MasonryGallery({ images = [] }) {
  if (images.length === 0) return null;

  return (
    <div className="grid gap-3 grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 auto-rows-[110px] grid-flow-row-dense">
      {images.map((img, i) => (
        <div
          key={img._id || i}
          className={`${SIZE_PATTERN[i % SIZE_PATTERN.length]} rounded-xl overflow-hidden relative group`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.cloudinaryUrl}
            alt={img.packageTitle || ''}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {img.packageTitle && (
            <div className="absolute inset-0 flex items-end bg-black/0 group-hover:bg-black/30 transition-colors">
              <span className="text-white text-xs font-medium p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {img.packageTitle}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}