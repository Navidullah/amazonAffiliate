// app/product/[slug]/page.jsx
import ProductDetailsClient from "@/app/components/singleProductPage/ProductDetailsClient";
import { notFound } from "next/navigation";

async function getProduct(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/products/${slug}`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  return res.json();
}

export default async function ProductDetailsPage({ params }) {
  const product = await getProduct(params.slug);
  if (!product) return notFound();

  return (
    <div className="min-h-screen">
      {/* Pass product as prop to client component */}
      <div className=" flex justify-center items-start border-1 bg-background p-4 md:p-12">
        <ProductDetailsClient product={product} />
      </div>
    </div>
  );
}
