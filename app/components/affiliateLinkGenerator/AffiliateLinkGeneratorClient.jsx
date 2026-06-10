"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Link2,
  Copy,
  Check,
  RotateCcw,
  ExternalLink,
  AlertCircle,
  Sparkles,
  Globe,
  Tag as TagIcon,
} from "lucide-react";

const REGION_DOMAINS = [
  "amazon.com",
  "amazon.co.uk",
  "amazon.de",
  "amazon.ca",
  "amazon.in",
  "amazon.fr",
  "amazon.it",
  "amazon.es",
  "amazon.co.jp",
  "amazon.com.au",
  "amazon.com.br",
  "amazon.com.mx",
  "amazon.sg",
  "amazon.ae",
  "amazon.sa",
  "amazon.nl",
  "amazon.se",
  "amazon.pl",
  "amazon.tr",
];

// Helpers
const normalizeInputUrl = (raw) => {
  const s = raw.trim();
  if (!s) return "";
  return /^https?:\/\//i.test(s) ? s : `https://${s}`;
};
const findMarketplace = (hostname) =>
  REGION_DOMAINS.find((d) => hostname.endsWith(d)) || null;

const stripExistingTag = (url) => {
  try {
    const u = new URL(url);
    const p = u.searchParams;
    // Remove common tracking params
    p.delete("tag");
    p.delete("linkCode");
    p.delete("linkId");
    p.delete("creativeASIN");
    p.delete("creative");
    p.delete("camp");
    u.search = p.toString();
    return u.toString();
  } catch {
    return url;
  }
};

const extractASIN = (pathname, searchParams) => {
  let m = pathname.match(/\/dp\/([A-Z0-9]{10})(?:[/?]|$)/i);
  if (m) return m[1].toUpperCase();
  m = pathname.match(/\/gp\/product\/([A-Z0-9]{10})(?:[/?]|$)/i);
  if (m) return m[1].toUpperCase();
  m = pathname.match(/\/gp\/aw\/d\/([A-Z0-9]{10})(?:[/?]|$)/i);
  if (m) return m[1].toUpperCase();
  m = pathname.match(/\/product\/([A-Z0-9]{10})(?:[/?]|$)/i);
  if (m) return m[1].toUpperCase();
  m = pathname.match(/\/(offer-listing|o)\/([A-Z0-9]{10})(?:[/?]|$)/i);
  if (m) return m[2].toUpperCase();
  const qAsin =
    searchParams.get("asin") ||
    searchParams.get("ASIN") ||
    searchParams.get("aSIN");
  if (qAsin && /^[A-Z0-9]{10}$/i.test(qAsin)) return qAsin.toUpperCase();
  return null;
};

export default function AffiliateLinkGeneratorClient() {
  const [amazonUrl, setAmazonUrl] = useState("");
  const [tag, setTag] = useState("");
  const [remember, setRemember] = useState(true);
  const [result, setResult] = useState(null); // { ok, link?, asin?, region?, error? }
  const [copied, setCopied] = useState(false);

  // Prefill tag from ?tag=... or localStorage
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const qpTag = params.get("tag");
      if (qpTag) {
        setTag(qpTag);
        if (remember) localStorage.setItem("affiliateTag", qpTag);
        return;
      }
      const saved = localStorage.getItem("affiliateTag");
      if (saved) setTag(saved);
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep localStorage in sync
  useEffect(() => {
    try {
      if (remember && tag) localStorage.setItem("affiliateTag", tag);
      if (!remember) localStorage.removeItem("affiliateTag");
    } catch {}
  }, [remember, tag]);

  const handleGenerate = () => {
    setCopied(false);
    if (!tag.trim()) {
      setResult({
        ok: false,
        error: "Please enter your Amazon Associate Tag (e.g., yoursite-20).",
      });
      return;
    }
    const normalized = normalizeInputUrl(amazonUrl);
    let u;
    try {
      u = new URL(normalized);
    } catch {
      setResult({
        ok: false,
        error: "Invalid URL. Please enter a valid Amazon product URL.",
      });
      return;
    }

    const host = u.hostname.replace(/^www\./, "");
    const region = findMarketplace(host);
    if (!region) {
      setResult({
        ok: false,
        error: "Not an Amazon product URL or unsupported marketplace.",
      });
      return;
    }

    const cleaned = stripExistingTag(u.toString());
    const cleanUrl = new URL(cleaned);
    const asin = extractASIN(cleanUrl.pathname, cleanUrl.searchParams);
    if (!asin) {
      setResult({
        ok: false,
        error:
          "Could not find an ASIN in this link. Open the product page and copy its URL again.",
      });
      return;
    }

    const link = `https://${region}/dp/${asin}?tag=${encodeURIComponent(
      tag.trim()
    )}`;
    setResult({ ok: true, link, asin, region });
  };

  const handleReset = () => {
    setAmazonUrl("");
    setResult(null);
    setCopied(false);
  };

  const copyTimer = useRef(null);
  const handleCopy = async () => {
    if (!result?.ok) return;
    try {
      await navigator.clipboard.writeText(result.link);
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {}
  };
  useEffect(() => () => clearTimeout(copyTimer.current), []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card className="relative overflow-hidden border-border/70 shadow-lg">
        {/* Gradient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-24 h-48 bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-yellow-500/10 blur-2xl"
        />

        <CardHeader className="relative">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-md shadow-orange-500/20">
              <Link2 className="size-5" />
            </span>
            <div>
              <CardTitle className="text-2xl tracking-tight">
                Amazon Affiliate Link Generator
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Paste any Amazon product URL and get a clean affiliate link with
                your own Associate Tag — works for 19 marketplaces. Free, no
                SiteStripe needed.
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative space-y-5">
          {/* Associate Tag */}
          <div className="space-y-2">
            <Label htmlFor="tag" className="flex items-center gap-1.5 text-sm">
              <TagIcon className="size-4" />
              Associate Tag
            </Label>
            <Input
              id="tag"
              type="text"
              placeholder="e.g., yoursite-20"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
            <label className="flex w-max cursor-pointer items-center gap-2 text-xs text-muted-foreground">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="accent-amber-500"
              />
              Remember my tag on this device
            </label>
          </div>

          {/* URL input */}
          <div className="space-y-2">
            <Label htmlFor="amazonUrl" className="flex items-center gap-1.5 text-sm">
              <Globe className="size-4" />
              Amazon product URL
            </Label>
            <Input
              id="amazonUrl"
              type="text"
              placeholder="https://www.amazon.com/dp/B0XXXXXXXY"
              value={amazonUrl}
              onChange={(e) => setAmazonUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            />
          </div>

          {/* Result */}
          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                key={result.ok ? "ok" : "err"}
                initial={{ opacity: 0, y: 8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                className="overflow-hidden"
              >
                {result.ok ? (
                  <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                        <Sparkles className="size-4" /> Affiliate link ready
                      </span>
                      <Badge variant="secondary" className="gap-1">
                        <Globe className="size-3" /> {result.region}
                      </Badge>
                      <Badge variant="secondary" className="gap-1">
                        ASIN: {result.asin}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 rounded-xl border bg-background p-3">
                      <span className="break-all text-sm font-medium">
                        {result.link}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <motion.div whileTap={{ scale: 0.97 }}>
                        <Button onClick={handleCopy} size="sm" className="gap-2">
                          {copied ? (
                            <>
                              <Check className="size-4" /> Copied
                            </>
                          ) : (
                            <>
                              <Copy className="size-4" /> Copy link
                            </>
                          )}
                        </Button>
                      </motion.div>
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="gap-2"
                      >
                        <a
                          href={result.link}
                          target="_blank"
                          rel="noopener noreferrer nofollow sponsored"
                        >
                          <ExternalLink className="size-4" /> Open
                        </a>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2 rounded-2xl border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-600 dark:text-red-400">
                    <AlertCircle className="mt-0.5 size-4 shrink-0" />
                    <span>{result.error}</span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>

        <CardFooter className="relative flex flex-wrap gap-3">
          <motion.div whileTap={{ scale: 0.97 }}>
            <Button onClick={handleGenerate} className="gap-2">
              <Link2 className="size-4" /> Generate Affiliate Link
            </Button>
          </motion.div>
          <motion.div whileTap={{ scale: 0.97 }}>
            <Button variant="secondary" onClick={handleReset} className="gap-2">
              <RotateCcw className="size-4" /> Reset
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
