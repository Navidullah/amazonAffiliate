import { PDFDocument, rgb, degrees, StandardFonts } from "pdf-lib";

const WATERMARK_TEXT = "ShopYor.com";

/**
 * Stamps a diagonal, translucent watermark on every page of a PDF buffer.
 * Returns a new Buffer — the caller must not persist the original.
 */
export async function watermarkPdf(inputBuffer) {
  const pdfDoc = await PDFDocument.load(inputBuffer);
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const pages = pdfDoc.getPages();

  for (const page of pages) {
    const { width, height } = page.getSize();
    const fontSize = Math.max(24, Math.min(width, height) / 12);
    const textWidth = font.widthOfTextAtSize(WATERMARK_TEXT, fontSize);

    page.drawText(WATERMARK_TEXT, {
      x: width / 2 - textWidth / 2,
      y: height / 2,
      size: fontSize,
      font,
      color: rgb(0.6, 0.6, 0.6),
      opacity: 0.25,
      rotate: degrees(45),
    });
  }

  const bytes = await pdfDoc.save();
  return Buffer.from(bytes);
}

export async function getPdfPageCount(inputBuffer) {
  const pdfDoc = await PDFDocument.load(inputBuffer);
  return pdfDoc.getPageCount();
}
