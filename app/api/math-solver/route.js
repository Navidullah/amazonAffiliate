import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { getAnthropicClient } from "@/lib/anthropic";
import { ConnectToDB } from "@/lib/db";
import MathSolverUsage from "@/lib/models/MathSolverUsage";
import { MathSolutionSchema, LEVELS, buildSystemPrompt } from "@/lib/mathSolver/schema";

const DAILY_LIMIT = Number(process.env.MATH_SOLVER_DAILY_LIMIT || 15);
const MODEL = process.env.MATH_SOLVER_MODEL || "claude-haiku-4-5-20251001";
const MAX_QUESTION_LENGTH = 1000;

function getClientIp(req) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

async function checkAndIncrementUsage(ip) {
  await ConnectToDB();
  const today = new Date().toISOString().slice(0, 10);

  const doc = await MathSolverUsage.findOneAndUpdate(
    { ip, date: today },
    { $inc: { count: 1 } },
    { upsert: true, new: true },
  );

  return doc.count <= DAILY_LIMIT;
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

  const ip = getClientIp(req);
  let withinLimit;
  try {
    withinLimit = await checkAndIncrementUsage(ip);
  } catch (err) {
    console.error("Math solver rate-limit check failed:", err);
    return Response.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }

  if (!withinLimit) {
    return Response.json(
      { error: `You've reached today's free limit of ${DAILY_LIMIT} questions. Please try again tomorrow.` },
      { status: 429 },
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
