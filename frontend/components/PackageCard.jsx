import Link from 'next/link';
import ImageSlideshow from './ImageSlideshow';

export default function PackageCard({ pkg }) {
  return (
    <Link
      href={`/packages/${pkg.slug}`}
      className="snap-start shrink-0 w-72 rounded-xl overflow-hidden border border-gray-200 bg-white hover:shadow-lg transition-shadow"
    >
      <ImageSlideshow images={pkg.media || []} />
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