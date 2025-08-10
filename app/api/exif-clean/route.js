// app/api/exif-clean/route.js
import sharp from "sharp";

export const runtime = "nodejs"; // required for Sharp

export async function POST(req) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), {
        status: 400,
      });
    }

    const inputBuf = Buffer.from(await file.arrayBuffer());

    const meta = await sharp(inputBuf, { failOnError: false }).metadata();
    const base = sharp(inputBuf, { failOnError: false }).rotate(); // apply EXIF orientation & drop EXIF

    let out,
      contentType = "image/jpeg",
      downloadName = "cleaned.jpg";

    switch (meta.format) {
      case "jpeg":
      case "jpg":
        out = await base.jpeg({ quality: 95 }).toBuffer();
        contentType = "image/jpeg";
        downloadName = "cleaned.jpg";
        break;
      case "png":
        out = await base.png().toBuffer();
        contentType = "image/png";
        downloadName = "cleaned.png";
        break;
      case "webp":
        out = await base.webp({ quality: 95 }).toBuffer();
        contentType = "image/webp";
        downloadName = "cleaned.webp";
        break;
      case "avif":
        out = await base.avif({ quality: 50 }).toBuffer();
        contentType = "image/avif";
        downloadName = "cleaned.avif";
        break;
      default:
        out = await base.jpeg({ quality: 95 }).toBuffer();
        contentType = "image/jpeg";
        downloadName = "cleaned.jpg";
    }

    return new Response(out, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${downloadName}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to process image" }), {
      status: 500,
    });
  }
}
