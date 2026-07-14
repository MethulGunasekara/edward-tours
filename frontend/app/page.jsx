import Link from 'next/link';
import { getPackages, getSettings, getGalleryImages } from '@/lib/api';
import HorizontalScroller from '@/components/HorizontalScroller';
import PackageCard from '@/components/PackageCard';
import InquiryForm from '@/components/InquiryForm';
import HeroVideoBackground from '@/components/HeroVideoBackground';
import MasonryGallery from '@/components/MasonryGallery';

export default async function HomePage() {
  const [packages, settings, galleryImages] = await Promise.all([
    getPackages().catch(() => []),
    getSettings().catch(() => ({ heroVideoUrl: '' })),
    getGalleryImages().catch(() => [])
  ]);

  return (
    <div>
      <HeroVideoBackground videoUrl={settings.heroVideoUrl}>
        <div className="min-h-[560px] flex items-center justify-center text-center px-4">
          <div className="max-w-2xl mx-auto py-24">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">
              See Sri Lanka Through a Local's Eyes
            </h1>
            <p className="mt-4 text-white/85">
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
        </div>
      </HeroVideoBackground>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="font-serif text-2xl font-bold text-ceylon-teal mb-6">Popular Packages</h2>
        {packages.length === 0 ? (
          <p className="text-gray-500 text-sm">No packages published yet — add one from the admin panel.</p>
        ) : (
          <HorizontalScroller>
            {packages.map((pkg) => (
              <PackageCard key={pkg._id} pkg={pkg} />
            ))}
          </HorizontalScroller>
        )}
      </section>

      {galleryImages.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="font-serif text-2xl font-bold text-ceylon-teal mb-6">Moments from Our Tours</h2>
          <MasonryGallery images={galleryImages} />
        </section>
      )}

      <section id="about" className="bg-ceylon-sand">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="font-serif text-2xl font-bold text-ceylon-teal mb-4">Not sure what you want yet?</h2>
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
