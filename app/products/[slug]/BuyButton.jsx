"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, Download } from "lucide-react";

export default function BuyButton({ productSlug, price }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [consent, setConsent] = useState(false);

  const handleBuy = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productSlug }),
      });
      const data = await res.json();
      if (!res.ok || !data.checkoutUrl) {
        throw new Error(data.error || "Could not start checkout");
      }
      window.location.href = data.checkoutUrl;
    } catch (err) {
      setError(err.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div>
      <label className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300"
        />
        <span>
          I understand this is a digital download that unlocks immediately
          after payment, and I agree to the{" "}
          <Link href="/refund-policy" className="text-indigo-600 underline dark:text-indigo-300">
            Refund Policy
          </Link>{" "}
          and{" "}
          <Link href="/terms" className="text-indigo-600 underline dark:text-indigo-300">
            Terms of Service
          </Link>
          .
        </span>
      </label>

      <button
        onClick={handleBuy}
        disabled={loading || !consent}
        className="mt-3 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Download className="h-4 w-4" />
        )}
        {loading ? "Starting checkout…" : `Buy & Download — $${price}`}
      </button>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
