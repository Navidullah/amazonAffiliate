// app/exif-remover/page.js
"use client";

import { useRef, useState } from "react";
import * as exifr from "exifr";

export default function Page() {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [exif, setExif] = useState(null);
  const [cleanUrl, setCleanUrl] = useState(null);
  const [busy, setBusy] = useState(false);

  const onPick = async (files) => {
    const f = files?.[0];
    if (!f) return;
    setFile(f);
    setCleanUrl(null);
    setPreviewUrl(URL.createObjectURL(f));
    try {
      const data = await exifr.parse(f).catch(() => null);
      setExif(data || {});
    } catch {
      setExif(null);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    onPick(e.dataTransfer.files);
  };

  const removeClientSide = async () => {
    if (!file) return;
    setBusy(true);
    try {
      const cleanedBlob = await stripMetadataClient(file);
      setCleanUrl(URL.createObjectURL(cleanedBlob));
    } finally {
      setBusy(false);
    }
  };

  const removeServerSide = async () => {
    if (!file) return;
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/exif-clean", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Upload failed");
      const blob = await res.blob();
      setCleanUrl(URL.createObjectURL(blob));
    } catch (e) {
      alert("Failed to clean on server.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">EXIF Remover</h1>
      <p className="text-sm text-neutral-500 mt-2">
        Drop a photo, preview EXIF, then download a metadata-free copy.
      </p>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className="mt-6 border-2 border-dashed border-neutral-400/60 rounded-2xl p-8 text-center cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-900"
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={(e) => onPick(e.target.files)}
          className="hidden"
        />
        <p className="font-medium">Drag & drop or click to upload</p>
        <p className="text-xs text-neutral-500 mt-1">JPEG, PNG, WebP, AVIF</p>
      </div>

      {previewUrl && (
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <section>
            <h3 className="font-semibold mb-2">Original</h3>
            <img
              src={previewUrl}
              alt="original"
              className="w-full rounded-xl border object-contain max-h-[420px] bg-neutral-100 dark:bg-neutral-900"
            />

            <details className="mt-3">
              <summary className="cursor-pointer text-sm font-medium">
                Show detected EXIF
              </summary>
              <pre className="mt-2 text-xs p-3 rounded-lg bg-[#0b1020] text-[#d7e3ff] max-h-72 overflow-auto">
                {JSON.stringify(exif || {}, null, 2)}
              </pre>
            </details>

            <div className="flex flex-wrap gap-3 mt-4">
              <button
                onClick={removeClientSide}
                disabled={busy}
                className="px-4 py-2 rounded-xl border bg-black text-white disabled:opacity-50"
              >
                {busy ? "Cleaning…" : "Remove on device"}
              </button>
              <button
                onClick={removeServerSide}
                disabled={busy}
                className="px-4 py-2 rounded-xl border"
              >
                {busy ? "Uploading…" : "Remove via server"}
              </button>
            </div>

            <p className="text-xs text-neutral-500 mt-2">
              On-device uses canvas re-encode (fast, private). Server uses Sharp
              (better for big files & more formats).
            </p>
          </section>

          <section>
            <h3 className="font-semibold mb-2">Cleaned</h3>
            {cleanUrl ? (
              <>
                <img
                  src={cleanUrl}
                  alt="cleaned"
                  className="w-full rounded-xl border object-contain max-h-[420px] bg-neutral-100 dark:bg-neutral-900"
                />
                <div className="mt-3">
                  <a
                    href={cleanUrl}
                    download="cleaned.jpg"
                    className="inline-block px-4 py-2 rounded-xl border bg-black text-white"
                  >
                    Download cleaned image
                  </a>
                </div>

                <details className="mt-3">
                  <summary className="cursor-pointer text-sm font-medium">
                    Proof (read EXIF again)
                  </summary>
                  <Proof noExifUrl={cleanUrl} />
                </details>
              </>
            ) : (
              <div className="h-[260px] border border-dashed rounded-xl grid place-items-center text-neutral-500">
                No cleaned image yet
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  );
}

function Proof({ noExifUrl }) {
  const [data, setData] = useState(null);
  return (
    <div className="mt-2">
      <button
        onClick={async () => {
          const res = await fetch(noExifUrl);
          const blob = await res.blob();
          const parsed = await exifr.parse(blob).catch(() => null);
          setData(parsed || {});
        }}
        className="px-3 py-1 rounded border text-sm"
      >
        Read EXIF from cleaned image
      </button>
      <pre className="text-xs mt-2 p-3 rounded bg-neutral-100 dark:bg-neutral-900 overflow-auto max-h-64">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

/** Canvas re-encode removes metadata; also respects common EXIF orientation */
async function stripMetadataClient(file) {
  let orientation = 1;
  try {
    orientation = (await exifr.orientation(file)) || 1;
  } catch {}

  const bmp = await createImageBitmap(file);
  const { canvas, ctx, width, height } = orientedCanvas(bmp, orientation);
  ctx.drawImage(bmp, 0, 0, width, height);

  const blob = await new Promise((resolve) =>
    canvas.toBlob((b) => resolve(b), "image/jpeg", 0.95)
  );
  return blob;
}

function orientedCanvas(bitmap, orientation) {
  let width = bitmap.width;
  let height = bitmap.height;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (orientation >= 5 && orientation <= 8) {
    canvas.width = height;
    canvas.height = width;
  } else {
    canvas.width = width;
    canvas.height = height;
  }

  switch (orientation) {
    case 2:
      ctx.translate(width, 0);
      ctx.scale(-1, 1);
      break;
    case 3:
      ctx.translate(width, height);
      ctx.rotate(Math.PI);
      break;
    case 4:
      ctx.translate(0, height);
      ctx.scale(1, -1);
      break;
    case 5:
      ctx.rotate(0.5 * Math.PI);
      ctx.scale(1, -1);
      break;
    case 6:
      ctx.rotate(0.5 * Math.PI);
      ctx.translate(0, -height);
      break;
    case 7:
      ctx.rotate(0.5 * Math.PI);
      ctx.translate(width, -height);
      ctx.scale(-1, 1);
      break;
    case 8:
      ctx.rotate(-0.5 * Math.PI);
      ctx.translate(-width, 0);
      break;
    default:
      break;
  }

  return { canvas, ctx, width: canvas.width, height: canvas.height };
}
