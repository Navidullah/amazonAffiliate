// app/dmca/page.jsx
import { AlertCircle, Mail, Mic } from "lucide-react";

export const metadata = {
  title: "DMCA Notice - Shopyor",
  description:
    "Digital Millennium Copyright Act (DMCA) notice, takedown, and counter-notice procedure for Shopyor, covering copyrighted media and voice/likeness misuse.",
  robots: "noindex, follow",
};

export default function DMCAPage() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <AlertCircle className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">DMCA Notice</h1>
        </div>

        <div className="space-y-6">
          <div className="bg-muted/30 rounded-lg p-6 border">
            <p className="text-muted-foreground">Last Updated: {currentDate}</p>
          </div>

          <section>
            <h2 className="text-xl font-semibold mb-3">DMCA Takedown Procedure</h2>
            <p className="text-muted-foreground">
              Shopyor respects the intellectual property and personal rights of
              others and expects its users to do the same. In accordance with the
              Digital Millennium Copyright Act (DMCA), we respond promptly to valid
              claims of copyright infringement, as well as reports of misuse of a
              person's voice or likeness through our AI tools.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">To File a Notice</h2>
            <p className="text-muted-foreground mb-3">
              If you believe your copyrighted work, voice, or likeness has been
              used through our service in a way that infringes your rights, please
              provide our agent with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>
                Identification of the copyrighted work, voice, or likeness claimed
                to be infringed
              </li>
              <li>Identification of the material or activity claimed to be infringing</li>
              <li>Your contact information (name, address, email, phone number)</li>
              <li>A statement of good-faith belief that the use is not authorized</li>
              <li>A statement, under penalty of perjury, that the information is accurate</li>
              <li>Your physical or electronic signature</li>
            </ul>
          </section>

          {/* Voice misuse */}
          <section className="bg-muted/30 p-6 rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Mic className="h-4 w-4 text-primary" />
              Reporting Voice or Likeness Misuse
            </h3>
            <p className="text-sm text-muted-foreground">
              If you believe someone has cloned your voice or used your likeness
              without your consent, contact us with a description of the issue and
              any evidence. We treat voice and likeness misuse as seriously as
              copyright infringement and will act promptly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Counter-Notification</h2>
            <p className="text-muted-foreground">
              If your content was removed by mistake or misidentification, you may
              submit a counter-notification including identification of the removed
              material, a statement under penalty of perjury of your good-faith
              belief, your name, address, and phone number, your consent to the
              jurisdiction of the appropriate court, and your signature.
            </p>
          </section>

          <section className="bg-muted/30 p-6 rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              Send Notices to:
            </h3>
            <p className="font-mono text-sm">
              DMCA / Rights Agent
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
          </section>
        </div>
      </div>
    </div>
  );
}
