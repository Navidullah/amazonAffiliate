// generate-pinterest-pin.js
// One-off helper: builds a dedicated 1000x1500 (2:3) Pinterest pin image for
// a product — brand header, title, a real watermarked sample of page 1 of
// the worksheet, and a footer with price/CTA. Distinct from
// generate-product-preview.js (which renders a raw full-width preview for
// the product page itself) — this is purpose-sized and composed for
// Pinterest's pin aspect ratio.
// Output: public/pinterest-pins/<slug>.png — public, safe to commit.
//   Run: node generate-pinterest-pin.js <pdf-path> <slug> "<title>" "<price>"
//   Example: node generate-pinterest-pin.js "Student worksheet.pdf" uk-ks2-maths-year-6-fractions-ws02 "Numerator & Denominator Recap" "£3"
const fs = require("fs");
const path = require("path");
const { createCanvas } = require("@napi-rs/canvas");

const PIN_W = 1000;
const PIN_H = 1500;
const INDIGO = "#4f46e5";
const NAVY = "#0f172a";

function wrapText(ctx, text, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

async function renderPdfPage1(pdfPath) {
  const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");
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

  const scale = 2.2;
  const viewport = page.getViewport({ scale });
  const canvas = createCanvas(viewport.width, viewport.height);
  const ctx = canvas.getContext("2d");
  await page.render({ canvasContext: ctx, viewport, canvasFactory: napiCanvasFactory }).promise;
  return canvas;
}

async function main() {
  const [, , pdfPath, slug, title, price] = process.argv;
  if (!pdfPath || !slug || !title || !price) {
    console.error(
      'Usage: node generate-pinterest-pin.js <pdf-path> <slug> "<title>" "<price>"',
    );
    process.exit(1);
  }

  const pagePreview = await renderPdfPage1(pdfPath);

  const canvas = createCanvas(PIN_W, PIN_H);
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "#f8fafc";
  ctx.fillRect(0, 0, PIN_W, PIN_H);

  // Header band
  const headerH = 220;
  const grad = ctx.createLinearGradient(0, 0, PIN_W, 0);
  grad.addColorStop(0, INDIGO);
  grad.addColorStop(1, "#7c3aed");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, PIN_W, headerH);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 40px sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("SHOPYOR", 48, 74);

  ctx.font = "600 24px sans-serif";
  ctx.globalAlpha = 0.9;
  ctx.fillText("KS2 · Year 6 Maths", 48, 110);
  ctx.globalAlpha = 1;

  // Title (wrapped)
  ctx.font = "bold 42px sans-serif";
  const titleLines = wrapText(ctx, title, PIN_W - 96);
  let ty = 165;
  for (const line of titleLines.slice(0, 2)) {
    ctx.fillText(line, 48, ty);
    ty += 46;
  }

  // Worksheet preview card (the "look inside" visual)
  const cardMargin = 48;
  const cardW = PIN_W - cardMargin * 2;
  const cardY = headerH + 30;
  const cardH = PIN_H - cardY - 180;

  // Shadow + white card background
  ctx.save();
  ctx.shadowColor = "rgba(15, 23, 42, 0.18)";
  ctx.shadowBlur = 30;
  ctx.shadowOffsetY = 12;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(cardMargin, cardY, cardW, cardH);
  ctx.restore();

  // Fit the rendered PDF page into the card, cropping to fill
  const scale = Math.max(cardW / pagePreview.width, cardH / pagePreview.height);
  const drawW = pagePreview.width * scale;
  const drawH = pagePreview.height * scale;
  const dx = cardMargin + (cardW - drawW) / 2;
  const dy = cardY + (cardH - drawH) / 2;

  ctx.save();
  ctx.beginPath();
  ctx.rect(cardMargin, cardY, cardW, cardH);
  ctx.clip();
  ctx.drawImage(pagePreview, dx, dy, drawW, drawH);
  ctx.restore();

  // Watermark over the preview card only
  ctx.save();
  ctx.beginPath();
  ctx.rect(cardMargin, cardY, cardW, cardH);
  ctx.clip();
  ctx.globalAlpha = 0.12;
  ctx.fillStyle = INDIGO;
  ctx.font = `bold ${Math.round(cardW / 7)}px sans-serif`;
  ctx.textAlign = "center";
  ctx.translate(cardMargin + cardW / 2, cardY + cardH / 2);
  ctx.rotate(-Math.PI / 6);
  for (let y = -cardH; y < cardH; y += cardW / 2.6) {
    ctx.fillText("PREVIEW", 0, y);
  }
  ctx.restore();

  // Card border
  ctx.strokeStyle = "rgba(15, 23, 42, 0.08)";
  ctx.lineWidth = 2;
  ctx.strokeRect(cardMargin, cardY, cardW, cardH);

  // Footer band
  const footerY = PIN_H - 150;
  ctx.fillStyle = NAVY;
  ctx.fillRect(0, footerY, PIN_W, 150);

  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "left";
  ctx.font = "bold 44px sans-serif";
  ctx.fillText(price, 48, footerY + 65);

  ctx.font = "600 24px sans-serif";
  ctx.globalAlpha = 0.85;
  ctx.fillText("Instant PDF download · Full answer key included", 48, footerY + 105);
  ctx.globalAlpha = 1;

  ctx.textAlign = "right";
  ctx.font = "600 26px sans-serif";
  ctx.fillText("shopyor.com", PIN_W - 48, footerY + 85);

  const outDir = path.join(__dirname, "public", "pinterest-pins");
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, `${slug}.png`);
  fs.writeFileSync(outPath, canvas.toBuffer("image/png"));

  console.log(`✅ Wrote ${outPath} (${PIN_W}x${PIN_H})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
