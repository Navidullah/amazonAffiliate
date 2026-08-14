import StoreHome from "@/app/components/store/StoreHome";
import { getActiveDigitalProducts } from "@/lib/actions/products";

const SITE = "https://www.shopyor.com";

export const metadata = {
  metadataBase: new URL(SITE),
  title: {
    absolute: "Printable Worksheets — KS2 Maths, SATs & More | Shopyor",
  },
  description:
    "Downloadable PDF worksheets for KS2 Maths & SATs (UK), Common Core Math (USA), and provincial curricula (Canada). Pay once, download instantly — plus 17+ free online tools.",
  keywords: [
    "printable worksheets",
    "KS2 maths worksheets",
    "SATs practice papers",
    "common core math worksheets",
    "canada math worksheets printable",
    "pay per download",
    "free online tools",
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
    title: "Printable Worksheets — KS2 Maths, SATs & More | Shopyor",
    description:
      "Downloadable PDF worksheets for UK, USA, and Canada curricula. Pay once, download instantly. No sign-up, no subscription.",
    images: [
      {
        url: `${SITE}/images/shopyor-tools-og.png`,
        width: 1200,
        height: 630,
        alt: "Shopyor Worksheet Store",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@shopyor",
    creator: "@shopyor",
    title: "Printable Worksheets — KS2 Maths, SATs & More | Shopyor",
    description:
      "Downloadable PDF worksheets for KS2 Maths & SATs, Common Core, and provincial curricula. Pay once, download instantly.",
    images: [`${SITE}/images/shopyor-tools-og.png`],
  },
};

// Organization + WebSite are emitted once globally in app/layout.jsx; this
// page only declares page-specific schemas and references the global @ids.
function buildStructuredData(products) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE}/#webpage`,
        url: SITE,
        name: "Printable Worksheets by Shopyor",
        isPartOf: { "@id": `${SITE}/#website` },
        about: { "@id": `${SITE}/#organization` },
        description:
          "A printable worksheet store — KS2 Maths & SATs (UK), Common Core Math (USA), and provincial curricula (Canada). Pay once, download instantly.",
      },
      {
        "@type": "ItemList",
        name: "Shopyor Worksheet Packs",
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        numberOfItems: products.length,
        itemListElement: products.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: p.title,
          url: `${SITE}${p.href}`,
          item: {
            "@type": "Product",
            name: p.title,
            url: `${SITE}${p.href}`,
            description: p.description,
            offers: {
              "@type": "Offer",
              price: String(p.price),
              priceCurrency: "USD",
            },
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
}

export default async function Page() {
  const products = await getActiveDigitalProducts();
  const structuredData = buildStructuredData(products);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <StoreHome products={products} />
    </>
  );
}
