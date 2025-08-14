// app/tools/page.jsx
import Link from "next/link";
import { Image as ImgIcon, Wand2, Scissors, Link2 } from "lucide-react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";

// --- SEO ---
export const metadata = {
  title: "Tools", // becomes: Tools | Shopyor — Expert Health & Fitness…
  description:
    "Use Shopyor’s free tools: Image Compressor, EXIF Remover, Background Remover, and Affiliate Link Generator. Fast, private, and easy to use.",
  alternates: { canonical: "/tools" },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/tools`,
    title: "Tools",
    description:
      "Free utilities from Shopyor: compress images, strip EXIF, remove backgrounds, and generate affiliate links.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tools",
    description:
      "Free utilities from Shopyor: compress images, strip EXIF, remove backgrounds, and generate affiliate links.",
  },
};

// Reusable card
function ToolCard({ href, title, desc, icon: Icon, badge }) {
  return (
    <Link
      href={href}
      className="group relative rounded-2xl border border-gray-200 dark:border-white/10 p-5 hover:shadow-md hover:border-cyan-400/50 transition overflow-hidden"
    >
      {/* subtle glow */}
      <div className="pointer-events-none absolute -top-20 right-0 h-40 w-40 rounded-full bg-cyan-400/10 blur-2xl group-hover:bg-cyan-400/20" />
      <div className="flex items-center gap-3">
        <div className="rounded-xl border border-gray-200 dark:border-white/10 p-3">
          <Icon className="h-6 w-6" aria-hidden />
        </div>
        <div className="min-w-0">
          <h2 className="text-base sm:text-lg font-semibold truncate">
            {title}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {desc}
          </p>
        </div>
      </div>
      {badge && (
        <span className="absolute top-3 right-3 rounded-full border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-white/10 px-2 py-0.5 text-[10px] font-medium">
          {badge}
        </span>
      )}
      <span className="mt-4 inline-block text-sm font-medium text-cyan-700 dark:text-cyan-300">
        Open tool →
      </span>
    </Link>
  );
}

export default function ToolsPage() {
  // JSON-LD
  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Tools",
    url: `${BASE_URL}/tools`,
    description:
      "Shopyor’s free utilities: Image Compressor, EXIF Remover, Background Remover, Affiliate Link Generator.",
    isPartOf: { "@type": "WebSite", name: "Shopyor", url: BASE_URL },
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: `${BASE_URL}/tools`,
      },
    ],
  };

  return (
    <main className="min-h-screen wrapper py-10 space-y-8">
      {/* SEO JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <header className="max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-bold">Tools</h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Free, privacy-friendly utilities to speed up your workflow. No sign-up
          required.
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        <ToolCard
          href="/image-compressor"
          title="Image Compressor"
          desc="Reduce image size without sacrificing quality. Great for web performance and SEO."
          icon={ImgIcon}
        />
        <ToolCard
          href="/exif-remover"
          title="EXIF Remover"
          desc="Strip sensitive metadata (location, camera info) from photos before sharing."
          icon={Scissors}
        />
        <ToolCard
          href="/background-remover"
          title="Background Remover"
          desc="Cut out image backgrounds in seconds for clean product photos and thumbnails."
          icon={Wand2}
          badge="Beta"
        />
        <ToolCard
          href="/generate-link"
          title="Affiliate Link Generator"
          desc="Build clean, trackable affiliate links to share across your posts and socials."
          icon={Link2}
        />
      </section>
    </main>
  );
}
