"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Rocket } from "lucide-react";

// Below this, showing the raw number looks more like "nobody uses this"
// than social proof — an honest early-access framing reads better than a
// tiny counter without inflating anything.
const EARLY_ACCESS_THRESHOLD = 25;

export default function UsageCounter() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/math-solver/stats")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setStats(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  if (!stats) return null;

  const isEarlyAccess = stats.uniqueUsers < EARLY_ACCESS_THRESHOLD;

  return (
    <motion.span
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex items-center gap-1.5 rounded-full border border-gray-200/70 bg-white/70 px-3 py-1.5 text-xs font-semibold text-gray-700 backdrop-blur dark:border-white/10 dark:bg-white/[0.04] dark:text-gray-300"
    >
      {isEarlyAccess ? (
        <>
          <Rocket className="h-3.5 w-3.5 text-violet-600 dark:text-violet-300" aria-hidden="true" />
          Just launched — be one of our first students
        </>
      ) : (
        <>
          <Users className="h-3.5 w-3.5 text-violet-600 dark:text-violet-300" aria-hidden="true" />
          {stats.uniqueUsers.toLocaleString()} students helped so far
        </>
      )}
    </motion.span>
  );
}
