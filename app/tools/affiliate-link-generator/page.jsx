// app/affiliate-link/page.jsx

import AffiliateLinkGeneratorClient from "@/app/components/affiliateLinkGenerator/AffiliateLinkGeneratorClient";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Amazon Affiliate Link Generator | Shopyor",
    template: "%s | Shopyor",
  },
  description:
    "Generate clean Amazon affiliate links with your own Associate Tag. Works for all Amazon regions and ensures SEO-friendly links.",
  alternates: { canonical: "/affiliate-link" },
  keywords: [
    "amazon affiliate link generator",
    "create amazon affiliate link",
    "amazon associates tool",
    "affiliate marketing",
    "generate amazon links",
    "amazon url cleaner",
    "ASIN affiliate link",
  ],
  openGraph: {
    type: "website",
    url: "/affiliate-link",
    title: "Amazon Affiliate Link Generator | Shopyor",
    description:
      "Easily create Amazon affiliate links for any product using your own Associate Tag. Supports all major regions.",
    siteName: "Shopyor",
    locale: "en_US",
    images: [
      {
        url: "/images/og-affiliate-generator.jpg",
        width: 1200,
        height: 630,
        alt: "Amazon Affiliate Link Generator Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amazon Affiliate Link Generator | Shopyor",
    description:
      "Create clean Amazon affiliate links with your own Associate Tag. Free, fast, and supports all regions.",
    images: ["/images/og-affiliate-generator.jpg"],
  },
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
};

// JSON-LD objects (rendered server-side)
const jsonLdTool = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Amazon Affiliate Link Generator",
  url: `${BASE_URL}/affiliate-link`,
  description:
    "Free online Amazon affiliate link generator. Convert product URLs into clean affiliate links with your own tag.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "All",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const breadcrumbList = {
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
    {
      "@type": "ListItem",
      position: 3,
      name: "Affiliate Link Generator",
      item: `${BASE_URL}/affiliate-link`,
    },
  ],
};

export default function Page() {
  return (
    <main className="min-h-screen max-w-xl mx-auto pt-28 md:pt-32 lg:pt-32">
      {/* JSON-LD (safe to inject from a Server Component) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdTool) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
      />

      <h1 className="text-2xl font-bold mb-4">
        🛠 Amazon Affiliate Link Generator
      </h1>
      <AffiliateLinkGeneratorClient />
    </main>
  );
}
