import Link from 'next/link';
import { getPackages } from '@/lib/api';
import HorizontalScroller from '@/components/HorizontalScroller';
import PackageCard from '@/components/PackageCard';
import InquiryForm from '@/components/InquiryForm';

export default async function HomePage() {
  let packages = [];
  try {
    packages = await getPackages();
  } catch {
    packages = [];
  }

  return (
    <div>
      <section className="relative bg-ceylon-teal text-white">
        <div className="max-w-6xl mx-auto px-4 py-24 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold">
            See Sri Lanka Through a Local's Eyes
          </h1>
          <p className="mt-4 text-white/85 max-w-2xl mx-auto">
            Private, personally-guided tours across the island — cultural triangle, wildlife
            safaris, hill country and coast, custom-built around your dates.
          </p>
          <Link
            href="/packages"
            className="inline-block mt-8 bg-ceylon-gold text-white font-medium px-6 py-3 rounded-md hover:opacity-90"
          >
            Browse Packages
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="font-serif text-2xl font-bold text-ceylon-teal mb-6">Popular Packages</h2>
        {packages.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No packages published yet — add one from the admin panel.
          </p>
        ) : (
          <HorizontalScroller>
            {packages.map((pkg) => (
              <PackageCard key={pkg._id} pkg={pkg} />
            ))}
          </HorizontalScroller>
        )}
      </section>

      <section id="about" className="bg-ceylon-sand">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="font-serif text-2xl font-bold text-ceylon-teal mb-4">
            Not sure what you want yet?
          </h2>
          <p className="text-gray-700 mb-8">
            Send us your dates, interests and group size — we'll build a custom itinerary for you.
          </p>
          <div className="bg-white rounded-xl p-6 shadow-sm max-w-xl mx-auto text-left">
            <InquiryForm />
          </div>
        </div>
      </section>
    </div>
  );
}