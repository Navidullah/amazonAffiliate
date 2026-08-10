"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Eraser,
  FileArchive,
  Mic,
  Sparkles,
  Star,
  Type,
  Download,
  UploadCloud,
  Youtube,
} from "lucide-react";
import VoiceCloneClient from "@/app/components/tools/VoiceCloneClient";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

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

const features = [
  {
    icon: Mic,
    title: "Upload or Record",
    desc: "Drag in a WAV, MP3, or FLAC sample, or record live from your microphone right in the browser.",
    accent: "from-violet-500 to-fuchsia-500",
  },
  {
    icon: Sparkles,
    title: "7 Tone Presets",
    desc: "Dial in Neutral, Expressive, Calm, Energetic, Dramatic, Deep, or Bright — or fine-tune with advanced sliders.",
    accent: "from-fuchsia-500 to-pink-500",
  },
  {
    icon: Download,
    title: "Instant WAV/MP3",
    desc: "Generate natural-sounding speech and download it instantly — no watermark, no account required.",
    accent: "from-purple-500 to-violet-500",
  },
];

const steps = [
  {
    icon: UploadCloud,
    title: "Upload or record a sample",
    desc: "Give the model a clean 10-30 second clip of the voice, then confirm consent.",
  },
  {
    icon: Type,
    title: "Type your script",
    desc: "Enter up to 1,000 characters and pick a tone preset or tune the sliders.",
  },
  {
    icon: Download,
    title: "Generate and download",
    desc: "Get natural-sounding speech in that voice, ready as a WAV or MP3 file.",
  },
];

const relatedTools = [
  {
    icon: Youtube,
    label: "YouTube Thumbnail Maker",
    href: "/tools/youtube-thumbnail",
  },
  {
    icon: Eraser,
    label: "Background Remover",
    href: "/tools/background-remover-image",
  },
  {
    icon: FileArchive,
    label: "PDF Compressor",
    href: "/tools/compress-your-pdf-file",
  },
];

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

function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <motion.div
      variants={fadeUp}
      className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/[0.03]"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          {faq.q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-50 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>
      {/* Answer stays mounted (height-animated) so the text is always in the
          DOM and indexable by Google, even when visually collapsed. */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
        aria-hidden={!isOpen}
      >
        <p className="px-5 pb-5 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {faq.a}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function VoiceCloneExperience() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="relative min-h-screen overflow-hidden px-4 pb-24 pt-28 sm:px-6">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-violet-50/60 via-white to-fuchsia-50/40 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900" />
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-violet-400/20 blur-[120px] dark:bg-violet-600/20" />
      <div className="pointer-events-none absolute right-0 top-1/3 -z-10 h-[360px] w-[360px] rounded-full bg-fuchsia-400/20 blur-[120px] dark:bg-fuchsia-600/10" />

      <div className="mx-auto max-w-5xl">
        {/* Hero */}
        <motion.header
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mb-12 text-center"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-violet-200/70 bg-white/70 px-4 py-1.5 text-xs font-semibold text-violet-700 shadow-sm backdrop-blur dark:border-violet-500/20 dark:bg-white/[0.04] dark:text-violet-300"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Free AI Voice Cloning
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl"
          >
            Free{" "}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500 bg-clip-text text-transparent dark:from-violet-300 dark:via-fuchsia-300 dark:to-pink-200">
              AI Voice Cloner
            </span>{" "}
            Online
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-base text-gray-600 dark:text-gray-300 sm:text-lg"
          >
            Upload a 10–30-second audio sample (or record live from your mic),
            type your script, and download natural-sounding speech in that
            voice. Free to use — no account, no watermark, no credit card.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-gray-500 dark:text-gray-400"
          >
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> No sign up
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> No watermark
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> WAV &amp; MP3 download
            </span>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-4 flex items-center justify-center gap-1.5"
          >
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`h-4 w-4 ${
                    s <= Math.round(Number(AVG_RATING))
                      ? "fill-amber-400 text-amber-400"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
              {AVG_RATING}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({reviews.length} reviews)
            </span>
          </motion.div>
        </motion.header>

        {/* Tool */}
        <section className="mb-20">
          <VoiceCloneClient />
        </section>

        {/* Features */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-20 grid gap-6 sm:grid-cols-3"
        >
          {features.map((item) => (
            <motion.article
              key={item.title}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative overflow-hidden rounded-3xl border border-gray-200/70 bg-white/70 p-6 backdrop-blur-xl transition-shadow hover:shadow-[0_24px_64px_-30px_rgba(168,85,247,0.5)] dark:border-white/10 dark:bg-white/[0.03]"
            >
              <div
                className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6`}
              >
                <item.icon className="h-6 w-6" />
              </div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {item.desc}
              </p>
            </motion.article>
          ))}
        </motion.section>

        {/* How to */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-20"
        >
          <motion.h2
            variants={fadeUp}
            className="text-center text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl"
          >
            How to clone a voice online
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-3 max-w-xl text-center text-sm text-gray-600 dark:text-gray-400"
          >
            Three simple steps. No software to install.
          </motion.p>

          <div className="relative mt-10 grid gap-6 sm:grid-cols-3">
            {/* connecting line */}
            <div className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-violet-300/60 to-transparent dark:via-violet-500/30 sm:block" />
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={fadeUp}
                className="relative flex flex-col items-center rounded-3xl border border-gray-200/70 bg-white/70 p-6 text-center backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]"
              >
                <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/30">
                  <step.icon className="h-7 w-7" />
                  <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-gray-900 text-xs font-bold text-white dark:border-gray-950">
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Reviews */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-20"
        >
          <motion.h2
            variants={fadeUp}
            className="text-center text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl"
          >
            What users say about our free AI voice cloner
          </motion.h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
              <motion.blockquote
                key={r.author}
                variants={fadeUp}
                className="rounded-2xl border border-gray-200/70 bg-white/70 p-5 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]"
              >
                <div className="mb-2 flex gap-0.5">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  &ldquo;{r.body}&rdquo;
                </p>
                <footer className="mt-3">
                  <p className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                    {r.author}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {r.role}
                  </p>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </motion.section>

        {/* SEO content */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-20 rounded-3xl border border-gray-200/70 bg-white/70 p-7 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03] sm:p-10"
        >
          <motion.h2
            variants={fadeUp}
            className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl"
          >
            What is AI voice cloning — and how does it work?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            AI voice cloning analyses the acoustic characteristics of a short
            audio sample — pitch, timbre, pacing, and resonance — and trains a
            neural text-to-speech model on those patterns. When you type a
            script, the model synthesises speech that sounds like the original
            speaker rather than a generic TTS voice.
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            Modern voice cloning models can capture a convincing likeness from
            as little as 10–30 seconds of clean audio. Shopyor&rsquo;s free
            voice cloner runs on GPU-accelerated inference, so generation
            typically completes in a few seconds regardless of your device.
          </motion.p>

          <motion.h3
            variants={fadeUp}
            className="mt-8 text-lg font-semibold text-gray-900 dark:text-white"
          >
            How to clone a voice online in 5 steps
          </motion.h3>
          <motion.ol
            variants={fadeUp}
            className="mt-2 space-y-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            <li>
              <strong className="text-gray-900 dark:text-white">
                1. Upload or record your sample.
              </strong>{" "}
              Drag a WAV, MP3, or FLAC file into the upload zone (max 25 MB),
              or switch to Record mode and tap the mic to capture up to 60
              seconds live.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                2. Name and save the voice.
              </strong>{" "}
              Give it a label, tick the consent checkbox, and click
              &ldquo;Clone &amp; save voice&rdquo;. It&rsquo;s added to your
              in-browser library.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                3. Select the voice.
              </strong>{" "}
              Click the voice card in the library to make it the active
              speaker.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                4. Enter your script and set the tone.
              </strong>{" "}
              Type up to 1,000 characters. Use tone presets (Expressive, Calm,
              Energetic…) or dial in the advanced sliders for fine control
              over expressiveness, stability, and pitch.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                5. Generate and download.
              </strong>{" "}
              Hit &ldquo;Generate speech&rdquo; and when the waveform player
              loads, download the WAV or MP3 — no account needed.
            </li>
          </motion.ol>

          <motion.h3
            variants={fadeUp}
            className="mt-8 text-lg font-semibold text-gray-900 dark:text-white"
          >
            Tone presets — which one should you use?
          </motion.h3>
          <motion.div
            variants={fadeUp}
            className="mt-3 overflow-x-auto rounded-2xl border border-gray-200/70 dark:border-white/10"
          >
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-white/[0.04]">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                    Preset
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                    Best for
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/70 dark:divide-white/10">
                {[
                  [
                    "Neutral",
                    "Podcasts, explainer videos, corporate voiceovers",
                  ],
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
                    <td className="px-4 py-2.5 font-medium text-gray-900 dark:text-white">
                      {preset}
                    </td>
                    <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">
                      {use}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.h3
            variants={fadeUp}
            className="mt-8 text-lg font-semibold text-gray-900 dark:text-white"
          >
            Tips for the best voice clone quality
          </motion.h3>
          <motion.ul
            variants={fadeUp}
            className="mt-2 space-y-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            <li>
              <strong className="text-gray-900 dark:text-white">
                Record in a quiet room.
              </strong>{" "}
              Background noise bleeds into the clone and degrades output
              quality.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Speak naturally at a consistent pace.
              </strong>{" "}
              Avoid reading too fast or too slow — the model captures your
              natural tempo.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Aim for 15–25 seconds.
              </strong>{" "}
              Under 10s is too sparse; over 30s adds little extra benefit for
              most models.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Use a decent microphone.
              </strong>{" "}
              Even a pair of wired earbuds dramatically outperforms a
              built-in laptop mic.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">
                Keep the Stability slider mid-range.
              </strong>{" "}
              Lower stability = more dynamic delivery; higher = more
              consistent but flatter tone.
            </li>
          </motion.ul>

          <motion.h3
            variants={fadeUp}
            className="mt-8 text-lg font-semibold text-gray-900 dark:text-white"
          >
            Responsible use of AI voice cloning
          </motion.h3>
          <motion.p
            variants={fadeUp}
            className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            Voice cloning technology can be misused to create misleading or
            non-consensual audio. Shopyor requires a consent checkbox before
            every clone. Never use cloned audio to impersonate someone,
            bypass voice authentication, or spread misinformation.
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            Legitimate use cases include cloning your own voice for
            consistent voiceovers, generating speech for characters you have
            designed, creating prototypes with a client&rsquo;s explicit
            consent, or accessibility applications such as text-to-speech for
            a speaker who has lost their voice.
          </motion.p>
        </motion.section>

        {/* FAQ */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16"
        >
          <motion.h2
            variants={fadeUp}
            className="text-center text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl"
          >
            Frequently asked questions
          </motion.h2>
          <div className="mx-auto mt-8 max-w-3xl space-y-3">
            {faqs.map((faq, i) => (
              <FaqItem
                key={faq.q}
                faq={faq}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
              />
            ))}
          </div>
        </motion.section>

        {/* Related tools (internal links) */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-20"
        >
          <motion.h2
            variants={fadeUp}
            className="text-center text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl"
          >
            More free creative tools
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-3 max-w-xl text-center text-sm text-gray-600 dark:text-gray-400"
          >
            More handy content and image utilities — all free, no signup.
          </motion.p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedTools.map((tool) => (
              <motion.div key={tool.href} variants={fadeUp}>
                <Link
                  href={tool.href}
                  className="group flex items-center gap-3 rounded-2xl border border-gray-200/70 bg-white/70 p-4 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-violet-400/50"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/15 to-fuchsia-500/15 text-violet-600 ring-1 ring-violet-500/20 dark:text-violet-300">
                    <tool.icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                    {tool.label}
                  </span>
                  <ArrowRight className="ml-auto h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-violet-500" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Related searches */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16"
        >
          <h2 className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Related searches
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
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
                className="rounded-full border border-gray-200/70 bg-white/50 px-3 py-1.5 text-xs text-gray-500 backdrop-blur dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-400"
              >
                {kw}
              </span>
            ))}
          </div>
        </motion.section>

        {/* CTA footer */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-violet-200/50 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-500 p-8 text-center shadow-xl sm:p-10"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/15 blur-2xl" />
          <h2 className="text-2xl font-bold text-white">
            Need more handy tools?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-violet-50/90">
            Explore the full collection of free, fast, and privacy-friendly
            utilities.
          </p>
          <Link
            href="/tools"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-violet-700 shadow-lg transition-transform hover:scale-105"
          >
            Browse all tools
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.section>
      </div>
    </main>
  );
}
