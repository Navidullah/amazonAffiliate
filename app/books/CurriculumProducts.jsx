import ProductCard from "@/app/components/store/ProductCard";

// Shows paid worked-solution/worksheet products (DigitalProduct, sold via
// /products) that match this curriculum, underneath the free-to-read books
// grid on the same page. Renders nothing when there are no matching products
// yet, so pages stay lean until a product exists for that curriculum.
export default function CurriculumProducts({ products, curriculum }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        {curriculum} worked solutions & worksheets to buy
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-gray-600 dark:text-gray-400">
        Pay once, download instantly — no account, no subscription.
      </p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
