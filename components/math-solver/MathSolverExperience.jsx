"use client";

import { useId, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Loader2,
  CheckCircle2,
  GraduationCap,
  BookOpen,
  Landmark,
  Lightbulb,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MathText from "./MathText";
import VisualBlock from "./VisualBlock";

const LEVELS = [
  { value: "school", label: "School", sub: "Ages 11-16", icon: GraduationCap },
  { value: "college", label: "College", sub: "A-Level / pre-uni", icon: BookOpen },
  { value: "university", label: "University", sub: "Degree level", icon: Landmark },
];

const EXAMPLES = {
  school: [
    "Solve for x: 3x + 7 = 22",
    "What is 3/4 + 1/6?",
    "Find the area of a triangle with base 8cm and height 5cm",
  ],
  college: [
    "Find the derivative of f(x) = x^3 - 4x^2 + 2x",
    "Solve the quadratic: 2x^2 - 5x - 3 = 0",
    "Find sin(30°) + cos(60°) without a calculator",
  ],
  university: [
    "Evaluate the definite integral of sin(x)cos(x) from 0 to pi/2",
    "Find the eigenvalues of the matrix [[2,1],[1,2]]",
    "Solve the differential equation dy/dx = 3y",
  ],
};

export default function MathSolverExperience() {
  const [level, setLevel] = useState("school");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [solution, setSolution] = useState(null);
  const textareaId = useId();

  async function solveQuestion(q, lvl) {
    if (!q.trim() || loading) return;

    setLoading(true);
    setError(null);
    setSolution(null);

    try {
      const res = await fetch("/api/math-solver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q.trim(), level: lvl }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setSolution(data.solution);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    solveQuestion(question, level);
  }

  function handleExampleClick(example) {
    setQuestion(example);
    solveQuestion(example, level);
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Step 1: level picker */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            1. Choose your level
          </label>
          <div className="grid grid-cols-3 gap-2">
            {LEVELS.map((l) => {
              const Icon = l.icon;
              const active = level === l.value;
              return (
                <button
                  key={l.value}
                  type="button"
                  onClick={() => setLevel(l.value)}
                  aria-pressed={active}
                  className={`flex flex-col items-center gap-1 rounded-2xl border px-2 py-3 text-center transition-colors ${
                    active
                      ? "border-violet-600 bg-violet-600 text-white shadow-md shadow-violet-600/20"
                      : "border-gray-200 bg-white/70 text-gray-700 backdrop-blur hover:border-violet-200 hover:bg-violet-50 dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-300 dark:hover:bg-white/[0.06]"
                  }`}
                >
                  <Icon className={`h-5 w-5 ${active ? "text-white" : "text-violet-600 dark:text-violet-300"}`} />
                  <span className="text-sm font-semibold">{l.label}</span>
                  <span className={`text-[11px] ${active ? "text-white/80" : "text-gray-500 dark:text-gray-400"}`}>
                    {l.sub}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: question input */}
        <div>
          <label
            htmlFor={textareaId}
            className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"
          >
            2. Type your question
          </label>
          <Textarea
            id={textareaId}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={`e.g. "${EXAMPLES[level][0]}"`}
            rows={4}
            maxLength={1000}
            className="resize-none rounded-2xl border-gray-200 bg-white/70 text-base backdrop-blur dark:border-white/10 dark:bg-white/[0.03]"
          />
          <p className="mt-2 flex items-start gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-500" />
            Tip: include the actual numbers or equation — the more specific your question, the clearer the
            explanation.
          </p>
        </div>

        {/* Quick-start examples */}
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Or try an example
          </p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLES[level].map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => handleExampleClick(example)}
                disabled={loading}
                className="rounded-full border border-gray-200 bg-white/70 px-3 py-1.5 text-xs font-medium text-gray-700 backdrop-blur transition-colors hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 disabled:opacity-50 dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-300 dark:hover:bg-white/[0.06]"
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {question.length}/1000 &middot; free, a few questions per day
          </p>
          <Button
            type="submit"
            disabled={loading || !question.trim()}
            className="gap-2 rounded-2xl bg-violet-600 hover:bg-violet-700"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Solving...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" /> Solve step by step
              </>
            )}
          </Button>
        </div>
      </form>

      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 flex items-start gap-2 rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            {error}
          </motion.div>
        )}

        {solution && (
          <motion.div
            key="solution"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-8 space-y-4"
          >
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="rounded-full bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
                {solution.topic}
              </Badge>
            </div>

            <Card className="rounded-2xl border-gray-200/80 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/[0.03]">
              <CardContent>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Problem</p>
                <MathText text={solution.restatedProblem} className="text-base" />
              </CardContent>
            </Card>

            <div className="space-y-4">
              {solution.steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Card className="rounded-2xl border-gray-200/80 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/[0.03]">
                    <CardContent>
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-semibold text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
                          {i + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 dark:text-gray-100">{step.title}</p>
                          <MathText
                            text={step.explanation}
                            className="mt-1 block text-sm leading-relaxed text-gray-600 dark:text-gray-400"
                          />
                          <VisualBlock visual={step.visual} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Card className="rounded-2xl border-violet-200 bg-violet-50 dark:border-violet-500/20 dark:bg-violet-500/10">
              <CardContent>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-violet-600 dark:text-violet-300" />
                  <div>
                    <p className="text-sm font-medium text-violet-700 dark:text-violet-300">Final answer</p>
                    <MathText text={solution.finalAnswer} className="text-base font-semibold text-gray-900 dark:text-gray-100" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {solution.checkYourself && (
              <p className="rounded-2xl border border-gray-200/80 bg-white/70 p-4 text-sm text-gray-600 backdrop-blur dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-400">
                <span className="font-semibold text-gray-900 dark:text-gray-100">Check yourself: </span>
                <MathText text={solution.checkYourself} />
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
