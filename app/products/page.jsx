import { getActiveDigitalProducts } from "@/lib/actions/products";
import ProductsCatalog from "./ProductsCatalog";

const SITE = "https://www.shopyor.com";

export const metadata = {
  metadataBase: new URL(SITE),
  title: { absolute: "IGCSE Past Paper & IB Maths Worked Solutions | Shopyor" },
  description:
    "Browse every Cambridge IGCSE worked past-paper solution pack, IB Mathematics AA HL Paper 1-style practice pack, and printable KS2 Year 6 Maths worksheet — each with a full mark scheme or answer key. Pay once, download instantly, no subscription.",
  keywords: [
    "IGCSE past paper worked solutions",
    "IGCSE mathematics 0580",
    "Cambridge IGCSE mathematics 0580",
    "IGCSE maths solutions pdf",
    "Cambridge IGCSE 0580 worked solutions",
    "IB Maths AA HL worked solutions",
    "IB Mathematics AA HL Paper 1 practice questions",
    "IB AA HL Paper 1 practice with answers",
    "year 6 maths worksheets pdf",
    "printable maths worksheets year 6",
    "KS2 maths worksheets",
  ],
  alternates: { canonical: `${SITE}/products` },
  openGraph: {
    type: "website",
    url: `${SITE}/products`,
    siteName: "Shopyor",
    title: "IGCSE Past Paper & IB Maths Worked Solutions | Shopyor",
    description:
      "Browse every Cambridge IGCSE worked past-paper solution pack, IB Mathematics AA HL Paper 1-style practice pack, and printable KS2 Year 6 Maths worksheet — each with a full mark scheme or answer key. Pay once, download instantly, no subscription.",
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
        name: "IGCSE Past Paper & IB Maths Worked Solutions",
        description:
          "Browse every Cambridge IGCSE worked past-paper solution pack, IB Mathematics AA HL Paper 1-style practice pack, and printable KS2 Year 6 Maths worksheet — each with a full mark scheme or answer key.",
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
        IGCSE Past Paper & IB Maths Worked Solutions
      </h1>
      <p className="mt-3 max-w-2xl text-base text-gray-600 dark:text-gray-400">
        Browse every Cambridge IGCSE worked past-paper solution pack, IB
        Mathematics AA HL Paper 1-style practice pack, and printable KS2
        Year 6 Maths worksheet, each with a full mark scheme or answer key.
        Pay once, download instantly — no subscription, anywhere in the
        world.
      </p>

      <div className="mt-10">
        <ProductsCatalog products={products} />
      </div>
    </div>
  );
}
