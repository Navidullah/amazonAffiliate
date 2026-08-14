import { getActiveDigitalProducts } from "@/lib/actions/products";
import ProductsCatalog from "./ProductsCatalog";

const SITE = "https://www.shopyor.com";

export const metadata = {
  metadataBase: new URL(SITE),
  title: { absolute: "Printable Worksheets — KS2 Maths, SATs & More | Shopyor" },
  description:
    "Browse downloadable PDF worksheets for KS2 Maths & SATs (UK), Common Core Math (USA), and provincial curricula (Canada). Pay once, download instantly.",
  alternates: { canonical: `${SITE}/products` },
  openGraph: {
    type: "website",
    url: `${SITE}/products`,
    siteName: "Shopyor",
    title: "Printable Worksheets — KS2 Maths, SATs & More | Shopyor",
    description:
      "Downloadable PDF worksheets for UK, USA, and Canada curricula. Pay once, download instantly.",
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
        name: "Shopyor Worksheet Store",
        description:
          "Downloadable PDF worksheets for KS2 Maths & SATs (UK), Common Core Math (USA), and provincial curricula (Canada).",
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
    <main className="mx-auto max-w-6xl px-4 pb-24 pt-28 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
        Printable worksheets for KS2 Maths, SATs & more
      </h1>
      <p className="mt-3 max-w-2xl text-base text-gray-600 dark:text-gray-400">
        Downloadable PDF worksheets covering UK, US, and Canada curricula.
        Pay once, download instantly — no subscription.
      </p>

      <div className="mt-10">
        <ProductsCatalog products={products} />
      </div>
    </main>
  );
}
