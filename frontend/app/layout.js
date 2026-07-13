import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Ceylon Trails | Private Tour Guide in Sri Lanka',
  description:
    'Locally-guided private tours across Sri Lanka — cultural sites, wildlife safaris, beaches and hill country, custom-planned for you.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}