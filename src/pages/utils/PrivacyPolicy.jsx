const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4 text-gray-700">Last updated: May 14, 2025</p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
        <p className="text-gray-700">
          Welcome to Zapshift. We are committed to protecting your personal
          information and your right to privacy. This Privacy Policy outlines
          how we collect, use, and safeguard your data when you use our
          door-to-door delivery services.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          2. Information We Collect
        </h2>
        <ul className="list-disc ml-5 text-gray-700">
          <li>
            Personal Information: Name, email address, phone number, and
            delivery address.
          </li>
          <li>
            Usage Data: IP address, browser type, pages visited, and time spent
            on our app.
          </li>
          <li>
            Location Data: With your permission, we may collect your device’s
            precise location to deliver our services efficiently.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          3. How We Use Your Information
        </h2>
        <p className="text-gray-700">We use your data to:</p>
        <ul className="list-disc ml-5 text-gray-700">
          <li>Provide and improve our delivery services.</li>
          <li>Send delivery updates and notifications.</li>
          <li>Respond to customer service requests.</li>
          <li>Analyze app usage to enhance user experience.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          4. Sharing Your Information
        </h2>
        <p className="text-gray-700">
          We do not sell your personal data. However, we may share your
          information with:
        </p>
        <ul className="list-disc ml-5 text-gray-700">
          <li>Third-party delivery partners for fulfilling orders.</li>
          <li>
            Service providers who assist in operating the app (e.g., hosting,
            analytics).
          </li>
          <li>Law enforcement, when legally required.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Data Security</h2>
        <p className="text-gray-700">
          We use encryption, secure servers, and access controls to protect your
          information. However, no method of transmission over the Internet is
          100% secure.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Your Rights</h2>
        <p className="text-gray-700">
          You have the right to access, correct, or delete your personal data.
          You can make these requests by contacting us at:{" "}
          <strong>support@zapshift.com</strong>
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">7. Children's Privacy</h2>
        <p className="text-gray-700">
          Our services are not intended for individuals under the age of 13. We
          do not knowingly collect data from children.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          8. Changes to This Policy
        </h2>
        <p className="text-gray-700">
          We may update this policy from time to time. Changes will be posted on
          this page with an updated date.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">9. Contact Us</h2>
        <p className="text-gray-700">
          If you have any questions about this Privacy Policy, contact us at:{" "}
          <strong>privacy@zapshift.com</strong>
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
