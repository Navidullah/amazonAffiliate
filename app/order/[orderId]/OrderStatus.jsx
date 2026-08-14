"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, Download } from "lucide-react";

const POLL_INTERVAL_MS = 2000;
const MAX_POLLS = 8; // ~16s

export default function OrderStatus({ orderId, initialPaid }) {
  const [paid, setPaid] = useState(initialPaid);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    if (paid || attempts >= MAX_POLLS) return;

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/orders/status/${orderId}`);
        const data = await res.json();
        if (data.paid) {
          setPaid(true);
        } else {
          setAttempts((a) => a + 1);
        }
      } catch {
        setAttempts((a) => a + 1);
      }
    }, POLL_INTERVAL_MS);

    return () => clearTimeout(timer);
  }, [paid, attempts, orderId]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 pt-28 pb-16 text-center">
      {paid ? (
        <>
          <CheckCircle2 className="h-14 w-14 text-emerald-500" />
          <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
            Payment confirmed
          </h1>
          <p className="mt-2 max-w-md text-sm text-gray-600 dark:text-gray-400">
            Your worksheet is ready. Click below to download the PDF.
          </p>
          <a
            href={`/api/orders/download/${orderId}`}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
          >
            <Download className="h-4 w-4" />
            Download your worksheet
          </a>
        </>
      ) : attempts >= MAX_POLLS ? (
        <>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Still confirming payment
          </h1>
          <p className="mt-2 max-w-md text-sm text-gray-600 dark:text-gray-400">
            This is taking longer than usual. If you completed checkout,
            refresh this page in a minute — your download will appear here
            automatically once payment is confirmed.
          </p>
        </>
      ) : (
        <>
          <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
          <h1 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
            Confirming your payment…
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            This only takes a few seconds.
          </p>
        </>
      )}

      <Link
        href="/products"
        className="mt-8 text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-300"
      >
        Browse more worksheets
      </Link>
    </main>
  );
}
