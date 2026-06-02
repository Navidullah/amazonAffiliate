// app/disclaimer/page.jsx
import { AlertTriangle, Mic } from "lucide-react";

export const metadata = {
  title: "Disclaimer - Shopyor",
  description:
    "Legal disclaimer for Shopyor's free online tools, including AI voice cloning, downloaders, and utilities. Please read before using our services.",
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
              <strong>Important Notice:</strong> This disclaimer governs your use
              of our website and tools. By using Shopyor, you accept it in full.
            </p>
          </div>

          <section>
            <h2 className="text-xl font-semibold mb-3">No Warranty</h2>
            <p className="text-muted-foreground">
              Shopyor provides online tools "as is" and "as available" without any
              representations or warranties, express or implied. We do not warrant
              that the tools will be available, error-free, secure, or that they
              will meet your requirements.
            </p>
          </section>

          {/* AI Voice Cloning disclaimer */}
          <section>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Mic className="h-5 w-5 text-primary" />
              AI Voice Cloning &amp; Generated Content
            </h2>
            <p className="text-muted-foreground">
              Our AI voice cloning tool produces synthetic, computer-generated
              audio that may be imperfect or inaccurate. You are solely
              responsible for how you use it. You must have the right or consent to
              clone any voice, and you must not use generated audio to impersonate,
              defraud, deceive, harass, or harm anyone. Shopyor is not responsible
              for content created by users and disclaims all liability for any
              misuse of the tool.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Not Professional Advice</h2>
            <p className="text-muted-foreground">
              Some tools (such as the BMI calculator or SEO generators) are for
              general informational purposes only and do not constitute
              professional medical, legal, financial, or SEO advice. Always
              consult a qualified professional for decisions that matter.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Limitation of Liability</h2>
            <p className="text-muted-foreground">
              Shopyor will not be liable for any damages arising from the use of or
              inability to use our tools, including direct, indirect, incidental,
              or consequential damages.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Third-Party Content</h2>
            <p className="text-muted-foreground">
              Our tools interact with third-party platforms (such as Facebook,
              Instagram, TikTok, and YouTube) and third-party processing providers.
              We are not affiliated with these platforms and are not responsible
              for their content, availability, privacy policies, or practices.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">User Responsibility</h2>
            <p className="text-muted-foreground">
              You are solely responsible for how you use our tools and any content
              you upload, download, or generate. You must ensure compliance with
              all applicable laws and respect the intellectual property, privacy,
              and personal rights of others.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
