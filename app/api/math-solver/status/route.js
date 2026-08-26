import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { ConnectToDB } from "@/lib/db";
import MathSolverUsage from "@/lib/models/MathSolverUsage";
import { getUsageKey } from "@/lib/mathSolver/identity";

// Polled by the frontend after returning from LemonSqueezy checkout, since
// the webhook that flips `paid` to true can land a second or two after the
// redirect back to /maths/solver.
export async function GET(req) {
  const session = await getServerSession(authOptions);
  const key = getUsageKey(req, session);
  const today = new Date().toISOString().slice(0, 10);

  await ConnectToDB();
  const doc = await MathSolverUsage.findOne({ ip: key, date: today }).lean();

  return Response.json({ paid: !!doc?.paid });
}
