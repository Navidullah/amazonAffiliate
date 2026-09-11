// app/privacy/page.jsx
import {
  Shield,
  Eye,
  Database,
  Cookie,
  Mail,
  Lock,
  Server,
  UserCheck,
  Trash2,
  Globe,
} from "lucide-react";

export const metadata = {
  title: "Privacy Policy - Shopyor",
  description:
    "Privacy Policy for Shopyor. Learn how we handle your data when you purchase a digital product, and across our image, YouTube and SEO tools.",
  robots: "noindex, follow",
};

export default function PrivacyPage() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
        </div>

        <div className="space-y-8">
          {/* Last Updated */}
          <div className="bg-muted/30 rounded-lg p-6 border">
            <p className="text-muted-foreground">Effective Date: {currentDate}</p>
          </div>

          {/* Introduction */}
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
            <p className="text-muted-foreground">
              At Shopyor ("we," "our," or "us"), your privacy matters. This
              Privacy Policy explains what information we collect, how we use it,
              and the choices you have when you use our website, purchase a
              digital product from our store, or use our free online tools —
              including image tools, YouTube tools, SEO tools, PDF tools,
              and other utilities.
              Please read it carefully.
            </p>
          </section>

          {/* What We Provide */}
          <section>
            <h2 className="text-xl font-semibold mb-3">2. Services We Provide</h2>
            <p className="text-muted-foreground mb-3">
              Shopyor operates a digital product store selling printable
              worksheet packs, and also offers a suite of free, browser-based
              tools, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>
                <strong>Digital worksheet packs</strong> — printable PDF
                downloads purchased through our store, delivered instantly
                after payment.
              </li>
              <li>
                Image tools (background remover, compressor, resizer, EXIF
                remover)
              </li>
              <li>YouTube tools (tags extractor, thumbnail downloader)</li>
              <li>SEO tools (robots.txt generator, meta tag generator)</li>
              <li>PDF tools and other utilities</li>
            </ul>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              3. Information We Collect
            </h2>
            <div className="space-y-3">
              <p className="text-muted-foreground font-medium">
                We do NOT collect:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Account names or passwords — there is no account system</li>
                <li>
                  Your card number, CVC, or full billing details — payments are
                  handled entirely by our payment processor, LemonSqueezy (see
                  Section 7); we never see or store your card details
                </li>
                <li>A permanent history of the URLs, files, or text you submit to our free tools</li>
              </ul>

              <p className="text-muted-foreground font-medium mt-4">
                If you purchase a digital product:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>
                  We store an order record containing the product purchased,
                  price, payment status, and a LemonSqueezy order reference —
                  used to confirm your purchase and unlock your download
                </li>
                <li>
                  Your name, email, and payment details are collected by
                  LemonSqueezy at checkout, not by Shopyor directly — see{" "}
                  <a
                    href="https://www.lemonsqueezy.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    LemonSqueezy's Privacy Policy
                  </a>
                </li>
              </ul>

              <p className="text-muted-foreground font-medium mt-4">
                Content you submit to a free tool (processed, not stored long-term):
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Images, PDFs, or files you upload for processing</li>
                <li>
                  Text or links you enter (e.g., a YouTube URL for the tags
                  extractor, text for a meta tag generator)
                </li>
              </ul>

              <p className="text-muted-foreground font-medium mt-4">
                We automatically collect (anonymous):
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Anonymous usage data through analytics</li>
                <li>
                  Anonymized IP address (for security, rate-limiting, and to
                  derive an approximate, non-precise location such as
                  country or region — we do not collect GPS or other precise
                  device location data)
                </li>
                <li>Browser type, device information, and pages visited</li>
              </ul>
            </div>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Server className="h-5 w-5 text-primary" />
              4. How We Use Information
            </h2>
            <p className="text-muted-foreground mb-3">
              The limited information we process is used to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Provide and operate the tool you requested</li>
              <li>Improve our website, performance, and features</li>
              <li>Detect, prevent, and address abuse, fraud, or technical issues</li>
              <li>Apply rate limits and keep the service available</li>
            </ul>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Cookie className="h-5 w-5 text-primary" />
              5. Cookies and Tracking Technologies
            </h2>
            <p className="text-muted-foreground mb-3">
              We use cookies for basic functionality and analytics. These:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Remember your preferences (e.g., light/dark theme)</li>
              <li>Enable core website operations and security</li>
              <li>Help us understand anonymous, aggregated usage</li>
            </ul>
            <p className="text-muted-foreground mt-3">
              See our{" "}
              <a href="/cookie-policy" className="text-primary hover:underline">
                Cookie Policy
              </a>{" "}
              for details. You can disable cookies in your browser, though some
              features may stop working.
            </p>
          </section>

          {/* Advertising */}
          <section>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Cookie className="h-5 w-5 text-primary" />
              6. Advertising and Ad Cookies
            </h2>
            <p className="text-muted-foreground mb-3">
              Shopyor may display advertisements served by Google AdSense and
              other third-party advertising partners to support the free
              tools and content on this site. These partners may use cookies,
              web beacons, and similar technologies to serve ads based on
              your prior visits to this and other websites, and to measure
              how those ads perform.
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>
                Google's use of advertising cookies enables it and its
                partners to serve ads based on your visit to this site and/or
                other sites on the Internet.
              </li>
              <li>
                We do not control the cookies set by third-party ad networks
                and are not responsible for their privacy practices — see
                each partner's own privacy policy for details.
              </li>
              <li>
                Ads may be personalized based on your browsing activity
                unless you opt out.
              </li>
            </ul>
            <p className="text-muted-foreground mt-3">
              You can opt out of personalized advertising by visiting{" "}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Google Ads Settings
              </a>
              , or opt out of third-party vendor cookies used for
              personalized advertising by visiting{" "}
              <a
                href="https://www.aboutads.info/choices"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                aboutads.info/choices
              </a>{" "}
              (or, for EU/UK visitors,{" "}
              <a
                href="https://www.youronlinechoices.eu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                youronlinechoices.eu
              </a>
              ). See our{" "}
              <a href="/cookie-policy" className="text-primary hover:underline">
                Cookie Policy
              </a>{" "}
              for more on how we and our partners use cookies.
            </p>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              7. Third-Party Services
            </h2>
            <p className="text-muted-foreground mb-3">
              We rely on the following third parties to operate our tools:
            </p>
            <div className="space-y-3">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">LemonSqueezy (Payments)</h3>
                <p className="text-sm text-muted-foreground">
                  All purchases are processed by LemonSqueezy, our payment
                  processor and merchant of record. Your card details, name,
                  and email are collected and processed by LemonSqueezy, not
                  Shopyor.
                  <a
                    href="https://www.lemonsqueezy.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline ml-1"
                  >
                    LemonSqueezy's Privacy Policy
                  </a>
                </p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Vercel Blob (File Storage)</h3>
                <p className="text-sm text-muted-foreground">
                  Purchased digital products are stored in a private Vercel
                  Blob store and served only after your payment is confirmed.
                </p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Google Services</h3>
                <p className="text-sm text-muted-foreground">
                  We use Google AdSense to serve advertising (see Section 6)
                  and Google APIs to power some YouTube tools (such as
                  fetching public video tags).
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline ml-1"
                  >
                    Google's Privacy Policy
                  </a>
                </p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Media Processing APIs</h3>
                <p className="text-sm text-muted-foreground">
                  Our YouTube tools process the public links you paste through
                  third-party APIs. Links are used to fetch the requested
                  media and are not stored.
                </p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Vercel (Hosting &amp; Analytics)</h3>
                <p className="text-sm text-muted-foreground">
                  Our website is hosted on Vercel, which may collect standard
                  server logs. We also use Vercel Analytics and Speed
                  Insights for anonymous, aggregate traffic and performance
                  statistics — these do not set identifying cookies.
                  <a
                    href="https://vercel.com/legal/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline ml-1"
                  >
                    Vercel's Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              8. Data Security
            </h2>
            <p className="text-muted-foreground">
              We use appropriate technical and organizational measures to protect
              your information, and all communication with our service is
              encrypted using SSL/TLS. However, no method of transmission over
              the internet is 100% secure.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-primary" />
              9. Data Retention
            </h2>
            <p className="text-muted-foreground">
              Files, links, and text you submit to a free tool are
              processed to deliver your result and are not retained longer
              than necessary to provide the service. Order records for
              digital product purchases (product, price, payment status) are
              retained for accounting, tax, and refund-handling purposes.
              Anonymous analytics data is retained per our analytics
              provider's default retention policy.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-primary" />
              10. Children's Privacy
            </h2>
            <p className="text-muted-foreground">
              Our service is not intended for children under 13. We do not
              knowingly collect information from children under 13. If you believe
              a child has provided us information, please contact us and we will
              delete it.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              11. Your Privacy Rights
            </h2>
            <p className="text-muted-foreground mb-3">
              Depending on where you live, you may have rights to access,
              correct, delete, or port your data, and to object to certain
              processing:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>
                <strong>GDPR (EU/UK):</strong> access, rectify, erase, restrict,
                and port your data
              </li>
              <li>
                <strong>CCPA/CPRA (California):</strong> know, delete, and opt out
                of the "sale" or "sharing" of personal information (we do not sell
                it)
              </li>
            </ul>
            <p className="text-muted-foreground mt-3">
              Because we do not maintain user accounts or long-term records of
              your submissions, there is generally no stored personal data to
              retrieve. To exercise any right, contact us using the details
              below.
            </p>
          </section>

          {/* International Users */}
          <section>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              12. International Users
            </h2>
            <p className="text-muted-foreground">
              Our service and providers may process data in the United States and
              other countries. If you access our service from outside these
              regions, your information may be transferred to and processed there.
            </p>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              13. Changes to This Privacy Policy
            </h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. Changes will be
              posted on this page with an updated effective date. Please review it
              periodically.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              14. Contact Us
            </h2>
            <p className="text-muted-foreground">
              For any privacy questions or requests, contact us:
            </p>
            <div className="mt-3 space-y-2">
              <p className="text-muted-foreground">
                Email:{" "}
                <a
                  href="mailto:shopyor.com@gmail.com"
                  className="text-primary hover:underline"
                >
                  shopyor.com@gmail.com
                </a>
              </p>
            </div>
          </section>

          {/* GDPR Compliance Notice */}
          <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-green-600 dark:text-green-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-green-800 dark:text-green-400 mb-1">
                  Privacy by Design
                </p>
                <p className="text-green-700 dark:text-green-500">
                  Shopyor is built to minimize data collection. We process the
                  content you submit only to deliver the tool you asked for,
                  and we do not sell your data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
