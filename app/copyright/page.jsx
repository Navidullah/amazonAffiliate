// app/copyright/page.jsx
import {
  Copyright,
  FileText,
  Mail,
  Scale,
  AlertCircle,
  Clock,
  Shield,
  CheckCircle,
  Mic,
} from "lucide-react";

export const metadata = {
  title: "Copyright & Rights Policy - Shopyor",
  description:
    "Copyright, voice, and likeness rights policy for Shopyor. How we respect intellectual property and personal rights across our AI and media tools.",
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
          <h1 className="text-3xl md:text-4xl font-bold">
            Copyright &amp; Rights Policy
          </h1>
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
                  Our Commitment
                </p>
                <p className="text-blue-700 dark:text-blue-500 mt-1">
                  Shopyor respects intellectual property rights and personal
                  rights — including the right people have in their own voice and
                  likeness. We comply with the Digital Millennium Copyright Act
                  (DMCA) and respond promptly to valid infringement notices.
                </p>
              </div>
            </div>
          </div>

          {/* Our Stance */}
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Our Stance</h2>
            <p className="text-muted-foreground mb-3">
              Shopyor provides tools that process content you supply. We:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              {[
                "Do NOT host, store, or distribute copyrighted media",
                "Do NOT claim ownership of content you upload, download, or generate",
                "Do NOT encourage or facilitate infringement or impersonation",
                "Do NOT bypass copyright protection or platform security",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Voice & Likeness Rights */}
          <section>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Mic className="h-5 w-5 text-primary" />
              2. Voice, Likeness &amp; Publicity Rights
            </h2>
            <p className="text-muted-foreground mb-3">
              A person's voice is protected by privacy, publicity, and (in some
              regions) biometric laws. When using our AI voice cloning tool, you
              agree that:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>
                You will only clone a voice you own or have explicit permission to
                use.
              </li>
              <li>
                You will not impersonate, defame, or deceive using a generated
                voice.
              </li>
              <li>
                You are solely responsible for obtaining any consent or release
                required for the voice and the content you create.
              </li>
            </ul>
            <p className="text-muted-foreground mt-3">
              If someone has cloned your voice without permission using our tool,
              you can report it using the contact details below and we will act
              promptly.
            </p>
          </section>

          {/* User Responsibilities */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              3. User Responsibilities
            </h2>
            <p className="text-muted-foreground mb-3">
              Users of our service are solely responsible for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Having the right or consent to use any content they process</li>
              <li>Complying with copyright and personal-rights laws in their jurisdiction</li>
              <li>Obtaining permissions or releases from rights holders</li>
              <li>Using content only for lawful, permitted purposes</li>
              <li>Not redistributing or selling content they don't own</li>
            </ul>
          </section>

          {/* DMCA Compliance */}
          <section>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              4. DMCA &amp; Takedown Requests
            </h2>
            <p className="text-muted-foreground">
              In accordance with the DMCA and similar laws, we respond promptly to
              valid notices of copyright or rights infringement reported to our
              designated agent. See our{" "}
              <a href="/dmca" className="text-primary hover:underline">
                DMCA Notice
              </a>{" "}
              for the full procedure.
            </p>

            <div className="mt-4 bg-muted/30 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">A valid notice should include:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground ml-6 list-disc">
                <li>Identification of the work or rights claimed to be infringed</li>
                <li>Identification of the infringing material or activity</li>
                <li>Your contact information (name, address, email, phone)</li>
                <li>A statement of good-faith belief that use is not authorized</li>
                <li>A statement, under penalty of perjury, that the information is accurate</li>
                <li>Your physical or electronic signature</li>
              </ul>
            </div>
          </section>

          {/* Reporting */}
          <section>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              5. Reporting Infringement
            </h2>
            <p className="text-muted-foreground">
              To report copyright infringement or misuse of your voice/likeness,
              contact our agent:
            </p>
            <div className="mt-4 p-4 bg-muted/30 rounded-lg">
              <p className="font-mono text-sm">
                <strong>Copyright &amp; Rights Agent</strong>
                <br />
                Shopyor
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

          {/* Counter-Notification */}
          <section>
            <h2 className="text-xl font-semibold mb-3">6. Counter-Notification</h2>
            <p className="text-muted-foreground">
              If you believe content was removed by mistake or misidentification,
              you may submit a counter-notification including: identification of
              the removed material; a statement under penalty of perjury of your
              good-faith belief; your name, address, and phone number; consent to
              the jurisdiction of the appropriate court; and your signature. We
              review counter-notices according to DMCA procedures.
            </p>
          </section>

          {/* Repeat Infringers */}
          <section>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              7. Repeat Infringers
            </h2>
            <p className="text-muted-foreground">
              We reserve the right to terminate access for users determined to be
              repeat infringers, including blocking IP addresses and preventing
              future use of our tools.
            </p>
          </section>

          {/* Fair Use */}
          <section>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Scale className="h-5 w-5 text-primary" />
              8. Fair Use Notice
            </h2>
            <p className="text-muted-foreground">
              Some uses of content may qualify as "fair use" for purposes such as
              criticism, comment, news reporting, teaching, scholarship, or
              research. You are responsible for evaluating whether your use
              qualifies under applicable law.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              9. Changes to This Policy
            </h2>
            <p className="text-muted-foreground">
              We may update this policy from time to time. Changes are posted on
              this page with an updated date. Continued use constitutes acceptance.
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
                  We take infringement and voice misuse seriously. Knowingly false
                  claims may result in legal liability. Please consult legal
                  counsel if you are unsure about your rights before filing a
                  notice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
