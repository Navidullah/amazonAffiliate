"use client";

import { CheckCircle2, XCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Question-by-question breakdown, shown after results — teaches, not just
 * marks right/wrong (per spec section 12). */
export default function ReviewAnswers({ answeredLog, onBack }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Review Your Answers</h2>
        <Button onClick={onBack} variant="ghost" className="gap-1.5">
          <ArrowLeft className="h-4 w-4" /> Back to results
        </Button>
      </div>

      {answeredLog.map(({ question, correct, userAnswer }, i) => (
        <div
          key={question.id}
          className={`rounded-2xl border p-5 ${
            correct
              ? "border-emerald-200 bg-emerald-50/60 dark:border-emerald-500/25 dark:bg-emerald-500/5"
              : "border-rose-200 bg-rose-50/60 dark:border-rose-500/25 dark:bg-rose-500/5"
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {i + 1}. {question.question}
            </p>
            {correct ? (
              <span className="flex shrink-0 items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                <CheckCircle2 className="h-4 w-4" /> Correct
              </span>
            ) : (
              <span className="flex shrink-0 items-center gap-1 text-xs font-bold text-rose-700 dark:text-rose-300">
                <XCircle className="h-4 w-4" /> Incorrect
              </span>
            )}
          </div>

          <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Your answer:</span> {userAnswer || "—"}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Correct answer:</span> {question.correctAnswer}
            </p>
          </div>

          <p className="mt-3 rounded-xl bg-white/70 p-3 text-sm leading-relaxed text-gray-600 dark:bg-white/[0.04] dark:text-gray-400">
            {question.explanation}
          </p>
        </div>
      ))}
    </div>
  );
}
