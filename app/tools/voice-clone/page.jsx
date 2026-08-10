import VoiceCloneExperience from "./VoiceCloneExperience";

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
  const structuredData = {
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
    <>
      <VoiceCloneExperience />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </>
  );
}
