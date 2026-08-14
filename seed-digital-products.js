// seed-digital-products.js
// One-off script to seed the DigitalProduct collection for the storefront homepage.
// Idempotent: re-running upserts by slug.
//   Run: node seed-digital-products.js
require("dotenv").config({ path: ".env.local" });
const { MongoClient } = require("mongodb");

const uri = process.env.DATABASE_URL;
if (!uri) {
  console.error("❌ DATABASE_URL is not set in .env.local");
  process.exit(1);
}

// One entry per worksheet product; add as many as needed.
//
// downloadUrl: get this by running
//   node upload-product-file.js content/products/<file> products/<file>
// once BLOB_READ_WRITE_TOKEN is set in .env.local.
//
// variantId: create a product/variant for this pack in the LemonSqueezy
// dashboard once LEMONSQUEEZY_API_KEY/STORE_ID are set, then paste its
// variant ID here.
//
// A product only appears on the storefront when `active: true` AND both
// of the above are filled in for real — leave `active: false` until then.
const PRODUCTS = [
  {
    slug: "uk-ks2-maths-year-6-revision-pack",
    title: "KS2 Year 6 Maths Revision Pack (Paper 1 & Paper 2)",
    description:
      "Two full printable practice papers for KS2 Year 6 Maths revision — Paper 1 (Arithmetic) and Paper 2 (Reasoning) — formatted like the real assessment, with a formula & facts sheet and a full mark scheme included. Original content, not affiliated with or derived from the Standards and Testing Agency.",
    previewImage: "/api/product-image/uk-ks2-maths-year-6-revision-pack",
    price: 3,
    region: "uk",
    category: "ks2-maths",
    gradeLevel: "Year 6",
    subject: "maths",
    variantId: "2018417",
    downloadUrl:
      "https://ghgbr44ykzavh7lt.private.blob.vercel-storage.com/products/uk-ks2-maths-year-6-revision-pack-luSacs1YI9iqIXqmvx3OltQ1UCBvXy.zip",
    href: "/products/uk-ks2-maths-year-6-revision-pack",
    active: true,
  },
  {
    slug: "uk-ks2-maths-year-6-paper-3-reasoning",
    title: "KS2 Year 6 Maths Paper 3 (Reasoning)",
    description:
      "A third full printable Year 6 Maths reasoning practice paper — 35 marks, 40 minutes, formatted like the real assessment with working space and a mark scheme. A companion paper to the main Revision Pack, for extra practice. Original content, not affiliated with or derived from the Standards and Testing Agency.",
    previewImage: "/api/product-image/uk-ks2-maths-year-6-paper-3-reasoning",
    price: 2,
    region: "uk",
    category: "ks2-maths",
    gradeLevel: "Year 6",
    subject: "maths",
    variantId: "2018683",
    downloadUrl:
      "https://ghgbr44ykzavh7lt.private.blob.vercel-storage.com/products/uk-ks2-maths-year-6-paper-3-reasoning-5vFs8eqCtLRDRk4zezxI3ObMHCe0IB.pdf",
    href: "/products/uk-ks2-maths-year-6-paper-3-reasoning",
    active: true,
  },
  {
    slug: "uk-ks2-maths-year-6-fractions-decimals-percentages",
    title: "KS2 Year 6 Maths Topic Pack: Fractions, Decimals & Percentages",
    description:
      "A focused 28-question printable practice pack on converting and calculating with fractions, decimals, and percentages for Year 6 Maths — with working space and a mark scheme. Original content, not affiliated with or derived from the Standards and Testing Agency.",
    previewImage:
      "/api/product-image/uk-ks2-maths-year-6-fractions-decimals-percentages",
    price: 2,
    region: "uk",
    category: "ks2-maths",
    gradeLevel: "Year 6",
    subject: "maths",
    variantId: "2018689",
    downloadUrl:
      "https://ghgbr44ykzavh7lt.private.blob.vercel-storage.com/products/uk-ks2-maths-year-6-fractions-decimals-percentages-UhDboJ3gO0zdslslb6aSFnesGcO977.pdf",
    href: "/products/uk-ks2-maths-year-6-fractions-decimals-percentages",
    active: true,
  },
  {
    slug: "uk-ks2-maths-year-6-ratio-proportion-algebra",
    title: "KS2 Year 6 Maths Topic Pack: Ratio, Proportion & Algebra",
    description:
      "A focused 28-question printable practice pack on ratio, proportion, and algebra for Year 6 Maths — with working space and a mark scheme. Original content, not affiliated with or derived from the Standards and Testing Agency.",
    previewImage: "/api/product-image/uk-ks2-maths-year-6-ratio-proportion-algebra",
    price: 2,
    region: "uk",
    category: "ks2-maths",
    gradeLevel: "Year 6",
    subject: "maths",
    variantId: "2018690",
    downloadUrl:
      "https://ghgbr44ykzavh7lt.private.blob.vercel-storage.com/products/uk-ks2-maths-year-6-ratio-proportion-algebra-mTFHjmPhMw5VPDbnCp5pAOIHrago3M.pdf",
    href: "/products/uk-ks2-maths-year-6-ratio-proportion-algebra",
    active: true,
  },
];

async function main() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db("app");
  const col = db.collection("digitalproducts");

  for (const p of PRODUCTS) {
    const { slug, ...rest } = p;
    await col.updateOne(
      { slug },
      { $set: { slug, ...rest, updatedAt: new Date() }, $setOnInsert: { createdAt: new Date() } },
      { upsert: true },
    );
    console.log(`✅ Upserted digital product: ${slug}`);
  }

  await client.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
