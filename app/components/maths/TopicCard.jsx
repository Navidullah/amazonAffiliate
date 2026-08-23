"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getMathsIcon } from "./iconMap";
import { Progress } from "@/components/ui/progress";

const DIFFICULTY_STYLE = {
  Easy: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  Mixed: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  Challenging: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
};

export default function TopicCard({ topic, questionCount, progressPercent, variants }) {
  const Icon = getMathsIcon(topic.icon);
  // Every topic bank mixes easy/medium/hard, so the badge communicates that
  // honestly rather than implying a single fixed difficulty.
  const difficultyLabel = "Mixed";

  return (
    <motion.div variants={variants} className="h-full">
      <div className="group flex h-full flex-col rounded-3xl border border-gray-200/70 bg-white/70 p-6 backdrop-blur-xl transition-all hover:-translate-y-1 hover:shadow-[0_24px_64px_-30px_rgba(124,58,237,0.45)] dark:border-white/10 dark:bg-white/[0.03]">
        <div className="flex items-start justify-between gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-sm">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </span>
          <span
            className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${DIFFICULTY_STYLE[difficultyLabel]}`}
          >
            {difficultyLabel}
          </span>
        </div>

        <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">{topic.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {topic.shortDescription}
        </p>

        <div className="mt-5 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-medium text-gray-500 dark:text-gray-400">
            <span>Progress</span>
            <span>{progressPercent}%</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
            {questionCount} questions
          </span>
          <Link
            href={`/maths/year-6/${topic.slug}`}
            className="inline-flex items-center gap-1 rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-violet-700 group-hover:gap-2"
          >
            Practice <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
