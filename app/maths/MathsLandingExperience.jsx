"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Target, Flag, Star, Trophy, ArrowRight, Sparkles } from "lucide-react";
import { CURRICULA } from "@/lib/maths/curricula";
import CurriculumCard from "@/app/components/maths/CurriculumCard";
import ProgressDashboard from "@/app/components/maths/ProgressDashboard";
import DailyChallengeCard from "@/app/components/maths/DailyChallengeCard";
import SaveProgressCard from "@/app/components/maths/SaveProgressCard";
import { useMathsProgressSync } from "@/app/components/maths/useMathsProgressSync";
import {
  getProgress,
  getOverallProgressPercent,
  getOverallAccuracy,
  getTopicsCompletedCount,
  hasCompletedDailyChallenge,
} from "@/lib/maths/progress";
import { getDailyChallengeDateKey } from "@/lib/maths/bank";
import { UK_YEAR_6_TOPICS } from "@/lib/maths/topics";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const HERO_PILLS = [
  { icon: Target, label: "Year 6 Maths" },
  { icon: Flag, label: "UK Curriculum" },
  { icon: Star, label: "Interactive Questions" },
  { icon: Trophy, label: "Earn Points" },
];

export default function MathsLandingExperience() {
  const [progress, setProgress] = useState(null);
  const { isAuthenticated } = useMathsProgressSync((reconciled) => setProgress(reconciled));

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const hasActivity = progress && progress.questionsAnsweredTotal > 0;
  const dailyCompleted = progress ? hasCompletedDailyChallenge(progress, getDailyChallengeDateKey()) : false;

  return (
    <main className="relative min-h-screen overflow-hidden px-4 pb-24 pt-28 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-violet-50/60 via-white to-fuchsia-50/40 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900" />
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-violet-400/20 blur-[120px] dark:bg-violet-600/20" />
      <div className="pointer-events-none absolute right-0 top-1/3 -z-10 h-[360px] w-[360px] rounded-full bg-fuchsia-400/20 blur-[120px] dark:bg-fuchsia-600/10" />

      <div className="mx-auto max-w-5xl">
        <motion.header variants={stagger} initial="hidden" animate="visible" className="mb-12 text-center">
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-violet-200/70 bg-white/70 px-4 py-1.5 text-xs font-semibold text-violet-700 shadow-sm backdrop-blur dark:border-violet-500/20 dark:bg-white/[0.04] dark:text-violet-300"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Free · No signup needed
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl"
          >
            Maths{" "}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500 bg-clip-text text-transparent dark:from-violet-300 dark:via-fuchsia-300 dark:to-rose-200">
              Challenge
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mx-auto mt-3 max-w-xl text-lg font-semibold text-gray-600 dark:text-gray-300">
            Learn. Practise. Challenge Yourself.
          </motion.p>

          <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-xl text-base text-gray-600 dark:text-gray-400">
            Build your Year 6 maths skills with quick questions, instant feedback and fun challenges.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-6 flex flex-wrap justify-center gap-2">
            {HERO_PILLS.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-gray-200/70 bg-white/70 px-3 py-1.5 text-xs font-semibold text-gray-700 backdrop-blur dark:border-white/10 dark:bg-white/[0.04] dark:text-gray-300"
              >
                <Icon className="h-3.5 w-3.5 text-violet-600 dark:text-violet-300" aria-hidden="true" />
                {label}
              </span>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/maths/year-6"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-violet-600 px-8 text-base font-semibold text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-700"
            >
              Start Maths Challenge <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#topics"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-8 text-base font-semibold text-gray-800 transition-colors hover:bg-gray-50 dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-200 dark:hover:bg-white/[0.06]"
            >
              Explore Topics
            </a>
          </motion.div>
        </motion.header>

        {hasActivity && (
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-10 space-y-3">
            <ProgressDashboard
              overallProgressPercent={getOverallProgressPercent(progress)}
              totalPoints={progress.totalPoints}
              questionsAnsweredTotal={progress.questionsAnsweredTotal}
              accuracy={getOverallAccuracy(progress)}
              topicsCompleted={getTopicsCompletedCount(progress)}
              totalTopics={UK_YEAR_6_TOPICS.length}
            />
            {!isAuthenticated && <SaveProgressCard />}
          </motion.div>
        )}

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-10">
          <DailyChallengeCard completed={dailyCompleted} />
        </motion.div>

        <motion.section id="topics" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.h2 variants={fadeUp} className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white">
            Choose Your Curriculum
          </motion.h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {CURRICULA.map((curriculum) => (
              <CurriculumCard key={curriculum.code} curriculum={curriculum} variants={fadeUp} />
            ))}
          </div>
        </motion.section>
      </div>
    </main>
  );
}
