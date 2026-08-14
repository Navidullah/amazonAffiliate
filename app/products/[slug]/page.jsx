import Link from "next/link";
import { notFound } from "next/navigation";
import { Home, ChevronRight } from "lucide-react";
import { getProductBySlug, getActiveDigitalProducts } from "@/lib/actions/products";
import { getCategoryLabel, getRegionLabel } from "@/lib/constants/productCategories";
import BuyButton from "./BuyButton";

const SITE = "https://www.shopyor.com";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  const title = `${product.title} | Shopyor`;
  return {
    metadataBase: new URL(SITE),
    title: { absolute: title },
    description: product.description,
    alternates: { canonical: `${SITE}/products/${slug}` },
    openGraph: {
      type: "article",
      url: `${SITE}/products/${slug}`,
      siteName: "Shopyor",
      title,
      description: product.description,
      images: product.previewImage ? [{ url: product.previewImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: product.description,
      images: product.previewImage ? [product.previewImage] : undefined,
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const [product, allProducts] = await Promise.all([
    getProductBySlug(slug),
    getActiveDigitalProducts(),
  ]);

  if (!product) notFound();

  const related = allProducts
    .filter((p) => p.slug !== slug && p.region === product.region)
    .slice(0, 3);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: product.title,
        description: product.description,
        image: product.previewImage ? [product.previewImage] : undefined,
        offers: {
          "@type": "Offer",
          url: `${SITE}/products/${slug}`,
          price: String(product.price),
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Products", item: `${SITE}/products` },
          {
            "@type": "ListItem",
            position: 3,
            name: product.title,
            item: `${SITE}/products/${slug}`,
          },
        ],
      },
    ],
  };

  return (
    <main className="mx-auto max-w-4xl px-4 pb-24 pt-28 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <nav className="mb-8 flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
        <Link href="/" className="inline-flex items-center gap-1 hover:text-indigo-600">
          <Home className="h-3.5 w-3.5" /> Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/products" className="hover:text-indigo-600">
          Products
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-gray-700 dark:text-gray-300">{product.title}</span>
      </nav>

      <div className="grid gap-10 sm:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border border-gray-200/70 bg-white/70 dark:border-white/10 dark:bg-white/[0.03]">
          {product.previewImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.previewImage}
              alt={`Preview of ${product.title}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-72 items-center justify-center text-sm text-gray-400">
              No preview available
            </div>
          )}
        </div>

        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200/70 bg-white/70 px-3 py-1 text-xs font-semibold text-indigo-700 dark:border-indigo-500/20 dark:bg-white/[0.04] dark:text-indigo-300">
            {getRegionLabel(product.region)} · {getCategoryLabel(product.category)} ·{" "}
            {product.gradeLevel}
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {product.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-400">
            {product.description}
          </p>
          <div className="mt-8">
            <BuyButton productSlug={product.slug} price={product.price} />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            More {getRegionLabel(product.region)} worksheets
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="rounded-2xl border border-gray-200/70 bg-white/70 p-4 transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03]"
              >
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  {p.title}
                </h3>
                <p className="mt-1 text-sm font-bold text-indigo-600 dark:text-indigo-300">
                  ${p.price}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
