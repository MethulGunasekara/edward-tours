export const metadata = { title: 'Privacy Policy | Edward Tours' };

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="font-serif text-3xl font-bold text-ceylon-teal mb-2">Privacy Policy</h1>
      <p className="text-xs text-gray-500 mb-10">Last updated: November 2026</p>

      <div className="space-y-8 text-sm text-gray-700 leading-relaxed">
        <section>
          <h2 className="font-semibold text-ceylon-teal text-base mb-2">1. Who we are</h2>
          <p>
            Edward Tours is a private tour operator based in Sri Lanka. This policy explains what
            personal information we collect when you use this website, why we collect it, and who
            can see it. Contact: edwardtours.lk@gmail.com.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-ceylon-teal text-base mb-2">2. What we collect</h2>
          <p className="mb-2">When you send an inquiry or request a booking, we collect:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Your full name, email address and phone number</li>
            <li>Your country</li>
            <li>Your preferred travel date and number of travelers</li>
            <li>Any message or special requests you write to us</li>
          </ul>
          <p className="mt-2">
            We do not collect or store your card details. Card payments are handled entirely on
            PayHere&apos;s secure checkout page.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-ceylon-teal text-base mb-2">
            3. Why we collect it
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>To reply to your inquiry and prepare your tour</li>
            <li>To process and confirm your booking and deposit</li>
            <li>To send you booking confirmations and tour details</li>
            <li>To keep records of payments and bookings</li>
          </ul>
          <p className="mt-2">
            We do not sell your information, and we do not use it for third-party advertising.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-ceylon-teal text-base mb-2">
            4. Who else handles your data
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>PayHere</strong> processes your deposit payment and receives the details
              needed to complete it (name, email, phone, amount).
            </li>
            <li>
              <strong>MongoDB Atlas</strong> is the database where we store your inquiry and
              booking details.
            </li>
            <li>
              <strong>Vercel and Render</strong> host this website and its server.
            </li>
            <li>
              <strong>WhatsApp</strong>: if you choose to message us through the WhatsApp button,
              that conversation is subject to WhatsApp&apos;s own privacy policy.
            </li>
          </ul>
          <p className="mt-2">
            Some of these providers store data outside Sri Lanka. We only share information with
            them as needed to run the service.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-ceylon-teal text-base mb-2">5. How long we keep it</h2>
          <p>
            We keep booking and payment records for <strong>[CONFIRM WITH YOUR FATHER: e.g. 3
            years]</strong> for accounting and dispute purposes. Inquiries that do not lead to a
            booking are deleted after <strong>[CONFIRM WITH YOUR FATHER: e.g. 12 months]</strong>.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-ceylon-teal text-base mb-2">6. Your rights</h2>
          <p>
            You can ask us to show you the information we hold about you, correct it, or delete
            it (except where we must keep records, such as payment records). Email
            edwardtours.lk@gmail.com and we will respond within 14 days.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-ceylon-teal text-base mb-2">7. Security</h2>
          <p>
            Our website uses HTTPS, our admin area is password-protected, and payment details
            never pass through our servers. No online system is completely risk-free, but we take
            reasonable steps to protect your information.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-ceylon-teal text-base mb-2">8. Changes</h2>
          <p>
            If we change this policy, the updated version will appear on this page with a new
            date.
          </p>
        </section>
      </div>
    </div>
  );
}