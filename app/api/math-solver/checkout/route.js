import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { createCheckout } from "@/lib/lemonsqueezy";
import { getUsageKey } from "@/lib/mathSolver/identity";

const SITE = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";
const VARIANT_ID = process.env.MATH_SOLVER_DAYPASS_VARIANT_ID;

export async function POST(req) {
  if (!VARIANT_ID) {
    return Response.json(
      { error: "The day pass isn't available yet. Please try again later." },
      { status: 503 },
    );
  }

  const session = await getServerSession(authOptions);
  const key = getUsageKey(req, session);
  const today = new Date().toISOString().slice(0, 10);

  try {
    const url = await createCheckout({
      orderId: `math-solver-daypass-${today}-${Buffer.from(key).toString("base64url")}`,
      variantId: VARIANT_ID,
      redirectUrl: `${SITE}/maths/solver?daypass=success`,
      customData: { type: "math_solver_daypass", key, date: today },
    });
    return Response.json({ url });
  } catch (err) {
    console.error("Math solver day pass checkout failed:", err);
    return Response.json({ error: "Could not start checkout. Please try again." }, { status: 500 });
  }
}
