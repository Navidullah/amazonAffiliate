import VoiceCloneClient from "@/app/components/tools/VoiceCloneClient";
import VoiceCloneHero from "@/app/components/tools/VoiceCloneHero";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";

export const metadata = {
  title: "Free AI Voice Cloner | Shopyor – Clone Any Voice from a Short Sample",
  description:
    "Clone a voice from a short audio sample and make it speak any text. Upload a 10–30s clip, type your text, and download natural-sounding speech as a WAV.",
  alternates: { canonical: "/tools/voice-clone" },
  keywords: [
    "voice cloning",
    "AI voice generator",
    "text to speech",
    "clone my voice",
    "voice clone online",
  ],
  openGraph: {
    type: "website",
    url: `${BASE_URL}/tools/voice-clone`,
    title: "Free AI Voice Cloner | Shopyor",
    description:
      "Upload a short voice sample and make it say anything — natural AI text-to-speech.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Voice Cloner | Shopyor",
    description: "Clone a voice from a short clip and generate speech instantly.",
  },
};

export default function VoiceClonePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Shopyor Voice Cloner",
    url: `${BASE_URL}/tools/voice-clone`,
    description:
      "Free online tool to clone a voice from a short sample and generate natural speech from text.",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <main className="min-h-screen bg-background pt-28 md:pt-32 lg:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-4xl px-4 pb-24">
        <VoiceCloneHero />
        <VoiceCloneClient />
      </div>
    </main>
  );
}
