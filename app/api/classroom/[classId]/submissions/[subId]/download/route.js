import { NextResponse } from "next/server";
import { get } from "@vercel/blob";
import { ConnectToDB } from "@/lib/db";
import ClassRoom from "@/lib/models/ClassRoom";
import ClassSubmission from "@/lib/models/ClassSubmission";
import { getSessionUser } from "@/lib/classroom/access";

export async function GET(_request, { params }) {
  const { classId, subId } = await params;
  const { session, isAdmin } = await getSessionUser();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ConnectToDB();
  const [room, submission] = await Promise.all([
    ClassRoom.findById(classId).lean(),
    ClassSubmission.findById(subId).lean(),
  ]);
  if (!room || !submission || String(submission.classroomId) !== classId) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const isTutor = isAdmin && room.tutorEmail === session.user.email;
  const isOwner = submission.studentEmail === session.user.email;
  if (!isTutor && !isOwner) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const result = await get(submission.blobPath, { access: "private" });
  if (result?.statusCode !== 200 || !result.stream) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  return new NextResponse(result.stream, {
    headers: {
      "Content-Type": result.blob.contentType || "application/octet-stream",
      "Content-Disposition": `attachment; filename="${submission.fileName || "file"}"`,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, no-store",
    },
  });
}
