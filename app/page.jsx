import HomeHub from "@/app/components/home/HomeHub";

const SITE = "https://www.shopyor.com";

export const metadata = {
  metadataBase: new URL(SITE),
  title: {
    absolute:
      "Free Online Tools — Video Downloaders, PDF, Image, AI & SEO | Shopyor",
  },
  description:
    "Shopyor is a free online toolbox: download Facebook, Instagram, TikTok & YouTube videos, convert & compress PDFs, remove image backgrounds, compress & resize images, clone a voice, build a resume, calculate BMI, and generate SEO tags. No sign-up, no install — all in your browser.",
  keywords: [
    "free online tools",
    "video downloader",
    "facebook video downloader",
    "instagram video downloader",
    "tiktok video downloader",
    "youtube video downloader",
    "video to gif converter",
    "whiteboard animation maker",
    "ai voice cloner",
    "background remover",
    "image compressor",
    "image resizer",
    "exif remover",
    "pdf to word converter",
    "pdf compressor",
    "resume builder",
    "bmi calculator",
    "amazon affiliate link generator",
    "youtube thumbnail downloader",
    "youtube tags extractor",
    "meta tag generator",
    "robots.txt generator",
  ],
  authors: [{ name: "Shopyor" }],
  creator: "Shopyor",
  publisher: "Shopyor",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxPreview: "large",
      maxImagePreview: "large",
      maxSnippet: -1,
    },
  },
  alternates: {
    canonical: SITE,
    languages: {
      "x-default": SITE,
      en: SITE,
      "en-US": SITE,
      "en-GB": SITE,
      "en-IN": SITE,
      "en-PK": SITE,
      "en-CA": SITE,
      "en-AU": SITE,
      "en-NG": SITE,
      "en-PH": SITE,
      "en-ZA": SITE,
    },
  },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "Shopyor",
    locale: "en_US",
    title: "Free Online Tools by Shopyor — One Free Toolbox for Everything",
    description:
      "Download videos, convert & compress PDFs, remove image backgrounds, clone a voice, build a resume, calculate BMI, and generate SEO tags — 21+ free tools, no sign-up.",
    images: [
      {
        url: `${SITE}/images/shopyor-tools-og.png`,
        width: 1200,
        height: 630,
        alt: "Shopyor Free Online Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@shopyor",
    creator: "@shopyor",
    title: "Free Online Tools by Shopyor",
    description:
      "21+ free, browser-based tools: video downloaders, PDF & image utilities, AI voice cloner, resume builder, BMI calculator, and SEO tools. No sign-up.",
    images: [`${SITE}/images/shopyor-tools-og.png`],
  },
};

/** All tools enumerated for ItemList structured data (keep in sync with HomeHub). */
const TOOLS = [
  {
    name: "Facebook Video Downloader",
    url: `${SITE}/tools/facebook-video-downloader`,
    description:
      "Download public Facebook videos and reels in HD, free and without an app.",
  },
  {
    name: "Instagram Video Downloader",
    url: `${SITE}/tools/instagram-video-downloader`,
    description:
      "Save public Instagram reels, posts, and videos in full quality.",
  },
  {
    name: "TikTok Video Downloader",
    url: `${SITE}/tools/free-tiktok-video-downloader`,
    description: "Download TikTok videos without a watermark in up to 1080p.",
  },
  {
    name: "YouTube Video Downloader",
    url: `${SITE}/tools/youtube-video-downloader`,
    description: "Download YouTube videos for offline viewing in your browser.",
  },
  {
    name: "Video to GIF Converter",
    url: `${SITE}/tools/video-to-gif`,
    description: "Convert any short video clip into a lightweight animated GIF.",
  },
  {
    name: "Whiteboard Animation Maker",
    url: `${SITE}/tools/whiteboard-animation`,
    description:
      "Turn an image into a hand-drawn speed-paint animation and export MP4 or GIF.",
  },
  {
    name: "AI Voice Cloner",
    url: `${SITE}/tools/voice-clone`,
    description:
      "Clone a voice from a short sample and generate natural speech from text. Free, no watermark.",
  },
  {
    name: "AI Background Remover",
    url: `${SITE}/tools/background-remover-image`,
    description:
      "Remove image backgrounds automatically with AI and download a transparent PNG.",
  },
  {
    name: "HD Background Remover",
    url: `${SITE}/tools/bg-remover`,
    description: "Get clean, high-resolution transparent PNG cutouts.",
  },
  {
    name: "Image Compressor",
    url: `${SITE}/tools/image-compressor`,
    description: "Compress JPG and PNG images without visible quality loss.",
  },
  {
    name: "Image Resizer",
    url: `${SITE}/tools/resizer`,
    description: "Resize images to exact dimensions without distortion.",
  },
  {
    name: "EXIF Metadata Remover",
    url: `${SITE}/tools/exif-remover`,
    description: "Strip hidden EXIF and GPS metadata from photos for privacy.",
  },
  {
    name: "PDF to Word Converter",
    url: `${SITE}/tools/online-pdf-to-word-converter`,
    description:
      "Convert PDF files to editable Word documents with OCR and preserved formatting.",
  },
  {
    name: "PDF Compressor",
    url: `${SITE}/tools/pdf-compressor`,
    description: "Reduce PDF file size for email and uploads while keeping quality.",
  },
  {
    name: "Resume Builder",
    url: `${SITE}/tools/resume-builder`,
    description:
      "Build a modern, professional resume with premium templates and export a PDF.",
  },
  {
    name: "BMI Calculator",
    url: `${SITE}/tools/bmi`,
    description:
      "Calculate your Body Mass Index in kg & cm or lb & ft with a healthy-weight chart.",
  },
  {
    name: "Amazon Affiliate Link Generator",
    url: `${SITE}/tools/affiliate-link-generator`,
    description:
      "Convert any Amazon URL or ASIN into a clean affiliate link with your own tag.",
  },
  {
    name: "YouTube Thumbnail Downloader",
    url: `${SITE}/tools/youtube-thumbnail`,
    description: "Download full-resolution thumbnails from any YouTube video.",
  },
  {
    name: "YouTube Tags Extractor",
    url: `${SITE}/tools/youtube-tags`,
    description: "Extract the hidden tags from any YouTube video instantly.",
  },
  {
    name: "Meta Tag Generator",
    url: `${SITE}/tools/meta-tag-generator`,
    description: "Generate SEO title, description, and Open Graph meta tags.",
  },
  {
    name: "Robots.txt Generator",
    url: `${SITE}/tools/robots-txt-generator`,
    description: "Create a correct robots.txt file to guide search engine crawlers.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: "Shopyor",
      url: SITE,
      logo: `${SITE}/shopyor.png`,
      description:
        "Shopyor offers a free suite of online tools — video downloaders, PDF and image utilities, an AI voice cloner, a resume builder, a BMI calculator, and SEO tools.",
      sameAs: ["https://twitter.com/shopyor"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      name: "Shopyor",
      url: SITE,
      publisher: { "@id": `${SITE}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "CollectionPage",
      "@id": `${SITE}/#webpage`,
      url: SITE,
      name: "Free Online Tools by Shopyor",
      isPartOf: { "@id": `${SITE}/#website` },
      about: { "@id": `${SITE}/#organization` },
      description:
        "A free online toolbox with 21+ browser-based tools for video, images, PDFs, AI, and SEO — no sign-up required.",
    },
    {
      "@type": "ItemList",
      name: "Shopyor Free Online Tools",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: TOOLS.length,
      itemListElement: TOOLS.map((t, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: t.name,
        url: t.url,
        item: {
          "@type": "WebApplication",
          name: t.name,
          url: t.url,
          description: t.description,
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomeHub />
    </>
  );
}
