// app/privacy-policy/page.jsx

// ----- Customize these before publishing -----
const SITE_NAME = "Shopyor";
const SITE_URL = "https://www.shopyor.com";
const CONTACT_EMAIL = "shopyor.com@gmail.com"; // ← replace
const BUSINESS_ADDRESS = "I-9, Islamabad, Pakistan"; // ← replace
const EFFECTIVE_DATE = "August 1, 2025"; // ← update as needed
// --------------------------------------------

export const metadata = {
  title: `Privacy Policy | ${SITE_NAME}`,
  description: `${SITE_NAME} respects your privacy. Learn how we collect, use, and protect your data when you visit or interact with ${SITE_URL}.`,
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: `Privacy Policy | ${SITE_NAME}`,
    description: `${SITE_NAME} respects your privacy. Learn how we collect, use, and protect your data when you visit or interact with ${SITE_URL}.`,
    url: `${SITE_URL}/privacy-policy`,
    siteName: SITE_NAME,
    type: "article",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PrivacyPolicy",
    name: `Privacy Policy | ${SITE_NAME}`,
    url: `${SITE_URL}/privacy-policy`,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: CONTACT_EMAIL,
      },
    },
    datePublished: EFFECTIVE_DATE,
    dateModified: EFFECTIVE_DATE,
    mainEntityOfPage: `${SITE_URL}/privacy-policy`,
    description: `${SITE_NAME} privacy policy detailing data collection, usage, cookies, sharing, and user rights.`,
  };

  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="mb-10">
        <p className="text-sm text-muted-foreground">
          Effective Date: {EFFECTIVE_DATE}
        </p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">
          Privacy Policy
        </h1>
        <p className="mt-3 text-base text-muted-foreground">
          At {SITE_NAME} (accessible at {SITE_URL}), your privacy is very
          important to us. This Privacy Policy explains how we collect, use,
          disclose, and safeguard your information when you use our website and
          services.
        </p>
      </header>

      {/* Content */}
      <section className="prose prose-neutral max-w-none">
        <h2>1. Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul>
          <li>
            <strong>Personal Information</strong>: your name, email address,
            billing/shipping address, phone number, and payment details when you
            make a purchase or create an account.
          </li>
          <li>
            <strong>Non-Personal Information</strong>: your IP address, browser
            type, device information, operating system, referring URLs, and
            browsing actions via cookies and analytics tools.
          </li>
          <li>
            <strong>User-Generated Content</strong>: reviews, comments,
            messages, or other content you submit.
          </li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>Process, fulfill, and deliver orders and subscriptions.</li>
          <li>Provide customer support and respond to inquiries.</li>
          <li>
            Improve, personalize, and expand our website, products, and
            services.
          </li>
          <li>
            Send service-related communications and marketing (you may opt out
            at any time).
          </li>
          <li>
            Detect, investigate, and prevent fraud or unauthorized activity.
          </li>
          <li>Comply with legal obligations and enforce our terms.</li>
        </ul>

        <h2>3. Cookies & Tracking Technologies</h2>
        <p>
          We use cookies, pixels, and similar technologies to enhance your
          experience, remember preferences, maintain sessions, and analyze site
          performance. You can control cookies via your browser settings;
          however, disabling cookies may affect site functionality.
        </p>

        <h2>4. Analytics & Advertising</h2>
        <p>
          We may use analytics and advertising partners (e.g., Google Analytics,
          Search Console, or similar) to understand usage and improve our
          services. These partners may set their own cookies and collect
          aggregated data in accordance with their privacy policies. Where
          required, we implement consent mechanisms.
        </p>

        <h2>5. Sharing of Information</h2>
        <p>
          We do not sell your personal information. We may share limited data
          with trusted <em>service providers</em> (such as payment processors,
          hosting, analytics, shipping/courier partners, email service
          providers) strictly to operate our business. We may also disclose
          information to comply with applicable laws, respond to lawful
          requests, or protect our rights.
        </p>

        <h2>6. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures
          designed to protect your personal information against unauthorized
          access, alteration, disclosure, or destruction. While we strive to
          protect your data, no method of transmission over the Internet or
          electronic storage is 100% secure.
        </p>

        <h2>7. Your Rights & Choices</h2>
        <ul>
          <li>Access, correct, or delete your personal information.</li>
          <li>Opt out of marketing emails via unsubscribe links.</li>
          <li>
            Request a copy of your data and ask how it is processed. Contact us
            at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </li>
        </ul>

        <h2>8. Data Retention</h2>
        <p>
          We retain personal information only for as long as necessary to
          fulfill the purposes outlined in this Policy, unless a longer
          retention period is required or permitted by law (e.g., tax,
          accounting, or legal obligations).
        </p>

        <h2>9. International Users</h2>
        <p>
          If you access our site from outside your home country, please note
          that your information may be transferred to, stored, and processed in
          jurisdictions where our servers or service providers are located. We
          take steps to ensure appropriate safeguards are in place.
        </p>

        <h2>10. Third-Party Links</h2>
        <p>
          Our website may include links to third-party websites. We are not
          responsible for the privacy practices of such sites. We recommend you
          review their privacy policies.
        </p>

        <h2>11. Children’s Privacy</h2>
        <p>
          We do not knowingly collect data from children under 13. If you
          believe a child has provided us with personal information, please
          contact us so we can remove it.
        </p>

        <h2>12. Changes to This Policy</h2>
        <p>
          We may update this Policy periodically. The updated version will be
          posted on this page with an updated "Effective Date" above.
        </p>

        <h2>13. Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy or our data practices,
          please contact us:
        </p>
        <ul>
          <li>
            Email: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </li>
          <li>Address: {BUSINESS_ADDRESS}</li>
        </ul>
      </section>

      {/* Footer note */}
      <footer className="mt-12 text-sm text-muted-foreground">
        © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
      </footer>
    </main>
  );
}
