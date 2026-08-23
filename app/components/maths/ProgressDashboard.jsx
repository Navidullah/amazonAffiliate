"use client";

import { Star, Target, ListChecks, Trophy } from "lucide-react";
import { Progress } from "@/components/ui/progress";

/** "My Maths Progress" summary card — used on both /maths and /maths/year-6. */
export default function ProgressDashboard({
  overallProgressPercent,
  totalPoints,
  questionsAnsweredTotal,
  accuracy,
  topicsCompleted,
  totalTopics,
}) {
  const stats = [
    { icon: Star, label: "Points", value: totalPoints },
    { icon: ListChecks, label: "Questions Completed", value: questionsAnsweredTotal },
    { icon: Target, label: "Accuracy", value: `${accuracy}%` },
    { icon: Trophy, label: "Topics Completed", value: `${topicsCompleted} / ${totalTopics}` },
  ];

  return (
    <div className="rounded-3xl border border-gray-200/70 bg-white/70 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">My Maths Progress</h2>
        <span className="text-sm font-semibold text-violet-600 dark:text-violet-300">
          Overall Progress: {overallProgressPercent}%
        </span>
      </div>

      <Progress value={overallProgressPercent} className="mt-3 h-2.5" />

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-1.5 rounded-2xl bg-gray-50/80 px-3 py-4 text-center dark:bg-white/[0.04]"
          >
            <Icon className="h-5 w-5 text-violet-600 dark:text-violet-300" aria-hidden="true" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">{value}</span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
