import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";
import VoiceCloneClient from "@/app/components/tools/VoiceCloneClient";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";

const reviews = [
  {
    author: "Jake M.",
    role: "YouTube Content Creator",
    rating: 5,
    body: "I use this to clone my voice for quick turnaround voiceovers when I can't be at the mic. WAV quality is solid and the tone presets save a ton of tweaking time.",
  },
  {
    author: "Priya S.",
    role: "Podcast Producer",
    rating: 5,
    body: "Cloned my host's voice from a 20-second recording and it nailed the cadence. Great for generating intro bumpers without scheduling a studio session.",
  },
  {
    author: "Carlos T.",
    role: "Indie Game Developer",
    rating: 5,
    body: "Perfect for rapid prototyping character voices. No account, no watermark — I just upload a sample, type the line, and download the WAV straight into my project.",
  },
  {
    author: "Sarah L.",
    role: "Audiobook Narrator",
    rating: 4,
    body: "Impressive output for a free browser tool. The expressiveness and stability sliders give real control over delivery. Would love batch generation in the future.",
  },
  {
    author: "Amir K.",
    role: "Language Learning Coach",
    rating: 5,
    body: "I record myself saying phonemes and clone it so students can hear my voice repeat difficult words at different speeds. The speed slider is a standout feature.",
  },
];

const AVG_RATING = (
  reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
).toFixed(1);

const faqs = [
  {
    q: "How long does the voice sample need to be?",
    a: "A clean 10–30-second clip works best. The sample should be clear speech with minimal background noise — longer isn't always better, but more than 10 seconds gives the model enough data to capture your vocal characteristics accurately.",
  },
  {
    q: "Is this voice cloning tool really free?",
    a: "Yes, completely free with no hidden fees. Upload a sample, clone it, and generate speech — all at no cost. No credit card, no subscription, no export limit during your session.",
  },
  {
    q: "Do I need to create an account or sign up?",
    a: "No account needed. Open the page, upload your sample, and start generating. Your cloned voices are saved privately to your browser's local storage — they stay on your device, not on any server.",
  },
  {
    q: "What audio formats can I upload?",
    a: "You can upload WAV, MP3, or FLAC files up to 25 MB. You can also record directly from your microphone in the browser — recordings are automatically encoded to WAV before processing.",
  },
  {
    q: "Can I clone someone else's voice?",
    a: "Only with their explicit permission. The tool requires you to confirm consent before cloning. Cloning someone's voice without permission may violate privacy laws and platform terms of service. Always ensure you have the right to use any voice sample you upload.",
  },
  {
    q: "How do I download the generated audio?",
    a: "After clicking 'Generate speech', your audio appears in a built-in waveform player. Click the 'Download WAV' or 'Download MP3' link to save the file — no email or account required.",
  },
  {
    q: "Where are my cloned voices stored?",
    a: "Cloned voices are stored in your browser's localStorage as a per-device library. They're private to your browser — no one else can access them. Clearing your browser data will remove them.",
  },
  {
    q: "How many characters can I type for speech generation?",
    a: "Up to 1,000 characters per generation. For longer scripts, break them into chunks and stitch the resulting audio files together in a free audio editor like Audacity.",
  },
];

export const metadata = {
  title: {
    absolute:
      "Free AI Voice Cloner Online — No Signup, No Account | Shopyor",
  },
  description:
    "Clone any voice from a 10–30s audio sample and generate natural-sounding speech for free. No signup, no account needed. Download WAV or MP3 instantly.",
  keywords: [
    "free ai voice cloner online",
    "clone voice online no signup",
    "voice cloning free no account",
    "ai voice clone from audio sample",
    "text to speech with cloned voice free",
    "voice clone tool free browser",
    "clone my voice online free",
    "free voice cloning no watermark",
    "ai voice generator from sample free",
    "voice cloning wav download free",
    "clone any voice online free",
    "voice clone from short sample",
    "free ai voice generator no signup",
    "voice clone mp3 download free",
    "online voice cloning tool free",
    "clone voice with ai browser",
    "free text to speech voice clone",
    "ai voice cloning no account required",
    "upload audio clone voice free",
    "voice clone from microphone free",
  ],
  authors: [{ name: "Shopyor" }],
  category: "Audio Tools",
  classification: "Web Application",
  robots: "index, follow",
  alternates: {
    canonical: `${BASE_URL}/tools/voice-clone`,
    languages: {
      "en-US": `${BASE_URL}/tools/voice-clone`,
      "en-GB": `${BASE_URL}/tools/voice-clone`,
      "en-AU": `${BASE_URL}/tools/voice-clone`,
      "en-CA": `${BASE_URL}/tools/voice-clone`,
      "en-IN": `${BASE_URL}/tools/voice-clone`,
      "fr-FR": `${BASE_URL}/tools/voice-clone`,
      "de-DE": `${BASE_URL}/tools/voice-clone`,
      "es-ES": `${BASE_URL}/tools/voice-clone`,
      "pt-BR": `${BASE_URL}/tools/voice-clone`,
      "ja-JP": `${BASE_URL}/tools/voice-clone`,
      "zh-CN": `${BASE_URL}/tools/voice-clone`,
    },
  },
  openGraph: {
    type: "article",
    url: `${BASE_URL}/tools/voice-clone`,
    title: "Free AI Voice Cloner Online — No Signup | Shopyor",
    description:
      "Clone any voice from a short audio sample and generate natural speech instantly. Free, no account required.",
    images: [{ url: `${BASE_URL}/images/shopyor-tools-og.png` }],
    siteName: "Shopyor",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Voice Cloner Online — No Signup | Shopyor",
    description:
      "Upload a 10–30s voice sample, type your script, and download natural-sounding WAV/MP3 — free, no account.",
    images: [`${BASE_URL}/images/shopyor-tools-og.png`],
  },
};

export default function VoiceClonePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${BASE_URL}/tools/voice-clone#app`,
        name: "Shopyor AI Voice Cloner",
        url: `${BASE_URL}/tools/voice-clone`,
        description:
          "Free online AI voice cloning tool. Upload a 10–30s audio sample, type your script, and generate natural speech — no signup required. Download WAV or MP3.",
        applicationCategory: "MultimediaApplication",
        operatingSystem: "All",
        browserRequirements:
          "Requires a modern web browser with JavaScript enabled",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList: [
          "Upload WAV, MP3, or FLAC voice samples",
          "Record voice directly from microphone",
          "Per-browser voice library with preview and delete",
          "Tone presets: Neutral, Expressive, Calm, Energetic, Dramatic, Deep, Bright",
          "Advanced controls: expressiveness, stability, variation, tone, speed",
          "Download output as WAV or MP3",
          "No account or signup required",
          "Free to use",
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: AVG_RATING,
          reviewCount: String(reviews.length),
          bestRating: "5",
          worstRating: "1",
        },
        review: reviews.map((r) => ({
          "@type": "Review",
          author: { "@type": "Person", name: r.author },
          reviewRating: {
            "@type": "Rating",
            ratingValue: String(r.rating),
            bestRating: "5",
            worstRating: "1",
          },
          reviewBody: r.body,
        })),
      },
      {
        "@type": "HowTo",
        name: "How to Clone a Voice Online for Free",
        description:
          "Step-by-step guide to cloning a voice and generating speech with Shopyor's free AI voice cloner.",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Upload or record your voice sample",
            text: "Click 'Add a voice', then drag-and-drop a WAV, MP3, or FLAC file (max 25 MB) or tap the mic button to record up to 60 seconds. A clean 10–30s clip gives the best results.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Name your voice and confirm consent",
            text: "Give the cloned voice a recognisable name, tick the consent checkbox confirming you have permission to clone this voice, then click 'Clone & save voice'.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Select the voice from your library",
            text: "Your cloned voice appears in the 'Your voices' library. Click it to select it as the active speaker for generation.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Type your script and choose a tone",
            text: "Enter up to 1,000 characters of text. Pick a tone preset (Neutral, Expressive, Calm, Energetic, Dramatic, Deep, or Bright) and adjust the speed slider as needed.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Generate and download your audio",
            text: "Click 'Generate speech'. When the waveform player appears, preview the result and click 'Download WAV' or 'Download MP3' to save the file — no account required.",
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${BASE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Tools",
            item: `${BASE_URL}/tools`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "AI Voice Cloner",
            item: `${BASE_URL}/tools/voice-clone`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Page header ── */}
      <div className="mx-auto max-w-4xl px-4 pt-6 md:pt-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground"
        >
          <Link
            href="/"
            className="inline-flex items-center transition-colors hover:text-foreground"
          >
            <Home className="h-3.5 w-3.5" />
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link
            href="/tools"
            className="transition-colors hover:text-foreground"
          >
            Tools
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-medium text-foreground">AI Voice Cloner</span>
        </nav>

        {/* Badges */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-600 dark:text-violet-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-500" />
            AI Voice Cloning · Free
          </span>
          <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
            No Signup
          </span>
          <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
            No Account
          </span>
        </div>

        {/* H1 */}
        <h1 className="text-3xl font-black leading-tight tracking-tight md:text-4xl">
          Free AI Voice Cloner Online —{" "}
          <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
            No Signup Required
          </span>
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Upload a 10–30-second audio sample (or record live from your mic),
          type your script, and download natural-sounding speech in that voice.
          Free to use — no account, no watermark, no credit card.
        </p>

        {/* Trust pills */}
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
          {[
            "WAV & MP3 download",
            "7 tone presets",
            "Browser voice library",
            "Microphone recording",
            "Up to 1,000 chars",
            "No watermark",
          ].map((p) => (
            <span
              key={p}
              className="rounded-full border border-border bg-muted/50 px-2.5 py-1"
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* ── Tool ── */}
      <div className="mx-auto max-w-4xl px-4 py-8">
        <VoiceCloneClient />
      </div>

      {/* ── User Reviews ── */}
      <section className="mx-auto max-w-4xl px-4 pb-16">
        <h2 className="mb-6 text-xl font-bold text-foreground">
          What users say about our free AI voice cloner
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <blockquote
              key={r.author}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="mb-2 flex gap-0.5">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <svg
                    key={i}
                    className="h-4 w-4 text-amber-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                &ldquo;{r.body}&rdquo;
              </p>
              <footer className="mt-3">
                <p className="text-xs font-semibold text-foreground">
                  {r.author}
                </p>
                <p className="text-xs text-muted-foreground">{r.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* ── Article ── */}
      <article className="mx-auto max-w-3xl px-4 pb-16">
        <h2 className="mb-4 text-xl font-bold text-foreground">
          What is AI voice cloning — and how does it work?
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          AI voice cloning analyses the acoustic characteristics of a short
          audio sample — pitch, timbre, pacing, and resonance — and trains a
          neural text-to-speech model on those patterns. When you type a script,
          the model synthesises speech that sounds like the original speaker
          rather than a generic TTS voice.
        </p>
        <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
          Modern voice cloning models can capture a convincing likeness from as
          little as 10–30 seconds of clean audio. Shopyor&rsquo;s free voice
          cloner runs on GPU-accelerated inference, so generation typically
          completes in a few seconds regardless of your device.
        </p>

        <h2 className="mb-4 text-xl font-bold text-foreground">
          How to clone a voice online in 5 steps
        </h2>
        <ol className="mb-8 space-y-3 text-sm leading-relaxed text-muted-foreground">
          <li>
            <strong className="text-foreground">
              1. Upload or record your sample.
            </strong>{" "}
            Drag a WAV, MP3, or FLAC file into the upload zone (max 25 MB), or
            switch to Record mode and tap the mic to capture up to 60 seconds
            live.
          </li>
          <li>
            <strong className="text-foreground">
              2. Name and save the voice.
            </strong>{" "}
            Give it a label, tick the consent checkbox, and click &ldquo;Clone
            &amp; save voice&rdquo;. It&rsquo;s added to your in-browser
            library.
          </li>
          <li>
            <strong className="text-foreground">3. Select the voice.</strong>{" "}
            Click the voice card in the library to make it the active speaker.
          </li>
          <li>
            <strong className="text-foreground">
              4. Enter your script and set the tone.
            </strong>{" "}
            Type up to 1,000 characters. Use tone presets (Expressive, Calm,
            Energetic…) or dial in the advanced sliders for fine control over
            expressiveness, stability, and pitch.
          </li>
          <li>
            <strong className="text-foreground">
              5. Generate and download.
            </strong>{" "}
            Hit &ldquo;Generate speech&rdquo; and when the waveform player
            loads, download the WAV or MP3 — no account needed.
          </li>
        </ol>

        <h2 className="mb-4 text-xl font-bold text-foreground">
          Tone presets — which one should you use?
        </h2>
        <div className="mb-8 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-foreground">
                  Preset
                </th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">
                  Best for
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["Neutral", "Podcasts, explainer videos, corporate voiceovers"],
                [
                  "Expressive",
                  "Storytelling, marketing reads, social content",
                ],
                ["Calm", "Meditation, ASMR, support scripts"],
                ["Energetic", "Sports, promos, hype reels"],
                ["Dramatic", "Trailers, fiction narration, horror"],
                ["Deep", "Documentaries, corporate narration"],
                ["Bright", "Kids' content, upbeat intros"],
              ].map(([preset, use]) => (
                <tr key={preset}>
                  <td className="px-4 py-2.5 font-medium text-foreground">
                    {preset}
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="mb-4 text-xl font-bold text-foreground">
          Tips for the best voice clone quality
        </h2>
        <ul className="mb-8 space-y-2 text-sm leading-relaxed text-muted-foreground">
          <li>
            <strong className="text-foreground">
              Record in a quiet room.
            </strong>{" "}
            Background noise bleeds into the clone and degrades output quality.
          </li>
          <li>
            <strong className="text-foreground">
              Speak naturally at a consistent pace.
            </strong>{" "}
            Avoid reading too fast or too slow — the model captures your natural
            tempo.
          </li>
          <li>
            <strong className="text-foreground">Aim for 15–25 seconds.</strong>{" "}
            Under 10s is too sparse; over 30s adds little extra benefit for most
            models.
          </li>
          <li>
            <strong className="text-foreground">
              Use a decent microphone.
            </strong>{" "}
            Even a pair of wired earbuds dramatically outperforms a built-in
            laptop mic.
          </li>
          <li>
            <strong className="text-foreground">
              Keep the Stability slider mid-range.
            </strong>{" "}
            Lower stability = more dynamic delivery; higher = more consistent
            but flatter tone.
          </li>
        </ul>

        <h2 className="mb-4 text-xl font-bold text-foreground">
          Responsible use of AI voice cloning
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          Voice cloning technology can be misused to create misleading or
          non-consensual audio. Shopyor requires a consent checkbox before every
          clone. Never use cloned audio to impersonate someone, bypass voice
          authentication, or spread misinformation.
        </p>
        <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
          Legitimate use cases include cloning your own voice for consistent
          voiceovers, generating speech for characters you have designed,
          creating prototypes with a client&rsquo;s explicit consent, or
          accessibility applications such as text-to-speech for a speaker who
          has lost their voice.
        </p>

        <h2 className="mb-4 text-xl font-bold text-foreground">
          More free creative tools
        </h2>
        <ul className="mb-0 grid gap-2 text-sm sm:grid-cols-2">
          {[
            { href: "/tools/youtube-thumbnail", label: "YouTube Thumbnail Maker" },
            { href: "/tools/image-resizer", label: "Image Resizer" },
            { href: "/tools/background-remover-image", label: "Background Remover" },
            { href: "/tools/pdf-compressor", label: "PDF Compressor" },
          ].map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition hover:border-violet-400/50 hover:bg-violet-500/5"
              >
                {label} →
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <Link
            href="/tools"
            className="text-sm font-medium text-violet-600 transition hover:text-fuchsia-600 dark:text-violet-300"
          >
            View all free tools →
          </Link>
        </div>
      </article>

      {/* ── FAQ ── */}
      <section className="mx-auto max-w-3xl px-4 pb-20">
        <h2 className="mb-6 text-xl font-bold text-foreground">
          Frequently asked questions about AI voice cloning
        </h2>
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="rounded-xl border border-border bg-card px-5"
            >
              <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* ── Related searches ── */}
      <section className="mx-auto max-w-3xl px-4 pb-24">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Related searches
        </h2>
        <div className="flex flex-wrap gap-2">
          {[
            "free ai voice cloner",
            "clone voice online",
            "voice cloning no signup",
            "ai voice generator free",
            "text to speech voice clone",
            "clone my voice free",
            "voice cloning from audio",
            "ai voice clone wav download",
            "free voice cloning tool",
            "voice clone mp3",
            "online voice cloner no account",
            "ai tts voice cloning",
            "clone voice from microphone",
            "free voice clone no watermark",
            "voice clone browser tool",
            "ai speech synthesis",
            "natural sounding tts free",
            "voice clone from sample",
            "generate speech from voice",
            "ai audio cloning free",
          ].map((kw) => (
            <span
              key={kw}
              className="rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground"
            >
              {kw}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
