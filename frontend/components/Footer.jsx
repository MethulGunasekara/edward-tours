import Link from 'next/link';

export default function Footer() {
  return (
    <footer id="contact" className="bg-ceylon-teal text-white mt-24">
      <div className="max-w-6xl mx-auto px-4 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="font-serif text-lg font-bold mb-2">EDWARD VILLA FOOD COURT TOURS &amp; TRAVELS AGENCY (PRIVATE) LIMITED</h3>
          <p className="text-sm text-white/80">
            Private, locally-guided tours across Sri Lanka — planned and led by someone who
            actually knows the island.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-ceylon-gold">Get in touch</h4>
          <p className="text-sm text-white/80">WhatsApp / Phone: +94 77 938 2746</p>
          <p className="text-sm text-white/80">Email: edwardtours.lk@gmail.com</p>
          <p className="text-sm text-white/80">Address: 356/2B, Robert Gunawardena Mawatha, Malabe, Sri Lanka</p>
        </div>
        <div>
          <div>
            <h4 className="font-semibold mb-2 text-ceylon-gold">Trust & Payments</h4>
            <p className="text-sm text-white/80">Deposits secured via PayHere, CBSL-regulated.</p>
            <Link href="/refund-policy" className="text-sm text-white/80 underline hover:text-ceylon-gold mt-2 inline-block">
              Cancellation & Refund Policy
            </Link>
          </div>
          <p className="text-sm text-white/80">Deposits secured via PayHere — CBSL-regulated.</p>
        </div>
      </div>
      <div className="text-center text-xs text-white/50 py-4 border-t border-white/10">
        © {new Date().getFullYear()} EDWARD VILLA FOOD COURT TOURS &amp; TRAVELS AGENCY (PRIVATE) LIMITED. All rights reserved.
      </div>
    </footer>
  );
}