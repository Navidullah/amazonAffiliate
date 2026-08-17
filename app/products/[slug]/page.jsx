import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Home,
  ChevronRight,
  ShieldCheck,
  Download,
  ClipboardCheck,
  CheckCircle2,
} from "lucide-react";
import { getProductBySlug, getActiveDigitalProducts } from "@/lib/actions/products";
import { getCategoryLabel, getRegionLabel } from "@/lib/constants/productCategories";
import { PRODUCT_FAQ } from "@/lib/constants/productFaq";
import ProductCard from "@/app/components/store/ProductCard";
import FaqAccordion from "@/app/components/store/FaqAccordion";
import BuyButton from "./BuyButton";

const SITE = "https://www.shopyor.com";

const TRUST_BADGES = [
  { icon: ShieldCheck, label: "Secure checkout via LemonSqueezy" },
  { icon: Download, label: "Instant PDF download" },
  { icon: ClipboardCheck, label: "Full mark scheme included" },
];

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

// The product description is written as accurate marketing copy (e.g. "35
// marks, 40 minutes", "28 questions", "full mark scheme") — split it into
// sentence-level bullets for the "What's included" list instead of inventing
// specs (page counts, etc.) we don't actually know per-product.
function buildIncludedBullets(product) {
  const sentences = product.description
    .split(/(?<=[.])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
    // Drop the boilerplate legal/attribution sentence — not a "what's included" fact.
    .filter((s) => !/not affiliated with|Standards and Testing Agency/i.test(s));

  const bullets = [...sentences];
  bullets.push("Printable PDF — download instantly after payment");
  bullets.push("Full answer and mark scheme included");
  return bullets;
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

  const included = buildIncludedBullets(product);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: product.title,
        description: product.description,
        image: product.previewImage
          ? [
              product.previewImage.startsWith("http")
                ? product.previewImage
                : `${SITE}${product.previewImage}`,
            ]
          : undefined,
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
      {
        "@type": "FAQPage",
        mainEntity: PRODUCT_FAQ.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-6 sm:px-6 md:pt-8">
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

      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left: preview + what's included */}
        <div>
          <div className="overflow-hidden rounded-3xl border border-gray-200/70 bg-white/70 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
            {product.previewImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.previewImage}
                alt={`Preview of ${product.title}`}
                className="aspect-[1200/630] w-full object-cover"
              />
            ) : (
              <div className="flex h-72 items-center justify-center text-sm text-gray-400">
                No preview available
              </div>
            )}
          </div>

          {product.previewImages?.length > 0 && (
            <div className="mt-8 overflow-hidden rounded-3xl border border-gray-200/70 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]">
              <div className="border-b border-gray-200/70 p-6 dark:border-white/10">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  See a sample page
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  A real page from this worksheet, watermarked for preview —
                  the download you receive after purchase has no watermark.
                </p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.previewImages[0]}
                alt={`Sample page from ${product.title}`}
                loading="lazy"
                className="w-full"
              />
            </div>
          )}

          <div className="mt-8 rounded-3xl border border-gray-200/70 bg-white/70 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03] sm:p-8">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              What&apos;s included
            </h2>
            <ul className="mt-4 space-y-3">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: title, price, sticky buy card */}
        <div className="lg:sticky lg:top-28 lg:self-start">
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

          <div className="mt-8 rounded-3xl border border-gray-200/70 bg-white/70 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]">
            <span className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-300">
              ${product.price}
            </span>
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">one-time</span>

            <div className="mt-5">
              <BuyButton productSlug={product.slug} price={product.price} />
            </div>

            <ul className="mt-6 space-y-2.5 border-t border-gray-200/70 pt-5 dark:border-white/10">
              {TRUST_BADGES.map((badge) => (
                <li
                  key={badge.label}
                  className="flex items-center gap-2.5 text-xs font-medium text-gray-600 dark:text-gray-400"
                >
                  <badge.icon className="h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-300" />
                  {badge.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <section className="mt-20">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Frequently asked questions
        </h2>
        <div className="mt-6">
          <FaqAccordion items={PRODUCT_FAQ} />
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            More {getRegionLabel(product.region)} worksheets
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
