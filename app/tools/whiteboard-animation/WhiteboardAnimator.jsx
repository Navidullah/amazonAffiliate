"use client";

/**
 * Whiteboard / Speed-Paint Animator
 * ---------------------------------
 * Turns any uploaded PNG/JPG into a "being hand-drawn on a whiteboard" animation
 * (like Canva's Draw / Speed Paint effect) and exports it as MP4 video or GIF.
 *
 * Technique (works for any raster image, 100% in-browser):
 *  - The image is split into a grid of tiles.
 *  - Tiles are revealed in a serpentine (left→right, then right→left) scan,
 *    progressively uncovering the picture with a cumulative mask.
 *  - A cartoon hand holding a marker/pencil follows the leading "draw head".
 *  - For transparent / line-art images we only trace the actual marks; for
 *    photos we reveal the whole image.
 *
 * Export (both deterministic, frame-by-frame via ffmpeg.wasm):
 *  - MP4 → libx264 / yuv420p, plays everywhere.
 *  - GIF → palettegen/paletteuse for clean colors.
 *  Core is self-hosted at /public/ffmpeg/ (works under this page's COEP header).
 */

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

const TIP = { x: 16, y: 16 }; // pen-tip coordinate inside the hand SVG (viewBox 240×320)
const MAX_SIDE = 1280; // cap render resolution for performance / file size

/* ----------------------------- hand artwork ----------------------------- */
function handSVG(style) {
  const isPencil = style === "pencil";
  const barrel = isPencil ? "#f4b400" : "#2f2f33";
  const band = isPencil ? "#e08e0b" : "#3b82f6";
  const nib = isPencil ? "#4b4b4b" : "#111114";
  const tipCone = isPencil
    ? `<line x1="16" y1="16" x2="40" y2="40" stroke="#e8c79a" stroke-width="30" stroke-linecap="butt"/>`
    : "";

  return `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 320">
  <g stroke-linecap="round">
    <line x1="16" y1="16" x2="150" y2="150" stroke="${barrel}" stroke-width="34"/>
  </g>
  ${tipCone}
  <circle cx="16" cy="16" r="8" fill="${nib}"/>
  <line x1="64" y1="64" x2="86" y2="86" stroke="${band}" stroke-width="36" stroke-linecap="butt"/>
  <line x1="120" y1="120" x2="138" y2="138" stroke="#d4d4d4" stroke-width="36" stroke-linecap="butt"/>
  <g fill="#f0c29a" stroke="#d39e74" stroke-width="2" stroke-linejoin="round">
    <path d="M148 116
             C 202 112 238 150 238 204
             C 238 276 206 316 150 316
             C 118 316 104 298 108 266
             C 111 244 122 236 122 212
             C 122 168 120 134 148 116 Z"/>
    <path d="M150 146
             C 128 158 118 182 128 208
             C 136 228 156 226 166 210
             C 178 190 180 160 168 146 Z" fill="#f5cba8"/>
  </g>
  <g fill="none" stroke="#d39e74" stroke-width="2" stroke-linecap="round" opacity="0.7">
    <path d="M210 196 C 222 210 224 232 214 250"/>
    <path d="M196 178 C 210 196 212 222 200 244"/>
    <path d="M180 168 C 196 188 198 218 184 244"/>
  </g>
</svg>`)}`;
}

/* --------------------------- scene construction -------------------------- */
function buildScene(img, detail, mode) {
  let W = img.naturalWidth || img.width;
  let H = img.naturalHeight || img.height;
  const scale = Math.min(1, MAX_SIDE / Math.max(W, H));
  W = Math.max(1, Math.round(W * scale));
  H = Math.max(1, Math.round(H * scale));

  const tile = Math.max(4, Math.round(W / detail));
  const gx = Math.ceil(W / tile);
  const gy = Math.ceil(H / tile);

  // Downscale-sample the image to one pixel per tile to decide what's "content".
  const sc = document.createElement("canvas");
  sc.width = gx;
  sc.height = gy;
  const sctx = sc.getContext("2d", { willReadFrequently: true });
  sctx.drawImage(img, 0, 0, gx, gy);
  const data = sctx.getImageData(0, 0, gx, gy).data;

  let hasAlpha = false;
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] < 250) {
      hasAlpha = true;
      break;
    }
  }
  let eff = mode;
  if (mode === "auto") eff = hasAlpha ? "trace" : "whole";

  const tiles = [];
  const order = [];
  for (let ry = 0; ry < gy; ry++) {
    const row = [];
    for (let rx = 0; rx < gx; rx++) {
      const idx = (ry * gx + rx) * 4;
      const a = data[idx + 3];
      const lum = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
      const active = eff === "whole" ? a > 15 : a > 15 && lum < 238;
      tiles.push({ x: rx * tile, y: ry * tile, w: tile, h: tile, cx: rx * tile + tile / 2, active });
      row.push(tiles.length - 1);
    }
    if (ry % 2 === 1) row.reverse(); // serpentine
    for (const ti of row) if (tiles[ti].active) order.push(ti);
  }
  // Nothing detected (e.g. fully blank) → fall back to revealing everything.
  if (order.length === 0) {
    for (let ry = 0; ry < gy; ry++) {
      const row = [];
      for (let rx = 0; rx < gx; rx++) row.push(ry * gx + rx);
      if (ry % 2 === 1) row.reverse();
      order.push(...row);
    }
  }
  return { W, H, tiles, order };
}

/* --------------------------- output framing ----------------------------- */
// Letterbox the native-size content (scene.W×scene.H) inside a canvas whose
// shape matches the chosen aspect ratio. We never upscale the image — we just
// pad with the background colour to reach the target aspect, so 9:16 / 16:9 /
// 1:1 exports drop straight into Reels, TikTok, YouTube, slides, etc.
const ASPECTS = {
  original: null,
  "16:9": 16 / 9,
  "9:16": 9 / 16,
  "1:1": 1,
  "4:5": 4 / 5,
};
function computeFrame(scene, aspect) {
  const { W, H } = scene;
  const target = ASPECTS[aspect];
  if (!target) return { fw: W, fh: H, dx: 0, dy: 0 };
  const contentAR = W / H;
  let fw, fh;
  if (target >= contentAR) {
    fh = H;
    fw = Math.round(H * target); // pad left/right
  } else {
    fw = W;
    fh = Math.round(W / target); // pad top/bottom
  }
  return { fw, fh, dx: Math.round((fw - W) / 2), dy: Math.round((fh - H) / 2) };
}

/* ============================ main component ============================ */
export default function WhiteboardAnimator() {
  const [imgUrl, setImgUrl] = useState(null);
  const [fileName, setFileName] = useState("");
  const [ready, setReady] = useState(false);

  const [duration, setDuration] = useState(6);
  const [holdEnd, setHoldEnd] = useState(1.5);
  const [detail, setDetail] = useState(45);
  const [bg, setBg] = useState("#ffffff");
  const [mode, setMode] = useState("auto");
  const [aspect, setAspect] = useState("original");
  const [handOn, setHandOn] = useState(true);
  const [handStyle, setHandStyle] = useState("marker");

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(1);

  const [exporting, setExporting] = useState(false);
  const [exportLabel, setExportLabel] = useState("");
  const [exportPct, setExportPct] = useState(0);
  const [output, setOutput] = useState(null); // { url, type, name }
  const [error, setError] = useState("");

  // refs (animation-critical, avoid stale closures)
  const canvasRef = useRef(null);
  const maskRef = useRef(null);
  const contentRef = useRef(null);
  const fileRef = useRef(null);

  const imgRef = useRef(null);
  const sceneRef = useRef(null);
  const handImgs = useRef({});
  const ffmpegRef = useRef(null);
  const rafRef = useRef(0);
  const playingRef = useRef(false);
  const progressRef = useRef(1);

  const bgRef = useRef(bg);
  const handOnRef = useRef(handOn);
  const handStyleRef = useRef(handStyle);
  const aspectRef = useRef(aspect);
  useEffect(() => void (bgRef.current = bg), [bg]);
  useEffect(() => void (handOnRef.current = handOn), [handOn]);
  useEffect(() => void (handStyleRef.current = handStyle), [handStyle]);
  useEffect(() => void (aspectRef.current = aspect), [aspect]);

  /* preload hand artwork once */
  useEffect(() => {
    ["marker", "pencil"].forEach((s) => {
      const im = new Image();
      im.src = handSVG(s);
      handImgs.current[s] = im;
    });
  }, []);

  /* ----------------------------- rendering ---------------------------- */
  const drawHand = useCallback((ctx, x, y, H) => {
    const im = handImgs.current[handStyleRef.current];
    if (!im || !im.complete || !im.naturalWidth) return;
    const hh = Math.min(420, Math.max(110, H * 0.34));
    const s = hh / 320; // svg is 320 tall
    const hw = 240 * s;
    const wobble = Math.sin(x * 0.05 + y * 0.05) * 1.5;
    ctx.drawImage(im, x - TIP.x * s + wobble, y - TIP.y * s, hw, hh);
  }, []);

  const renderFrame = useCallback(
    (p) => {
      const scene = sceneRef.current;
      const img = imgRef.current;
      const canvas = canvasRef.current;
      if (!scene || !img || !canvas) return;
      const { W, H, tiles, order } = scene;

      // 1. build cumulative mask up to p
      const mctx = maskRef.current.getContext("2d");
      mctx.clearRect(0, 0, W, H);
      mctx.fillStyle = "#fff";
      const dc = p * order.length;
      const full = Math.floor(dc);
      let head = null;
      let headY = 0;
      for (let i = 0; i < full && i < order.length; i++) {
        const t = tiles[order[i]];
        mctx.fillRect(t.x - 1, t.y - 1, t.w + 2, t.h + 2);
      }
      if (full < order.length) {
        const t = tiles[order[full]];
        const frac = dc - full;
        mctx.fillRect(t.x - 1, t.y - 1, t.w + 2, Math.max(1, (t.h + 2) * frac));
        head = t;
        headY = t.y + t.h * frac;
      } else if (order.length) {
        const t = tiles[order[order.length - 1]];
        head = t;
        headY = t.y + t.h;
      }

      // 2. content = image clipped to the revealed mask
      const cctx = contentRef.current.getContext("2d");
      cctx.globalCompositeOperation = "source-over";
      cctx.clearRect(0, 0, W, H);
      cctx.drawImage(maskRef.current, 0, 0);
      cctx.globalCompositeOperation = "source-in";
      cctx.drawImage(img, 0, 0, W, H);
      cctx.globalCompositeOperation = "source-over";

      // 3. compose onto the visible (framed) canvas, padding to the chosen aspect
      const { fw, fh, dx, dy } = computeFrame(scene, aspectRef.current);
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = bgRef.current;
      ctx.fillRect(0, 0, fw, fh);
      ctx.drawImage(contentRef.current, dx, dy);

      // 4. the drawing hand (offset into the padded frame)
      if (handOnRef.current && p < 1 && head) {
        drawHand(ctx, head.cx + dx, headY + dy, H);
      }
    },
    [drawHand],
  );

  /* ------------------------- (re)build the scene ---------------------- */
  const rebuild = useCallback(
    (resetProgress) => {
      const img = imgRef.current;
      if (!img) return;
      const scene = buildScene(img, detail, mode);
      sceneRef.current = scene;
      // working canvases stay at native image size; the visible canvas takes
      // the framed (aspect-padded) size.
      [maskRef, contentRef].forEach((r) => {
        r.current.width = scene.W;
        r.current.height = scene.H;
      });
      const { fw, fh } = computeFrame(scene, aspectRef.current);
      canvasRef.current.width = fw;
      canvasRef.current.height = fh;
      const p = resetProgress ? 1 : progressRef.current;
      progressRef.current = p;
      setProgress(p);
      renderFrame(p);
    },
    [detail, mode, renderFrame],
  );

  useEffect(() => {
    if (ready) rebuild(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detail, mode, aspect, bg, handStyle, handOn]);

  /* ------------------------------ upload ------------------------------ */
  const loadFile = useCallback(
    (file) => {
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file (PNG, JPG, WebP).");
        return;
      }
      setError("");
      if (output) URL.revokeObjectURL(output.url);
      setOutput(null);
      const url = URL.createObjectURL(file);
      setFileName(file.name);
      const img = new Image();
      img.onload = () => {
        imgRef.current = img;
        setImgUrl(url);
        setReady(true);
        progressRef.current = 1;
        // defer so the canvas refs exist after the state-driven render
        requestAnimationFrame(() => {
          rebuild(true);
        });
      };
      img.onerror = () => setError("Could not read that image. Try another file.");
      img.src = url;
    },
    [output, rebuild],
  );

  /* --------------------------- live playback -------------------------- */
  const stopLoop = () => {
    playingRef.current = false;
    cancelAnimationFrame(rafRef.current);
  };

  const play = useCallback(() => {
    if (playingRef.current || !sceneRef.current) return;
    playingRef.current = true;
    setIsPlaying(true);
    const durMs = Math.max(0.5, duration) * 1000;
    const startP = progressRef.current >= 1 ? 0 : progressRef.current;
    const start = performance.now() - startP * durMs;
    const loop = (now) => {
      if (!playingRef.current) return;
      const p = Math.min(1, (now - start) / durMs);
      progressRef.current = p;
      setProgress(p);
      renderFrame(p);
      if (p < 1) rafRef.current = requestAnimationFrame(loop);
      else {
        playingRef.current = false;
        setIsPlaying(false);
      }
    };
    rafRef.current = requestAnimationFrame(loop);
  }, [duration, renderFrame]);

  const pause = useCallback(() => {
    stopLoop();
    setIsPlaying(false);
  }, []);

  const restart = useCallback(() => {
    stopLoop();
    progressRef.current = 0;
    setProgress(0);
    renderFrame(0);
    requestAnimationFrame(() => play());
  }, [play, renderFrame]);

  const scrub = useCallback(
    (v) => {
      pause();
      const p = v / 1000;
      progressRef.current = p;
      setProgress(p);
      renderFrame(p);
    },
    [pause, renderFrame],
  );

  /* ------------------------------ export ------------------------------ */
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  // Load ffmpeg.wasm once (single-thread core self-hosted in /public/ffmpeg).
  // Same-origin assets work under this page's COEP: require-corp header.
  const loadFFmpeg = useCallback(async () => {
    if (ffmpegRef.current) return ffmpegRef.current;
    const { FFmpeg } = await import("@ffmpeg/ffmpeg");
    const { toBlobURL } = await import("@ffmpeg/util");
    const ff = new FFmpeg();
    ff.on("log", ({ message }) => console.log("[ffmpeg]", message));
    const base = "/ffmpeg";
    await ff.load({
      coreURL: await toBlobURL(`${base}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(`${base}/ffmpeg-core.wasm`, "application/wasm"),
    });
    ffmpegRef.current = ff;
    return ff;
  }, []);

  // Render the animation frame-by-frame to PNGs, then encode with ffmpeg.
  // kind: "mp4" | "gif". Deterministic — no real-time capture, no dropped frames.
  const renderAndEncode = useCallback(
    async (kind) => {
      const canvas = canvasRef.current;
      const scene = sceneRef.current;
      if (!canvas || !scene) return;
      stopLoop();
      setExporting(true);
      setExportLabel("Loading encoder");
      setExportPct(0);
      setError("");
      if (output) URL.revokeObjectURL(output.url);
      setOutput(null);

      try {
        const ff = await loadFFmpeg();

        const drawSec = Math.max(0.5, duration);
        const totalSec = drawSec + Math.max(0, holdEnd);
        let fps = 25;
        let total = Math.round(totalSec * fps);
        if (total > 300) {
          total = 300; // bound memory / encode time for long clips
          fps = total / totalSec;
        }
        total = Math.max(2, total);

        // 1. render every frame and write it into ffmpeg's filesystem
        setExportLabel("Rendering frames");
        const pad = (n) => String(n).padStart(4, "0");
        for (let f = 0; f < total; f++) {
          const tsec = (f / (total - 1)) * totalSec;
          const p = Math.min(1, tsec / drawSec);
          renderFrame(p);
          const blob = await new Promise((res) => canvas.toBlob(res, "image/png"));
          await ff.writeFile(`f${pad(f)}.png`, new Uint8Array(await blob.arrayBuffer()));
          setExportPct(Math.round((f / total) * 60));
          if (f % 8 === 0) await sleep(0); // keep the UI responsive
        }

        // 2. encode
        setExportLabel(kind === "mp4" ? "Encoding MP4" : "Encoding GIF");
        const onProg = ({ progress }) =>
          setExportPct(Math.min(99, 60 + Math.round((progress || 0) * 39)));
        ff.on("progress", onProg);

        const fr = fps.toFixed(2);
        const outName = kind === "mp4" ? "out.mp4" : "out.gif";
        if (kind === "mp4") {
          await ff.exec([
            "-framerate", fr,
            "-i", "f%04d.png",
            "-vf", "pad=ceil(iw/2)*2:ceil(ih/2)*2", // libx264 needs even dimensions
            "-c:v", "libx264",
            "-preset", "ultrafast",
            "-crf", "20",
            "-pix_fmt", "yuv420p",
            outName,
          ]);
        } else {
          await ff.exec([
            "-framerate", fr,
            "-i", "f%04d.png",
            "-vf", "fps=15,split[a][b];[a]palettegen[p];[b][p]paletteuse",
            outName,
          ]);
        }
        if (ff.off) ff.off("progress", onProg);

        const data = await ff.readFile(outName);
        const blob = new Blob([data], { type: kind === "mp4" ? "video/mp4" : "image/gif" });
        const url = URL.createObjectURL(blob);
        setOutput({ url, type: kind, name: `whiteboard-${Date.now()}.${kind}` });
        setExportPct(100);

        // 3. tidy the in-memory filesystem so repeat exports stay lean
        for (let f = 0; f < total; f++) {
          try {
            await ff.deleteFile(`f${pad(f)}.png`);
          } catch {}
        }
        try {
          await ff.deleteFile(outName);
        } catch {}

        progressRef.current = 1;
        setProgress(1);
        renderFrame(1);
      } catch (e) {
        console.error("[wb] export failed", e);
        setError(
          (kind === "mp4" ? "MP4" : "GIF") +
            " export failed: " +
            (e?.message || String(e)),
        );
      } finally {
        setExporting(false);
      }
    },
    [duration, holdEnd, output, renderFrame, loadFFmpeg],
  );

  const exportMP4 = useCallback(() => renderAndEncode("mp4"), [renderAndEncode]);
  const exportGIF = useCallback(() => renderAndEncode("gif"), [renderAndEncode]);

  const download = () => {
    if (!output) return;
    const a = document.createElement("a");
    a.href = output.url;
    a.download = output.name;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const reset = () => {
    stopLoop();
    if (imgUrl) URL.revokeObjectURL(imgUrl);
    if (output) URL.revokeObjectURL(output.url);
    imgRef.current = null;
    sceneRef.current = null;
    setImgUrl(null);
    setFileName("");
    setReady(false);
    setOutput(null);
    setError("");
    setProgress(1);
    if (fileRef.current) fileRef.current.value = "";
  };

  useEffect(() => {
    return () => {
      stopLoop();
      if (imgUrl) URL.revokeObjectURL(imgUrl);
      if (output) URL.revokeObjectURL(output.url);
      try {
        ffmpegRef.current?.terminate?.();
      } catch {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ------------------------------- UI -------------------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-gray-600 dark:text-gray-400">
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link href="/" className="hover:text-cyan-600">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/tools" className="hover:text-cyan-600">
                Tools
              </Link>
            </li>
            <li>/</li>
            <li className="font-medium text-gray-900 dark:text-white">Whiteboard Animation</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm text-green-700 dark:bg-green-900/30 dark:text-green-300">
            <span className="text-lg">🔒</span>
            <span>100% Browser-Based — Your image never leaves your device</span>
          </div>
          <h1 className="mb-4 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Whiteboard Animation Maker
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Turn any image into a hand-drawn “speed paint” whiteboard animation — then export it as
            a video or GIF. Just like Canva’s Draw effect, free and instant.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* ---------------- LEFT: controls ---------------- */}
          <div className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-800">
            <h2 className="flex items-center gap-2 text-xl font-semibold">📤 1. Upload an image</h2>

            <div
              className="cursor-pointer rounded-xl border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-cyan-500 dark:border-gray-600"
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                loadFile(e.dataTransfer.files?.[0]);
              }}
            >
              <input
                ref={fileRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={(e) => loadFile(e.target.files?.[0])}
              />
              {imgUrl ? (
                <div className="space-y-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imgUrl} alt="source" className="mx-auto max-h-44 rounded-lg shadow" />
                  <p className="truncate text-sm text-gray-500">{fileName}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      reset();
                    }}
                    className="text-sm text-red-500 hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-5xl">🖼️</div>
                  <p className="text-gray-600 dark:text-gray-300">Click or drag an image here</p>
                  <p className="text-sm text-gray-400">
                    PNG, JPG or WebP. Transparent line-art looks best, but photos work too.
                  </p>
                </div>
              )}
            </div>

            {/* Settings */}
            <div className={ready ? "space-y-5" : "pointer-events-none space-y-5 opacity-40"}>
              <h2 className="flex items-center gap-2 text-xl font-semibold">⚙️ 2. Customize</h2>

              <div>
                <label className="mb-1 block text-sm text-gray-600 dark:text-gray-400">
                  Drawing duration: {duration}s
                </label>
                <input
                  type="range"
                  min="2"
                  max="20"
                  step="0.5"
                  value={duration}
                  onChange={(e) => setDuration(parseFloat(e.target.value))}
                  className="w-full"
                  disabled={exporting}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-gray-600 dark:text-gray-400">
                  Hold final image: {holdEnd}s
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={holdEnd}
                  onChange={(e) => setHoldEnd(parseFloat(e.target.value))}
                  className="w-full"
                  disabled={exporting}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-gray-600 dark:text-gray-400">
                  Stroke detail: {detail} {detail < 35 ? "(chunky)" : detail > 60 ? "(fine)" : ""}
                </label>
                <input
                  type="range"
                  min="20"
                  max="90"
                  step="1"
                  value={detail}
                  onChange={(e) => setDetail(parseInt(e.target.value))}
                  className="w-full"
                  disabled={exporting}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm text-gray-600 dark:text-gray-400">
                    Draw mode
                  </label>
                  <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                    disabled={exporting}
                    className="w-full rounded-lg border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-gray-700"
                  >
                    <option value="auto">Auto (recommended)</option>
                    <option value="whole">Reveal whole image</option>
                    <option value="trace">Trace dark lines only</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm text-gray-600 dark:text-gray-400">
                    Background
                  </label>
                  <input
                    type="color"
                    value={bg}
                    onChange={(e) => setBg(e.target.value)}
                    disabled={exporting}
                    className="h-10 w-full cursor-pointer rounded-lg border border-gray-300 dark:border-gray-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm text-gray-600 dark:text-gray-400">
                    Drawing hand
                  </label>
                  <select
                    value={handOn ? handStyle : "none"}
                    onChange={(e) => {
                      if (e.target.value === "none") setHandOn(false);
                      else {
                        setHandOn(true);
                        setHandStyle(e.target.value);
                      }
                    }}
                    disabled={exporting}
                    className="w-full rounded-lg border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-gray-700"
                  >
                    <option value="marker">✋ Hand + marker</option>
                    <option value="pencil">✏️ Hand + pencil</option>
                    <option value="none">No hand</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm text-gray-600 dark:text-gray-400">
                    Aspect ratio
                  </label>
                  <select
                    value={aspect}
                    onChange={(e) => setAspect(e.target.value)}
                    disabled={exporting}
                    className="w-full rounded-lg border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-gray-700"
                  >
                    <option value="original">Original (image size)</option>
                    <option value="16:9">16:9 — Landscape / YouTube</option>
                    <option value="9:16">9:16 — Reels / TikTok / Shorts</option>
                    <option value="1:1">1:1 — Square / Instagram</option>
                    <option value="4:5">4:5 — Portrait / feed</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Export */}
            <div className={ready ? "space-y-3" : "pointer-events-none space-y-3 opacity-40"}>
              <h2 className="flex items-center gap-2 text-xl font-semibold">⬇️ 3. Export</h2>
              <div className="flex gap-3">
                <button
                  onClick={exportMP4}
                  disabled={!ready || exporting}
                  className="flex-1 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 py-3 font-semibold text-white transition hover:from-cyan-700 hover:to-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  🎬 Export Video (MP4)
                </button>
                <button
                  onClick={exportGIF}
                  disabled={!ready || exporting}
                  className="flex-1 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 py-3 font-semibold text-white transition hover:from-purple-700 hover:to-pink-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  🖼️ Export GIF
                </button>
              </div>
              {exporting && (
                <div>
                  <div className="mb-1 flex justify-between text-xs text-gray-500">
                    <span>{exportLabel}…</span>
                    <span>{exportPct}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all"
                      style={{ width: `${exportPct}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
                ⚠️ {error}
              </div>
            )}
          </div>

          {/* ---------------- RIGHT: preview ---------------- */}
          <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-800">
            <h2 className="flex items-center gap-2 text-xl font-semibold">👁️ Preview</h2>

            <div className="flex min-h-64 items-center justify-center overflow-hidden rounded-xl bg-[repeating-conic-gradient(#f3f4f6_0%_25%,#ffffff_0%_50%)] bg-[length:24px_24px] p-2 dark:bg-gray-900">
              {ready ? (
                <canvas
                  ref={canvasRef}
                  className="max-h-[60vh] w-full rounded-lg object-contain shadow-md"
                />
              ) : (
                <div className="py-16 text-center text-gray-400">
                  <div className="mb-3 text-5xl">🎨</div>
                  <p>Upload an image to start animating</p>
                </div>
              )}
            </div>

            {/* hidden working canvases */}
            <canvas ref={maskRef} className="hidden" />
            <canvas ref={contentRef} className="hidden" />

            {ready && (
              <>
                <div className="flex items-center gap-3">
                  {isPlaying ? (
                    <button
                      onClick={pause}
                      className="rounded-lg bg-gray-200 px-4 py-2 font-medium hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                    >
                      ⏸ Pause
                    </button>
                  ) : (
                    <button
                      onClick={play}
                      disabled={exporting}
                      className="rounded-lg bg-cyan-600 px-4 py-2 font-medium text-white hover:bg-cyan-700 disabled:opacity-50"
                    >
                      ▶ Play
                    </button>
                  )}
                  <button
                    onClick={restart}
                    disabled={exporting}
                    className="rounded-lg bg-gray-200 px-4 py-2 font-medium hover:bg-gray-300 disabled:opacity-50 dark:bg-gray-700 dark:hover:bg-gray-600"
                  >
                    ↺ Replay
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={Math.round(progress * 1000)}
                    onChange={(e) => scrub(parseInt(e.target.value))}
                    disabled={exporting}
                    className="flex-1"
                    aria-label="Scrub animation"
                  />
                </div>

                {output && (
                  <div className="space-y-3 rounded-xl bg-gray-100 p-4 dark:bg-gray-900">
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">
                      ✅ Your {output.type.toUpperCase()} is ready!
                    </p>
                    {output.type === "gif" ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={output.url} alt="result" className="mx-auto max-h-72 rounded-lg" />
                    ) : (
                      <video
                        src={output.url}
                        controls
                        autoPlay
                        loop
                        muted
                        className="mx-auto max-h-72 rounded-lg"
                      />
                    )}
                    <button
                      onClick={download}
                      className="w-full rounded-lg bg-green-500 py-2 font-semibold text-white hover:bg-green-600"
                    >
                      💾 Download {output.type.toUpperCase()}
                    </button>
                    {output.type === "mp4" && (
                      <p className="text-center text-xs text-gray-500">
                        MP4 (H.264) plays everywhere — YouTube, Reels, TikTok, slides and social
                        uploads.
                      </p>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* SEO content */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-cyan-50 to-purple-50 p-8 dark:from-cyan-900/20 dark:to-purple-900/20">
          <h2 className="mb-6 text-center text-2xl font-bold">How the Whiteboard Animation Tool Works</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-2 text-3xl">🖊️</div>
              <h3 className="font-semibold">Hand-drawn effect</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                A marker hand sketches your image stroke by stroke for that classic explainer-video
                look.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-2 text-3xl">⚡</div>
              <h3 className="font-semibold">Instant & private</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Everything runs in your browser. No uploads, no sign-up, no watermark.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-2 text-3xl">🎞️</div>
              <h3 className="font-semibold">Video & GIF export</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Download an MP4 video or animated GIF, ready for YouTube, reels, ads and slides.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
