"use client";

import { motion } from "framer-motion";
import { PartyPopper, CheckCircle2, XCircle, Target, Star, Flame, RotateCcw, LayoutGrid, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";
import { calculateAccuracy } from "@/lib/maths/scoring";

const MESSAGES = [
  { min: 90, text: "Outstanding work!" },
  { min: 70, text: "Excellent work!" },
  { min: 50, text: "Good effort — keep practising!" },
  { min: 0, text: "Nice try — practice makes perfect!" },
];

function getMessage(accuracy) {
  return MESSAGES.find((m) => accuracy >= m.min)?.text || MESSAGES.at(-1).text;
}

export default function ResultsScreen({ correctCount, totalCount, pointsEarned, bestStreak, onTryAgain, onChooseAnother, onReview }) {
  const incorrectCount = totalCount - correctCount;
  const accuracy = calculateAccuracy(correctCount, totalCount);

  const stats = [
    { icon: CheckCircle2, label: "Correct answers", value: correctCount, tone: "text-emerald-600 dark:text-emerald-300" },
    { icon: XCircle, label: "Incorrect answers", value: incorrectCount, tone: "text-rose-600 dark:text-rose-300" },
    { icon: Target, label: "Accuracy", value: `${accuracy}%`, tone: "text-violet-600 dark:text-violet-300" },
    { icon: Star, label: "Points earned", value: pointsEarned, tone: "text-amber-600 dark:text-amber-300" },
    { icon: Flame, label: "Best streak", value: bestStreak, tone: "text-orange-600 dark:text-orange-300" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="rounded-3xl border border-gray-200/70 bg-white/80 p-6 text-center backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] sm:p-10"
    >
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg">
        <PartyPopper className="h-8 w-8" aria-hidden="true" />
      </span>
      <h2 className="mt-4 text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl">
        Challenge Complete!
      </h2>
      <p className="mt-1 text-lg font-bold text-gray-700 dark:text-gray-300">
        You scored {correctCount} / {totalCount}
      </p>
      <p className="mt-1 text-sm font-medium text-gray-500 dark:text-gray-400">{getMessage(accuracy)}</p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {stats.map(({ icon: Icon, label, value, tone }) => (
          <div key={label} className="flex flex-col items-center gap-1.5 rounded-2xl bg-gray-50/80 px-3 py-4 dark:bg-white/[0.04]">
            <Icon className={`h-5 w-5 ${tone}`} aria-hidden="true" />
            <span className="text-lg font-bold text-gray-900 dark:text-white">{value}</span>
            <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400">{label}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Button onClick={onTryAgain} variant="outline" className="h-12 rounded-2xl gap-2 text-base font-semibold">
          <RotateCcw className="h-4 w-4" /> Try Again
        </Button>
        <Button onClick={onChooseAnother} variant="outline" className="h-12 rounded-2xl gap-2 text-base font-semibold">
          <LayoutGrid className="h-4 w-4" /> Choose Another Topic
        </Button>
        <Button onClick={onReview} className="h-12 rounded-2xl gap-2 text-base font-semibold">
          <ListChecks className="h-4 w-4" /> Review Answers
        </Button>
      </div>
    </motion.div>
  );
}
