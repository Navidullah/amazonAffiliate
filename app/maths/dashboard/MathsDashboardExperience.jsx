"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, LogIn } from "lucide-react";
import ProgressDashboard from "@/app/components/maths/ProgressDashboard";
import BadgeGrid from "@/app/components/maths/BadgeGrid";
import { getMathsIcon } from "@/app/components/maths/iconMap";
import { useMathsProgressSync } from "@/app/components/maths/useMathsProgressSync";
import {
  getProgress,
  getOverallProgressPercent,
  getOverallAccuracy,
  getTopicsCompletedCount,
  getTopicProgressPercent,
} from "@/lib/maths/progress";
import { UK_YEAR_6_TOPICS } from "@/lib/maths/topics";
import { getAllQuestionsForTopic } from "@/lib/maths/bank";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

function SignInPrompt() {
  return (
    <div className="rounded-3xl border border-gray-200/70 bg-white/80 p-10 text-center backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg">
        <LogIn className="h-7 w-7" aria-hidden="true" />
      </span>
      <h1 className="mt-4 text-2xl font-extrabold text-gray-900 dark:text-white">My Maths Progress</h1>
      <p className="mx-auto mt-2 max-w-sm text-sm text-gray-600 dark:text-gray-400">
        Sign in to see your saved progress, points and badges across every device.
      </p>
      <button
        type="button"
        onClick={() => signIn()}
        className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-violet-600 px-8 text-base font-semibold text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-700"
      >
        Sign In
      </button>
      <p className="mt-4 text-xs text-gray-500 dark:text-gray-500">
        You can still practise without signing in — progress just won&apos;t follow you between devices.
      </p>
    </div>
  );
}

function TopicRow({ topic, progress }) {
  const Icon = getMathsIcon(topic.icon);
  const percent = getTopicProgressPercent(progress, topic.slug);
  const attempts = progress.topics[topic.slug]?.attempts || 0;
  const accuracy = progress.topics[topic.slug]?.bestAccuracy || 0;
  const total = getAllQuestionsForTopic("UK", 6, topic.slug).length;

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-gray-200/70 bg-white/70 px-4 py-3 dark:border-white/10 dark:bg-white/[0.03]">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="min-w-[140px] flex-1">
        <p className="text-sm font-bold text-gray-900 dark:text-white">{topic.title}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {attempts > 0 ? `${attempts} attempt${attempts === 1 ? "" : "s"} · Best accuracy ${accuracy}%` : "Not started yet"}
        </p>
      </div>
      <span className="text-sm font-bold text-violet-600 dark:text-violet-300">{percent}%</span>
      <span className="text-xs text-gray-400 dark:text-gray-500">of {total} questions</span>
      <Link
        href={`/maths/year-6/${topic.slug}`}
        className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-700 transition-colors hover:bg-violet-100 hover:text-violet-700 dark:bg-white/10 dark:text-gray-300 dark:hover:bg-violet-500/20 dark:hover:text-violet-200"
      >
        Practice <ArrowRight className="h-3 w-3" />
      </Link>
    </div>
  );
}

export default function MathsDashboardExperience() {
  const { status } = useSession();
  const [progress, setProgress] = useState(null);

  useMathsProgressSync((reconciled) => setProgress(reconciled));

  useEffect(() => {
    if (status === "authenticated") setProgress(getProgress());
  }, [status]);

  return (
    <main className="relative min-h-screen overflow-hidden px-4 pb-24 pt-28 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-violet-50/60 via-white to-fuchsia-50/40 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900" />
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-violet-400/20 blur-[120px] dark:bg-violet-600/20" />

      <div className="mx-auto max-w-3xl">
        <Link
          href="/maths"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-violet-600 dark:text-gray-400 dark:hover:text-violet-300"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Maths Challenge
        </Link>

        {status !== "authenticated" ? (
          <SignInPrompt />
        ) : !progress ? (
          <div className="rounded-3xl border border-gray-200/70 bg-white/70 p-10 text-center text-sm text-gray-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-400">
            Loading your progress...
          </div>
        ) : (
          <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-8">
            <motion.h1 variants={fadeUp} className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              My Maths Progress
            </motion.h1>

            <motion.div variants={fadeUp}>
              <ProgressDashboard
                overallProgressPercent={getOverallProgressPercent(progress)}
                totalPoints={progress.totalPoints}
                questionsAnsweredTotal={progress.questionsAnsweredTotal}
                accuracy={getOverallAccuracy(progress)}
                topicsCompleted={getTopicsCompletedCount(progress)}
                totalTopics={UK_YEAR_6_TOPICS.length}
              />
            </motion.div>

            <motion.div variants={fadeUp}>
              <h2 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">Badges</h2>
              <BadgeGrid unlockedBadgeIds={progress.badges} />
            </motion.div>

            <motion.div variants={fadeUp}>
              <h2 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">Topics</h2>
              <div className="space-y-2">
                {UK_YEAR_6_TOPICS.map((topic) => (
                  <TopicRow key={topic.slug} topic={topic} progress={progress} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
