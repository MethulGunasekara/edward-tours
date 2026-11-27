import Link from 'next/link';

export default function Footer() {
  return (
    <footer id="contact" className="bg-ceylon-teal text-white mt-24">
      <div className="max-w-6xl mx-auto px-4 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <img
              src="/logo.jpg"
              alt="Edward Tours logo"
              width={44}
              height={44}
              className="w-11 h-11 rounded-full object-cover"
            />
            <h3 className="font-serif text-lg font-bold mb-2">EDWARD VILLA FOOD COURT TOURS &amp; TRAVELS AGENCY (PRIVATE) LIMITED</h3>
          </div>
          <p className="text-sm text-white/80">
            Private, locally-guided tours across Sri Lanka, planned and led by someone who
            actually knows the island.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-ceylon-gold">Get in touch</h4>
          <p className="text-sm text-white/80">WhatsApp / Phone: +94 77 938 2746</p>
          <p className="text-sm text-white/80">Email: edwardtours.lk@gmail.com</p>
          <p className="text-sm text-white/80">Address: 356/2B,Robert Gunawardhana MW, Malabe, Sri Lanka</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-ceylon-gold">Trust & Payments</h4>
          <p className="text-sm text-white/80 mb-2">
            Deposits secured via PayHere
          </p>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="/refund-policy" className="text-white/80 hover:text-ceylon-gold">
                Cancellation & Refund Policy
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="text-white/80 hover:text-ceylon-gold">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-white/80 hover:text-ceylon-gold">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs text-white/50 py-4 border-t border-white/10">
        © {new Date().getFullYear()} Edward Tours. All rights reserved.
      </div>
    </footer>
  );
}
