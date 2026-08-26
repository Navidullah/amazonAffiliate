import { getServerSession } from "next-auth";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { authOptions } from "@/lib/authOptions";
import { getAnthropicClient } from "@/lib/anthropic";
import { ConnectToDB } from "@/lib/db";
import MathSolverUsage from "@/lib/models/MathSolverUsage";
import { MathSolutionSchema, LEVELS, buildSystemPrompt } from "@/lib/mathSolver/schema";
import { getUsageKey } from "@/lib/mathSolver/identity";
import { FREE_DAILY_LIMIT, DAYPASS_PRICE_DISPLAY } from "@/lib/mathSolver/pricing";

const MODEL = process.env.MATH_SOLVER_MODEL || "claude-haiku-4-5-20251001";
const MAX_QUESTION_LENGTH = 1000;

async function checkAndIncrementUsage(key) {
  await ConnectToDB();
  const today = new Date().toISOString().slice(0, 10);

  const doc = await MathSolverUsage.findOneAndUpdate(
    { ip: key, date: today },
    { $inc: { count: 1 } },
    { upsert: true, new: true },
  );

  if (doc.paid) return { allowed: true };
  return { allowed: doc.count <= FREE_DAILY_LIMIT };
}

export async function POST(req) {
  const body = await req.json().catch(() => null);
  const question = typeof body?.question === "string" ? body.question.trim() : "";
  const level = LEVELS.includes(body?.level) ? body.level : "school";

  if (!question) {
    return Response.json({ error: "Please enter a math question." }, { status: 400 });
  }
  if (question.length > MAX_QUESTION_LENGTH) {
    return Response.json(
      { error: `Question is too long (max ${MAX_QUESTION_LENGTH} characters).` },
      { status: 400 },
    );
  }

  const session = await getServerSession(authOptions);
  const key = getUsageKey(req, session);

  let usage;
  try {
    usage = await checkAndIncrementUsage(key);
  } catch (err) {
    console.error("Math solver rate-limit check failed:", err);
    return Response.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }

  if (!usage.allowed) {
    return Response.json(
      {
        error: `You've used today's free question. Unlock unlimited questions for the rest of today for ${DAYPASS_PRICE_DISPLAY}.`,
        paywall: true,
        price: DAYPASS_PRICE_DISPLAY,
      },
      { status: 402 },
    );
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      { error: "The math solver isn't configured yet. Please try again later." },
      { status: 503 },
    );
  }

  try {
    const client = getAnthropicClient();
    const response = await client.messages.parse({
      model: MODEL,
      max_tokens: 4000,
      system: buildSystemPrompt(level),
      messages: [{ role: "user", content: question }],
      output_config: {
        format: zodOutputFormat(MathSolutionSchema),
      },
    });

    if (!response.parsed_output) {
      return Response.json(
        { error: "Couldn't produce a solution for that question. Try rephrasing it." },
        { status: 422 },
      );
    }

    return Response.json({ solution: response.parsed_output });
  } catch (err) {
    console.error("Math solver request failed:", err);
    return Response.json(
      { error: "Something went wrong while solving that. Please try again." },
      { status: 500 },
    );
  }
}
