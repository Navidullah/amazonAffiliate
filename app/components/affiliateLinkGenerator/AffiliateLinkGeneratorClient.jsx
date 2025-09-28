"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

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
  const [affiliateLink, setAffiliateLink] = useState("");
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
    if (!tag.trim()) {
      setAffiliateLink(
        "❌ Please enter your Amazon Associate Tag (e.g., yoursite-20)."
      );
      return;
    }
    const normalized = normalizeInputUrl(amazonUrl);
    let u;
    try {
      u = new URL(normalized);
    } catch {
      setAffiliateLink(
        "❌ Invalid URL. Please enter a valid Amazon product URL."
      );
      return;
    }

    const host = u.hostname.replace(/^www\./, "");
    const region = findMarketplace(host);
    if (!region) {
      setAffiliateLink(
        "❌ Not an Amazon product URL or unsupported marketplace."
      );
      return;
    }

    const cleaned = stripExistingTag(u.toString());
    const cleanUrl = new URL(cleaned);
    const asin = extractASIN(cleanUrl.pathname, cleanUrl.searchParams);
    if (!asin) {
      setAffiliateLink(
        "❌ Could not find ASIN in this link. Open the product page and copy its URL again."
      );
      return;
    }

    const final = `https://${region}/dp/${asin}?tag=${encodeURIComponent(tag.trim())}`;
    setAffiliateLink(final);
    setCopied(false);
  };

  const handleCopy = () => {
    if (affiliateLink && !affiliateLink.startsWith("❌")) {
      navigator.clipboard.writeText(affiliateLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      {/* Tag input */}
      <label className="block text-sm font-medium mb-1">Associate Tag</label>
      <Input
        type="text"
        placeholder="e.g., yoursite-20"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        className="mb-3"
      />
      <label className="flex items-center gap-2 text-sm mb-4">
        <input
          type="checkbox"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
        />
        Remember my tag on this device
      </label>

      {/* URL input */}
      <Input
        type="text"
        placeholder="Paste any Amazon product URL (e.g., https://www.amazon.com/dp/B0XXXXXXXY)"
        value={amazonUrl}
        onChange={(e) => setAmazonUrl(e.target.value)}
        className="mb-4"
      />

      <div className="flex gap-2">
        <Button onClick={handleGenerate}>Generate Affiliate Link</Button>
        <Button
          variant="outline"
          onClick={() => {
            setAmazonUrl("");
            setAffiliateLink("");
            setCopied(false);
          }}
        >
          Reset
        </Button>
      </div>

      {affiliateLink && (
        <div className="mt-6 p-4 bg-muted rounded">
          <strong>
            {affiliateLink.startsWith("❌")
              ? "⚠️ Notice:"
              : "✅ Affiliate Link:"}
          </strong>
          <div className="flex items-center gap-2 mt-2">
            <span className="break-all underline-offset-2">
              {affiliateLink}
            </span>
            {!affiliateLink.startsWith("❌") && (
              <Button
                size="icon"
                variant="outline"
                onClick={handleCopy}
                title="Copy"
              >
                <Copy className="w-4 h-4" />
              </Button>
            )}
            {copied && <span className="text-green-600 ml-2">Copied!</span>}
          </div>
        </div>
      )}
    </>
  );
}
