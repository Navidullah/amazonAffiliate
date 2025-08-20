// app/write-for-us/page.jsx
"use client";

import { useState } from "react";
import Link from "next/link";

export const metadata = {
  title: "Write for Us | Shopyor – Health, Fitness & Wellness Guest Posts",
  description:
    "Pitch your guest post to Shopyor! We accept high-quality articles on health, fitness, nutrition, mental health, sleep, and wellness. Read the guidelines and submit your topic.",
  alternates: { canonical: "https://www.shopyor.com/write-for-us" },
  openGraph: {
    title: "Write for Us | Shopyor",
    description:
      "Contribute guest posts on health, fitness, nutrition, sleep, and wellness. Share your expertise with our audience.",
    url: "https://www.shopyor.com/write-for-us",
    type: "article",
    siteName: "Shopyor",
  },
  twitter: {
    card: "summary_large_image",
    title: "Write for Us | Shopyor",
    description:
      "Submit your guest post ideas on health, fitness, and wellness.",
  },
  keywords: [
    "write for us health",
    "fitness guest post",
    "wellness guest post",
    "nutrition write for us",
    "health blog contributors",
    "submit guest post",
  ],
};

export default function WriteForUsPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What topics does Shopyor accept?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Health, fitness, nutrition, sleep, mental well-being, healthy recipes, evidence-based product guides, and practical wellness tips aligned with our editorial standards.",
        },
      },
      {
        "@type": "Question",
        name: "Do you allow links?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. 1 relevant dofollow link to your site within the body (editor’s discretion) and up to 2 nofollow reference links. Affiliate or overly promotional links are not allowed.",
        },
      },
      {
        "@type": "Question",
        name: "What is the word count?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Typically 1,200–2,000 words. We prioritize depth, originality, and actionable takeaways.",
        },
      },
      {
        "@type": "Question",
        name: "How do I submit?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use the pitch form on this page. We’ll reply within 5–7 business days if it’s a fit.",
        },
      },
    ],
  };

  // Simple client-side form (with honeypot) you can wire to your backend or Formspree/Zapier.
  const [status, setStatus] = (useState < "idle") | "ok" | ("err" > "idle");

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    // Honeypot
    if (form.get("website")) return;

    // TODO: replace with your endpoint: /api/guest-post (Node/Express/Next API)
    // For now, simulate success.
    setStatus("ok");
    e.currentTarget.reset();
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-100 via-white to-sky-100" />
        <div className="mx-auto max-w-5xl px-4 py-16 md:py-24">
          <header className="text-center">
            <span className="inline-block rounded-full border px-3 py-1 text-xs tracking-wide uppercase text-emerald-700 border-emerald-200 bg-white/70">
              Write for Us
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
              Share Your Expertise on Health, Fitness & Wellness
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-neutral-700 md:text-lg">
              Are you a coach, nutritionist, researcher, or passionate writer?
              Pitch your original, evidence-based article and help thousands of
              readers live healthier, happier lives on <strong>Shopyor</strong>.
            </p>
          </header>

          {/* Benefits */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              [
                "Reach a Targeted Audience",
                "Get your ideas in front of readers actively seeking health and fitness guidance.",
              ],
              [
                "Build Your Authority",
                "Showcase your expertise with a byline and author bio (with one relevant link).",
              ],
              [
                "Long-Term Visibility",
                "Evergreen content promoted via our blog, newsletter, and social channels.",
              ],
            ].map(([title, desc]) => (
              <div
                key={title}
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5"
              >
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-neutral-700">{desc}</p>
              </div>
            ))}
          </div>

          {/* Topics We Love */}
          <div className="mt-12 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5">
            <h2 className="text-2xl font-semibold">Topics We Love</h2>
            <ul className="mt-4 grid list-disc gap-2 pl-5 text-neutral-700 md:grid-cols-2">
              <li>Evidence-based health, fitness & conditioning</li>
              <li>Nutrition: macros, micronutrients, meal planning</li>
              <li>Weight management, metabolic health, glucose insights</li>
              <li>Mental health, stress resilience, sleep optimization</li>
              <li>Beginner-friendly workouts & injury-safe routines</li>
              <li>Healthy recipes with macros (photos welcome)</li>
              <li>
                Science explainers: studies, mechanisms, practical takeaways
              </li>
              <li>Honest, non-promotional product guides (with disclaimers)</li>
            </ul>

            <h2 className="mt-8 text-2xl font-semibold">
              Submission Guidelines
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-neutral-700">
              <li>
                <strong>Original only:</strong> Not published elsewhere; passes
                plagiarism checks & AI-content detection with human editing.
              </li>
              <li>
                <strong>Word count:</strong> 1,200–2,000 words; clear headers
                (H2/H3), short paragraphs, bullet points where helpful.
              </li>
              <li>
                <strong>Sources:</strong> Cite peer-reviewed research or
                reputable orgs with links. Use recent, high-quality references.
              </li>
              <li>
                <strong>Links:</strong> 1 relevant <em>dofollow</em> link to
                your site (editor’s discretion) + up to 2 <em>nofollow</em>{" "}
                references. No affiliate or sales pages.
              </li>
              <li>
                <strong>Tone:</strong> Practical, supportive, inclusive. Avoid
                medical claims; add disclaimers where needed.
              </li>
              <li>
                <strong>Images:</strong> Provide original photos or royalty-free
                images with credits (1200×800+). Include alt text.
              </li>
              <li>
                <strong>Bio:</strong> 50–100 words + headshot (optional) +
                social handle(s).
              </li>
              <li>
                <strong>Editing:</strong> We may edit for clarity, style, SEO,
                and compliance. Final publishing is at our discretion.
              </li>
            </ul>

            <h2 className="mt-8 text-2xl font-semibold">
              Editorial & SEO Standards
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-neutral-700">
              <li>
                Use a descriptive title with a clear benefit (include your
                primary keyword).
              </li>
              <li>
                Compelling intro, scannable subheads, and a takeaway summary.
              </li>
              <li>
                Add internal links to relevant Shopyor posts where appropriate.
              </li>
              <li>
                Include a meta description (140–160 chars) suggestion with your
                draft.
              </li>
              <li>
                Add a short FAQ (3–5 Q&As) if suitable; we may convert to
                schema.
              </li>
            </ul>

            <div className="mt-8 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900">
              <strong>Note:</strong> We do not publish purely promotional
              content, spun/AI-dumped text, or medical advice. If you discuss
              supplements or products, include evidence and a safety disclaimer.
            </div>
          </div>

          {/* Pitch Form */}
          <div className="mt-12 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5">
            <h2 className="text-2xl font-semibold">Pitch Your Topic</h2>
            <p className="mt-2 text-neutral-700">
              Send us your best idea. If it’s a fit, we’ll reply within 5–7
              business days. Prefer email? Write to{" "}
              <a className="underline" href="mailto:editor@shopyor.com">
                editor@shopyor.com
              </a>
              .
            </p>

            <form
              onSubmit={onSubmit}
              className="mt-6 grid gap-4 md:grid-cols-2"
            >
              {/* Honeypot */}
              <input
                type="text"
                name="website"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="md:col-span-1">
                <label className="block text-sm font-medium">Your Name*</label>
                <input
                  name="name"
                  required
                  className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="md:col-span-1">
                <label className="block text-sm font-medium">Email*</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium">
                  Proposed Title*
                </label>
                <input
                  name="title"
                  required
                  className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium">
                  Outline (3–6 bullet points)*
                </label>
                <textarea
                  name="outline"
                  required
                  rows={5}
                  className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium">
                  Sample Links (portfolio or published work)
                </label>
                <input
                  name="samples"
                  placeholder="https://example.com, https://another.com"
                  className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="rounded-xl bg-emerald-600 px-5 py-2.5 text-white shadow-sm hover:bg-emerald-700"
                >
                  Submit Pitch
                </button>
                {status === "ok" && (
                  <span className="ml-3 align-middle text-emerald-700">
                    Thanks! Your pitch has been received.
                  </span>
                )}
              </div>
            </form>
          </div>

          {/* FAQs */}
          <div className="mt-12 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5">
            <h2 className="text-2xl font-semibold">FAQs</h2>
            <div className="mt-4 space-y-4 text-neutral-700">
              <details className="rounded-xl border border-neutral-200 p-4">
                <summary className="cursor-pointer font-medium">
                  Do you accept previously published content?
                </summary>
                <p className="mt-2">
                  No. We only accept original, unpublished content.
                </p>
              </details>
              <details className="rounded-xl border border-neutral-200 p-4">
                <summary className="cursor-pointer font-medium">
                  Will I get a backlink?
                </summary>
                <p className="mt-2">
                  You may receive one contextual dofollow link if it’s valuable
                  for readers. We remove promotional or irrelevant links.
                </p>
              </details>
              <details className="rounded-xl border border-neutral-200 p-4">
                <summary className="cursor-pointer font-medium">
                  Can I include images?
                </summary>
                <p className="mt-2">
                  Yes—use original or royalty-free images with proper credit and
                  alt text (min 1200×800).
                </p>
              </details>
              <details className="rounded-xl border border-neutral-200 p-4">
                <summary className="cursor-pointer font-medium">
                  How long until I hear back?
                </summary>
                <p className="mt-2">
                  Usually 5–7 business days. If you don’t hear back, feel free
                  to pitch a different idea.
                </p>
              </details>
            </div>
          </div>

          <footer className="mt-12 text-center text-sm text-neutral-500">
            © {new Date().getFullYear()} Shopyor. All rights reserved. • •{" "}
            <Link className="underline" href="/contact">
              Contact us
            </Link>
          </footer>
        </div>
      </section>
    </>
  );
}
