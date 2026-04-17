// app/dmca/page.jsx
import { Metadata } from "next";
import { AlertCircle, FileText, Mail, Scale } from "lucide-react";

export const metadata = {
  title: "DMCA Notice - Shopyor",
  description:
    "Digital Millennium Copyright Act (DMCA) notice and takedown procedure for Shopyor.",
  robots: "noindex, follow",
};

export default function DMCAPage() {
  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <AlertCircle className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">DMCA Notice</h1>
        </div>

        <div className="space-y-6">
          <div className="bg-muted/30 rounded-lg p-6 border">
            <p className="text-muted-foreground">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              DMCA Takedown Procedure
            </h2>
            <p className="text-muted-foreground">
              Shopyor respects the intellectual property rights of others and
              expects its users to do the same. In accordance with the Digital
              Millennium Copyright Act (DMCA), we will respond promptly to
              claims of copyright infringement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              To File a DMCA Notice
            </h2>
            <p className="text-muted-foreground mb-3">
              If you believe your copyrighted work has been used or displayed on
              our service in a way that constitutes copyright infringement,
              please provide our Copyright Agent with the following information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>
                Identification of the copyrighted work claimed to have been
                infringed
              </li>
              <li>
                Identification of the material that is claimed to be infringing
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
          </section>

          <section className="bg-muted/30 p-6 rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              Send DMCA Notices to:
            </h3>
            <p className="font-mono text-sm">
              DMCA Agent
              <br />
              Shopyor
              <br />
              Email: dmca@shopyor.com
              <br />
              Response Time: 24-48 hours
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
