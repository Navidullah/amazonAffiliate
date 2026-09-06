import { NextResponse } from "next/server";
import { ConnectToDB } from "@/lib/db";
import ClassRoom from "@/lib/models/ClassRoom";
import ClassSubmission from "@/lib/models/ClassSubmission";
import { getSessionUser } from "@/lib/classroom/access";

export async function POST(request, { params }) {
  const { classId } = await params;
  const { session } = await getSessionUser();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ConnectToDB();
  const room = await ClassRoom.findById(classId).lean();
  if (!room || !room.students.some((s) => s.email === session.user.email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { blobUrl, fileName, materialId, note } = await request.json();

  if (!blobUrl || !fileName) {
    return NextResponse.json({ error: "blobUrl and fileName are required" }, { status: 400 });
  }
  if (
    !blobUrl.startsWith(`https://`) ||
    !blobUrl.includes(`/classroom/${classId}/submissions/`)
  ) {
    return NextResponse.json({ error: "Invalid blobUrl" }, { status: 400 });
  }

  const submission = await ClassSubmission.create({
    classroomId: classId,
    studentEmail: session.user.email,
    materialId: materialId || null,
    fileName: String(fileName),
    blobPath: blobUrl,
    note: String(note || ""),
  });

  return NextResponse.json({ submission }, { status: 201 });
}

export async function GET(request, { params }) {
  const { classId } = await params;
  const { session, isAdmin } = await getSessionUser();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ConnectToDB();
  const room = await ClassRoom.findById(classId).lean();
  if (!room) {
    return NextResponse.json({ error: "Class not found" }, { status: 404 });
  }

  const isTutor = isAdmin && room.tutorEmail === session.user.email;
  if (!isTutor && !room.students.some((s) => s.email === session.user.email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const query = isTutor
    ? { classroomId: classId }
    : { classroomId: classId, studentEmail: session.user.email };

  const submissions = await ClassSubmission.find(query)
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json({ submissions });
}
