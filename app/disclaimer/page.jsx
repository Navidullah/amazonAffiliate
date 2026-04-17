// app/disclaimer/page.jsx
import { Metadata } from "next";
import { AlertTriangle, Scale, Shield, Eye } from "lucide-react";

export const metadata = {
  title: "Disclaimer - Shopyor",
  description:
    "Legal disclaimer for Shopyor online tools. Please read our disclaimer before using our services.",
  robots: "noindex, follow",
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <AlertTriangle className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Disclaimer</h1>
        </div>

        <div className="space-y-6">
          <div className="bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <p className="text-sm text-yellow-800 dark:text-yellow-400">
              <strong>Important Notice:</strong> This disclaimer governs your
              use of our website and tools. By using Shopyor, you accept this
              disclaimer in full.
            </p>
          </div>

          <section>
            <h2 className="text-xl font-semibold mb-3">No Warranty</h2>
            <p className="text-muted-foreground">
              Shopyor provides online tools "as is" without any representations
              or warranties, express or implied. We do not warrant that the
              tools will be available, error-free, or meet your requirements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              Limitation of Liability
            </h2>
            <p className="text-muted-foreground">
              Shopyor will not be liable for any damages arising from the use or
              inability to use our tools. This includes direct, indirect,
              incidental, or consequential damages.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Third-Party Content</h2>
            <p className="text-muted-foreground">
              Our tools interact with third-party platforms (Facebook, etc.). We
              are not responsible for the content, privacy policies, or
              practices of any third-party platforms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">User Responsibility</h2>
            <p className="text-muted-foreground">
              Users are solely responsible for how they use downloaded content.
              You must ensure compliance with all applicable laws and respect
              intellectual property rights.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
