const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
      <p className="mb-4 text-gray-700">Last updated: May 14, 2025</p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
        <p className="text-gray-700">
          These Terms and Conditions govern your use of Zapshift's website and
          mobile application. By accessing or using our services, you agree to
          comply with and be bound by these terms.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Services</h2>
        <p className="text-gray-700">
          Zapshift offers door-to-door delivery services for various types of
          goods. We reserve the right to refuse service to anyone for any reason
          at any time.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. User Responsibilities</h2>
        <ul className="list-disc ml-5 text-gray-700">
          <li>You must provide accurate delivery and contact information.</li>
          <li>
            You agree not to use our services for illegal or unauthorized
            purposes.
          </li>
          <li>
            You are responsible for ensuring that the recipient is available to
            accept the delivery.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Payments</h2>
        <p className="text-gray-700">
          All payments for delivery services must be made through the provided
          payment gateways. You agree to pay all charges incurred by your use of
          the service.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          5. Cancellations and Refunds
        </h2>
        <p className="text-gray-700">
          Orders may be canceled within a limited time after placing them.
          Refund eligibility will depend on the status of the delivery and our
          refund policy.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          6. Limitation of Liability
        </h2>
        <p className="text-gray-700">
          Zapshift is not liable for any direct, indirect, incidental, or
          consequential damages arising from the use of our services, including
          delays or delivery failures due to circumstances beyond our control.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">7. Intellectual Property</h2>
        <p className="text-gray-700">
          All content, trademarks, and designs used in our app and website are
          owned by or licensed to Zapshift. You may not use or reproduce them
          without prior written consent.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">8. Changes to Terms</h2>
        <p className="text-gray-700">
          We may revise these Terms at any time. Continued use of the service
          after changes are posted means you accept the updated Terms.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">9. Governing Law</h2>
        <p className="text-gray-700">
          These Terms are governed by and construed in accordance with the laws
          of [Your Country/Region]. Any disputes shall be resolved in local
          courts.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">10. Contact Us</h2>
        <p className="text-gray-700">
          If you have any questions about these Terms, please contact us at:{" "}
          <strong>legal@zapshift.com</strong>
        </p>
      </section>
    </div>
  );
};

export default TermsAndConditions;
