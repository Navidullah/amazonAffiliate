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
    title: "Year 6 Maths SATs Revision Pack (KS2)",
    description:
      "Two full printable Year 6 Maths SATs practice papers — Arithmetic and Reasoning — formatted like the real assessment, with a formula & facts sheet and a full mark scheme included. Pay once, download instantly. Original content, not affiliated with or derived from the Standards and Testing Agency.",
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
    // TEST-MODE variant (created before LemonSqueezy business verification
    // completed) — the live-mode API key 404s on it. Hidden from the
    // storefront until this product is recreated as a live-mode variant.
    active: false,
  },
  {
    slug: "uk-ks2-maths-year-6-paper-3-reasoning",
    title: "Year 6 Maths SATs Paper 3: Reasoning (KS2)",
    description:
      "A third full printable Year 6 Maths SATs Reasoning practice paper — 35 marks, 40 minutes, formatted like the real assessment with working space and a mark scheme. A companion paper to the Revision Pack, for extra KS2 SATs practice. Original content, not affiliated with or derived from the Standards and Testing Agency.",
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
    // TEST-MODE variant — see note on the revision pack above.
    active: false,
  },
  {
    slug: "uk-ks2-maths-year-6-fractions-decimals-percentages",
    title: "Year 6 Maths Worksheets: Fractions, Decimals & Percentages",
    description:
      "A focused 28-question printable Year 6 Maths worksheet pack on converting and calculating with fractions, decimals, and percentages — with working space and a mark scheme. KS2 SATs practice. Original content, not affiliated with or derived from the Standards and Testing Agency.",
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
    // TEST-MODE variant — see note on the revision pack above.
    active: false,
  },
  {
    slug: "uk-ks2-maths-year-6-ratio-proportion-algebra",
    title: "Year 6 Maths Worksheets: Ratio, Proportion & Algebra",
    description:
      "A focused 28-question printable Year 6 Maths worksheet pack on ratio, proportion, and algebra — with working space and a mark scheme. KS2 SATs practice. Original content, not affiliated with or derived from the Standards and Testing Agency.",
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
    // TEST-MODE variant — see note on the revision pack above.
    active: false,
  },
  {
    slug: "uk-ks2-maths-year-6-fractions-ws01",
    title: "Year 6 Maths Worksheet: Understanding Fractions (WS01)",
    description:
      "A focused 12-question Year 6 Maths worksheet on understanding fractions as parts of a whole and parts of a set, with worked examples and working space. Includes the full student worksheet plus a separate answer key with model answers and marking guidance for every question. KS2 practice. Original content, not affiliated with or derived from the Standards and Testing Agency.",
    previewImage: "/api/product-image/uk-ks2-maths-year-6-fractions-ws01",
    price: 3,
    region: "uk",
    category: "ks2-maths",
    gradeLevel: "Year 6",
    subject: "maths",
    variantId: "2028384",
    downloadUrl:
      "https://ghgbr44ykzavh7lt.private.blob.vercel-storage.com/products/uk-ks2-maths-year-6-fractions-ws01-N8pFctvy0V5MB7Fo2q0x4K31Lj7nyZ.zip",
    href: "/products/uk-ks2-maths-year-6-fractions-ws01",
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
