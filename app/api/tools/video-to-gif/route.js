// app/api/tools/video-to-gif/route.js
import { NextResponse } from "next/server";
import { writeFile, unlink, readFile } from "fs/promises";
import path from "path";
import os from "os";
import ffmpeg from "fluent-ffmpeg";

// Note: Make sure ffmpeg is installed on your server
// For Ubuntu/Debian: sudo apt-get install ffmpeg
// For macOS: brew install ffmpeg

export async function POST(request) {
  let inputPath = null;
  let outputPath = null;

  try {
    const formData = await request.formData();
    const videoFile = formData.get("video");
    const fps = parseInt(formData.get("fps") || "15");
    const width = parseInt(formData.get("width") || "480");
    const quality = formData.get("quality") || "medium";
    const loop = formData.get("loop") === "true";

    if (!videoFile) {
      return NextResponse.json(
        { error: "No video file provided" },
        { status: 400 },
      );
    }

    // Convert File to Buffer
    const bytes = await videoFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create temp files
    const timestamp = Date.now();
    const safeName = videoFile.name.replace(/[^a-zA-Z0-9.]/g, "_");
    inputPath = path.join(os.tmpdir(), `input_${timestamp}_${safeName}`);
    outputPath = path.join(os.tmpdir(), `output_${timestamp}.gif`);

    await writeFile(inputPath, buffer);

    // Quality settings
    const qualitySettings = {
      low: { dither: "bayer:bayer_scale=3", colors: 128 },
      medium: { dither: "floyd_steinberg", colors: 256 },
      high: { dither: "sierra2_4a", colors: 256 },
    };

    const selectedQuality = qualitySettings[quality] || qualitySettings.medium;

    // Convert video to GIF using ffmpeg
    await new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .outputOptions([
          `-vf`,
          `fps=${fps},scale=${width}:-1:flags=lanczos,split[s0][s1];[s0]palettegen=${selectedQuality.colors}:stats_mode=diff[p];[s1][p]paletteuse=dither=${selectedQuality.dither}`,
          "-loop",
          loop ? "0" : "-1",
        ])
        .output(outputPath)
        .on("end", resolve)
        .on("error", reject)
        .run();
    });

    // Read the output GIF
    const outputBuffer = await readFile(outputPath);

    // Clean up temp files
    await unlink(inputPath).catch(() => {});
    await unlink(outputPath).catch(() => {});

    return new NextResponse(outputBuffer, {
      headers: {
        "Content-Type": "image/gif",
        "Content-Disposition": `attachment; filename="converted_${timestamp}.gif"`,
        "Cache-Control": "public, max-age=31536000",
      },
    });
  } catch (error) {
    console.error("Conversion error:", error);

    // Clean up on error
    if (inputPath) {
      await unlink(inputPath).catch(() => {});
    }
    if (outputPath) {
      await unlink(outputPath).catch(() => {});
    }

    return NextResponse.json(
      { error: "Failed to convert video to GIF. Please try again." },
      { status: 500 },
    );
  }
}

// Configure body parser to handle large files
export const config = {
  api: {
    bodyParser: false,
  },
};
