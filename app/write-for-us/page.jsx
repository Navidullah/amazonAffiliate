// app/write-for-us/page.jsx
import Link from "next/link";

export const metadata = {
  title: "Write For Us | Contribute to Shopyor Tools",
  description:
    "Share your expertise and contribute guest posts about tech, productivity, AI tools, software tips, and digital solutions on Shopyor. Get your article published today!",
  keywords: [
    "Write for Shopyor",
    "Guest post",
    "Tech articles",
    "Software tips",
    "AI tools contributions",
  ],
};

export default function WriteForUsPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What topics can I write about?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We welcome articles about web tools, productivity apps, AI tools, software tips, tech tutorials, and digital solutions relevant to our readers.",
        },
      },
      {
        "@type": "Question",
        name: "Can I include links in my article?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. You can include one relevant dofollow link in the body and up to two nofollow reference links. No affiliate or sales-heavy links are allowed.",
        },
      },
      {
        "@type": "Question",
        name: "What is the preferred word count?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "800–1,500 words. Articles should be clear, actionable, and structured with proper headings and subheadings (H2/H3).",
        },
      },
      {
        "@type": "Question",
        name: "How do I submit my pitch?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Email your article idea with a short outline to shopyor.com@gmail.com or use our Contact page to submit your pitch.",
        },
      },
    ],
  };

  return (
    <>
      {/* FAQ Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="relative overflow-hidden bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-5xl px-4 py-16 md:py-24">
          {/* Header */}
          <header className="text-center">
            <span className="inline-block rounded-full border px-3 py-1 text-xs tracking-wide uppercase text-blue-600 border-blue-300 bg-white/70">
              Write for Us
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl text-gray-900 dark:text-white">
              Share Your Expertise on Web Tools & Tech
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-gray-700 dark:text-gray-300 md:text-lg">
              Are you a tech enthusiast, software expert, or content creator?
              Contribute high-quality, original articles about productivity
              apps, AI tools, software tips, and web solutions, and help
              thousands of users optimize their digital experience.
            </p>

            {/* Primary CTA */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="mailto:shopyor.com@gmail.com?subject=Guest%20Post%20Pitch%20for%20Shopyor&body=Hi%20Shopyor%20Team%2C%0A%0ATitle%3A%20%0AOutline%20(3%E2%80%936%20bullets)%3A%0A%0AWhy%20this%20helps%20readers%3A%0A%0AMy%20bio%20(50%E2%80%93100%20words)%3A%0A%0ASamples%20(links)%3A%0A%0AThanks%2C%0A"
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-white shadow-sm hover:bg-blue-700"
                rel="noopener"
              >
                Email Your Pitch
              </a>
              <Link
                href="/contact"
                className="rounded-xl border border-gray-300 bg-white/70 px-5 py-2.5 text-gray-900 hover:bg-gray-100"
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
                "Showcase your knowledge to users interested in web tools, AI, and software tips.",
              ],
              [
                "Build Your Authority",
                "Get your byline, bio, and one relevant link published with your article.",
              ],
              [
                "Evergreen Exposure",
                "Articles stay live, shared in our newsletter and on social media for long-term visibility.",
              ],
            ].map(([title, desc]) => (
              <div
                key={title}
                className="rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-6 shadow-md ring-1 ring-black/5"
              >
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm">{desc}</p>
              </div>
            ))}
          </div>

          {/* Guidelines */}
          <div className="mt-12 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-8 shadow-md ring-1 ring-black/5">
            <h2 className="text-2xl font-semibold">Submission Guidelines</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>
                <strong>Original Content:</strong> Articles must not be
                published elsewhere.
              </li>
              <li>
                <strong>Word Count:</strong> 800–1,500 words; structured with
                H2/H3 headings and clear paragraphs.
              </li>
              <li>
                <strong>Sources:</strong> Cite authoritative references or
                official documentation where applicable.
              </li>
              <li>
                <strong>Links:</strong> One relevant dofollow link in the
                article + up to two nofollow references.
              </li>
              <li>
                <strong>Tone:</strong> Informative, professional, and
                approachable.
              </li>
              <li>
                <strong>Images:</strong> Use original or royalty-free images
                with descriptive alt text.
              </li>
              <li>
                <strong>Bio:</strong> Include a short author bio (50–100 words)
                and optional social links.
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="mailto:shopyor.com@gmail.com?subject=Guest%20Post%20Pitch%20for%20Shopyor&body=Hi%20Shopyor%20Team%2C%0A%0ATitle%3A%20%0AOutline%20(3%E2%80%936%20bullets)%3A%0A%0AWhy%20this%20helps%20readers%3A%0A%0AMy%20bio%20(50%E2%80%93100%20words)%3A%0A%0ASamples%20(links)%3A%0A%0AThanks%2C%0A"
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-white shadow-sm hover:bg-blue-700"
                rel="noopener"
              >
                Email Your Pitch
              </a>
              <Link
                href="/contact"
                className="rounded-xl border border-gray-300 bg-white/70 px-5 py-2.5 text-gray-900 hover:bg-gray-100"
              >
                Use Contact Page
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
