import { NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";

export const POST = async (req) => {
  try {
    const data = await req.formData();
    const file = data.get("file");

    if (!file || file.type !== "application/pdf") {
      return NextResponse.json({ error: "PDF file required" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);

    // Optional: Remove metadata, compress images
    pdfDoc.setProducer("Shopyor PDF Compressor");

    const compressedPdf = await pdfDoc.save({ useObjectStreams: true });
    const blob = new Blob([compressedPdf], { type: "application/pdf" });

    return new Response(blob, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="compressed_${file.name}"`,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: err.message || "Compression failed" },
      { status: 500 },
    );
  }
};
