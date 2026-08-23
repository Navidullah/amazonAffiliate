"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const DIFFICULTY_LABEL = { easy: "Easy", medium: "Medium", hard: "Hard" };

function normalize(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/£/g, "£"); // keep currency symbol but normalise spacing above
}

/** Renders one question (multiple-choice or type-answer), handles the
 * answer/feedback/explanation flow, and calls onNext with the outcome. */
export default function QuestionCard({ question, index, total, onNext }) {
  const [selected, setSelected] = useState(null);
  const [typedValue, setTypedValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const isTypeAnswer = question.questionType === "type-answer";

  const submitAnswer = (answer) => {
    if (submitted) return;
    const correct = normalize(answer) === normalize(question.correctAnswer);
    setIsCorrect(correct);
    setSubmitted(true);
  };

  const handleSelect = (option) => {
    if (submitted) return;
    setSelected(option);
    submitAnswer(option);
  };

  const handleTypedSubmit = (e) => {
    e.preventDefault();
    if (!typedValue.trim()) return;
    submitAnswer(typedValue);
  };

  const handleNext = () => {
    const userAnswer = isTypeAnswer ? typedValue : selected;
    onNext({ id: question.id, correct: isCorrect, userAnswer, points: question.points });
  };

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.25 }}
      className="rounded-3xl border border-gray-200/70 bg-white/80 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] sm:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
        <span>
          Question {index + 1} of {total}
        </span>
        <span className="flex items-center gap-2">
          <span className="text-violet-600 dark:text-violet-300">{question.topic}</span>
          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 dark:bg-white/10">
            {DIFFICULTY_LABEL[question.difficulty] || question.difficulty}
          </span>
        </span>
      </div>

      <h2 className="mt-4 text-xl font-bold leading-snug text-gray-900 dark:text-white sm:text-2xl">
        {question.question}
      </h2>

      {!isTypeAnswer ? (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {question.options.map((option, i) => {
            const letter = String.fromCharCode(65 + i);
            const isSelected = selected === option;
            const isThisCorrect = option === question.correctAnswer;

            let stateClass =
              "border-gray-200 bg-white hover:border-violet-300 hover:bg-violet-50 dark:border-white/10 dark:bg-white/[0.02] dark:hover:bg-white/[0.06]";
            if (submitted && isThisCorrect) {
              stateClass = "border-emerald-400 bg-emerald-50 dark:border-emerald-500/40 dark:bg-emerald-500/10";
            } else if (submitted && isSelected && !isThisCorrect) {
              stateClass = "border-rose-400 bg-rose-50 dark:border-rose-500/40 dark:bg-rose-500/10";
            } else if (submitted) {
              stateClass = "border-gray-200 bg-white opacity-60 dark:border-white/10 dark:bg-white/[0.02]";
            }

            return (
              <button
                key={option}
                type="button"
                onClick={() => handleSelect(option)}
                disabled={submitted}
                aria-pressed={isSelected}
                className={`flex min-h-[52px] items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left text-sm font-medium text-gray-800 transition-colors disabled:cursor-not-allowed dark:text-gray-100 ${stateClass}`}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600 dark:bg-white/10 dark:text-gray-300">
                  {letter}
                </span>
                <span className="flex-1">{option}</span>
                {submitted && isThisCorrect && (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                )}
                {submitted && isSelected && !isThisCorrect && (
                  <XCircle className="h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>
      ) : (
        <form onSubmit={handleTypedSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
          <label htmlFor={`answer-${question.id}`} className="sr-only">
            Your answer
          </label>
          <Input
            id={`answer-${question.id}`}
            value={typedValue}
            onChange={(e) => setTypedValue(e.target.value)}
            disabled={submitted}
            placeholder="Type your answer..."
            className={`h-12 flex-1 rounded-2xl text-base ${
              submitted
                ? isCorrect
                  ? "border-emerald-400 bg-emerald-50 dark:border-emerald-500/40 dark:bg-emerald-500/10"
                  : "border-rose-400 bg-rose-50 dark:border-rose-500/40 dark:bg-rose-500/10"
                : ""
            }`}
            autoComplete="off"
          />
          {!submitted && (
            <Button type="submit" className="h-12 rounded-2xl px-6">
              Check Answer
            </Button>
          )}
        </form>
      )}

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 overflow-hidden"
          >
            <div
              className={`rounded-2xl border p-4 ${
                isCorrect
                  ? "border-emerald-200 bg-emerald-50 dark:border-emerald-500/30 dark:bg-emerald-500/10"
                  : "border-amber-200 bg-amber-50 dark:border-amber-500/30 dark:bg-amber-500/10"
              }`}
            >
              <p
                className={`flex items-center gap-2 text-sm font-bold ${
                  isCorrect ? "text-emerald-700 dark:text-emerald-300" : "text-amber-700 dark:text-amber-300"
                }`}
              >
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="h-5 w-5" aria-hidden="true" /> Excellent! +{question.points} points
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5" aria-hidden="true" /> Not quite!
                  </>
                )}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                {question.explanation}
              </p>
            </div>

            <Button onClick={handleNext} className="mt-4 h-12 w-full rounded-2xl text-base font-semibold sm:w-auto">
              {index + 1 === total ? "See Results" : "Next Question"} <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
