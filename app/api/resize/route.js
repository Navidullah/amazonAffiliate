import { NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const file = formData.get("image");
    const width = parseInt(formData.get("width"));
    const height = parseInt(formData.get("height"));
    const quality = parseInt(formData.get("quality")) || 90;
    const format = formData.get("format") || "jpeg";

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let image = sharp(buffer).resize({
      width: width || null,
      height: height || null,
      fit: "inside",
      withoutEnlargement: true,
    });

    if (format === "jpeg") {
      image = image.jpeg({ quality });
    }

    if (format === "png") {
      image = image.png({ quality });
    }

    if (format === "webp") {
      image = image.webp({ quality });
    }

    const resizedImage = await image.toBuffer();

    return new NextResponse(resizedImage, {
      headers: {
        "Content-Type": `image/${format}`,
        "Content-Disposition": `attachment; filename="resized.${format}"`,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Image processing failed" },
      { status: 500 },
    );
  }
}
