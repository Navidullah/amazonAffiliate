"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import TopicCard from "@/app/components/maths/TopicCard";
import ProgressDashboard from "@/app/components/maths/ProgressDashboard";
import SaveProgressCard from "@/app/components/maths/SaveProgressCard";
import { useMathsProgressSync } from "@/app/components/maths/useMathsProgressSync";
import { getTopicsByCategory, UK_YEAR_6_TOPICS } from "@/lib/maths/topics";
import { getAllQuestionsForTopic } from "@/lib/maths/bank";
import {
  getProgress,
  getOverallProgressPercent,
  getOverallAccuracy,
  getTopicsCompletedCount,
  getTopicProgressPercent,
} from "@/lib/maths/progress";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function Year6TopicsExperience() {
  const [progress, setProgress] = useState(null);
  const { isAuthenticated } = useMathsProgressSync((reconciled) => setProgress(reconciled));

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const groups = getTopicsByCategory();

  return (
    <main className="relative min-h-screen overflow-hidden px-4 pb-24 pt-28 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-violet-50/60 via-white to-fuchsia-50/40 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900" />
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-violet-400/20 blur-[120px] dark:bg-violet-600/20" />

      <div className="mx-auto max-w-6xl">
        <Link
          href="/maths"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-violet-600 dark:text-gray-400 dark:hover:text-violet-300"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Maths Challenge
        </Link>

        <motion.header variants={stagger} initial="hidden" animate="visible" className="mb-10">
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-violet-200/70 bg-white/70 px-4 py-1.5 text-xs font-semibold text-violet-700 shadow-sm backdrop-blur dark:border-violet-500/20 dark:bg-white/[0.04] dark:text-violet-300"
          >
            <Sparkles className="h-3.5 w-3.5" /> 🇬🇧 UK KS2 · Year 6
          </motion.span>
          <motion.h1 variants={fadeUp} className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Year 6 Maths Topics
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-2 max-w-2xl text-base text-gray-600 dark:text-gray-400">
            Pick a topic below to start practising. Every topic mixes easy, medium and hard questions with instant feedback.
          </motion.p>
        </motion.header>

        {progress && progress.questionsAnsweredTotal > 0 && (
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

        <div className="space-y-12">
          {groups.map(({ category, topics }) => (
            <section key={category}>
              <h2 className="mb-4 text-lg font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                {category}
              </h2>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={stagger}
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
              >
                {topics.map((topic) => (
                  <TopicCard
                    key={topic.slug}
                    topic={topic}
                    questionCount={getAllQuestionsForTopic("UK", 6, topic.slug).length}
                    progressPercent={progress ? getTopicProgressPercent(progress, topic.slug) : 0}
                    variants={fadeUp}
                  />
                ))}
              </motion.div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
