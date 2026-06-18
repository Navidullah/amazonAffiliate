import Link from "next/link";
import ResumeBuilder from "./ResumeBuilder";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, Home } from "lucide-react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";
const PAGE_URL = `${BASE_URL}/tools/resume-builder`;

export const metadata = {
  title: {
    absolute:
      "Free Resume Builder — No Signup, No Watermark, PDF Download | Shopyor",
  },
  description:
    "Build a professional resume free — no signup, no watermark. Pick from 8 templates, customize live, and export an ATS-friendly PDF. 100% browser-based and private.",
  keywords: [
    "free resume builder no sign up no watermark",
    "online resume maker no login required",
    "resume builder pdf download free",
    "ats friendly resume builder free",
    "free cv builder online no account",
    "resume builder that saves locally",
    "free resume builder for freshers",
    "simple resume maker free download",
    "resume builder no registration needed",
    "best free resume builder without subscription",
    "cv maker free pdf no sign up",
    "make resume online free without account",
    "free resume builder for students",
    "professional resume template free download pdf",
    "free online resume builder no watermark",
    "resume maker for first job free",
    "free ats resume builder online",
    "privacy friendly resume builder",
    "free resume builder uk india pakistan",
    "resume builder works in browser offline",
  ],
  authors: [{ name: "Shopyor" }],
  creator: "Shopyor",
  publisher: "Shopyor",
  robots: "index, follow",
  category: "career",
  classification: "Free resume builder and CV maker",
  alternates: {
    canonical: PAGE_URL,
    languages: {
      "x-default": PAGE_URL,
      en: PAGE_URL,
      "en-US": PAGE_URL,
      "en-GB": PAGE_URL,
      "en-IN": PAGE_URL,
      "en-PK": PAGE_URL,
      "en-NG": PAGE_URL,
      "en-PH": PAGE_URL,
      "en-CA": PAGE_URL,
      "en-AU": PAGE_URL,
      "en-ZA": PAGE_URL,
    },
  },
  openGraph: {
    type: "article",
    url: PAGE_URL,
    siteName: "Shopyor",
    locale: "en_US",
    title: "Free Resume Builder — No Signup, No Watermark",
    description:
      "Pick a template, fill in your details, and download an ATS-friendly PDF resume — free, no sign-up, no watermark, 100% private in your browser.",
    images: [
      {
        url: `${BASE_URL}/images/resume-builder-og.png`,
        width: 1200,
        height: 630,
        alt: "Shopyor Free Resume Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Resume Builder — No Signup, No Watermark | Shopyor",
    description:
      "8 templates, live preview, ATS score, and one-click PDF. Free, private, no account.",
    creator: "@shopyor",
    site: "@shopyor",
    images: [`${BASE_URL}/images/resume-builder-og.png`],
  },
};

const KEYWORDS = [
  "free resume builder no sign up no watermark",
  "online resume maker no login",
  "ats friendly resume builder free",
  "resume builder pdf download free",
  "free cv builder online no account",
  "resume builder saves locally",
  "free resume builder for freshers",
  "free resume builder for students",
  "simple resume maker free",
  "cv maker free pdf no watermark",
  "make resume online free",
  "professional resume template pdf free",
  "free online resume builder",
  "resume maker no registration",
  "best free resume builder no subscription",
  "resume builder works in browser",
  "privacy resume builder",
  "free ats resume maker",
  "resume builder first job",
  "free resume builder india pakistan uk",
];

const faq = [
  {
    q: "Is this resume builder really free?",
    a: "Yes. Shopyor's resume builder is completely free with no subscription, no paywall, and no watermark on your PDF. You never need to create an account. Just build your resume and download it.",
  },
  {
    q: "Can I use this resume builder without signing up?",
    a: "Absolutely. There is no sign-up, no email required, and no account. Open the page, fill in your details, pick a template, and download your PDF — all without ever logging in.",
  },
  {
    q: "How do I download my resume as a PDF?",
    a: "Click the 'Download PDF' button at the top of the editor. Your browser's print dialog opens with only the resume — choose 'Save as PDF' to get a crisp, selectable-text, ATS-friendly file. No conversion, no upload.",
  },
  {
    q: "Are the resume templates ATS-friendly?",
    a: "Yes. Every template uses real, selectable text (not an image), clean section headings, and standard ordering so applicant tracking systems can parse them correctly. The Classic and Minimal templates are the most ATS-safe; the colourful templates (Sidebar, Paramount, Contempo) are better for creative or design roles.",
  },
  {
    q: "Is my resume data saved or uploaded anywhere?",
    a: "Nothing is uploaded. Your resume is saved automatically in your own browser's localStorage so you can return later and pick up where you left off. You can also export it as a JSON file for a permanent backup, and import it on any device.",
  },
  {
    q: "Which resume template should I choose?",
    a: "For corporate or technical roles, Classic or Minimal give the cleanest ATS result. For design, marketing, or creative jobs, Modern, Sidebar, or Contempo add visual flair recruiters notice. For students and entry-level, Modern or Fresh strike the right balance. All 8 templates export to the same ATS-readable PDF.",
  },
  {
    q: "How do I create an ATS-friendly resume for free?",
    a: "Use the Classic or Minimal template, add a strong professional summary, include quantified bullet points in your experience (e.g. 'Increased sales by 30%'), list at least 5 relevant skills, and fill in your education. The built-in resume score panel flags every gap in real time before you download.",
  },
  {
    q: "Does this resume builder work on mobile?",
    a: "The editor is fully usable on a tablet. On phones, the live preview scales down but all editing features work. For the best experience downloading a properly sized PDF, a desktop or laptop is recommended.",
  },
];

export default function ResumeBuilderPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free Resume Builder",
        url: PAGE_URL,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        browserRequirements: "Requires JavaScript",
        inLanguage: "en",
        description:
          "Free online resume builder with 8 professional templates, live preview, ATS score, and one-click PDF export. No signup, no watermark — runs entirely in your browser.",
        featureList: [
          "8 professional resume templates (Modern, Classic, Minimal, Sidebar, Paramount, Contempo, Fresh, Fun)",
          "Live WYSIWYG preview at real A4/Letter page size",
          "Built-in ATS resume score with actionable tips",
          "One-click PDF export via browser print — no upload, no watermark",
          "Accent colour, font, and density controls",
          "Show/hide resume sections with one tap",
          "Autosaves to browser localStorage",
          "JSON import/export for permanent backup",
          "Profile photo support on picture templates",
          "Free with no signup and no watermark",
        ],
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Tools",
            item: `${BASE_URL}/tools`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Resume Builder",
            item: PAGE_URL,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Pre-tool: breadcrumb + H1 + intro */}
      <div className="bg-background mx-auto max-w-3xl px-4 pt-6 md:pt-8">
        <nav
          aria-label="Breadcrumb"
          className="mb-5 flex items-center gap-1.5 text-xs text-muted-foreground"
        >
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-foreground"
          >
            <Home className="size-3.5" /> Home
          </Link>
          <ChevronRight className="size-3.5" />
          <Link href="/tools" className="hover:text-foreground">
            Tools
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="text-foreground">Resume Builder</span>
        </nav>

        <header className="mb-8 space-y-3">
          <span className="inline-flex items-center rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
            Free • No signup • No watermark • Private in your browser
          </span>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Free Resume Builder — No Signup, No Watermark
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Build a professional resume in minutes. Pick from 8 premium
            templates, customize live, check your ATS score, and download a
            print-perfect PDF — completely free, no account required, and
            nothing ever leaves your browser.
          </p>
        </header>
      </div>

      {/* The interactive tool */}
      <ResumeBuilder />

      {/* Post-tool: article + FAQ + related searches */}
      <div className="bg-background mx-auto max-w-3xl px-4 pb-20">
        <Separator className="my-10" />

        <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-10 prose-h2:mb-3">
          <h2>Why use this free resume builder?</h2>
          <p>
            Most online resume builders either charge for downloads, add a
            watermark to the free tier, or force you to create an account just
            to see a template. This{" "}
            <strong>free resume builder requires no sign-up and adds no
            watermark</strong> — ever. Your resume data is saved automatically
            in your own browser, so you can return and edit it anytime without
            logging in. Nothing is uploaded to a server.
          </p>
          <p>
            The result is a{" "}
            <strong>privacy-first resume builder</strong> you can use from
            anywhere — your work computer, phone, library — and every PDF you
            download is crisp, selectable text that passes through applicant
            tracking systems cleanly.
          </p>

          <h2>How to create a resume in under 10 minutes</h2>
          <ol>
            <li>
              <strong>Pick a template.</strong> Choose from 8 designs under the
              Design panel — Modern and Classic suit most industries; Sidebar
              and Contempo work well for creative or tech roles.
            </li>
            <li>
              <strong>Fill in Personal details.</strong> Name, title, email,
              phone, location, and LinkedIn. A complete contact section adds
              17 points to your ATS score.
            </li>
            <li>
              <strong>Write a strong Professional summary.</strong> Two to three
              sentences: who you are, your key skill, and what you're looking
              for. Keep it between 40 and 200 words.
            </li>
            <li>
              <strong>Add Work experience.</strong> Include your most recent
              role first. Use the bullet-point field and start each line with an
              action verb — Led, Built, Increased, Reduced. Add a number
              wherever possible (e.g. "Grew revenue by 22%").
            </li>
            <li>
              <strong>Complete Education, Skills, and other sections.</strong>{" "}
              List at least 5 skills separated by commas; this alone adds 8
              points. Toggle off any sections that don't apply to keep the
              layout clean.
            </li>
            <li>
              <strong>Check the Resume score.</strong> The built-in ATS panel
              at the top of the editor scores your resume out of 100 and lists
              specific improvements in order of impact. Aim for 80+ before
              downloading.
            </li>
            <li>
              <strong>Download PDF.</strong> Click "Download PDF" → choose
              "Save as PDF" in your browser's print dialog. That's it — no
              account, no watermark.
            </li>
          </ol>

          <h2>Choosing the right resume template for your goal</h2>
          <p>
            Not all templates suit all industries. Here's a quick guide:
          </p>
          <div className="not-prose overflow-x-auto rounded-xl border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">
                    Template
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Best for
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    ATS safety
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Classic", "Corporate, finance, law, government", "Highest"],
                  ["Minimal", "Tech, startups, remote-first roles", "Highest"],
                  ["Modern", "Marketing, sales, operations", "High"],
                  ["Fresh", "Entry-level, graduates, first job", "High"],
                  ["Sidebar", "Design, media, creative agencies", "Good"],
                  [
                    "Paramount",
                    "Senior corporate, executives",
                    "Good",
                  ],
                  [
                    "Contempo",
                    "Product, UX, tech-creative hybrid",
                    "Good",
                  ],
                  ["Fun", "Creative, branding, social media", "Moderate"],
                ].map(([tmpl, use, ats], i) => (
                  <tr key={i} className="border-t">
                    <td className="px-4 py-3 font-medium">{tmpl}</td>
                    <td className="px-4 py-3 text-muted-foreground">{use}</td>
                    <td className="px-4 py-3">{ats}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>How to write an ATS-friendly resume for free</h2>
          <p>
            Applicant tracking systems (ATS) scan your resume before a human
            ever sees it. A resume that fails ATS parsing may never be reviewed,
            regardless of how strong your experience is. Here's what the
            system checks for — and how to pass:
          </p>
          <ul>
            <li>
              <strong>Selectable text, not an image.</strong> Every template in
              this builder uses real HTML text that exports to a
              machine-readable PDF — not a flattened image.
            </li>
            <li>
              <strong>Standard section headings.</strong> Stick to "Experience",
              "Education", "Skills", and "Summary" rather than creative labels
              like "My Journey". ATS systems are trained on standard labels.
            </li>
            <li>
              <strong>Keywords from the job description.</strong> Copy 5–10
              specific skills or tools mentioned in the job posting and include
              them naturally in your Skills section and bullet points.
            </li>
            <li>
              <strong>Quantified bullet points.</strong> Numbers boost both ATS
              scoring and human appeal. "Managed a team" is weak; "Managed a
              team of 8 and cut onboarding time by 40%" is strong.
            </li>
            <li>
              <strong>Action verbs at the start of each bullet.</strong> Led,
              Built, Shipped, Delivered, Increased, Reduced, Automated — these
              register as accomplishments in ATS scoring algorithms.
            </li>
            <li>
              <strong>No tables or text boxes in the PDF.</strong> The
              Classic and Minimal templates use single-column layouts that are
              100% ATS-safe. Sidebar and Contempo use two-column layouts; most
              modern ATS handle these fine, but if you're applying to very
              large corporations, Classic or Minimal are the safer bet.
            </li>
          </ul>
          <p>
            For a deeper breakdown of what actually breaks ATS parsing and
            which template fits your field, see our full guide on{" "}
            <Link href="/blog/how-to-make-an-ats-friendly-resume-for-free">
              how to make an ATS-friendly resume for free
            </Link>
            .
          </p>

          <h2>Resume tips that actually get you interviews</h2>
          <p>
            Beyond ATS, here's what recruiters actually look for when they
            review resumes:
          </p>
          <ul>
            <li>
              <strong>Tailor the summary for every application.</strong> A
              generic "results-driven professional" opener is ignored. A
              specific "Product designer with 5 years shipping B2B SaaS at
              Series A–C companies" reads immediately.
            </li>
            <li>
              <strong>Show impact, not just duties.</strong> Replace "Responsible
              for social media" with "Grew Instagram following from 2k to 18k
              in 9 months through weekly Reels." One sentence; clear result.
            </li>
            <li>
              <strong>Keep it to one page if you have under 10 years of
              experience.</strong> Use the Compact density setting in the Design
              panel to fit more content without reducing readability.
            </li>
            <li>
              <strong>LinkedIn and portfolio links matter.</strong> Recruiters
              check them. Make sure your LinkedIn matches your resume dates and
              titles exactly — any mismatch raises flags.
            </li>
            <li>
              <strong>Export and compress for email attachment.</strong> After
              downloading, you can use our{" "}
              <Link href="/tools/pdf-compressor" className="text-violet-600 hover:underline">
                free PDF compressor
              </Link>{" "}
              to reduce file size if you're emailing it directly.
            </li>
          </ul>

          <h2>Frequently asked questions</h2>
          <div className="not-prose">
            <Accordion type="single" collapsible className="w-full">
              {faq.map((item, idx) => (
                <AccordionItem key={idx} value={`item-${idx + 1}`}>
                  <AccordionTrigger className="text-left text-base">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </article>

        {/* Related searches */}
        <section className="mt-12">
          <h2 className="mb-2 text-lg font-semibold">Related searches</h2>
          <p className="mb-3 text-sm text-muted-foreground">
            People also look for these free resume and CV builder topics:
          </p>
          <ul className="flex flex-wrap gap-2">
            {KEYWORDS.map((kw, i) => (
              <li
                key={i}
                className="rounded-full border bg-muted/30 px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted/60"
              >
                {kw}
              </li>
            ))}
          </ul>
        </section>

        {/* Internal links */}
        <section className="mt-10">
          <h2 className="mb-3 text-lg font-semibold">More free tools</h2>
          <ul className="flex flex-wrap gap-3 text-sm">
            <li>
              <Link
                href="/tools"
                className="rounded-lg border px-3 py-2 text-muted-foreground hover:border-violet-400 hover:text-violet-600 transition-colors"
              >
                All free tools
              </Link>
            </li>
            <li>
              <Link
                href="/tools/pdf-compressor"
                className="rounded-lg border px-3 py-2 text-muted-foreground hover:border-violet-400 hover:text-violet-600 transition-colors"
              >
                PDF compressor
              </Link>
            </li>
            <li>
              <Link
                href="/tools/online-pdf-to-word-converter"
                className="rounded-lg border px-3 py-2 text-muted-foreground hover:border-violet-400 hover:text-violet-600 transition-colors"
              >
                PDF to Word converter
              </Link>
            </li>
            <li>
              <Link
                href="/tools/image-compressor"
                className="rounded-lg border px-3 py-2 text-muted-foreground hover:border-violet-400 hover:text-violet-600 transition-colors"
              >
                Image compressor
              </Link>
            </li>
          </ul>
        </section>

        <p className="mt-10 rounded-xl border bg-muted/30 px-4 py-3 text-xs text-muted-foreground">
          This resume builder is for personal use and provided as-is. Resume
          quality and interview outcomes depend on many factors beyond formatting.
          Always tailor your resume content to each specific job application.
        </p>
      </div>
    </>
  );
}
