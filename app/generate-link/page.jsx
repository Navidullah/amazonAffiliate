"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

const AMAZON_TAG = "shopyor-20"; // <-- Change this to your tag

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

export default function AffiliateLinkGenerator() {
  const [amazonUrl, setAmazonUrl] = useState("");
  const [affiliateLink, setAffiliateLink] = useState("");
  const [copied, setCopied] = useState(false);

  // Extract region (domain) and ASIN
  const extractRegionAndASIN = (url) => {
    try {
      const u = new URL(url.trim());
      const region = REGION_DOMAINS.find((d) => u.hostname.endsWith(d));
      // Matches /dp/ASIN or /gp/product/ASIN
      const asinMatch = u.pathname.match(/(?:dp|gp\/product)\/([A-Z0-9]{10})/);
      return {
        region,
        asin: asinMatch ? asinMatch[1] : null,
      };
    } catch {
      return { region: null, asin: null };
    }
  };

  const handleGenerate = () => {
    const { region, asin } = extractRegionAndASIN(amazonUrl);
    if (!region || !asin) {
      setAffiliateLink(
        "❌ Invalid URL. Please enter a valid Amazon product URL."
      );
      return;
    }
    // Clean link: https://[region]/dp/[asin]?tag=YOURTAG
    setAffiliateLink(`https://${region}/dp/${asin}?tag=${AMAZON_TAG}`);
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
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        🛠 Amazon Affiliate Link Generator
      </h1>
      <Input
        type="text"
        placeholder="Paste any Amazon product URL here"
        value={amazonUrl}
        onChange={(e) => setAmazonUrl(e.target.value)}
        className="mb-4"
      />
      <Button onClick={handleGenerate}>Generate Affiliate Link</Button>
      {affiliateLink && (
        <div className="mt-6 p-4 bg-muted rounded">
          <strong>✅ Affiliate Link:</strong>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-blue-600 break-all">{affiliateLink}</span>
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
    </main>
  );
}
