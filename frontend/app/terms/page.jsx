import Link from 'next/link';

export const metadata = { title: 'Terms & Conditions | Edward Tours' };

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="font-serif text-3xl font-bold text-ceylon-teal mb-2">Terms & Conditions</h1>
      <p className="text-xs text-gray-500 mb-10">Last updated: November 2026</p>

      <div className="space-y-8 text-sm text-gray-700 leading-relaxed">
        <section>
          <h2 className="font-semibold text-ceylon-teal text-base mb-2">1. About these terms</h2>
          <p>
            These terms apply when you book a tour with Edward Tours through this website. By
            requesting a booking you confirm that you have read and accepted them.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-ceylon-teal text-base mb-2">2. Bookings and prices</h2>
          <p>
            All prices are shown in US dollars (USD) per person and depend on your group size.
            Your booking request is confirmed once your deposit has been received. We may
            decline a request if we cannot provide the tour on your chosen date.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-ceylon-teal text-base mb-2">3. Payment</h2>
          <p>
            A 30% deposit is paid online through PayHere to confirm your booking. The remaining
            70% is paid in person at the start of your tour. Cancellations and refunds are
            covered in our{' '}
            <Link href="/refund-policy" className="underline text-ceylon-teal">
              Cancellation & Refund Policy
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-ceylon-teal text-base mb-2">4. What is included</h2>
          <p>
            Each package page lists what is included in the tour, such as meals, transport and
            accommodation. Anything not listed, including personal expenses, entrance fees not
            mentioned, and travel insurance, is not included.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-ceylon-teal text-base mb-2">
            5. Itinerary changes
          </h2>
          <p>
            Weather, road conditions, safety, or closures at attractions can affect a tour. We
            may adjust the itinerary or substitute a comparable activity or hotel when needed,
            and we will tell you as early as we can.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-ceylon-teal text-base mb-2">
            6. Your responsibilities
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Provide accurate contact and traveler details when booking</li>
            <li>Hold a valid passport and any visa or ETA required to enter Sri Lanka</li>
            <li>Arrange your own travel insurance</li>
            <li>
              Tell us in advance about any medical conditions, mobility needs or dietary
              requirements that affect your tour
            </li>
            <li>Follow guide and safety instructions, especially during wildlife and adventure activities</li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold text-ceylon-teal text-base mb-2">7. Liability</h2>
          <p>
            We take care to run safe, well-organised tours. Travel and outdoor activities carry
            some risk, and Edward Tours is not responsible for loss, injury or delay caused by
            events outside our control, or by failure to follow safety instructions. Nothing in
            these terms limits any rights you have under Sri Lankan consumer law.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-ceylon-teal text-base mb-2">8. Privacy</h2>
          <p>
            How we handle your personal information is described in our{' '}
            <Link href="/privacy-policy" className="underline text-ceylon-teal">
              Privacy Policy
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-ceylon-teal text-base mb-2">
            9. Governing law and disputes
          </h2>
          <p>
            These terms are governed by the laws of Sri Lanka. If you have a complaint, please
            contact us first at edwardtours.lk@gmail.com so we can try to resolve it directly.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-ceylon-teal text-base mb-2">10. Contact</h2>
          <p>
            Edward Tours · edwardtours.lk@gmail.com · WhatsApp +94 77 938 2746
          </p>
        </section>
      </div>
    </div>
  );
}