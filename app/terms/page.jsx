// app/terms/page.jsx
import {
  Scale,
  CheckCircle,
  AlertTriangle,
  Mail,
  Clock,
  Mic,
} from "lucide-react";

export const metadata = {
  title: "Terms of Service - Shopyor",
  description:
    "Terms of Service for Shopyor's digital worksheet packs and free online tools, including AI voice cloning, video downloaders, image, YouTube and SEO tools. Read before using our services.",
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
            <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using Shopyor ("we," "our," or "us"), you accept
              and agree to be bound by these Terms of Service. If you do not agree
              to these terms, please do not use our website or services.
            </p>
          </section>

          {/* Service Description */}
          <section>
            <h2 className="text-xl font-semibold mb-3">2. Service Description</h2>
            <p className="text-muted-foreground mb-3">
              Shopyor provides free online tools, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>
                <strong>AI Voice Cloning &amp; Text-to-Speech</strong> — generate
                speech from a short voice sample and your text
              </li>
              <li>Video downloaders (Facebook, Instagram, TikTok, YouTube)</li>
              <li>
                Image tools (background remover, compressor, resizer, EXIF
                remover)
              </li>
              <li>YouTube tools (tags extractor, thumbnail downloader)</li>
              <li>SEO tools (robots.txt generator, meta tag generator)</li>
              <li>PDF tools and other online utilities</li>
            </ul>
            <p className="text-muted-foreground mt-3">
              We do not host, store, or distribute third-party videos. Our
              downloaders simply facilitate access to publicly available content
              from third-party platforms.
            </p>
          </section>

          {/* AI Voice Cloning Terms */}
          <section>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Mic className="h-5 w-5 text-primary" />
              3. AI Voice Cloning — Acceptable Use
            </h2>
            <p className="text-muted-foreground mb-3">
              Our voice cloning tool is powerful and easy to misuse. Your use of
              it is subject to the following binding rules:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">
                  <strong>Consent is mandatory.</strong> You may only upload a
                  voice that is your own or one you have explicit, verifiable
                  permission to use. You confirm this consent each time you use
                  the tool.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">
                  <strong>You own your output.</strong> Subject to these Terms and
                  the rights of any third party, you are responsible for, and may
                  use, the audio you generate for lawful purposes.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">
                  <strong>You must NOT</strong> use the tool to impersonate any
                  person, clone the voice of a public figure or any individual
                  without consent, create deceptive "deepfake" audio, commit fraud
                  or social engineering, bypass voice authentication, harass,
                  defame, or spread misinformation, or produce illegal,
                  defamatory, hateful, or sexually explicit content involving real
                  people.
                </p>
              </div>
            </div>
          </section>

          {/* User Responsibilities */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              4. User Responsibilities
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">
                  <strong>Rights &amp; Consent:</strong> You are solely
                  responsible for ensuring you have the rights, permissions, or
                  consent needed for any content you upload, download, or generate.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">
                  <strong>Legal Compliance:</strong> You must comply with all
                  applicable laws and the Terms of Service of any third-party
                  platform you interact with.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">
                  <strong>Personal Use:</strong> Downloaded content is for
                  personal, non-commercial use unless you have explicit permission
                  from the rights holder.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">
                  <strong>Age Restriction:</strong> You must be at least 13 years
                  old to use our services.
                </p>
              </div>
            </div>
          </section>

          {/* Prohibited Uses */}
          <section>
            <h2 className="text-xl font-semibold mb-3">5. Prohibited Uses</h2>
            <div className="space-y-3">
              {[
                "Impersonation, deepfakes, or cloning a voice without consent",
                "Downloading private, restricted, or non-public content",
                "Using generated or downloaded content for fraud or deception",
                "Commercial use of third-party content without permission",
                "Automated or bulk use via bots or scripts",
                "Attempting to bypass our security, rate limits, or restrictions",
                "Any illegal, harmful, hateful, or infringing activity",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              6. Intellectual Property
            </h2>
            <p className="text-muted-foreground mb-3">
              Content you download or that appears on third-party platforms
              remains the property of its respective rights holders. Shopyor
              claims no ownership over your uploads, downloads, or generated
              output. Our tools are provided "as is."
            </p>
            <p className="text-muted-foreground">
              The Shopyor name, logo, and website design are our intellectual
              property and may not be used without our written permission.
            </p>
          </section>

          {/* Copyright Infringement */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              7. Copyright &amp; Rights Infringement
            </h2>
            <p className="text-muted-foreground mb-3">
              We respect intellectual property and personal rights (including
              voice and likeness rights) and comply with the Digital Millennium
              Copyright Act (DMCA). If you believe your rights have been
              infringed, see our{" "}
              <a href="/dmca" className="text-primary hover:underline">
                DMCA Notice
              </a>{" "}
              and{" "}
              <a href="/copyright" className="text-primary hover:underline">
                Copyright Policy
              </a>
              , or contact us:
            </p>
            <div className="bg-muted/30 p-4 rounded-lg mt-3">
              <p className="font-mono text-sm">
                Copyright Agent — Shopyor
                <br />
                Email:{" "}
                <a
                  href="mailto:shopyor.com@gmail.com"
                  className="text-primary hover:underline"
                >
                  shopyor.com@gmail.com
                </a>
                <br />
                Response Time: 24-48 hours
              </p>
            </div>
          </section>

          {/* Disclaimer of Warranties */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              8. Disclaimer of Warranties
            </h2>
            <p className="text-muted-foreground">
              OUR SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES
              OF ANY KIND. We do not warrant that the service will be
              uninterrupted, error-free, or that AI-generated output will be
              accurate, reliable, or fit for any particular purpose.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              9. Limitation of Liability
            </h2>
            <p className="text-muted-foreground">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, SHOPYOR SHALL NOT BE LIABLE
              FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
              DAMAGES, INCLUDING LOSS OF PROFITS OR DATA, ARISING FROM your use or
              inability to use our service, any third-party content, or any misuse
              of content you generate or download.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-xl font-semibold mb-3">10. Termination</h2>
            <p className="text-muted-foreground">
              We may suspend or terminate your access to our service at any time,
              without notice, for any reason — including a breach of these Terms or
              misuse of the voice cloning tool.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-xl font-semibold mb-3">11. Governing Law</h2>
            <p className="text-muted-foreground">
              These Terms are governed by applicable law without regard to
              conflict-of-law provisions. Any disputes shall be handled in the
              competent courts of the applicable jurisdiction.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-xl font-semibold mb-3">12. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We may modify these Terms at any time. Material changes will be
              posted on this page. Continued use of the service after changes
              constitutes acceptance of the new terms.
            </p>
          </section>

          {/* Digital Products & Purchases */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              13. Digital Products &amp; Purchases
            </h2>
            <p className="text-muted-foreground mb-3">
              In addition to our free tools, Shopyor sells digital worksheet
              packs (PDF downloads). The following terms apply to any
              purchase:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">
                  <strong>Payment processing.</strong> All payments are
                  processed by LemonSqueezy, our third-party payment
                  processor and merchant of record. We do not collect or
                  store your card details.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">
                  <strong>Instant delivery.</strong> Digital products unlock
                  immediately after payment is confirmed. By completing a
                  purchase, you consent to immediate delivery of digital
                  content.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">
                  <strong>License to use.</strong> When you purchase a
                  worksheet pack, we grant you a personal, non-exclusive,
                  non-transferable license to print and use the file for
                  personal, tutoring, or single-classroom use. You may not
                  resell, redistribute, publicly share, or republish the file
                  or its content, in whole or in part.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">
                  <strong>Refunds.</strong> Because digital products are
                  delivered instantly, refunds are limited to specific
                  circumstances (such as a corrupted file or non-delivery).
                  See our{" "}
                  <a href="/refund-policy" className="text-primary hover:underline">
                    Refund Policy
                  </a>{" "}
                  for full details.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">
                  <strong>Accuracy.</strong> Worksheet content is original
                  material created to reflect general UK KS2 curriculum
                  topics. It is not official exam content and is not
                  affiliated with, endorsed by, or derived from the Standards
                  and Testing Agency or any exam board.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              14. Contact Information
            </h2>
            <p className="text-muted-foreground">
              Questions about these Terms? Contact us at:
            </p>
            <div className="mt-3 space-y-1">
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
        </div>
      </div>
    </div>
  );
}
