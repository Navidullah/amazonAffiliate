// app/privacy/page.jsx
import { Metadata } from "next";
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
  title: "Privacy Policy - Shopyor Video Downloader",
  description:
    "Privacy policy for Shopyor - Learn how we protect your privacy when using our free video downloader tools.",
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
            <p className="text-muted-foreground">
              Effective Date: {currentDate}
            </p>
          </div>

          {/* Introduction */}
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
            <p className="text-muted-foreground">
              At Shopyor ("we," "our," or "us"), your privacy is important to
              us. This Privacy Policy explains how we collect, use, disclose,
              and safeguard your information when you use our website and
              services. Please read this privacy policy carefully.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              2. Information We Collect
            </h2>
            <div className="space-y-3">
              <p className="text-muted-foreground font-medium">
                We do NOT collect:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>
                  Personal information (name, email, address, phone number)
                </li>
                <li>Facebook, YouTube, or TikTok login credentials</li>
                <li>Video URLs or download history</li>
                <li>Uploaded files or downloaded videos</li>
                <li>Payment information (we don't process payments)</li>
              </ul>

              <p className="text-muted-foreground font-medium mt-4">
                We automatically collect:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Anonymous usage data through Google Analytics</li>
                <li>IP address (anonymized for analytics)</li>
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>Pages visited and time spent</li>
              </ul>
            </div>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Server className="h-5 w-5 text-primary" />
              3. How We Use Information
            </h2>
            <p className="text-muted-foreground mb-3">
              The limited information we collect is used for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Improving our website and services</li>
              <li>Analyzing usage patterns and trends</li>
              <li>Detecting and preventing technical issues</li>
              <li>Monitoring website performance</li>
            </ul>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Cookie className="h-5 w-5 text-primary" />
              4. Cookies and Tracking Technologies
            </h2>
            <p className="text-muted-foreground mb-3">
              We use essential cookies for basic website functionality. These
              cookies:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Remember your theme preference (light/dark mode)</li>
              <li>Enable basic website operations</li>
              <li>Do NOT track you across other websites</li>
            </ul>
            <p className="text-muted-foreground mt-3">
              You can disable cookies in your browser settings, but some
              features may not work properly.
            </p>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              5. Third-Party Services
            </h2>
            <p className="text-muted-foreground mb-3">
              We use the following third-party services:
            </p>
            <div className="space-y-3">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Google Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  We use Google Analytics to understand how visitors use our
                  website. Google Analytics collects anonymous data and does not
                  identify individual users.
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
                <h3 className="font-semibold mb-2">RapidAPI</h3>
                <p className="text-sm text-muted-foreground">
                  Our video downloading functionality uses RapidAPI. Video URLs
                  are processed through their API but are not stored.
                  <a
                    href="https://rapidapi.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline ml-1"
                  >
                    RapidAPI's Privacy Policy
                  </a>
                </p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Vercel</h3>
                <p className="text-sm text-muted-foreground">
                  Our website is hosted on Vercel. They may collect standard
                  server logs.
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
              6. Data Security
            </h2>
            <p className="text-muted-foreground">
              We implement appropriate technical and organizational security
              measures to protect your information. All communications with our
              service are encrypted using SSL/TLS technology. However, no method
              of transmission over the internet is 100% secure.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-primary" />
              7. Data Retention
            </h2>
            <p className="text-muted-foreground">
              We do not store any personal data or video files. Anonymous
              analytics data is retained for 26 months as per Google Analytics
              default settings.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-primary" />
              8. Children's Privacy
            </h2>
            <p className="text-muted-foreground">
              Our service is not intended for children under 13 years of age. We
              do not knowingly collect information from children under 13. If
              you are a parent or guardian and believe your child has provided
              us with personal information, please contact us.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              9. Your Privacy Rights
            </h2>
            <p className="text-muted-foreground mb-3">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>
                <strong>GDPR (EU):</strong> Right to access, rectify, erase, and
                port your data
              </li>
              <li>
                <strong>CCPA (California):</strong> Right to know what personal
                information is collected
              </li>
              <li>
                <strong>LGPD (Brazil):</strong> Right to confirm, access, and
                correct your data
              </li>
            </ul>
            <p className="text-muted-foreground mt-3">
              Since we do not collect personal data, there is no personal
              information to access, rectify, or delete. If you have any privacy
              concerns, please contact us.
            </p>
          </section>

          {/* International Users */}
          <section>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              10. International Users
            </h2>
            <p className="text-muted-foreground">
              Our website is hosted in the United States. If you access our
              service from outside the US, please be aware that your information
              may be transferred to, stored, and processed in the US.
            </p>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              11. Changes to This Privacy Policy
            </h2>
            <p className="text-muted-foreground">
              We may update this privacy policy from time to time. Changes will
              be posted on this page with an updated effective date. We
              encourage you to review this policy periodically.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              12. Contact Us
            </h2>
            <p className="text-muted-foreground">
              If you have questions about this privacy policy or our privacy
              practices, please contact us:
            </p>
            <div className="mt-3 space-y-2">
              <p className="text-muted-foreground">
                Email:{" "}
                <a
                  href="mailto:privacy@shopyor.com"
                  className="text-primary hover:underline"
                >
                  privacy@shopyor.com
                </a>
              </p>
              <p className="text-muted-foreground">
                DMCA:{" "}
                <a
                  href="mailto:dmca@shopyor.com"
                  className="text-primary hover:underline"
                >
                  dmca@shopyor.com
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
                  GDPR Compliance
                </p>
                <p className="text-green-700 dark:text-green-500">
                  Shopyor is committed to protecting your privacy and complying
                  with the General Data Protection Regulation (GDPR). We do not
                  collect personal data, and all processing is done with your
                  implied consent through continued use of our services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
