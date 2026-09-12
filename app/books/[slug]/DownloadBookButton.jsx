"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

export default function DownloadBookButton({ slug, price }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/books/${slug}/checkout`, { method: "POST" });
      const data = await res.json();
      if (!res.ok || !data.checkoutUrl) {
        throw new Error(data.error || "Could not start checkout");
      }
      window.location.href = data.checkoutUrl;
    } catch (e) {
      toast.error(e.message || "Could not start checkout. Please try again.");
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="inline-flex h-12 items-center gap-2 rounded-2xl border border-gray-300 bg-white px-8 text-base font-semibold text-gray-900 shadow-sm transition-colors hover:bg-gray-50 disabled:opacity-60 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]"
    >
      {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
      Download PDF — ${price.toFixed(2)}
    </button>
  );
}
