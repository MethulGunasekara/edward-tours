export const metadata = { title: 'Cancellation & Refund Policy | Edward Tours' };

export default function RefundPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="font-serif text-3xl font-bold text-ceylon-teal mb-2">
        Cancellation & Refund Policy
      </h1>
      <p className="text-xs text-gray-500 mb-10">Last updated: November 2026</p>

      <div className="space-y-8 text-sm text-gray-700 leading-relaxed">
        <section>
          <h2 className="font-semibold text-ceylon-teal text-base mb-2">1. How payment works</h2>
          <p>
            To confirm a booking with Edward Tours, a deposit of 30% of the total tour price is
            paid online in USD through PayHere, a secure payment gateway regulated in Sri Lanka.
            The remaining 70% balance is paid in person at the start of your tour. We never
            collect the full tour amount in advance.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-ceylon-teal text-base mb-2">2. If you cancel</h2>
          <p>
            The deposit secures your dates and the arrangements we make for you, such as
            guides, vehicles and reservations. For this reason, the deposit is
            <strong> non-refundable </strong>
            if you cancel your booking or do not arrive for your tour. Because we have not
            collected the balance, you owe nothing further if you cancel.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-ceylon-teal text-base mb-2">3. Changing your dates</h2>
          <p>
            If you need to move your tour to another date, contact us at least{' '}
            <strong>14 days</strong> before your travel date [CONFIRM WITH YOUR FATHER] and we
            will transfer your deposit to the new date, subject to availability. Requests made
            closer to the travel date are handled case by case.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-ceylon-teal text-base mb-2">
            4. If Edward Tours cancels
          </h2>
          <p>
            If we have to cancel or cannot deliver your tour, for example because of safety
            concerns, severe weather, or circumstances outside our control, you may choose
            either a <strong>full refund of your deposit</strong> or to reschedule your tour
            at no extra cost.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-ceylon-teal text-base mb-2">5. How to cancel</h2>
          <p>
            Email us at edwardtours.lk@gmail.com or message us on WhatsApp at +94 77 938 2746
            with your name and travel date. We will confirm your cancellation in writing.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-ceylon-teal text-base mb-2">6. Refund processing</h2>
          <p>
            Where a refund applies under section 4, it is returned to the original payment
            method through PayHere within <strong>14 business days</strong> of the cancellation being confirmed. Your bank may take additional time to
            show the refund.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-ceylon-teal text-base mb-2">7. Questions or disputes</h2>
          <p>
            If you believe a charge is incorrect, please contact us first at
            edwardtours.lk@gmail.com and we will resolve it promptly.
          </p>
        </section>
      </div>
    </div>
  );
}