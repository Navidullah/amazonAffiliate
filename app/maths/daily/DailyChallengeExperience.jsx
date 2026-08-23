"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { toast } from "react-toastify";
import QuizEngine from "@/app/components/maths/QuizEngine";
import ResultsScreen from "@/app/components/maths/ResultsScreen";
import ReviewAnswers from "@/app/components/maths/ReviewAnswers";
import { getDailyChallengeQuestions, getDailyChallengeDateKey } from "@/lib/maths/bank";
import { saveSessionResult, getProgress, addBadges } from "@/lib/maths/progress";
import { evaluateNewBadges, getBadge } from "@/lib/maths/badges";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function DailyChallengeExperience() {
  const [stage, setStage] = useState("intro"); // intro | quiz | results | review
  const [questions, setQuestions] = useState([]);
  const [sessionResult, setSessionResult] = useState(null);

  const dateKey = getDailyChallengeDateKey();

  const startQuiz = () => {
    setQuestions(getDailyChallengeQuestions(new Date()));
    setStage("quiz");
  };

  const handleComplete = (result) => {
    setSessionResult(result);

    const prevProgress = getProgress();
    const nextProgress = saveSessionResult({
      isDailyChallenge: true,
      dateKey,
      answeredQuestions: result.answeredQuestions,
      pointsEarned: result.pointsEarned,
      sessionBestStreak: result.sessionBestStreak,
    });

    const newBadgeIds = evaluateNewBadges(prevProgress, nextProgress);
    if (newBadgeIds.length > 0) {
      addBadges(newBadgeIds);
      newBadgeIds.forEach((id) => {
        const badge = getBadge(id);
        if (badge) toast.success(`🏆 Badge unlocked: ${badge.title}`);
      });
    }

    setStage("results");
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-4 pb-24 pt-28 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-amber-50/60 via-white to-orange-50/40 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900" />
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-amber-400/20 blur-[120px] dark:bg-amber-600/20" />

      <div className="mx-auto max-w-3xl">
        <Link
          href="/maths"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-amber-600 dark:text-gray-400 dark:hover:text-amber-300"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Maths Challenge
        </Link>

        {stage === "intro" && (
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="rounded-3xl border border-amber-200/70 bg-white/80 p-6 text-center backdrop-blur-xl dark:border-amber-500/20 dark:bg-white/[0.04] sm:p-10">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg">
              <Sparkles className="h-8 w-8" aria-hidden="true" />
            </span>
            <h1 className="mt-4 text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl">Daily Maths Challenge</h1>
            <p className="mx-auto mt-2 max-w-md text-sm text-gray-600 dark:text-gray-400">
              A fresh mix of 5 questions from across Year 6 topics, picked just for today.
            </p>

            <button
              type="button"
              onClick={startQuiz}
              className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-amber-500 px-8 text-base font-semibold text-white shadow-lg shadow-amber-500/25 transition-colors hover:bg-amber-600"
            >
              Start Today&apos;s Challenge <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        )}

        {stage === "quiz" && <QuizEngine questions={questions} onComplete={handleComplete} />}

        {stage === "results" && sessionResult && (
          <ResultsScreen
            correctCount={sessionResult.correctCount}
            totalCount={sessionResult.totalCount}
            pointsEarned={sessionResult.pointsEarned}
            bestStreak={sessionResult.sessionBestStreak}
            onTryAgain={() => setStage("intro")}
            onChooseAnother={() => {
              window.location.href = "/maths/year-6";
            }}
            onReview={() => setStage("review")}
          />
        )}

        {stage === "review" && sessionResult && (
          <ReviewAnswers answeredLog={sessionResult.answeredLog} onBack={() => setStage("results")} />
        )}
      </div>
    </main>
  );
}
