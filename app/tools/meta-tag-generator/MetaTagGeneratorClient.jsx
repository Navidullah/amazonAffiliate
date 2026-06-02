"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Copy,
  Check,
  Download,
  Code2,
  Search,
  Share2,
  Globe,
} from "lucide-react";

/* Character-count helper with SEO-ideal ranges */
function CharMeter({ value, min, max }) {
  const len = value.length;
  let color = "text-slate-400";
  if (len > 0 && len < min) color = "text-amber-500";
  else if (len >= min && len <= max) color = "text-emerald-500";
  else if (len > max) color = "text-red-500";
  return (
    <span className={`text-xs font-medium ${color}`}>
      {len}/{max}
    </span>
  );
}

function Field({ label, hint, children, meter }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-sm font-semibold text-slate-800 dark:text-slate-100">
          {label}
        </label>
        {meter}
      </div>
      {children}
      {hint && <p className="text-xs text-slate-500 mt-1">{hint}</p>}
    </div>
  );
}

const inputCls =
  "w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition";

export default function MetaTagGeneratorClient() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [twitterHandle, setTwitterHandle] = useState("");
  const [robotsIndex, setRobotsIndex] = useState(true);
  const [copied, setCopied] = useState(false);

  const cleanUrl = url
    ? url.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : "yourdomain.com";

  /* Live-generated meta tags */
  const generated = useMemo(() => {
    const esc = (s) => (s || "").replace(/"/g, "&quot;");
    const lines = [];
    lines.push(`<title>${title || "Your Page Title"}</title>`);
    lines.push(
      `<meta name="description" content="${esc(description)}" />`,
    );
    if (keywords.trim())
      lines.push(`<meta name="keywords" content="${esc(keywords)}" />`);
    if (author.trim())
      lines.push(`<meta name="author" content="${esc(author)}" />`);
    lines.push(
      `<meta name="robots" content="${
        robotsIndex ? "index, follow" : "noindex, nofollow"
      }" />`,
    );
    lines.push(`<meta name="viewport" content="width=device-width, initial-scale=1" />`);
    lines.push("");
    lines.push("<!-- Open Graph / Facebook -->");
    lines.push(`<meta property="og:type" content="website" />`);
    lines.push(`<meta property="og:title" content="${esc(title)}" />`);
    lines.push(
      `<meta property="og:description" content="${esc(description)}" />`,
    );
    if (url.trim())
      lines.push(`<meta property="og:url" content="${esc(url)}" />`);
    if (image.trim())
      lines.push(`<meta property="og:image" content="${esc(image)}" />`);
    lines.push("");
    lines.push("<!-- Twitter -->");
    lines.push(`<meta name="twitter:card" content="summary_large_image" />`);
    lines.push(`<meta name="twitter:title" content="${esc(title)}" />`);
    lines.push(
      `<meta name="twitter:description" content="${esc(description)}" />`,
    );
    if (image.trim())
      lines.push(`<meta name="twitter:image" content="${esc(image)}" />`);
    if (twitterHandle.trim())
      lines.push(
        `<meta name="twitter:site" content="@${twitterHandle.replace(/^@/, "")}" />`,
      );
    return lines.join("\n");
  }, [title, description, keywords, author, url, image, twitterHandle, robotsIndex]);

  const copy = async () => {
    await navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const download = () => {
    const blob = new Blob([generated], { type: "text/html" });
    const href = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = href;
    a.download = "meta-tags.html";
    a.click();
    URL.revokeObjectURL(href);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* LEFT: form */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-5 sm:p-7 space-y-5">
        <Field
          label="Page Title"
          hint="Best length for Google: 50–60 characters."
          meter={<CharMeter value={title} min={50} max={60} />}
        >
          <input
            className={inputCls}
            placeholder="e.g. Free Meta Tag Generator — SEO, Open Graph & Twitter"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Field>

        <Field
          label="Meta Description"
          hint="Best length for Google: 150–160 characters."
          meter={<CharMeter value={description} min={150} max={160} />}
        >
          <textarea
            className={`${inputCls} resize-none`}
            rows={3}
            placeholder="A concise, compelling summary of the page that makes people click."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Field>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Keywords" hint="Comma separated (optional).">
            <input
              className={inputCls}
              placeholder="seo, meta tags, tool"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </Field>
          <Field label="Author">
            <input
              className={inputCls}
              placeholder="Your name or brand"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </Field>
        </div>

        <Field label="Page URL">
          <input
            className={inputCls}
            placeholder="https://yourdomain.com/page"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </Field>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Social Image URL" hint="1200×630px works best.">
            <input
              className={inputCls}
              placeholder="https://.../cover.jpg"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </Field>
          <Field label="Twitter Handle">
            <input
              className={inputCls}
              placeholder="yourbrand"
              value={twitterHandle}
              onChange={(e) => setTwitterHandle(e.target.value)}
            />
          </Field>
        </div>

        <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-700/30 rounded-xl border border-slate-100 dark:border-slate-700">
          <div>
            <p className="font-medium text-sm">Allow search engine indexing</p>
            <p className="text-xs text-slate-500">
              Off = noindex, nofollow (hides the page from Google)
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={robotsIndex}
            onClick={() => setRobotsIndex(!robotsIndex)}
            className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
              robotsIndex ? "bg-emerald-600" : "bg-slate-300 dark:bg-slate-600"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                robotsIndex ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* RIGHT: previews + code */}
      <div className="space-y-6">
        {/* Google SERP preview */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg p-5">
          <div className="flex items-center gap-2 mb-4 text-sm font-semibold">
            <Search className="w-4 h-4 text-blue-600" /> Google Search Preview
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-900">
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <Globe className="w-3.5 h-3.5" />
              <span className="truncate">{cleanUrl}</span>
            </div>
            <p className="text-[#1a0dab] dark:text-blue-400 text-lg leading-tight truncate">
              {title || "Your Page Title Appears Here"}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">
              {description ||
                "Your meta description preview shows here. Aim for 150–160 characters so Google doesn't truncate it."}
            </p>
          </div>
        </div>

        {/* Social card preview */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg p-5">
          <div className="flex items-center gap-2 mb-4 text-sm font-semibold">
            <Share2 className="w-4 h-4 text-blue-600" /> Social Share Preview
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-900">
            <div className="aspect-[1.91/1] bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
              {image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={image}
                  alt="Social preview"
                  className="w-full h-full object-cover"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              ) : (
                <span className="text-xs text-slate-400">
                  Social image (1200×630) preview
                </span>
              )}
            </div>
            <div className="p-3">
              <p className="text-[11px] uppercase tracking-wide text-slate-400">
                {cleanUrl}
              </p>
              <p className="text-sm font-semibold truncate">
                {title || "Your Page Title"}
              </p>
              <p className="text-xs text-slate-500 line-clamp-2">
                {description || "Your description preview for Facebook, X & LinkedIn."}
              </p>
            </div>
          </div>
        </div>

        {/* Code output */}
        <div className="bg-slate-900 dark:bg-slate-950 rounded-2xl border border-slate-700 overflow-hidden shadow-lg">
          <div className="flex justify-between items-center px-5 py-3 border-b border-slate-700/70 bg-slate-800/40">
            <span className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <Code2 className="w-4 h-4" /> meta-tags.html
            </span>
            <div className="flex gap-2">
              <button
                onClick={copy}
                className="flex items-center gap-1 text-xs bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-lg transition"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </>
                )}
              </button>
              <button
                onClick={download}
                className="flex items-center gap-1 text-xs bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg transition"
              >
                <Download className="w-3.5 h-3.5" /> Download
              </button>
            </div>
          </div>
          <pre className="text-xs sm:text-[13px] font-mono text-emerald-400 p-5 overflow-x-auto whitespace-pre-wrap max-h-[360px]">
            {generated}
          </pre>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-center text-slate-500"
        >
          Paste these tags inside the <code>&lt;head&gt;</code> section of your HTML.
        </motion.p>
      </div>
    </div>
  );
}
