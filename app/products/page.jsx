import { getActiveDigitalProducts } from "@/lib/actions/products";
import ProductsCatalog from "./ProductsCatalog";

const SITE = "https://www.shopyor.com";

export const metadata = {
  metadataBase: new URL(SITE),
  title: { absolute: "Year 6 Maths Worksheets PDF (KS2) — Browse All Packs | Shopyor" },
  description:
    "Browse every printable Year 6 Maths worksheet PDF (KS2) — each pack includes a full answer key. Pay once, download instantly, no subscription.",
  keywords: [
    "year 6 maths worksheets pdf",
    "printable maths worksheets year 6",
    "year 6 maths worksheets with answers pdf",
    "KS2 maths worksheets",
    "year 6 maths worksheets",
  ],
  alternates: { canonical: `${SITE}/products` },
  openGraph: {
    type: "website",
    url: `${SITE}/products`,
    siteName: "Shopyor",
    title: "Year 6 Maths Worksheets PDF (KS2) — Browse All Packs | Shopyor",
    description:
      "Browse every printable Year 6 Maths worksheet PDF (KS2) — each pack includes a full answer key. Pay once, download instantly, no subscription.",
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
        name: "Year 6 Maths Worksheets PDF (KS2) — Browse All Packs",
        description:
          "Browse every printable Year 6 Maths worksheet PDF (KS2) — each pack includes a full answer key.",
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
        Year 6 Maths Worksheets PDF (KS2)
      </h1>
      <p className="mt-3 max-w-2xl text-base text-gray-600 dark:text-gray-400">
        Browse every printable Year 6 Maths worksheet PDF for KS2, each with
        a full answer key. Pay once, download instantly — no subscription.
      </p>

      <div className="mt-10">
        <ProductsCatalog products={products} />
      </div>
    </div>
  );
}
