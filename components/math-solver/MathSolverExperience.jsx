"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MathText from "./MathText";
import VisualBlock from "./VisualBlock";

const LEVELS = [
  { value: "school", label: "School (11-16)" },
  { value: "college", label: "College" },
  { value: "university", label: "University" },
];

const EXAMPLES = {
  school: "Solve for x: 3x + 7 = 22",
  college: "Find the derivative of f(x) = x^3 - 4x^2 + 2x",
  university: "Evaluate the definite integral of sin(x)cos(x) from 0 to pi/2",
};

export default function MathSolverExperience() {
  const [level, setLevel] = useState("school");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [solution, setSolution] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!question.trim() || loading) return;

    setLoading(true);
    setError(null);
    setSolution(null);

    try {
      const res = await fetch("/api/math-solver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: question.trim(), level }),
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

  return (
    <div className="mx-auto w-full max-w-3xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {LEVELS.map((l) => (
            <button
              key={l.value}
              type="button"
              onClick={() => setLevel(l.value)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                level === l.value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:text-foreground"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        <Textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={`e.g. "${EXAMPLES[level]}"`}
          rows={4}
          maxLength={1000}
          className="resize-none text-base"
        />

        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            {question.length}/1000 &middot; free, a few questions per day
          </p>
          <Button type="submit" disabled={loading || !question.trim()} className="gap-2">
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
            className="mt-6 rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive"
          >
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
              <Badge variant="secondary">{solution.topic}</Badge>
            </div>

            <Card>
              <CardContent>
                <p className="text-sm font-medium text-muted-foreground mb-1">Problem</p>
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
                  <Card>
                    <CardContent>
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                          {i + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium">{step.title}</p>
                          <MathText
                            text={step.explanation}
                            className="mt-1 block text-sm leading-relaxed text-muted-foreground"
                          />
                          <VisualBlock visual={step.visual} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Card className="border-primary/40 bg-primary/5">
              <CardContent>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Final answer</p>
                    <MathText text={solution.finalAnswer} className="text-base font-semibold" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {solution.checkYourself && (
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Try it yourself: </span>
                <MathText text={solution.checkYourself} />
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
