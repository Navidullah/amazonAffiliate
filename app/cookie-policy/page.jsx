// app/cookie-policy/page.jsx
import { Metadata } from "next";
import { Cookie, Shield, Eye, Info } from "lucide-react";

export const metadata = {
  title: "Cookie Policy - Shopyor",
  description:
    "Cookie policy for Shopyor. Learn how we use cookies to enhance your experience.",
  robots: "noindex, follow",
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <Cookie className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Cookie Policy</h1>
        </div>

        <div className="space-y-6">
          <div className="bg-muted/30 rounded-lg p-6 border">
            <p className="text-muted-foreground">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <section>
            <h2 className="text-xl font-semibold mb-3">What Are Cookies?</h2>
            <p className="text-muted-foreground">
              Cookies are small text files that are placed on your computer or
              mobile device when you visit a website. They are widely used to
              make websites work more efficiently and provide information to
              website owners.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">How We Use Cookies</h2>
            <p className="text-muted-foreground mb-3">
              Shopyor uses cookies for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>
                <strong>Essential Cookies:</strong> Required for the website to
                function properly
              </li>
              <li>
                <strong>Preference Cookies:</strong> Remember your settings and
                preferences
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Help us understand how
                visitors use our site
              </li>
              <li>
                <strong>Security Cookies:</strong> Protect your data and prevent
                fraud
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Third-Party Cookies</h2>
            <p className="text-muted-foreground">
              We use Google Analytics to analyze website traffic. Google
              Analytics may set cookies on your device. These cookies do not
              collect personal information that identifies you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Managing Cookies</h2>
            <p className="text-muted-foreground">
              You can control and manage cookies in your browser settings.
              Please note that disabling cookies may affect the functionality of
              our website.
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
