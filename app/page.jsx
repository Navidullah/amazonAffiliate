import StoreHome from "@/app/components/store/StoreHome";
import { getActiveDigitalProducts } from "@/lib/actions/products";
import { HOMEPAGE_FAQ } from "@/lib/constants/homepageFaq";

const SITE = "https://www.shopyor.com";

export const metadata = {
  metadataBase: new URL(SITE),
  title: {
    absolute: "Printable Year 6 Maths Worksheets (KS2) | Shopyor",
  },
  description:
    "Printable Year 6 Maths worksheets (KS2) with a full answer key on every pack. Pay once, download instantly — no sign-up, no subscription, ever.",
  keywords: [
    "year 6 maths worksheets",
    "year 6 maths worksheets pdf",
    "printable year 6 maths worksheets",
    "KS2 maths worksheets",
    "KS2 maths worksheets printable",
    "year 6 maths worksheets with answers",
    "year 6 maths worksheets with answers pdf",
    "maths sheets for year 6",
    "year six maths worksheets",
    "year 6 fractions worksheets",
    "KS2 fractions worksheets year 6",
    "year 6 maths worksheets no sign up",
    "pay per download worksheets",
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
      "en-GB": SITE,
    },
  },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "Shopyor",
    locale: "en_GB",
    title: "Printable Year 6 Maths Worksheets (KS2) | Shopyor",
    description:
      "Printable Year 6 Maths worksheets (KS2) with a full answer key on every pack. Pay once, download instantly — no sign-up, no subscription, ever.",
    images: [
      {
        url: `${SITE}/images/shopyor-tools-og.png`,
        width: 1200,
        height: 630,
        alt: "Shopyor — Printable Year 6 Maths Worksheets (KS2)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@shopyor",
    creator: "@shopyor",
    title: "Printable Year 6 Maths Worksheets (KS2) | Shopyor",
    description:
      "Printable Year 6 Maths worksheets (KS2) with a full answer key on every pack. Pay once, download instantly.",
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
        name: "Printable Year 6 Maths Worksheets (KS2) by Shopyor",
        isPartOf: { "@id": `${SITE}/#website` },
        about: { "@id": `${SITE}/#organization` },
        description:
          "Printable Year 6 Maths worksheets (KS2) with a full answer key on every pack. Pay once, download instantly.",
      },
      {
        "@type": "ItemList",
        name: "Year 6 Maths Worksheet Packs",
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
            image: p.previewImage
              ? p.previewImage.startsWith("http")
                ? p.previewImage
                : `${SITE}${p.previewImage}`
              : undefined,
            offers: {
              "@type": "Offer",
              url: `${SITE}${p.href}`,
              price: String(p.price),
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
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
      {
        "@type": "FAQPage",
        mainEntity: HOMEPAGE_FAQ.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
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
