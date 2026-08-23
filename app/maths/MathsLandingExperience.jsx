"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Target, Flag, Star, Trophy, ArrowRight, Sparkles, Home, ChevronRight } from "lucide-react";
import { CURRICULA } from "@/lib/maths/curricula";
import CurriculumCard from "@/app/components/maths/CurriculumCard";
import ProgressDashboard from "@/app/components/maths/ProgressDashboard";
import DailyChallengeCard from "@/app/components/maths/DailyChallengeCard";
import SaveProgressCard from "@/app/components/maths/SaveProgressCard";
import MathsFaqAccordion from "@/app/components/maths/MathsFaqAccordion";
import { useMathsProgressSync } from "@/app/components/maths/useMathsProgressSync";
import { MATHS_FAQ } from "@/lib/constants/mathsFaq";
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
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
          <Link href="/" className="flex items-center gap-1 hover:text-violet-600">
            <Home className="h-3.5 w-3.5" /> Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-medium text-gray-700 dark:text-gray-200">Maths Challenge</span>
        </nav>

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
            Year 6 Maths{" "}
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

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mt-20 border-t border-gray-200/70 pt-16 dark:border-white/10"
        >
          <motion.h2 variants={fadeUp} className="text-2xl font-bold text-gray-900 dark:text-white">
            Year 6 Maths Practice for Parents, Teachers and British Curriculum Schools
          </motion.h2>

          <motion.div variants={fadeUp} className="prose prose-sm mt-6 max-w-none text-gray-600 dark:prose-invert dark:text-gray-400">
            <p>
              If you&apos;re a parent looking for free Year 6 maths practice online, or a teacher wanting a quick
              way to reinforce a KS2 topic without printing another worksheet, Maths Challenge is built to make
              that easy. It covers the full UK National Curriculum for Year 6 mathematics — the same topic areas
              assessed in the KS2 maths SATs — across 15 topics grouped into Number, Algebra, Measurement,
              Geometry, Statistics and Problem Solving. Every question comes with instant feedback and a plain-
              English explanation of the method, so a wrong answer teaches something instead of just being marked
              incorrect.
            </p>
            <p>
              &quot;Year 6&quot; and &quot;Key Stage 2 (KS2)&quot; are UK terms, but the curriculum behind them
              travels well beyond the UK. Thousands of British curriculum and international schools around the
              world — including many across Pakistan, India, Nigeria, the UAE, the Philippines and Bangladesh —
              teach the same English National Curriculum year groups. If your child&apos;s school follows that
              curriculum rather than a local Grade 6 syllabus, these topics will match what they&apos;re learning
              in class regardless of which country you&apos;re practising from.
            </p>
            <p>
              Each topic — Fractions, Ratio and Proportion, Algebra, Properties of Shapes, and eleven more — is a
              self-contained practice page with its own difficulty picker (Easy, Medium, Hard, or Mixed) and a
              fresh set of randomised questions every time, so repeated practice never turns into memorising a
              fixed answer key. A daily 5-question Daily Maths Challenge changes every day and is sized for a
              quick, consistent practice habit — the kind of short, frequent revision most primary teachers
              recommend over one long weekly session.
            </p>
            <p>
              For parents who want to keep an eye on progress rather than sit through every session, an optional
              free sign-in (no separate account to create — just Google or GitHub) saves a running total of
              points, streaks, badges and topic completion to &quot;My Maths Progress&quot;, viewable any time and
              on any device. It&apos;s entirely optional: a child can practise fully without ever signing in,
              and everything still saves locally in their browser either way.
            </p>
          </motion.div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mt-16"
        >
          <motion.h2 variants={fadeUp} className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </motion.h2>
          <MathsFaqAccordion faqs={MATHS_FAQ} />
        </motion.section>
      </div>
    </main>
  );
}
