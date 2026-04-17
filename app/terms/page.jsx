// app/terms/page.jsx
import { Metadata } from "next";
import {
  Scale,
  CheckCircle,
  AlertTriangle,
  FileText,
  Clock,
  Mail,
  Shield,
} from "lucide-react";

export const metadata = {
  title: "Terms of Service - Shopyor Video Downloader",
  description:
    "Terms of Service for Shopyor - Free video downloader for Facebook, YouTube, and TikTok. Read our terms before using our services.",
  robots: "noindex, follow",
};

export default function TermsPage() {
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
          <Scale className="h-8 w-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold">Terms of Service</h1>
        </div>

        <div className="space-y-8">
          {/* Last Updated */}
          <div className="bg-muted/30 rounded-lg p-6 border">
            <p className="text-muted-foreground flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Last Updated: {currentDate}
            </p>
          </div>

          {/* Introduction */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              1. Acceptance of Terms
            </h2>
            <p className="text-muted-foreground">
              By accessing and using Shopyor ("we," "our," or "us"), you accept
              and agree to be bound by these Terms of Service. If you do not
              agree to these terms, please do not use our website or services.
            </p>
          </section>

          {/* Service Description */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              2. Service Description
            </h2>
            <p className="text-muted-foreground mb-3">
              Shopyor provides free online tools including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Facebook video and reel downloader</li>
              <li>YouTube video downloader (Coming Soon)</li>
              <li>TikTok video downloader (Coming Soon)</li>
              <li>Image background remover</li>
              <li>Image compressor and resizer</li>
              <li>PDF to Word converter</li>
              <li>Other online utility tools</li>
            </ul>
            <p className="text-muted-foreground mt-3">
              We do not host, store, or distribute any videos. Our service
              simply facilitates downloading of publicly available content from
              third-party platforms.
            </p>
          </section>

          {/* User Responsibilities */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              3. User Responsibilities
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">
                  <strong>Content Rights:</strong> You are solely responsible
                  for ensuring you have the necessary rights or permissions to
                  download any content.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">
                  <strong>Legal Compliance:</strong> You must comply with all
                  applicable laws and third-party platform Terms of Service.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">
                  <strong>Personal Use Only:</strong> Downloaded content is for
                  personal, non-commercial use unless you have explicit
                  permission from the content owner.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">
                  <strong>Age Restriction:</strong> You must be at least 13
                  years old to use our services.
                </p>
              </div>
            </div>
          </section>

          {/* Prohibited Uses */}
          <section>
            <h2 className="text-xl font-semibold mb-3">4. Prohibited Uses</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">
                  Downloading private or restricted content
                </p>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">
                  Using downloaded content for commercial purposes without
                  permission
                </p>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">
                  Automated or bulk downloading (bots, scripts, etc.)
                </p>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">
                  Attempting to bypass our service limitations
                </p>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">
                  Using our service for illegal activities
                </p>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">
                  Redistributing or selling downloaded content
                </p>
              </div>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              5. Intellectual Property
            </h2>
            <p className="text-muted-foreground mb-3">
              All content downloaded through our service remains the property of
              its respective copyright holders. Shopyor does not claim any
              ownership over downloaded content. Our tool is provided "as is"
              without any warranties.
            </p>
            <p className="text-muted-foreground">
              The Shopyor name, logo, and website design are our intellectual
              property and may not be used without our written permission.
            </p>
          </section>

          {/* Copyright Infringement */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              6. Copyright Infringement
            </h2>
            <p className="text-muted-foreground mb-3">
              We respect intellectual property rights and comply with the
              Digital Millennium Copyright Act (DMCA). If you believe your
              copyrighted work has been used on our service in a way that
              constitutes copyright infringement, please contact our Copyright
              Agent:
            </p>
            <div className="bg-muted/30 p-4 rounded-lg mt-3">
              <p className="font-mono text-sm">
                Copyright Agent
                <br />
                Shopyor
                <br />
                Email:{" "}
                <a
                  href="mailto:dmca@shopyor.com"
                  className="text-primary hover:underline"
                >
                  dmca@shopyor.com
                </a>
                <br />
                Response Time: 24-48 hours
              </p>
            </div>
          </section>

          {/* Disclaimer of Warranties */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              7. Disclaimer of Warranties
            </h2>
            <p className="text-muted-foreground">
              OUR SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY
              WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT
              WARRANT THAT:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mt-3">
              <li>
                The service will be uninterrupted, timely, secure, or error-free
              </li>
              <li>
                The results obtained from using the service will be accurate or
                reliable
              </li>
              <li>Any errors in the service will be corrected</li>
            </ul>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              8. Limitation of Liability
            </h2>
            <p className="text-muted-foreground">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, SHOPYOR SHALL NOT BE
              LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
              PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS,
              DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mt-3">
              <li>Your use or inability to use our service</li>
              <li>Any conduct or content of any third party on our service</li>
              <li>
                Unauthorized access, use, or alteration of your transmissions or
                content
              </li>
            </ul>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-xl font-semibold mb-3">9. Termination</h2>
            <p className="text-muted-foreground">
              We may terminate or suspend your access to our service
              immediately, without prior notice or liability, for any reason
              whatsoever, including without limitation if you breach the Terms.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-xl font-semibold mb-3">10. Governing Law</h2>
            <p className="text-muted-foreground">
              These Terms shall be governed and construed in accordance with the
              laws of the United States, without regard to its conflict of law
              provisions.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-xl font-semibold mb-3">11. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify or replace these Terms at any time.
              If a revision is material, we will provide at least 30 days'
              notice prior to any new terms taking effect. Continued use of the
              service after changes constitutes acceptance of the new terms.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              12. Contact Information
            </h2>
            <p className="text-muted-foreground">
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="mt-3 space-y-1">
              <p className="text-muted-foreground">
                Email:{" "}
                <a
                  href="mailto:legal@shopyor.com"
                  className="text-primary hover:underline"
                >
                  legal@shopyor.com
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
        </div>
      </div>
    </div>
  );
}
