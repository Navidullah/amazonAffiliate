import Link from "next/link";
import {
  Mic,
  Sparkles,
  UploadCloud,
  Type,
  AudioLines,
  ShieldCheck,
  Zap,
  Globe,
  Download,
  Lock,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import VoiceCloneClient from "@/app/components/tools/VoiceCloneClient";

const SITE = "https://www.shopyor.com";

export const metadata = {
  title: {
    absolute:
      "Free AI Voice Cloner – Clone Any Voice Online in Seconds | Shopyor",
  },
  description:
    "Clone any voice online for free with Shopyor's AI voice cloner. Upload a short sample, type your text, and get natural-sounding speech in seconds — a free AI voice generator and text-to-speech tool, no sign-up required.",
  keywords:
    "voice cloning, ai voice cloner, free ai voice cloning, free voice cloner, voice cloner online free, clone any voice, clone my voice, voice clone online, voice cloning no sign up, clone voice in seconds, ai voice generator, text to speech, tts voice generator, realistic ai voice, custom voice generator, online voice cloning, voice cloning tool, speech synthesis",
  authors: [{ name: "Shopyor" }],
  creator: "Shopyor",
  publisher: "Shopyor",
  robots: "index, follow",
  alternates: {
    canonical: SITE,
    // hreflang: target the top English-search markets for voice cloning
    languages: {
      "en-US": SITE,
      "en-GB": SITE,
      "en-IN": SITE,
      "en-CA": SITE,
      "en-AU": SITE,
      "x-default": SITE,
    },
  },
  openGraph: {
    title: "Free AI Voice Cloner – Clone Any Voice Online in Seconds | Shopyor",
    description:
      "Upload a short voice sample, type your script, and Shopyor's AI speaks it back in that voice. Free, fast, and private — no sign-up required.",
    url: SITE,
    type: "website",
    siteName: "Shopyor",
    locale: "en_US",
    alternateLocale: ["en_GB", "en_IN", "en_CA", "en_AU"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@shopyor",
    creator: "@shopyor",
    title: "Free AI Voice Cloner – Clone Any Voice Online | Shopyor",
    description:
      "Clone a voice from a short sample and generate natural speech from text. Free and instant.",
  },
};

const steps = [
  {
    icon: UploadCloud,
    name: "Upload a voice sample",
    text: "Upload or drag in a clean 10–30 second audio clip of the voice you want to clone (WAV, MP3, or FLAC). Tick the consent box to confirm you own the voice or have permission to use it.",
  },
  {
    icon: Type,
    name: "Type your text",
    text: "Enter up to 1,000 characters of the script you want spoken. Use natural punctuation for the most realistic, human-sounding result.",
  },
  {
    icon: AudioLines,
    name: "Generate & download",
    text: "Click Generate speech. The AI speaks your text in the cloned voice within seconds — play it back and download the audio as a WAV file.",
  },
];

const features = [
  {
    icon: Zap,
    title: "Fast & GPU-powered",
    desc: "Speech is generated on a dedicated GPU, so results come back in seconds.",
  },
  {
    icon: ShieldCheck,
    title: "Consent-first",
    desc: "A required consent check keeps cloning ethical — only voices you're allowed to use.",
  },
  {
    icon: Lock,
    title: "Private by design",
    desc: "Generated audio is streamed straight to you and never stored or shared.",
  },
  {
    icon: Globe,
    title: "Works everywhere",
    desc: "Runs in any modern browser on desktop, tablet, or phone — nothing to install.",
  },
  {
    icon: Download,
    title: "Instant WAV download",
    desc: "Save your cloned speech as a high-quality WAV with a single click.",
  },
  {
    icon: Sparkles,
    title: "Completely free",
    desc: "No sign-up, no subscription, and no hidden fees to clone a voice.",
  },
];

const faqs = [
  {
    q: "Is the Shopyor voice cloner free?",
    a: "Yes. Shopyor's AI voice cloner is 100% free to use. There is no sign-up, subscription, or hidden fee — upload a sample, type your text, and download the result.",
  },
  {
    q: "Can I clone any voice online with no sign-up?",
    a: "Yes. You can clone any voice online directly in your browser with no sign-up and no app to install. Just provide a short sample of the voice you have permission to use, type your text, and generate speech instantly.",
  },
  {
    q: "How do I clone a voice in seconds?",
    a: "Add a 10–30 second voice sample (upload a file or record from your mic), tick the consent box, then click Clone. Type your script and click Generate — the AI returns natural-sounding speech in that voice within seconds.",
  },
  {
    q: "How long should the voice sample be?",
    a: "A clean 10–30 second clip works best. Shorter clips still work but may sound less accurate, and very long clips are unnecessary. Clear audio with little background noise gives the most natural clone.",
  },
  {
    q: "What audio formats can I upload?",
    a: "You can upload common audio formats including WAV, MP3, and FLAC. The file should be under 25 MB.",
  },
  {
    q: "Is voice cloning legal and ethical?",
    a: "You may only clone a voice that you own or have explicit permission to use. Cloning someone's voice without consent may be illegal. That is why a consent confirmation is required before every upload.",
  },
  {
    q: "Do I need to install any software?",
    a: "No. The voice cloner runs entirely in your web browser on any device — desktop, tablet, or mobile. There is nothing to download or install.",
  },
  {
    q: "Can I download the generated voice?",
    a: "Yes. After generating speech you can play it instantly and download it as a WAV audio file to use wherever you like.",
  },
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Shopyor AI Voice Cloner",
    url: SITE,
    description:
      "Free online AI voice cloner. Upload a short voice sample and generate natural-sounding speech from text in that voice.",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web, Android, iOS, Windows, Mac",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "Clone a voice from a short audio sample",
      "Generate speech from text in the cloned voice",
      "Download results as WAV",
      "Consent-required, privacy-friendly",
      "No registration",
      "Works on mobile and desktop",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to clone a voice with Shopyor",
    description:
      "Clone a voice online in three steps: upload a sample, type your text, then generate and download the speech.",
    totalTime: "PT1M",
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      url: `${SITE}/#how-to`,
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    ],
  },
];

export default function Page() {
  return (
    <>
      {structuredData.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden px-4 pb-4 pt-6 text-center">
        <div className="pointer-events-none absolute left-1/2 top-[-140px] h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-violet-500/20 blur-[130px] dark:bg-violet-600/20" />
        <span className="relative inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-600 dark:text-violet-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-500" />
          AI Voice Cloning · 100% Free
        </span>
        <h1 className="relative mx-auto mt-5 max-w-3xl text-2xl font-black leading-[1.1] tracking-tight md:text-4xl">
          Free AI Voice Cloner —{" "}
          <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
            clone any voice in seconds with shopyor
          </span>
        </h1>
        <p className="relative mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Upload a short audio sample, type your text, and Shopyor speaks it
          back in that voice — natural, instant, and free.{" "}
          <span className="font-medium text-foreground">
            Only clone voices you have permission to use.
          </span>
        </p>
        <div className="relative mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="#tool"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-transform hover:-translate-y-0.5 hover:shadow-violet-500/40"
          >
            <Mic className="h-4 w-4" /> Try it now — free
          </Link>
          <Link
            href="#how-to"
            className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-black/[0.02] px-7 py-3 text-sm font-semibold text-foreground transition hover:bg-black/[0.04] dark:border-white/15 dark:bg-white/5 dark:hover:bg-white/10"
          >
            How it works
          </Link>
        </div>
      </section>

      {/* ===== The tool ===== */}
      <section id="tool" className="scroll-mt-28 px-4 py-12">
        <h2 className="sr-only">Voice cloning tool</h2>
        <VoiceCloneClient />
      </section>

      {/* ===== How to use ===== */}
      <section id="how-to" className="scroll-mt-28 px-4 py-14">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            How to clone a voice in 3 easy steps
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            No experience needed — go from a short clip to downloadable speech
            in under a minute.
          </p>
        </div>
        <ol className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-3">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <li
                key={s.name}
                className="group relative rounded-2xl border border-black/5 bg-white/70 p-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(139,92,246,0.45)] dark:border-white/10 dark:bg-white/[0.04]"
              >
                <span className="absolute right-5 top-5 text-5xl font-black text-black/5 dark:text-white/5">
                  {i + 1}
                </span>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-violet-500/30 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 text-violet-500 transition-transform duration-300 group-hover:scale-110 dark:text-violet-300">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg font-bold">
                  Step {i + 1}: {s.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.text}
                </p>
              </li>
            );
          })}
        </ol>
        <div className="mt-8 text-center">
          <Link
            href="#tool"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-transform hover:-translate-y-0.5"
          >
            <Sparkles className="h-4 w-4" /> Start cloning now
          </Link>
        </div>
      </section>

      {/* ===== Features ===== */}
      <section className="px-4 py-14">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Why use the Shopyor voice cloner
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            A fast, free, and privacy-friendly way to turn text into speech in
            any voice.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group rounded-2xl border border-black/5 bg-white/70 p-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 dark:border-white/10 dark:bg-white/[0.04]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-500/30 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 text-violet-500 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 dark:text-violet-300">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="px-4 py-14">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Frequently asked questions
            </h2>
            <p className="mt-3 text-muted-foreground">
              Everything you need to know about cloning a voice with Shopyor.
            </p>
          </div>
          <div className="mt-8 space-y-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-black/5 bg-white/70 p-5 backdrop-blur-xl transition-colors hover:border-violet-500/30 dark:border-white/10 dark:bg-white/[0.04]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-foreground">
                  {f.q}
                  <span className="text-violet-500 transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Guide / internal link to the blog ===== */}
      <section className="px-4 pb-16">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog/voice-cloning-tool-online-free"
            className="group flex items-center gap-4 rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/5 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-500/40"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white">
              <BookOpen className="h-6 w-6" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-violet-600 dark:text-violet-300">
                Full guide
              </p>
              <h2 className="mt-0.5 font-bold leading-snug text-foreground">
                Voice Cloning Tool Online: How to Clone Any Voice in Minutes
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                A step-by-step 2026 guide — how AI voice cloning works, use cases, tips, and FAQs.
              </p>
            </div>
            <ArrowRight className="h-5 w-5 shrink-0 text-violet-500 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </>
  );
}
