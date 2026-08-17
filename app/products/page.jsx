import { getActiveDigitalProducts } from "@/lib/actions/products";
import ProductsCatalog from "./ProductsCatalog";

const SITE = "https://www.shopyor.com";

export const metadata = {
  metadataBase: new URL(SITE),
  title: { absolute: "Printable Year 6 Maths Worksheets (KS2) | Shopyor" },
  description:
    "Browse printable Year 6 Maths worksheets (KS2) with a full answer key on every pack. Pay once, download instantly.",
  alternates: { canonical: `${SITE}/products` },
  openGraph: {
    type: "website",
    url: `${SITE}/products`,
    siteName: "Shopyor",
    title: "Printable Year 6 Maths Worksheets (KS2) | Shopyor",
    description:
      "Printable Year 6 Maths worksheets (KS2) with a full answer key on every pack. Pay once, download instantly.",
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
        name: "Printable Year 6 Maths Worksheets (KS2)",
        description:
          "Printable Year 6 Maths worksheets (KS2) with a full answer key on every pack.",
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
        Printable Year 6 Maths Worksheets (KS2)
      </h1>
      <p className="mt-3 max-w-2xl text-base text-gray-600 dark:text-gray-400">
        Printable PDF worksheets for KS2 Year 6 Maths, each with a full
        answer key. Pay once, download instantly — no subscription.
      </p>

      <div className="mt-10">
        <ProductsCatalog products={products} />
      </div>
    </div>
  );
}
