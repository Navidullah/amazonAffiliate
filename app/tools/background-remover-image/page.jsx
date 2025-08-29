// app/background-remover-image/page.jsx

import BgRemoveClient from "@/app/components/tools/BgRemoveClient";
import dynamic from "next/dynamic";

// Dynamically import the client component so it’s only loaded on the client.
// You can also import it normally if you prefer.

// Page‑level metadata for SEO (optional but recommended)
export const metadata = {
  title: "Background Remover – Remove Image Backgrounds Online",
  description:
    "Use our AI‑powered background remover to extract the subject from any photo directly in your browser. No uploads, no privacy concerns.",
  alternates: { canonical: "/background-remover-image" },
  openGraph: {
    title: "Background Remover – Remove Image Backgrounds Online",
    description:
      "Our free AI background remover lets you extract subjects from photos right in your browser. No server processing required.",
    url: "https://www.shopyor.com/background-remover-image",
    siteName: "Shopyor",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Background Remover – Remove Image Backgrounds Online",
    description:
      "Extract people or objects from photos instantly with our browser‑based AI background remover.",
  },
};

export default function BackgroundRemoverImagePage() {
  return (
    <main className="wrapper py-10">
      <BgRemoveClient />
    </main>
  );
}
