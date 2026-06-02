import EmailGeneratorClient from "./EmailGeneratorClient";
import Link from "next/link";
import {
  Mail,
  Check,
  Shield,
  Zap,
  Briefcase,
  Shuffle,
  PencilLine,
  Settings2,
  ClipboardCheck,
  Globe,
} from "lucide-react";

export const metadata = {
  title: "Free Email Generator – Random & Professional Email Address Maker",
  description:
    "Free online email generator. Instantly create random fake emails for testing or build professional business email addresses from any name and domain. Copy-paste ready, 100% private, no signup.",
  keywords: [
    "email generator",
    "free email generator",
    "random email generator",
    "fake email generator",
    "email address generator",
    "professional email generator",
    "business email generator",
    "email maker",
    "temp email generator",
    "test email generator",
    "email name generator",
    "generate email address online",
  ],
  alternates: {
    canonical: "https://www.shopyor.com/tools/email-generator",
  },
  openGraph: {
    title: "Free Email Generator – Random & Professional Email Addresses",
    description:
      "Generate random test emails or professional business email addresses from any name and domain. Copy-paste ready. 100% free, private and browser-based.",
    url: "https://www.shopyor.com/tools/email-generator",
    siteName: "ShopYor",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Email Generator Tool",
    description:
      "Create random fake emails for testing or professional business email addresses instantly. Free, private, no signup.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1 },
  },
};

const schemas = {
  tool: {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Email Generator",
    url: "https://www.shopyor.com/tools/email-generator",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "186",
    },
    description:
      "Free email generator to create random fake emails for testing or professional business email addresses from any name and domain. Runs entirely in your browser.",
  },
  howTo: {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to generate an email address",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Pick a mode",
        text: "Choose 'Professional / Business' to build a real address from a name and domain, or 'Random / Test' to create disposable test emails.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Enter your details",
        text: "Type a first name, last name and domain — or set the count, username style and domain type for random emails.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Generate",
        text: "The tool instantly produces a list of email addresses right in your browser.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Copy",
        text: "Copy any single email or use 'Copy all' to grab the whole list.",
      },
    ],
  },
  faq: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is an email generator?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An email generator is a tool that automatically creates email addresses for you. This one has two modes: a professional generator that turns a person's name and a domain into the most common business email formats (like john.doe@company.com), and a random generator that creates fake-but-valid-looking emails for software testing, mockups and placeholders.",
        },
      },
      {
        "@type": "Question",
        name: "Are the generated emails real inboxes I can receive mail in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. The tool builds correctly formatted email addresses, but it does not create live mailboxes. Professional formats show you which address to register with your own email provider, while random addresses are intended for testing, demos and placeholder data — not for receiving real mail.",
        },
      },
      {
        "@type": "Question",
        name: "What is the best format for a professional email address?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The most widely used and recommended business format is firstname.lastname@yourdomain.com because it is clear, professional and easy to remember. Shorter variations such as flast@ or first@ are also common at smaller companies. Our tool lists all of these so you can choose the one that fits your brand.",
        },
      },
      {
        "@type": "Question",
        name: "Is this email generator free and private?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. It is 100% free with no signup or limits, and every address is generated locally in your browser using JavaScript. Nothing you type is uploaded, logged or stored on a server.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use these emails to sign up for websites?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Random addresses are designed for testing and placeholder use, not for real signups, because you cannot receive verification messages at them. For your own real signups, use the professional mode to decide on a format and then create that mailbox with your email provider.",
        },
      },
      {
        "@type": "Question",
        name: "Why use the safe / test domains like example.com?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Domains such as example.com, example.org and example.net are reserved by the standards bodies specifically for documentation and testing, so they can never belong to a real person. They are the safest choice when you need dummy email data for QA, screenshots or tutorials.",
        },
      },
    ],
  },
  breadcrumb: {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.shopyor.com" },
      { "@type": "ListItem", position: 2, name: "Tools", item: "https://www.shopyor.com/tools" },
      {
        "@type": "ListItem",
        position: 3,
        name: "Email Generator",
        item: "https://www.shopyor.com/tools/email-generator",
      },
    ],
  },
};

const features = [
  {
    icon: Briefcase,
    title: "Professional Email Builder",
    text: "Turn any first name, last name and domain into the 10 most common business email formats — like firstname.lastname@company.com.",
    color: "text-blue-600",
    bg: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    icon: Shuffle,
    title: "Bulk Random Emails",
    text: "Generate up to 50 fake-but-valid-looking emails at once for software testing, QA, demos and placeholder data.",
    color: "text-violet-600",
    bg: "bg-violet-100 dark:bg-violet-900/30",
  },
  {
    icon: Shield,
    title: "100% Private",
    text: "Everything runs locally in your browser. Nothing you type is uploaded, logged or stored on any server.",
    color: "text-emerald-600",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
  },
  {
    icon: Zap,
    title: "Instant & Free",
    text: "No signup, no limits and no waiting. Copy a single address or grab the whole list with one click.",
    color: "text-amber-600",
    bg: "bg-amber-100 dark:bg-amber-900/30",
  },
];

const steps = [
  { icon: Settings2, title: "Pick a mode", text: "Professional/Business or Random/Test." },
  { icon: PencilLine, title: "Enter details", text: "Add a name & domain, or set count & style." },
  { icon: Mail, title: "Generate", text: "Get a fresh list of emails instantly." },
  { icon: ClipboardCheck, title: "Copy", text: "Copy one address or the whole list." },
];

const formatRef = [
  { t: "john.doe@", d: "First + dot + last. The most common, recommended business format." },
  { t: "johndoe@", d: "First and last joined together — clean and compact." },
  { t: "jdoe@", d: "First initial + last name. Popular at mid-size companies." },
  { t: "johnd@", d: "First name + last initial. Good for short last names." },
  { t: "john_doe@", d: "Underscore separator — common where dots aren't allowed." },
  { t: "doe.john@", d: "Last name first. Used by some corporate and academic systems." },
];

const useCases = [
  "Filling out forms while building and testing a web app or signup flow",
  "Seeding a database with realistic placeholder users for QA",
  "Creating dummy data for screenshots, tutorials and product demos",
  "Choosing a consistent email format before setting up company mailboxes",
  "Designing email templates without exposing real customer addresses",
  "Teaching, presentations and documentation that need example emails",
];

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            schemas.tool,
            schemas.howTo,
            schemas.faq,
            schemas.breadcrumb,
          ]),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-slate-500 dark:text-slate-400">
            <ol className="flex items-center gap-1.5">
              <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
              <li>/</li>
              <li><Link href="/tools" className="hover:text-blue-600">Tools</Link></li>
              <li>/</li>
              <li className="font-medium text-slate-700 dark:text-slate-200">Email Generator</li>
            </ol>
          </nav>

          {/* Hero */}
          <div className="mb-10 text-center md:mb-14">
            <div className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-gradient-to-r from-blue-500/10 to-violet-500/10 px-3 py-1 dark:border-blue-800">
              <Mail className="h-3.5 w-3.5 text-blue-600" />
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-sm font-medium text-transparent">
                Free Email Tool · Random &amp; Professional
              </span>
            </div>

            <h1 className="mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 bg-clip-text text-4xl font-bold tracking-tight text-transparent dark:from-slate-100 dark:via-blue-300 dark:to-slate-100 md:text-6xl lg:text-7xl">
              Email Generator
            </h1>

            <p className="mx-auto max-w-3xl text-lg text-slate-600 dark:text-slate-300 md:text-xl">
              Instantly create{" "}
              <strong className="font-semibold text-slate-800 dark:text-slate-100">
                random emails for testing
              </strong>{" "}
              or build{" "}
              <strong className="font-semibold text-slate-800 dark:text-slate-100">
                professional business email addresses
              </strong>{" "}
              from any name and domain. Copy-paste ready — free, private and
              right in your browser.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
              {["Random & professional", "Bulk generate", "100% private", "No signup"].map((t) => (
                <div key={t} className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
                  <Check className="h-4 w-4 text-emerald-500" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tool */}
          <EmailGeneratorClient />

          {/* Features */}
          <section className="mt-20">
            <h2 className="mb-10 text-center text-3xl font-bold">
              Why use our email generator
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg transition-shadow hover:shadow-xl dark:border-slate-700 dark:bg-slate-800">
                    <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${f.bg}`}>
                      <Icon className={`h-6 w-6 ${f.color}`} />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{f.text}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* How to */}
          <section className="mt-20">
            <h2 className="mb-10 text-center text-3xl font-bold">
              How to generate an email address
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={s.title} className="relative rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
                    <span className="absolute -left-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-sm font-bold text-white shadow-lg">{i + 1}</span>
                    <Icon className="mb-3 h-7 w-7 text-blue-600" />
                    <h3 className="mb-1.5 font-semibold">{s.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{s.text}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Format reference */}
          <section className="mt-20">
            <h2 className="mb-3 text-center text-3xl font-bold">
              Professional email formats explained
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-center text-slate-600 dark:text-slate-300">
              Here are the business email formats this tool builds for you, and
              when each one works best.
            </p>
            <div className="mx-auto max-w-3xl overflow-hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-700/40">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Format</th>
                    <th className="px-5 py-3 font-semibold">When to use it</th>
                  </tr>
                </thead>
                <tbody>
                  {formatRef.map((r) => (
                    <tr key={r.t} className="border-t border-slate-100 dark:border-slate-700">
                      <td className="whitespace-nowrap px-5 py-3 font-mono text-blue-600 dark:text-blue-400">{r.t}</td>
                      <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{r.d}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Educational: two columns */}
          <section className="mt-20 grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
              <h2 className="mb-3 text-xl font-semibold">
                Random vs. professional emails — what&apos;s the difference?
              </h2>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                A <strong>random (or fake) email generator</strong> creates
                correctly formatted addresses you can drop into test forms,
                seed databases or use in screenshots — without touching anyone&apos;s
                real inbox. A <strong>professional email generator</strong> does
                the opposite job: it takes a real person&apos;s name and your
                company domain and shows you every standard way to write their
                business address, so you can pick one consistent format across
                your whole team before you create the mailboxes. This tool gives
                you both in one place.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
              <h2 className="mb-3 text-xl font-semibold">
                Tips for choosing a business email
              </h2>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                {[
                  "Pick one format (e.g. firstname.lastname@) and use it for everyone.",
                  "Keep it short, lowercase and free of numbers where possible.",
                  "Use your own domain, not gmail.com, to look trustworthy.",
                  "Set up a catch-all or role address like hello@ for general mail.",
                  "Avoid nicknames — names should still read professionally in 5 years.",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Use cases */}
          <section className="mt-20">
            <h2 className="mb-10 text-center text-3xl font-bold">
              Popular ways people use this tool
            </h2>
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
              {useCases.map((u) => (
                <div key={u} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  <Globe className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                  <span>{u}</span>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-20 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-800 md:p-8">
            <h2 className="mb-6 text-center text-2xl font-bold">Frequently Asked Questions</h2>
            <div className="mx-auto max-w-3xl space-y-3">
              {schemas.faq.mainEntity.map((qa) => (
                <details key={qa.name} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl bg-slate-50 p-4 text-sm font-semibold dark:bg-slate-700/50 md:text-base">
                    {qa.name}
                    <span className="text-slate-400 transition group-open:rotate-180">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <p className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{qa.acceptedAnswer.text}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Related tools */}
          <section className="mt-20">
            <h2 className="mb-8 text-center text-2xl font-bold">Related free tools</h2>
            <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-3">
              {[
                { href: "/tools/meta-tag-generator", label: "Meta Tag Generator" },
                { href: "/tools/affiliate-link-generator", label: "Affiliate Link Generator" },
                { href: "/tools", label: "All Free Tools" },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="rounded-xl border border-slate-200 bg-white p-4 text-center text-sm font-medium transition-colors hover:border-blue-400 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800">
                  {l.label}
                </Link>
              ))}
            </div>
          </section>

          {/* Trust */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm font-medium opacity-70">
            <span>Used by developers &amp; marketers</span>
            <span>⭐ 4.8/5 from 180+ reviews</span>
            <span>🔒 100% free — no signup</span>
          </div>
        </div>
      </div>
    </>
  );
}
