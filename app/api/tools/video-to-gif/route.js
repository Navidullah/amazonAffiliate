import { NextResponse } from "next/server";
import { writeFile, unlink, readFile } from "fs/promises";
import path from "path";
import os from "os";
import ffmpeg from "fluent-ffmpeg";

export async function POST(request) {
  let inputPath = null;
  let outputPath = null;

  try {
    // Now receiving JSON with videoUrl instead of file upload
    const {
      videoUrl,
      fps = 15,
      width = 480,
      quality = "medium",
      loop = true,
    } = await request.json();

    if (!videoUrl) {
      return NextResponse.json(
        { error: "No video URL provided" },
        { status: 400 },
      );
    }

    // Download the video from the URL
    const videoResponse = await fetch(videoUrl);
    const buffer = Buffer.from(await videoResponse.arrayBuffer());

    const timestamp = Date.now();
    inputPath = path.join(os.tmpdir(), `input_${timestamp}.mp4`);
    outputPath = path.join(os.tmpdir(), `output_${timestamp}.gif`);

    await writeFile(inputPath, buffer);

    const qualitySettings = {
      low: { dither: "bayer:bayer_scale=3", colors: 128 },
      medium: { dither: "floyd_steinberg", colors: 256 },
      high: { dither: "sierra2_4a", colors: 256 },
    };

    const selectedQuality = qualitySettings[quality] || qualitySettings.medium;

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

    const outputBuffer = await readFile(outputPath);

    await unlink(inputPath).catch(() => {});
    await unlink(outputPath).catch(() => {});

    return new NextResponse(outputBuffer, {
      headers: {
        "Content-Type": "image/gif",
        "Content-Disposition": `attachment; filename="converted_${timestamp}.gif"`,
      },
    });
  } catch (error) {
    console.error("Conversion error:", error);

    if (inputPath) await unlink(inputPath).catch(() => {});
    if (outputPath) await unlink(outputPath).catch(() => {});

    return NextResponse.json(
      { error: "Failed to convert video to GIF. Please try again." },
      { status: 500 },
    );
  }
}
