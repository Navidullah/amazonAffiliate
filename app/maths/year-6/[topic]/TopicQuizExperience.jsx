"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";
import { getMathsIcon } from "@/app/components/maths/iconMap";
import QuizEngine from "@/app/components/maths/QuizEngine";
import ResultsScreen from "@/app/components/maths/ResultsScreen";
import ReviewAnswers from "@/app/components/maths/ReviewAnswers";
import { getTopicQuestions, getAllQuestionsForTopic } from "@/lib/maths/bank";
import { saveSessionResult, getProgress, addBadges } from "@/lib/maths/progress";
import { evaluateNewBadges, getBadge } from "@/lib/maths/badges";
import { useMathsProgressSync } from "@/app/components/maths/useMathsProgressSync";

const DIFFICULTIES = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
  { value: "mixed", label: "Mixed" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function TopicQuizExperience({ topic }) {
  const [stage, setStage] = useState("intro"); // intro | quiz | results | review
  const [difficulty, setDifficulty] = useState("mixed");
  const [questions, setQuestions] = useState([]);
  const [sessionResult, setSessionResult] = useState(null);
  const { syncNow } = useMathsProgressSync();

  const Icon = getMathsIcon(topic.icon);
  const totalQuestions = getAllQuestionsForTopic("UK", 6, topic.slug).length;

  const startQuiz = () => {
    setQuestions(getTopicQuestions("UK", 6, topic.slug, difficulty));
    setStage("quiz");
  };

  const handleComplete = (result) => {
    setSessionResult(result);

    const prevProgress = getProgress();
    const nextProgress = saveSessionResult({
      topicSlug: topic.slug,
      answeredQuestions: result.answeredQuestions,
      pointsEarned: result.pointsEarned,
      sessionBestStreak: result.sessionBestStreak,
    });

    const newBadgeIds = evaluateNewBadges(prevProgress, nextProgress);
    let finalProgress = nextProgress;
    if (newBadgeIds.length > 0) {
      finalProgress = addBadges(newBadgeIds);
      newBadgeIds.forEach((id) => {
        const badge = getBadge(id);
        if (badge) toast.success(`🏆 Badge unlocked: ${badge.title}`);
      });
    }

    syncNow(finalProgress);
    setStage("results");
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-4 pb-24 pt-28 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-violet-50/60 via-white to-fuchsia-50/40 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900" />
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-violet-400/20 blur-[120px] dark:bg-violet-600/20" />

      <div className="mx-auto max-w-3xl">
        <Link
          href="/maths/year-6"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-violet-600 dark:text-gray-400 dark:hover:text-violet-300"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Year 6 Topics
        </Link>

        {stage === "intro" && (
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="rounded-3xl border border-gray-200/70 bg-white/80 p-6 text-center backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] sm:p-10">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg">
              <Icon className="h-8 w-8" aria-hidden="true" />
            </span>
            <h1 className="mt-4 text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl">{topic.title}</h1>
            <p className="mx-auto mt-2 max-w-md text-sm text-gray-600 dark:text-gray-400">{topic.shortDescription}</p>
            <p className="mt-1 text-xs font-semibold text-gray-500 dark:text-gray-500">{totalQuestions} questions available</p>

            <div className="mt-8">
              <p className="mb-3 text-sm font-bold text-gray-700 dark:text-gray-300">Choose a difficulty</p>
              <div className="flex flex-wrap justify-center gap-2">
                {DIFFICULTIES.map((d) => (
                  <button
                    key={d.value}
                    type="button"
                    onClick={() => setDifficulty(d.value)}
                    aria-pressed={difficulty === d.value}
                    className={`min-h-[44px] rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                      difficulty === d.value
                        ? "bg-violet-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-white/10 dark:text-gray-300 dark:hover:bg-white/20"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={startQuiz}
              className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-violet-600 px-8 text-base font-semibold text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-700"
            >
              Start Practice <ArrowRight className="h-4 w-4" />
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
