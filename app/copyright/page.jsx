// app/copyright/page.jsx
import { Metadata } from "next";
import {
  Copyright,
  FileText,
  Mail,
  Scale,
  AlertCircle,
  Clock,
  Shield,
  CheckCircle,
} from "lucide-react";

export const metadata = {
  title: "Copyright Policy - Shopyor Video Downloader",
  description:
    "Copyright policy and DMCA compliance information for Shopyor - Respecting intellectual property rights.",
  robots: "noindex, follow",
};

export default function CopyrightPage() {
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
          <Copyright className="h-8 w-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold">Copyright Policy</h1>
        </div>

        <div className="space-y-8">
          {/* Last Updated */}
          <div className="bg-muted/30 rounded-lg p-6 border">
            <p className="text-muted-foreground">Last Updated: {currentDate}</p>
          </div>

          {/* Our Commitment */}
          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-blue-600 dark:text-blue-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-800 dark:text-blue-400">
                  Our Commitment to Copyright Compliance
                </p>
                <p className="text-blue-700 dark:text-blue-500 mt-1">
                  Shopyor respects intellectual property rights and complies
                  with the Digital Millennium Copyright Act (DMCA) and other
                  applicable copyright laws. We respond promptly to valid
                  copyright infringement notices.
                </p>
              </div>
            </div>
          </div>

          {/* What We Do */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              1. Our Copyright Stance
            </h2>
            <p className="text-muted-foreground mb-3">
              Shopyor provides tools to download publicly available videos for
              personal use. We:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>
                  Do NOT host, store, or distribute any copyrighted content
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Do NOT claim ownership of any downloaded content</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>
                  Do NOT encourage or facilitate copyright infringement
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Do NOT bypass any copyright protection mechanisms</span>
              </li>
            </ul>
          </section>

          {/* User Responsibilities */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              2. User Responsibilities
            </h2>
            <p className="text-muted-foreground mb-3">
              Users of our service are solely responsible for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Ensuring they have the right to download any content</li>
              <li>Complying with copyright laws in their jurisdiction</li>
              <li>Obtaining necessary permissions from content owners</li>
              <li>Using downloaded content only for permitted purposes</li>
              <li>Not redistributing or selling downloaded content</li>
            </ul>
          </section>

          {/* DMCA Compliance */}
          <section>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              3. DMCA Compliance
            </h2>
            <p className="text-muted-foreground">
              In accordance with the Digital Millennium Copyright Act (DMCA), we
              will respond promptly to claims of copyright infringement that are
              reported to our designated copyright agent.
            </p>

            <div className="mt-4 bg-muted/30 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">
                To File a DMCA Notice, Please Provide:
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground ml-6 list-disc">
                <li>
                  Identification of the copyrighted work claimed to have been
                  infringed
                </li>
                <li>
                  Identification of the material that is claimed to be
                  infringing
                </li>
                <li>
                  Your contact information (name, address, email, phone number)
                </li>
                <li>
                  A statement of good faith belief that use is not authorized
                </li>
                <li>
                  A statement under penalty of perjury that information is
                  accurate
                </li>
                <li>Your physical or electronic signature</li>
              </ul>
            </div>
          </section>

          {/* Reporting Infringement */}
          <section>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              4. Reporting Copyright Infringement
            </h2>
            <p className="text-muted-foreground">
              If you believe your copyrighted work has been used or displayed on
              our service in a way that constitutes copyright infringement,
              please contact our Copyright Agent:
            </p>
            <div className="mt-4 p-4 bg-muted/30 rounded-lg">
              <p className="font-mono text-sm">
                <strong>Copyright Agent</strong>
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
            <p className="text-muted-foreground mt-3 text-sm">
              Please allow 24-48 hours for a response. We take all copyright
              claims seriously and will investigate promptly.
            </p>
          </section>

          {/* Counter-Notification */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              5. Counter-Notification
            </h2>
            <p className="text-muted-foreground">
              If you believe your content was removed due to a mistake or
              misidentification, you may file a counter-notification. Your
              counter-notification must include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mt-3">
              <li>Identification of the material that was removed</li>
              <li>
                A statement under penalty of perjury that you have a good faith
                belief the material was removed due to mistake
              </li>
              <li>Your name, address, and telephone number</li>
              <li>A statement consenting to jurisdiction of federal court</li>
              <li>Your physical or electronic signature</li>
            </ul>
            <p className="text-muted-foreground mt-3">
              We will review and respond according to DMCA procedures within
              10-14 business days.
            </p>
          </section>

          {/* Repeat Infringers */}
          <section>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              6. Repeat Infringers
            </h2>
            <p className="text-muted-foreground">
              We reserve the right to terminate access to our service for users
              who are determined to be repeat infringers of copyright laws. This
              includes blocking IP addresses and preventing future access to our
              tools.
            </p>
          </section>

          {/* Fair Use Notice */}
          <section>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Scale className="h-5 w-5 text-primary" />
              7. Fair Use Notice
            </h2>
            <p className="text-muted-foreground">
              Some content on third-party platforms may be used under the "fair
              use" doctrine for purposes such as criticism, comment, news
              reporting, teaching, scholarship, or research. We encourage users
              to evaluate whether their use of downloaded content qualifies as
              fair use under applicable laws.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              8. Limitation of Liability
            </h2>
            <p className="text-muted-foreground">
              Shopyor shall not be liable for any copyright infringement
              committed by users of our service. Users assume all responsibility
              for ensuring their use of downloaded content complies with
              copyright laws.
            </p>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              9. Changes to This Policy
            </h2>
            <p className="text-muted-foreground">
              We may update this copyright policy from time to time. Changes
              will be posted on this page with an updated effective date.
              Continued use of our service after changes constitutes acceptance
              of the new policy.
            </p>
          </section>

          {/* Important Notice */}
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-red-800 dark:text-red-400 mb-1">
                  Important Legal Notice
                </p>
                <p className="text-red-700 dark:text-red-500">
                  We take copyright infringement seriously. False claims of
                  copyright infringement may result in legal liability. Please
                  consult with legal counsel before filing a DMCA notice if you
                  are unsure about your rights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
