import { ConnectToDB } from "@/lib/db";
import MathSolverUsage from "@/lib/models/MathSolverUsage";

// Public, unauthenticated. "Unique users" is a distinct count of the `ip`
// field (holds "ip:x.x.x.x" or "user:x" — see MathSolverUsage) across all
// time, not just today. This is an approximation, not a precise headcount:
// shared IPs undercount, the same person switching networks overcounts.
// Good enough for an honest "X people have used this" social-proof stat,
// not meant as analytics-grade data.
export async function GET() {
  await ConnectToDB();

  const [result] = await MathSolverUsage.aggregate([
    {
      $facet: {
        uniqueUsers: [{ $group: { _id: "$ip" } }, { $count: "count" }],
        totalQuestions: [{ $group: { _id: null, total: { $sum: "$count" } } }],
      },
    },
  ]);

  return Response.json({
    uniqueUsers: result?.uniqueUsers?.[0]?.count || 0,
    totalQuestions: result?.totalQuestions?.[0]?.total || 0,
  });
}
