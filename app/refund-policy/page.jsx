// app/refund-policy/page.jsx
import { RotateCcw, Mail, AlertTriangle, CheckCircle, Clock } from "lucide-react";

export const metadata = {
  title: "Refund Policy - Shopyor",
  description:
    "Refund policy for Shopyor's digital worksheet packs — instant delivery, when refunds are and aren't available, and how to request one.",
  robots: "noindex, follow",
};

export default function RefundPolicyPage() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <RotateCcw className="h-8 w-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold">Refund Policy</h1>
        </div>

        <div className="space-y-8">
          <div className="bg-muted/30 rounded-lg p-6 border">
            <p className="text-muted-foreground flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Last Updated: {currentDate}
            </p>
          </div>

          <section>
            <h2 className="text-xl font-semibold mb-3">1. Instant Digital Delivery</h2>
            <p className="text-muted-foreground">
              Shopyor sells digital worksheet packs (PDF files). When you
              complete a purchase, your download unlocks immediately — there
              is no shipping, and no waiting period. By purchasing, you
              specifically request immediate delivery of the digital content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              2. Waiver of the Right to Cancel
            </h2>
            <p className="text-muted-foreground">
              Under UK consumer law (the Consumer Contracts Regulations
              2013), you normally have a 14-day right to cancel an online
              purchase. This right does not apply once digital content has
              begun downloading with your consent. <strong>By checking the
              consent box at checkout and completing your purchase, you
              expressly agree to immediate delivery and acknowledge that you
              lose the right to cancel once your download becomes
              available.</strong>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. When a Refund Is Available</h2>
            <p className="text-muted-foreground mb-3">
              Because delivery is instant, refunds are limited to cases where
              something went wrong on our end, not simple changes of mind.
              We will issue a refund if:
            </p>
            <div className="space-y-3">
              {[
                "The file you received is corrupted, unreadable, or genuinely doesn't open",
                "You received the wrong product due to a checkout or system error",
                "Payment was taken but no working download link was ever provided",
                "You were accidentally charged twice for the same order",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. When a Refund Is Not Available</h2>
            <div className="space-y-3">
              {[
                "You changed your mind after successfully downloading the file",
                "You purchased the wrong pack by mistake and already downloaded it",
                "You no longer need the resource",
                "You're dissatisfied with the difficulty level or content style of a pack you've already accessed",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              5. How to Request a Refund
            </h2>
            <p className="text-muted-foreground mb-3">
              Contact us with your order details (email used at checkout and
              the product name) within 14 days of purchase:
            </p>
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="font-mono text-sm">
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

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Changes to This Policy</h2>
            <p className="text-muted-foreground">
              We may update this Refund Policy from time to time. Changes
              will be posted on this page with an updated date.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
