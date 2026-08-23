"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Lock } from "lucide-react";

/** One curriculum tile on the /maths landing page — active curricula link
 * through to their year page, "coming soon" ones render disabled. */
export default function CurriculumCard({ curriculum, variants }) {
  const isActive = curriculum.status === "active";
  const primaryYear = curriculum.years[0];

  const content = (
    <div
      className={`group flex h-full flex-col items-center gap-3 rounded-3xl border p-6 text-center backdrop-blur-xl transition-all ${
        isActive
          ? "border-violet-200/70 bg-white/70 hover:-translate-y-1 hover:shadow-[0_24px_64px_-30px_rgba(124,58,237,0.45)] dark:border-violet-500/20 dark:bg-white/[0.03]"
          : "cursor-not-allowed border-gray-200/60 bg-gray-50/60 opacity-70 dark:border-white/10 dark:bg-white/[0.02]"
      }`}
    >
      <span className="text-4xl" aria-hidden="true">
        {curriculum.flag}
      </span>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{curriculum.label}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {primaryYear.subLabel}
        <br />
        {primaryYear.label}
      </p>

      {isActive ? (
        <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-violet-600 group-hover:gap-2 transition-all dark:text-violet-300">
          Start <ArrowRight className="h-4 w-4" />
        </span>
      ) : (
        <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-gray-200/80 px-3 py-1 text-xs font-semibold text-gray-600 dark:bg-white/10 dark:text-gray-400">
          <Lock className="h-3 w-3" aria-hidden="true" /> Coming Soon
        </span>
      )}
    </div>
  );

  return (
    <motion.div variants={variants} className="h-full">
      {isActive ? (
        <Link
          href={`/maths/${primaryYear.slug}`}
          className="block h-full"
          aria-label={`Start ${curriculum.label} ${primaryYear.label} maths challenge`}
        >
          {content}
        </Link>
      ) : (
        <div aria-disabled="true">{content}</div>
      )}
    </motion.div>
  );
}
