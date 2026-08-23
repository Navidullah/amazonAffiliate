"use client";

import Link from "next/link";
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { DAILY_CHALLENGE_SIZE } from "@/lib/maths/bank";

export default function DailyChallengeCard({ completed }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-amber-200/70 bg-gradient-to-br from-amber-50 via-white to-orange-50 p-6 dark:border-amber-500/20 dark:from-amber-500/10 dark:via-transparent dark:to-orange-500/10">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-700 dark:text-amber-300">
            <Sparkles className="h-4 w-4" aria-hidden="true" /> Daily Challenge
          </span>
          <p className="mt-2 max-w-sm text-sm text-gray-700 dark:text-gray-300">
            Can you solve today&apos;s {DAILY_CHALLENGE_SIZE} questions?
          </p>
          <p className="mt-1 text-xs font-medium text-gray-500 dark:text-gray-400">
            {DAILY_CHALLENGE_SIZE} Questions · 50+ Points
          </p>
        </div>
      </div>

      <Link
        href="/maths/daily"
        className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-amber-600"
      >
        {completed ? (
          <>
            <CheckCircle2 className="h-4 w-4" /> Completed today — Try again
          </>
        ) : (
          <>
            Start Today&apos;s Challenge <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Link>
    </div>
  );
}
