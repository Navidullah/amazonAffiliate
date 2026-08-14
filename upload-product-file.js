// upload-product-file.js
// One-off helper: uploads a local file (e.g. a zipped worksheet pack) to a
// private Vercel Blob store and prints the resulting URL, ready to paste
// into seed-digital-products.js's `downloadUrl` field. The URL is not
// publicly fetchable — only the paid-gated download route can read it.
//   Run: node upload-product-file.js content/products/<file> <blob-path>
//   Example: node upload-product-file.js content/products/uk-ks2-maths-year-6-revision-pack.zip products/uk-ks2-maths-year-6-revision-pack.zip
require("dotenv").config({ path: ".env.local" });
const fs = require("fs");
const { put } = require("@vercel/blob");

async function main() {
  const [, , localPath, blobPath] = process.argv;
  if (!localPath || !blobPath) {
    console.error("Usage: node upload-product-file.js <local-file-path> <blob-path>");
    process.exit(1);
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error("❌ BLOB_READ_WRITE_TOKEN is not set in .env.local");
    process.exit(1);
  }

  const buffer = fs.readFileSync(localPath);
  const blob = await put(blobPath, buffer, {
    access: "private",
    addRandomSuffix: true,
  });

  console.log(`✅ Uploaded. downloadUrl:\n${blob.url}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
