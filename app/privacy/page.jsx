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
  Mic,
} from "lucide-react";

export const metadata = {
  title: "Privacy Policy - Shopyor",
  description:
    "Privacy Policy for Shopyor. Learn how we handle your data across our AI voice cloning, video downloader, image, YouTube and SEO tools.",
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
              and the choices you have when you use our website and free online
              tools — including our AI voice cloning tool, video downloaders,
              image tools, YouTube tools, SEO tools, PDF tools, and other
              utilities. Please read it carefully.
            </p>
          </section>

          {/* What We Provide */}
          <section>
            <h2 className="text-xl font-semibold mb-3">2. Services We Provide</h2>
            <p className="text-muted-foreground mb-3">
              Shopyor offers a suite of free, browser-based tools, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>
                <strong>AI Voice Cloning &amp; Text-to-Speech</strong> — upload a
                short voice sample and generate natural-sounding speech.
              </li>
              <li>
                Video downloaders (Facebook, Instagram, TikTok, YouTube)
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
                <li>Account names, passwords, or social-media login credentials</li>
                <li>Payment information (our tools are free; we don't process payments)</li>
                <li>A permanent history of the URLs, files, or text you submit</li>
              </ul>

              <p className="text-muted-foreground font-medium mt-4">
                Content you submit to a tool (processed, not stored long-term):
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>
                  <strong>Voice samples and generated audio</strong> for the AI
                  voice cloning tool (see Section 4)
                </li>
                <li>Video links you paste into a downloader</li>
                <li>Images, PDFs, or files you upload for processing</li>
                <li>Text you enter (e.g., for speech generation or meta tags)</li>
              </ul>

              <p className="text-muted-foreground font-medium mt-4">
                We automatically collect (anonymous):
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Anonymous usage data through analytics</li>
                <li>Anonymized IP address (for security and rate-limiting)</li>
                <li>Browser type, device information, and pages visited</li>
              </ul>
            </div>
          </section>

          {/* Voice Cloning Privacy */}
          <section>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Mic className="h-5 w-5 text-primary" />
              4. Voice Cloning &amp; Audio Data
            </h2>
            <div className="bg-muted/30 p-4 rounded-lg space-y-3 text-muted-foreground text-sm">
              <p>
                Our AI voice cloning tool requires you to upload a short audio
                sample and confirm consent. Here is how that data is handled:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>
                  <strong>Consent is required.</strong> Before processing, you
                  must confirm that the voice in the sample is yours or that you
                  have explicit permission from the person whose voice it is.
                </li>
                <li>
                  <strong>Used only to fulfill your request.</strong> Your audio
                  sample is transmitted securely to our voice-processing provider
                  solely to generate the speech you request. The sample and the
                  generated audio are processed transiently and are not retained
                  longer than necessary to deliver your result.
                </li>
                <li>
                  <strong>Not used to train models or sold.</strong> We do not
                  use your voice samples to train AI models for unrelated
                  purposes, and we do not sell your audio data.
                </li>
                <li>
                  <strong>Voice data may be sensitive.</strong> In some
                  jurisdictions a voiceprint is treated as biometric or sensitive
                  personal data. By uploading a sample you consent to the
                  processing described here. Do not upload anyone's voice without
                  their permission.
                </li>
              </ul>
            </div>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Server className="h-5 w-5 text-primary" />
              5. How We Use Information
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
              6. Cookies and Tracking Technologies
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
                <h3 className="font-semibold mb-2">Voice Processing Provider</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI voice cloning and text-to-speech features are powered by
                  a third-party speech provider. Audio you submit is transmitted
                  to that provider only to generate your requested output.
                </p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Google Services</h3>
                <p className="text-sm text-muted-foreground">
                  We use Google Analytics for anonymous usage statistics and
                  Google APIs to power some YouTube tools (such as fetching
                  public video tags).
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
                  Our video downloaders process the public links you paste
                  through third-party APIs. Links are used to fetch the requested
                  media and are not stored.
                </p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Vercel (Hosting)</h3>
                <p className="text-sm text-muted-foreground">
                  Our website is hosted on Vercel, which may collect standard
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
              Files, audio, links, and text you submit are processed to deliver
              your result and are not retained longer than necessary to provide
              the service. Anonymous analytics data is retained for up to 26
              months per analytics provider defaults.
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
              <li>
                <strong>Biometric laws (e.g., Illinois BIPA):</strong> consent and
                deletion rights relating to voice data
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
                  content you submit only to deliver the tool you asked for, we
                  require consent before handling voice samples, and we do not
                  sell your data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
