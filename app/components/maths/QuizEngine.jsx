"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star, Flame } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import QuestionCard from "./QuestionCard";
import { getStreakBonus } from "@/lib/maths/scoring";

/**
 * Orchestrates one quiz session end-to-end. Deliberately takes an
 * already-resolved `questions` array (not a topic lookup) so both the
 * topic-practice flow and the daily challenge can share this component.
 */
export default function QuizEngine({ questions, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [awardedStreakBonuses, setAwardedStreakBonuses] = useState(new Set());
  const [answeredLog, setAnsweredLog] = useState([]);

  const total = questions.length;
  const question = questions[currentIndex];

  const handleNext = ({ id, correct, userAnswer, points }) => {
    let nextScore = score;
    let nextStreak = streak;
    let nextAwarded = awardedStreakBonuses;

    if (correct) {
      nextStreak = streak + 1;
      const { bonus, awardedStreakBonuses: updated } = getStreakBonus(nextStreak, awardedStreakBonuses);
      nextScore = score + points + bonus;
      nextAwarded = updated;
    } else {
      nextStreak = 0;
    }

    const nextBestStreak = Math.max(bestStreak, nextStreak);
    const nextLog = [...answeredLog, { id, correct, userAnswer, question }];

    setScore(nextScore);
    setStreak(nextStreak);
    setBestStreak(nextBestStreak);
    setAwardedStreakBonuses(nextAwarded);
    setAnsweredLog(nextLog);

    if (currentIndex + 1 < total) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete({
        answeredQuestions: nextLog.map(({ id: qid, correct: c, userAnswer: ua }) => ({
          id: qid,
          correct: c,
          userAnswer: ua,
        })),
        answeredLog: nextLog,
        pointsEarned: nextScore,
        sessionBestStreak: nextBestStreak,
        correctCount: nextLog.filter((a) => a.correct).length,
        totalCount: total,
      });
    }
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex-1">
          <Progress value={(currentIndex / total) * 100} className="h-2" />
        </div>
        <div className="flex shrink-0 items-center gap-3 text-sm font-bold">
          <span className="flex items-center gap-1 text-amber-600 dark:text-amber-300">
            <Star className="h-4 w-4 fill-current" /> {score}
          </span>
          {streak > 0 && (
            <span className="flex items-center gap-1 text-orange-600 dark:text-orange-300">
              <Flame className="h-4 w-4 fill-current" /> {streak}
            </span>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <QuestionCard key={question.id} question={question} index={currentIndex} total={total} onNext={handleNext} />
      </AnimatePresence>
    </div>
  );
}
