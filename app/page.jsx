import StoreHome from "@/app/components/store/StoreHome";
import { getActiveDigitalProducts } from "@/lib/actions/products";
import { HOMEPAGE_FAQ } from "@/lib/constants/homepageFaq";

const SITE = "https://www.shopyor.com";

export const metadata = {
  metadataBase: new URL(SITE),
  title: {
    absolute: "IGCSE Past Paper & IB Maths Worked Solutions | Shopyor",
  },
  description:
    "Fully worked Cambridge IGCSE past-paper solutions, IB Mathematics AA HL Paper 1-style practice with step-by-step worked solutions, and printable KS2 Year 6 Maths worksheets. Pay once, download instantly — anywhere in the world.",
  keywords: [
    "IGCSE past paper worked solutions",
    "IGCSE mathematics 0580",
    "Cambridge IGCSE mathematics 0580",
    "0580 igcse maths past papers",
    "IGCSE 0580 worked solutions pdf",
    "IGCSE maths past papers with answers",
    "IB Maths AA HL worked solutions",
    "IB Mathematics AA HL Paper 1 practice questions",
    "IB AA HL Paper 1 practice with answers",
    "IB Maths Analysis and Approaches HL practice",
    "year 6 maths worksheets",
    "year 6 maths worksheets pdf",
    "printable year 6 maths worksheets",
    "KS2 maths worksheets",
    "year 6 maths worksheets with answers",
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
    },
  },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "Shopyor",
    locale: "en_US",
    title: "IGCSE Past Paper & IB Maths Worked Solutions | Shopyor",
    description:
      "Fully worked Cambridge IGCSE past-paper solutions, IB Mathematics AA HL Paper 1-style practice with worked solutions, and printable KS2 Year 6 Maths worksheets. Pay once, download instantly — anywhere in the world.",
    // No `images` override here on purpose — this lets Next.js fall back to
    // the file-convention app/opengraph-image.js (and twitter-image.js),
    // which is generated from current copy instead of a static PNG that
    // silently goes stale every time the homepage's positioning changes.
  },
  twitter: {
    card: "summary_large_image",
    site: "@shopyor",
    creator: "@shopyor",
    title: "IGCSE Past Paper & IB Maths Worked Solutions | Shopyor",
    description:
      "Fully worked Cambridge IGCSE past-paper solutions, IB Mathematics AA HL Paper 1-style practice with worked solutions, and printable KS2 Year 6 Maths worksheets. Pay once, download instantly.",
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
        name: "IGCSE Past Paper & IB Maths Worked Solutions by Shopyor",
        isPartOf: { "@id": `${SITE}/#website` },
        about: { "@id": `${SITE}/#organization` },
        description:
          "Fully worked Cambridge IGCSE past-paper solutions, IB Mathematics AA HL Paper 1-style practice with worked solutions, and printable KS2 Year 6 Maths worksheets. Pay once, download instantly.",
      },
      {
        "@type": "ItemList",
        name: "Worksheet & Worked-Solution Packs",
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
