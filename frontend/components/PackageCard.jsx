import Link from 'next/link';

export default function PackageCard({ pkg }) {
  return (
    <Link
      href={`/packages/${pkg.slug}`}
      className="snap-start shrink-0 w-72 rounded-xl overflow-hidden border border-gray-200 bg-white hover:shadow-lg transition-shadow"
    >
      <div className="h-44 bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
        {pkg.heroImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={pkg.heroImageUrl} alt={pkg.title} className="w-full h-full object-cover" />
        ) : (
          'No image yet'
        )}
      </div>
      <div className="p-4">
        <span className="text-xs font-semibold uppercase tracking-wide text-ceylon-gold">
          {pkg.category}
        </span>
        <h3 className="font-serif text-lg font-bold mt-1 text-ceylon-teal">{pkg.title}</h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{pkg.summary}</p>
      </div>
    </Link>
  );
}