// app/cookie-policy/page.jsx
import { Cookie, Mail } from "lucide-react";

export const metadata = {
  title: "Cookie Policy - Shopyor",
  description:
    "Cookie Policy for Shopyor. Learn what cookies we use across our tools and how to manage them.",
  robots: "noindex, follow",
};

export default function CookiePolicyPage() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <Cookie className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Cookie Policy</h1>
        </div>

        <div className="space-y-6">
          <div className="bg-muted/30 rounded-lg p-6 border">
            <p className="text-muted-foreground">Last Updated: {currentDate}</p>
          </div>

          <section>
            <h2 className="text-xl font-semibold mb-3">What Are Cookies?</h2>
            <p className="text-muted-foreground">
              Cookies are small text files placed on your device when you visit a
              website. They help websites work efficiently, remember your
              preferences, and provide anonymous, aggregated information to site
              owners.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">How We Use Cookies</h2>
            <p className="text-muted-foreground mb-3">
              Shopyor uses cookies across all of its tools for the following
              purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>
                <strong>Essential Cookies:</strong> required for the website and
                tools to function properly
              </li>
              <li>
                <strong>Preference Cookies:</strong> remember settings such as your
                light/dark theme
              </li>
              <li>
                <strong>Analytics Cookies:</strong> help us understand how visitors
                use our site, anonymously and in aggregate
              </li>
              <li>
                <strong>Security Cookies:</strong> help protect the service and
                prevent abuse
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Third-Party Cookies</h2>
            <p className="text-muted-foreground">
              We use Google Analytics to measure traffic, and we may serve ads
              through advertising partners (such as Google AdSense) that can set
              cookies to deliver and measure ads. These cookies do not collect
              information that personally identifies you. For more, see our{" "}
              <a href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Managing Cookies</h2>
            <p className="text-muted-foreground">
              You can control and delete cookies through your browser settings.
              Please note that disabling cookies may affect the functionality of
              some features.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Contact
            </h2>
            <p className="text-muted-foreground">
              Questions about our use of cookies? Contact us at{" "}
              <a
                href="mailto:privacy@shopyor.com"
                className="text-primary hover:underline"
              >
                privacy@shopyor.com
              </a>
              .
            </p>
          </section>

          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="text-sm text-blue-800 dark:text-blue-400">
              <strong>Consent:</strong> By using our website, you consent to the
              use of cookies as described in this policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
