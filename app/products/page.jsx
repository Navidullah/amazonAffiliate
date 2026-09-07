import { getActiveDigitalProducts } from "@/lib/actions/products";
import ProductsCatalog from "./ProductsCatalog";

const SITE = "https://www.shopyor.com";

export const metadata = {
  metadataBase: new URL(SITE),
  title: { absolute: "Worksheets & Past Paper Solutions — KS2 & IGCSE | Shopyor" },
  description:
    "Browse every printable KS2 Year 6 Maths worksheet and Cambridge IGCSE worked past-paper solution pack — each with a full answer key or mark scheme. Pay once, download instantly, no subscription.",
  keywords: [
    "year 6 maths worksheets pdf",
    "printable maths worksheets year 6",
    "KS2 maths worksheets",
    "IGCSE past paper worked solutions",
    "IGCSE maths solutions pdf",
    "Cambridge IGCSE 0580 worked solutions",
  ],
  alternates: { canonical: `${SITE}/products` },
  openGraph: {
    type: "website",
    url: `${SITE}/products`,
    siteName: "Shopyor",
    title: "Worksheets & Past Paper Solutions — KS2 & IGCSE | Shopyor",
    description:
      "Browse every printable KS2 Year 6 Maths worksheet and Cambridge IGCSE worked past-paper solution pack — each with a full answer key or mark scheme. Pay once, download instantly, no subscription.",
  },
};

export default async function ProductsPage() {
  const products = await getActiveDigitalProducts();

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        url: `${SITE}/products`,
        name: "Worksheets & Past Paper Solutions — KS2 & IGCSE",
        description:
          "Browse every printable KS2 Year 6 Maths worksheet and Cambridge IGCSE worked past-paper solution pack — each with a full answer key or mark scheme.",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Products", item: `${SITE}/products` },
        ],
      },
    ],
  };

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-6 sm:px-6 md:pt-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
        Worksheets & Past Paper Solutions — KS2 & IGCSE
      </h1>
      <p className="mt-3 max-w-2xl text-base text-gray-600 dark:text-gray-400">
        Browse every printable KS2 Year 6 Maths worksheet and Cambridge
        IGCSE worked past-paper solution pack, each with a full answer key
        or mark scheme. Pay once, download instantly — no subscription,
        anywhere in the world.
      </p>

      <div className="mt-10">
        <ProductsCatalog products={products} />
      </div>
    </div>
  );
}
