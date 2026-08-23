"use client";

import { Lock } from "lucide-react";
import { BADGES } from "@/lib/maths/badges";
import { getMathsIcon } from "./iconMap";

export default function BadgeGrid({ unlockedBadgeIds = [] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
      {BADGES.map((badge) => {
        const Icon = getMathsIcon(badge.icon);
        const unlocked = unlockedBadgeIds.includes(badge.id);

        return (
          <div
            key={badge.id}
            className={`flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-colors ${
              unlocked
                ? "border-violet-200/70 bg-white/80 dark:border-violet-500/20 dark:bg-white/[0.04]"
                : "border-gray-200/60 bg-gray-50/70 dark:border-white/10 dark:bg-white/[0.02]"
            }`}
          >
            <span
              className={`flex h-12 w-12 items-center justify-center rounded-full ${
                unlocked
                  ? "bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white"
                  : "bg-gray-200 text-gray-400 dark:bg-white/10 dark:text-gray-500"
              }`}
            >
              {unlocked ? (
                <Icon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Lock className="h-5 w-5" aria-hidden="true" />
              )}
            </span>
            <span
              className={`text-xs font-bold ${unlocked ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-500"}`}
            >
              {badge.title}
            </span>
            <span className="text-[11px] leading-snug text-gray-500 dark:text-gray-500">
              {badge.description}
            </span>
          </div>
        );
      })}
    </div>
  );
}
