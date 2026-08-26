"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Home,
  ChevronRight,
  Sparkles,
  PenLine,
  Wand2,
  LineChart,
  GraduationCap,
  Clock,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import MathSolverExperience from "./MathSolverExperience";
import MathsFaqAccordion from "@/app/components/maths/MathsFaqAccordion";
import { MATH_SOLVER_FAQ } from "@/lib/constants/mathSolverFaq";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const HERO_PILLS = [
  { icon: Clock, label: "Instant Step-by-Step" },
  { icon: GraduationCap, label: "School to University" },
  { icon: LineChart, label: "Diagrams & Graphs" },
  { icon: ShieldCheck, label: "Free · No Signup" },
];

const HOW_IT_WORKS = [
  {
    icon: PenLine,
    title: "Type your question",
    body: "Paste or type any maths question — an equation, a word problem, a derivative, anything. Pick a level (School, College or University) so the explanation matches how you're learning it.",
  },
  {
    icon: Wand2,
    title: "AI solves it step by step",
    body: "You get the full working, broken into numbered steps in plain English — never just the final answer. Each step shows exactly why that move was made, not only what it was.",
  },
  {
    icon: LineChart,
    title: "See diagrams, graphs & tables",
    body: "When a visual genuinely helps — a plotted function, a labelled shape, a data table — it's generated automatically alongside the written steps, not left for you to imagine.",
  },
];

const TIPS = [
  "Include the actual numbers or equation — \"solve 2x + 5 = 17\" works far better than \"help with algebra\".",
  "Ask one question at a time. For a multi-part problem, submit each part separately for a clearer, more focused answer.",
  "Choose the right level. School, College and University change how much detail and which notation is used.",
  "Already tried something? Mention where you got stuck and the explanation can pick up from there instead of starting over.",
];

export default function MathSolverPageExperience() {
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
          <Link href="/maths" className="hover:text-violet-600">
            Maths
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-medium text-gray-700 dark:text-gray-200">AI Math Solver</span>
        </nav>

        <motion.header variants={stagger} initial="hidden" animate="visible" className="mb-14 text-center">
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
            AI Math{" "}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500 bg-clip-text text-transparent dark:from-violet-300 dark:via-fuchsia-300 dark:to-rose-200">
              Problem Solver
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-xl text-base text-gray-600 dark:text-gray-400">
            A free AI math solver for algebra, equations, calculus and word problems. Type any question and get a
            full step-by-step explanation — with diagrams, graphs and tables when they help you understand, not
            just the final answer.
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
            <a
              href="#solver"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-violet-600 px-8 text-base font-semibold text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-700"
            >
              Start Solving <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-8 text-base font-semibold text-gray-800 transition-colors hover:bg-gray-50 dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-200 dark:hover:bg-white/[0.06]"
            >
              See How It Works
            </a>
          </motion.div>
        </motion.header>

        {/* How it works */}
        <motion.section
          id="how-it-works"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mb-16 scroll-mt-24"
        >
          <motion.h2 variants={fadeUp} className="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white">
            How It Works
          </motion.h2>
          <div className="relative grid gap-6 sm:grid-cols-3">
            <div
              className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-violet-300 to-transparent dark:via-violet-500/30 sm:block"
              aria-hidden="true"
            />
            {HOW_IT_WORKS.map(({ icon: Icon, title, body }, i) => (
              <motion.div key={title} variants={fadeUp} className="relative flex flex-col items-center text-center">
                <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-200 bg-white text-violet-600 shadow-sm dark:border-violet-500/20 dark:bg-gray-900 dark:text-violet-300">
                  <Icon className="h-7 w-7" />
                </span>
                <span className="mt-3 text-xs font-bold text-violet-600 dark:text-violet-300">STEP {i + 1}</span>
                <h3 className="mt-1 text-base font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{body}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* The solver itself */}
        <motion.section
          id="solver"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="mb-16 scroll-mt-24 rounded-3xl border border-gray-200/70 bg-white/60 p-5 shadow-sm backdrop-blur sm:p-8 dark:border-white/10 dark:bg-white/[0.02]"
        >
          <MathSolverExperience />
        </motion.section>

        {/* Tips */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mb-16"
        >
          <motion.h2 variants={fadeUp} className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white">
            Tips for Getting the Best Explanation
          </motion.h2>
          <motion.div variants={fadeUp} className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-2">
            {TIPS.map((tip) => (
              <div
                key={tip}
                className="flex items-start gap-2.5 rounded-2xl border border-gray-200/80 bg-white/70 p-4 text-sm text-gray-600 backdrop-blur dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-400"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-600 dark:text-violet-300" />
                <span>{tip}</span>
              </div>
            ))}
          </motion.div>
        </motion.section>

        {/* SEO body content */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mb-16 border-t border-gray-200/70 pt-16 dark:border-white/10"
        >
          <motion.h2 variants={fadeUp} className="text-2xl font-bold text-gray-900 dark:text-white">
            A Free AI Math Solver for Algebra, Calculus, Equations and More
          </motion.h2>
          <motion.div variants={fadeUp} className="prose prose-sm mt-6 max-w-none text-gray-600 dark:prose-invert dark:text-gray-400">
            <p>
              Most online calculators are built for one narrow job — an algebra calculator that only handles
              equations, a trigonometry calculator that only does identities, a separate tool entirely for
              calculus. This math solver is built to handle all of it in one place: linear and quadratic equation
              solving, algebra and simultaneous equations, trigonometry, calculus (derivatives and integrals),
              geometry, statistics, and word problems — at whatever level you're learning it, from school-level
              maths through college and university.
            </p>
            <p>
              The difference from a plain equation solver isn&apos;t just the answer — it&apos;s the explanation.
              Ask it to solve a quadratic equation, simplify an algebraic expression, or find the derivative of a
              function, and you get the full step-by-step method written in plain English, the same way a tutor
              would walk through it, plus a &quot;check yourself&quot; step so you can verify the answer makes
              sense rather than just trusting it blindly. When a question genuinely calls for a graph, a labelled
              diagram, or a data table, one is generated automatically alongside the steps.
            </p>
            <p>
              It&apos;s free to use, with no signup and a daily question limit that resets every day. One thing
              worth knowing up front: this is a text-based math problem solver — type or paste your question in —
              it doesn&apos;t scan photos or handwritten homework from a camera. If you&apos;d rather practise a
              structured curriculum with quizzes and progress tracking instead of solving one-off questions, the{" "}
              <Link href="/maths" className="font-medium text-violet-600 hover:underline dark:text-violet-300">
                Year 6 Maths Challenge
              </Link>{" "}
              covers UK KS2 topics the same way.
            </p>
            <p>
              Want more detail first? Read the full{" "}
              <Link
                href="/blog/free-ai-math-solver-algebra-equations-calculus-step-by-step"
                className="font-medium text-violet-600 hover:underline dark:text-violet-300"
              >
                AI Math Solver guide
              </Link>{" "}
              for school and college-level coverage, or the{" "}
              <Link
                href="/blog/ai-math-solver-university-differential-equations-matrices"
                className="font-medium text-violet-600 hover:underline dark:text-violet-300"
              >
                university-level guide
              </Link>{" "}
              for differential equations, matrices and statistics, or the{" "}
              <Link
                href="/blog/polynomial-factoring-inequality-solver-with-steps"
                className="font-medium text-violet-600 hover:underline dark:text-violet-300"
              >
                polynomial and inequality guide
              </Link>{" "}
              for Algebra 2 and Pre-Calculus topics.
            </p>
          </motion.div>
        </motion.section>

        {/* FAQ */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mb-16"
        >
          <motion.h2 variants={fadeUp} className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </motion.h2>
          <MathsFaqAccordion faqs={MATH_SOLVER_FAQ} />
        </motion.section>

        {/* Cross-link CTA */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="rounded-3xl border border-violet-200 bg-gradient-to-r from-violet-600 to-fuchsia-600 p-8 text-center shadow-lg shadow-violet-600/20 dark:border-violet-500/20"
        >
          <h2 className="text-xl font-bold text-white sm:text-2xl">Want more structured practice?</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-violet-100">
            Try the Year 6 Maths Challenge — free interactive quizzes across 15 UK KS2 topics, with instant
            feedback and progress tracking.
          </p>
          <Link
            href="/maths"
            className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-white px-6 text-sm font-semibold text-violet-700 shadow transition-colors hover:bg-violet-50"
          >
            Explore Maths Challenge <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.section>
      </div>
    </main>
  );
}
