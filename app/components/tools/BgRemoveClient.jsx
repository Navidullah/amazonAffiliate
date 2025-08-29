"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { removeBackground } from "@imgly/background-removal";
import {
  Download,
  Loader2,
  Image as ImgIcon,
  RotateCcw,
  Wand2,
} from "lucide-react";

export default function BgRemoveClient() {
  const [origURL, setOrigURL] = useState(null);
  const [outURL, setOutURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fmt, setFmt] = useState("image/png"); // image/png | image/jpeg | image/webp
  const [mode, setMode] = useState("foreground"); // foreground | mask
  const [error, setError] = useState("");
  const [sizes, setSizes] = useState({ inKB: 0, outKB: 0 });

  const inputRef = useRef(null);

  const checker = useMemo(
    () => ({
      backgroundImage:
        "linear-gradient(45deg, #0000 25%, #0003 25%, #0003 50%, #0000 50%, #0000 75%, #0003 75%, #0003 100%)",
      backgroundSize: "16px 16px",
    }),
    []
  );

  const onFile = async (file) => {
    if (!file) return;
    // cleanup
    if (origURL) URL.revokeObjectURL(origURL);
    if (outURL) URL.revokeObjectURL(outURL);

    const nextOrig = URL.createObjectURL(file);
    setOrigURL(nextOrig);
    setError("");
    setOutURL(null);
    setSizes({ inKB: Math.round(file.size / 1024), outKB: 0 });

    setLoading(true);
    try {
      const blob = await removeBackground(file, {
        output: { format: fmt, type: mode },
      });
      const nextOut = URL.createObjectURL(blob);
      setOutURL(nextOut);
      setSizes((s) => ({ ...s, outKB: Math.round(blob.size / 1024) }));
    } catch (e) {
      console.error(e);
      setError("Failed to remove background. Please try another image.");
    } finally {
      setLoading(false);
    }
  };

  const onInputChange = (e) => onFile(e.target.files?.[0]);

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      const file = e.dataTransfer?.files?.[0];
      onFile(file);
    },
    [fmt, mode]
  );

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const resetAll = () => {
    if (origURL) URL.revokeObjectURL(origURL);
    if (outURL) URL.revokeObjectURL(outURL);
    setOrigURL(null);
    setOutURL(null);
    setError("");
    setSizes({ inKB: 0, outKB: 0 });
    if (inputRef.current) inputRef.current.value = "";
  };

  const download = () => {
    if (!outURL) return;
    const a = document.createElement("a");
    a.href = outURL;
    a.download = `background-removed.${fmt === "image/png" ? "png" : fmt === "image/webp" ? "webp" : "jpg"}`;
    a.click();
  };

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight flex items-center gap-2">
          <Wand2 className="h-6 w-6 text-cyan-400" /> Background Remover
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          100% browser-based. Your image never leaves your device.
        </p>
      </header>

      {/* Controls */}
      <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <label className="flex items-center gap-2 rounded-xl border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-white/5 px-3 py-2">
          <span className="text-sm w-24">Output</span>
          <select
            className="w-full bg-transparent outline-none text-sm"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="foreground">Foreground (transparent BG)</option>
            <option value="mask">Mask (black/white)</option>
          </select>
        </label>

        <label className="flex items-center gap-2 rounded-xl border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-white/5 px-3 py-2">
          <span className="text-sm w-24">Format</span>
          <select
            className="w-full bg-transparent outline-none text-sm"
            value={fmt}
            onChange={(e) => setFmt(e.target.value)}
          >
            <option value="image/png">PNG (transparent)</option>
            <option value="image/webp">WebP</option>
            <option value="image/jpeg">JPEG</option>
          </select>
        </label>

        <div className="flex gap-2">
          <button
            onClick={() => inputRef.current?.click()}
            className="flex-1 inline-flex items-center justify-center rounded-xl bg-cyan-500 text-black font-medium px-3 py-2 hover:bg-cyan-400 active:scale-[0.99]"
          >
            <ImgIcon className="h-4 w-4 mr-2" />
            Choose Image
          </button>
          <button
            onClick={resetAll}
            className="rounded-xl border border-gray-200 dark:border-white/10 px-3 py-2 hover:bg-white/50 dark:hover:bg-white/10"
            title="Reset"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={onInputChange}
            className="hidden"
          />
        </div>
      </div>

      {/* Drop zone */}
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        className="mb-6 rounded-2xl border-2 border-dashed border-gray-300 dark:border-white/10 bg-white/40 dark:bg-white/5 p-6 text-center"
      >
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Drag & drop an image here, or click{" "}
          <span className="font-medium">Choose Image</span>.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 rounded-xl border border-red-300 bg-red-50/70 dark:bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      {/* Preview grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Original */}
        <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-white/5 p-4">
          <h3 className="mb-3 font-medium">Original</h3>
          <div
            className="aspect-video w-full overflow-hidden rounded-xl flex items-center justify-center"
            style={checker}
          >
            {origURL ? (
              <img src={origURL} alt="Original" className=" object-contain" />
            ) : (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                No image selected
              </div>
            )}
          </div>
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {sizes.inKB ? `${sizes.inKB} KB` : ""}
          </div>
        </div>

        {/* Processed */}
        <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-white/5 p-4">
          <h3 className="mb-3 font-medium">Processed</h3>
          <div
            className="aspect-video w-full overflow-hidden rounded-xl flex items-center justify-center"
            style={checker}
          >
            {loading ? (
              <div className="flex items-center gap-2 text-sm">
                <Loader2 className="h-4 w-4 animate-spin" /> Processing…
              </div>
            ) : outURL ? (
              <img src={outURL} alt="Processed" className=" object-contain" />
            ) : (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Result will appear here
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {sizes.outKB ? `${sizes.outKB} KB` : ""}
            </div>
            <div className="flex gap-2">
              <button
                onClick={download}
                disabled={!outURL || loading}
                className="inline-flex items-center rounded-xl border border-gray-200 dark:border-white/10 px-3 py-2 text-sm hover:bg-white/60 dark:hover:bg-white/10 disabled:opacity-50"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
