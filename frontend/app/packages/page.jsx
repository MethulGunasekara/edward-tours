import { getPackages } from '@/lib/api';
import PackageCard from '@/components/PackageCard';

export const metadata = { title: 'Packages | Ceylon Trails' };

export default async function PackagesPage() {
  const packages = await getPackages().catch(() => []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="font-serif text-3xl font-bold text-ceylon-teal mb-8">All Packages</h1>
      {packages.length === 0 ? (
        <p className="text-gray-500 text-sm">No packages published yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <PackageCard key={pkg._id} pkg={pkg} />
          ))}
        </div>
      )}
    </div>
  );
}