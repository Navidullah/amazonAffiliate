// generate-product-preview.js
// One-off helper: renders page 1 of a product's student-worksheet PDF to a
// watermarked PNG so buyers can see real content before paying, without
// exposing the full (paid-gated) file. Output goes to
// public/product-previews/<slug>.png — public, safe to commit, NOT the
// private Blob download.
//   Run: node generate-product-preview.js <pdf-path> <slug>
const fs = require("fs");
const path = require("path");
const { createCanvas } = require("@napi-rs/canvas");

async function main() {
  const [, , pdfPath, slug] = process.argv;
  if (!pdfPath || !slug) {
    console.error("Usage: node generate-product-preview.js <pdf-path> <slug>");
    process.exit(1);
  }

  const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");

  // pdfjs-dist's built-in NodeCanvasFactory hardcodes require("canvas")
  // (node-canvas, native/build-tools required) — swap in @napi-rs/canvas
  // (prebuilt binaries, no build step) via a minimal compatible factory.
  const napiCanvasFactory = {
    create(width, height) {
      const canvas = createCanvas(width, height);
      return { canvas, context: canvas.getContext("2d") };
    },
    reset(canvasAndContext, width, height) {
      canvasAndContext.canvas.width = width;
      canvasAndContext.canvas.height = height;
    },
    destroy(canvasAndContext) {
      canvasAndContext.canvas.width = 0;
      canvasAndContext.canvas.height = 0;
      canvasAndContext.canvas = null;
      canvasAndContext.context = null;
    },
  };

  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({
    data,
    disableFontFace: true,
    canvasFactory: napiCanvasFactory,
    // Without this, PDFs that don't embed their fonts fall back to a
    // standard font pdfjs can't resolve, silently dropping every glyph
    // (shapes/lines still render, but all text is invisible).
    standardFontDataUrl: path.join(
      __dirname,
      "node_modules/pdfjs-dist/standard_fonts/",
    ) + path.sep,
  }).promise;
  const page = await doc.getPage(1);

  const scale = 2; // ~144 DPI for crisp preview
  const viewport = page.getViewport({ scale });
  const canvas = createCanvas(viewport.width, viewport.height);
  const ctx = canvas.getContext("2d");

  await page.render({ canvasContext: ctx, viewport, canvasFactory: napiCanvasFactory }).promise;

  // Diagonal repeating "PREVIEW" watermark so the page is unmistakably a
  // sample, not a usable printable copy.
  ctx.save();
  ctx.globalAlpha = 0.14;
  ctx.fillStyle = "#4f46e5";
  ctx.font = `bold ${Math.round(viewport.width / 9)}px sans-serif`;
  ctx.textAlign = "center";
  ctx.translate(viewport.width / 2, viewport.height / 2);
  ctx.rotate(-Math.PI / 6);
  for (let y = -viewport.height; y < viewport.height; y += viewport.width / 3.2) {
    ctx.fillText("PREVIEW", 0, y);
  }
  ctx.restore();

  const outDir = path.join(__dirname, "public", "product-previews");
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, `${slug}.png`);
  fs.writeFileSync(outPath, canvas.toBuffer("image/png"));

  console.log(`✅ Wrote ${outPath} (${viewport.width}x${viewport.height})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
