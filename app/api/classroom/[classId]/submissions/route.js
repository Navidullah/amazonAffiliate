import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
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
  if (!room || !room.studentEmails.includes(session.user.email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const materialId = formData.get("materialId") || null;
  const note = formData.get("note") || "";

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "file is required" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const blob = await put(
    `classroom/${classId}/submissions/${session.user.email}/${file.name}`,
    buffer,
    { access: "private", addRandomSuffix: true },
  );

  const submission = await ClassSubmission.create({
    classroomId: classId,
    studentEmail: session.user.email,
    materialId: materialId || null,
    fileName: file.name,
    blobPath: blob.url,
    note: String(note),
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
  if (!isTutor && !room.studentEmails.includes(session.user.email)) {
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
