import { notFound } from 'next/navigation';
import { getPackageBySlug } from '@/lib/api';
import InquiryForm from '@/components/InquiryForm';
import BookingForm from '@/components/BookingForm';
import HeroVideoBackground from '@/components/HeroVideoBackground';

export async function generateMetadata({ params }) {
  const pkg = await getPackageBySlug(params.slug);
  if (!pkg) return {};
  return { title: `${pkg.title} | Edward Tours`, description: pkg.summary };
}

export default async function PackageDetailPage({ params }) {
  const pkg = await getPackageBySlug(params.slug);
  if (!pkg) notFound();

  const heroVideo = pkg.media?.find((m) => m.isHero && m.type === 'video');
  const heroImage = pkg.media?.find((m) => m.isHero && m.type === 'image');

  return (
    <div>
      <HeroVideoBackground videoUrl={heroVideo?.cloudinaryUrl} posterUrl={heroImage?.cloudinaryUrl} className="bg-gray-800">
        <div className="h-72 md:h-96 flex items-end">
          <div className="max-w-6xl mx-auto px-4 pb-8 w-full text-white">
            <span className="text-xs uppercase tracking-wide text-ceylon-gold font-semibold">
              {pkg.category}
            </span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mt-1">{pkg.title}</h1>
          </div>
        </div>
      </HeroVideoBackground>

      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-10">
          <p className="text-gray-700">{pkg.summary}</p>

          {pkg.media?.filter((m) => m.type === 'image' && !m.isHero).length > 0 && (
            <div>
              <h2 className="font-serif text-xl font-bold text-ceylon-teal mb-4">Gallery</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {pkg.media.filter((m) => m.type === 'image' && !m.isHero).map((m) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={m._id} src={m.cloudinaryUrl} alt="" className="rounded-lg h-32 w-full object-cover" />
                ))}
              </div>
            </div>
          )}

          {pkg.itinerary?.length > 0 && (
            <div>
              <h2 className="font-serif text-xl font-bold text-ceylon-teal mb-4">Itinerary</h2>
              <div className="space-y-4">
                {pkg.itinerary.map((day) => (
                  <div key={day._id} className="border-l-2 border-ceylon-gold pl-4">
                    <p className="text-sm font-semibold text-ceylon-teal">
                      Day {day.dayNumber}: {day.title}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{day.description}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Overnight: {day.overnightLocation} · Meals: {day.mealsIncluded}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {pkg.pricingTiers?.length > 0 && (
            <div>
              <h2 className="font-serif text-xl font-bold text-ceylon-teal mb-4">Pricing</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {pkg.pricingTiers.map((tier) => (
                  <div key={tier._id} className="border rounded-lg p-4">
                    <p className="font-semibold text-sm">{tier.groupSizeLabel}</p>
                    <p className="text-ceylon-gold font-bold mt-1">
                      ${tier.pricePerPersonUSD} <span className="text-xs font-normal text-gray-500">/ person</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="space-y-8">
          <div className="border rounded-xl p-5">
            <h3 className="font-serif font-bold text-ceylon-teal mb-3">Request This Trip</h3>
            <BookingForm pkg={pkg} />
          </div>
          <div className="border rounded-xl p-5">
            <h3 className="font-serif font-bold text-ceylon-teal mb-3">Just Have a Question?</h3>
            <InquiryForm packageId={pkg._id} packageTitle={pkg.title} />
          </div>
        </aside>
      </div>
    </div>
  );
}