import { z } from "zod";

// A single (x, y) sample point. For function plots, Claude samples the
// function itself (e.g. 30-60 points across the domain) instead of sending
// an expression string — this avoids needing a client-side math expression
// evaluator (a common eval()/XSS foot-gun) and guarantees the plotted curve
// is accurate to Claude's own math.
const PointSchema = z.object({
  x: z.number(),
  y: z.number(),
});

const ChartSeriesSchema = z.object({
  name: z.string().describe("Legend label, e.g. 'y = x^2' or 'Revenue'"),
  points: z.array(PointSchema).min(2).max(80),
});

const ChartSchema = z.object({
  chartType: z.enum(["line", "scatter", "bar"]),
  xLabel: z.string(),
  yLabel: z.string(),
  series: z.array(ChartSeriesSchema).min(1).max(4),
});

const TableSchema = z.object({
  headers: z.array(z.string()).min(1).max(8),
  rows: z.array(z.array(z.string())).min(1).max(20),
});

const VisualSchema = z.object({
  type: z
    .enum(["none", "svg", "chart", "table"])
    .describe(
      "'svg' for geometric shapes/diagrams, 'chart' for function plots or data graphs, 'table' for tabular data, 'none' if this step needs no visual",
    ),
  svg: z
    .string()
    .nullable()
    .describe(
      "A complete <svg>...</svg> element (with viewBox, no external refs, no <script>) when type is 'svg', else null",
    ),
  chart: ChartSchema.nullable().describe("Present only when type is 'chart'"),
  table: TableSchema.nullable().describe("Present only when type is 'table'"),
  caption: z.string().nullable(),
});

const StepSchema = z.object({
  title: z.string().describe("Short heading for this step, e.g. 'Isolate x'"),
  explanation: z
    .string()
    .describe(
      "Plain-language explanation of this step. Wrap inline math in single $...$ and standalone equations in double $$...$$ (LaTeX)",
    ),
  visual: VisualSchema,
});

export const MathSolutionSchema = z.object({
  topic: z.string().describe("Short topic label, e.g. 'Quadratic equations'"),
  restatedProblem: z
    .string()
    .describe("The problem restated clearly, with LaTeX math in $...$"),
  steps: z.array(StepSchema).min(1).max(10),
  finalAnswer: z
    .string()
    .describe("The final answer, clearly stated, with LaTeX in $...$"),
  checkYourself: z
    .string()
    .nullable()
    .describe(
      "Optional short practice prompt or way to verify the answer, or null",
    ),
});

export const LEVELS = ["school", "college", "university"];

export function buildSystemPrompt(level) {
  const audience =
    {
      school: "a school student (roughly ages 11-16)",
      college: "a college/high-school-senior student preparing for exams",
      university: "a university student who wants full rigor",
    }[level] || "a student";

  return `You are a patient, encouraging math tutor helping ${audience}.

Rules:
- Break the solution into clear, numbered steps. Never skip algebraic steps a student would need to follow.
- Use LaTeX for all math: inline with $...$, standalone/display equations with $$...$$.
- Add a visual whenever it genuinely helps:
  - Geometry (shapes, angles, triangles, circles) -> type "svg" with a self-contained <svg> using simple shapes, lines and <text> labels. Use a viewBox like "0 0 300 200", no external images, fonts, or scripts.
  - A function to plot, or numeric data to graph -> type "chart". Sample the function yourself at 20-60 evenly spaced points across a sensible domain and return them as {x, y} pairs — do not send an expression string.
  - Tabular data (truth tables, value tables, comparisons) -> type "table".
  - If a step doesn't need a visual, set visual.type to "none" and leave svg/chart/table null.
- Keep explanations honest and correct. If a problem is ambiguous, state your interpretation before solving.
- Do not solve a different, easier problem than the one asked.
- Keep the tone supportive, never condescending.`;
}
