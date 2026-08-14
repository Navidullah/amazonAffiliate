// app/about/page.jsx
import { Metadata } from "next";
import {
  Users,
  Target,
  Shield,
  Heart,
  Award,
  Globe,
  Scale,
} from "lucide-react";

export const metadata = {
  title: "About Shopyor — Year 6 Maths Worksheets & Free Online Tools",
  description:
    "Shopyor sells printable Year 6 Maths & KS2 SATs worksheet packs, and runs a free online toolbox built by a small team. Founded in 2025.",
  robots: "index, follow",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About Shopyor</h1>
          <p className="text-xl text-muted-foreground">
            Printable Year 6 Maths &amp; KS2 SATs worksheets, plus 20+ free
            online tools — founded in 2025
          </p>
        </div>

        <div className="space-y-12">
          {/* Who built this */}
          <section className="text-center">
            <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4">
              <Users className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-semibold mb-3">
              Why we built Shopyor
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Shopyor was founded in 2025 by a small, independent team (we go by
              the Shopyor Team) after running into the same wall over and over:
              needing to do something simple online — compress a PDF, remove a
              background, download a video — and finding every tool wanted a
              sign-up first, payment to download, or stuck a watermark on the
              result. So we built our own toolbox instead, and kept adding to
              it. Shopyor's free tools are still actively maintained and
              growing, one tool at a time.
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              We later brought that same "no friction" thinking to a second
              product: printable Year 6 Maths and KS2 SATs worksheet packs.
              Instead of a subscription or an account, it's the same
              philosophy as our tools — pick a pack, pay once, download
              instantly.
            </p>
          </section>

          {/* Mission Section */}
          <section className="text-center">
            <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4">
              <Target className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              To make useful things easy to get, without friction. For our
              worksheet packs, that means printable Year 6 Maths and KS2 SATs
              practice, formatted like the real assessment with full mark
              schemes, sold with no subscription and no account required. For
              our free tools — video downloaders, PDF and image utilities, an
              AI voice cloner, and more — it means no paywall, no sign-up
              form, and no watermark in the way.
            </p>
          </section>

          {/* Values Section */}
          <section>
            <h2 className="text-2xl font-semibold text-center mb-8">
              Our Core Values
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center p-4">
                <Shield className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Privacy First</h3>
                <p className="text-sm text-muted-foreground">
                  We never store your files, videos, or personal data
                </p>
              </div>
              <div className="text-center p-4">
                <Heart className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">No Subscriptions</h3>
                <p className="text-sm text-muted-foreground">
                  Free tools stay free. Worksheet packs are a one-time
                  payment — no recurring charges, no account required
                </p>
              </div>
              <div className="text-center p-4">
                <Award className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Quality Service</h3>
                <p className="text-sm text-muted-foreground">
                  Fast processing and clean results, tool after tool
                </p>
              </div>
            </div>
          </section>

          {/* Copyright Compliance Section */}
          <section className="bg-muted/30 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <Scale className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">
                  Our Commitment to Copyright Compliance
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Shopyor is committed to respecting intellectual property
                  rights. Our worksheet packs are original content we create
                  ourselves. For our free tools, we:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>
                    Do not host any copyrighted third-party content on our
                    servers
                  </li>
                  <li>
                    Provide tools only for downloading publicly available
                    content
                  </li>
                  <li>Respond promptly to DMCA takedown requests</li>
                  <li>Encourage users to respect copyright laws</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="text-center pt-6">
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p className="text-muted-foreground mb-4">
              Have questions or need to report copyright infringement?
            </p>
            <a
              href="mailto:shopyor.com@gmail.com"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              shopyor.com@gmail.com
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}
