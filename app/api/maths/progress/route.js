import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { ConnectToDB } from "@/lib/db";
import MathsProgress from "@/lib/models/MathsProgress";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return Response.json({ error: "Not signed in" }, { status: 401 });
  }

  await ConnectToDB();
  const doc = await MathsProgress.findOne({ userId: session.user.id }).lean();
  return Response.json({ progress: doc?.progress || null });
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return Response.json({ error: "Not signed in" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  if (!body?.progress) {
    return Response.json({ error: "Missing progress payload" }, { status: 400 });
  }

  await ConnectToDB();
  await MathsProgress.findOneAndUpdate(
    { userId: session.user.id },
    { $set: { progress: body.progress } },
    { upsert: true, new: true },
  );

  return Response.json({ success: true });
}
