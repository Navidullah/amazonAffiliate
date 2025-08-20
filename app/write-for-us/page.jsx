// app/write-for-us/page.jsx
import Link from "next/link";

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
          text: "Yes. One relevant dofollow link (editor’s discretion) in the body and up to two nofollow reference links. No affiliate or sales pages.",
        },
      },
      {
        "@type": "Question",
        name: "What is the preferred word count?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "1,200–2,000 words. We prioritize depth, originality, and actionable takeaways with clear H2/H3 structure.",
        },
      },
      {
        "@type": "Question",
        name: "How do I submit my pitch?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Email a proposed title and 3–6 bullet outline to editor@shopyor.com or use our Contact page.",
        },
      },
    ],
  };

  return (
    <>
      {/* FAQ Schema for rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-background" />
        <div className="mx-auto max-w-5xl px-4 py-16 md:py-24">
          {/* Header */}
          <header className="text-center">
            <span className="inline-block rounded-full border px-3 py-1 text-xs tracking-wide uppercase text-emerald-700 border-emerald-200 bg-white/70">
              Write for Us
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
              Share Your Expertise on Health, Fitness & Wellness
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-neutral-700 md:text-lg">
              Are you a coach, nutritionist, researcher, or passionate writer?
              Pitch an original, evidence-based article and help thousands of
              readers live healthier, happier lives on <strong>Shopyor</strong>.
            </p>

            {/* Primary CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="mailto:editor@shopyor.com?subject=Guest%20Post%20Pitch%20for%20Shopyor&body=Hi%20Shopyor%20Team%2C%0A%0ATitle%3A%20%0AOutline%20(3%E2%80%936%20bullets)%3A%0A%0AWhy%20this%20helps%20readers%3A%0A%0AMy%20bio%20(50%E2%80%93100%20words)%3A%0A%0ASamples%20(links)%3A%0A%0AThanks%2C%0A"
                className="rounded-xl bg-emerald-600 px-5 py-2.5 text-white shadow-sm hover:bg-emerald-700"
                rel="noopener"
              >
                Email Your Pitch
              </a>
              <Link
                href="/contact"
                className="rounded-xl border border-neutral-300 bg-white px-5 py-2.5 text-neutral-900 hover:bg-neutral-50"
              >
                Use Contact Page
              </Link>
            </div>
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

          {/* Guidelines */}
          <div className="mt-12 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5">
            <h2 className="text-2xl font-semibold">Topics We Love</h2>
            <ul className="mt-4 grid list-disc gap-2 pl-5 text-neutral-700 md:grid-cols-2">
              <li>Evidence-based health, fitness & conditioning</li>
              <li>Nutrition: macros, micronutrients, meal planning</li>
              <li>Weight management, metabolic health, glucose insights</li>
              <li>Mental health, stress resilience, sleep optimization</li>
              <li>Beginner-friendly workouts & injury-safe routines</li>
              <li>Healthy recipes with macros (photos welcome)</li>
              <li>Science explainers: studies, mechanisms, takeaways</li>
              <li>Honest, non-promotional product guides (with disclaimers)</li>
            </ul>

            <h2 className="mt-8 text-2xl font-semibold">
              Submission Guidelines
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-neutral-700">
              <li>
                <strong>Original only:</strong> Not published elsewhere; passes
                plagiarism checks; human-edited.
              </li>
              <li>
                <strong>Word count:</strong> 1,200–2,000 words; clear H2/H3,
                short paragraphs, and bullets where helpful.
              </li>
              <li>
                <strong>Sources:</strong> Cite peer-reviewed research or
                reputable organizations with links (recent, high-quality).
              </li>
              <li>
                <strong>Links:</strong> 1 relevant <em>dofollow</em> link
                (editor’s discretion) + up to 2 <em>nofollow</em> references. No
                affiliate/sales pages.
              </li>
              <li>
                <strong>Tone:</strong> Practical, supportive, inclusive. Avoid
                medical claims; add disclaimers where needed.
              </li>
              <li>
                <strong>Images:</strong> Original or royalty-free with credit
                (1200×800+) and descriptive alt text.
              </li>
              <li>
                <strong>Bio:</strong> 50–100 words + headshot (optional) +
                socials.
              </li>
              <li>
                <strong>Editing:</strong> We may edit for clarity, style, SEO,
                and compliance.
              </li>
            </ul>

            <div className="mt-8 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900">
              <strong>Note:</strong> We don’t publish purely promotional
              content, spun/AI-dumped text, or medical advice. If you discuss
              supplements or products, include evidence and a safety disclaimer.
            </div>

            {/* Secondary CTA */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="mailto:shopyor.com@gmail.com?subject=Guest%20Post%20Pitch%20for%20Shopyor&body=Hi%20Shopyor%20Team%2C%0A%0ATitle%3A%20%0AOutline%20(3%E2%80%936%20bullets)%3A%0A%0AWhy%20this%20helps%20readers%3A%0A%0AMy%20bio%20(50%E2%80%93100%20words)%3A%0A%0ASamples%20(links)%3A%0A%0AThanks%2C%0A"
                className="rounded-xl bg-emerald-600 px-5 py-2.5 text-white shadow-sm hover:bg-emerald-700"
                rel="noopener"
              >
                Email Your Pitch
              </a>
              <Link
                href="/contact"
                className="rounded-xl border border-neutral-300 bg-white px-5 py-2.5 text-neutral-900 hover:bg-neutral-50"
              >
                Use Contact Page
              </Link>
            </div>
          </div>

          {/* FAQs (expanders) */}
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
                  You may receive one contextual dofollow link if it serves
                  readers. Promotional/irrelevant links are removed.
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

          {/* Footer note */}
          <div className="mt-12 text-center text-sm text-neutral-500">
            © {new Date().getFullYear()} Shopyor. All rights reserved.
          </div>
        </div>
      </section>
    </>
  );
}
