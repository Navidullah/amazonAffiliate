import { getActiveDigitalProducts } from "@/lib/actions/products";
import ProductsCatalog from "./ProductsCatalog";

const SITE = "https://www.shopyor.com";

export const metadata = {
  metadataBase: new URL(SITE),
  title: { absolute: "Shop Maths Past Paper Solutions & eBooks – GCSE, IGCSE, IB | Shopyor" },
  description:
    "Browse worked solutions and ebooks by board, paper and year. Filter GCSE, IGCSE 0580 Core/Extended and IB AA/AI and find your paper in seconds.",
  keywords: [
    "IGCSE past paper worked solutions",
    "IGCSE mathematics 0580",
    "Cambridge IGCSE mathematics 0580",
    "IGCSE maths solutions pdf",
    "Cambridge IGCSE 0580 worked solutions",
    "IB Maths AA HL worked solutions",
    "IB Mathematics AA HL Paper 1 practice questions",
    "IB AA HL Paper 1 practice with answers",
  ],
  alternates: { canonical: `${SITE}/products` },
  openGraph: {
    type: "website",
    url: `${SITE}/products`,
    siteName: "Shopyor",
    title: "Shop Maths Past Paper Solutions & eBooks – GCSE, IGCSE, IB | Shopyor",
    description:
      "Browse worked solutions and ebooks by board, paper and year. Filter GCSE, IGCSE 0580 Core/Extended and IB AA/AI and find your paper in seconds.",
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
        name: "Maths Past Paper Solutions & eBooks",
        description:
          "Browse worked solutions and ebooks by board, paper and year. Filter GCSE, IGCSE 0580 Core/Extended and IB AA/AI and find your paper in seconds.",
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
        Find your past paper solution
      </h1>
      <p className="mt-3 max-w-2xl text-base text-gray-600 dark:text-gray-400">
        Worked solutions and maths ebooks for GCSE, IGCSE and IB. Filter by board, type and level, then pay once and download the PDF — no subscription.
      </p>

      <div className="mt-10">
        <ProductsCatalog products={products} />
      </div>
    </div>
  );
}
