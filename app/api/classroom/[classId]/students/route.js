import { NextResponse } from "next/server";
import { ConnectToDB } from "@/lib/db";
import ClassRoom from "@/lib/models/ClassRoom";
import { getSessionUser } from "@/lib/classroom/access";
import { normalizeStudents, sendClassInvites } from "@/lib/classroom/invite";

export async function POST(request, { params }) {
  const { classId } = await params;
  const { session, isAdmin } = await getSessionUser();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isAdmin) {
    return NextResponse.json(
      { error: "Admin access required" },
      { status: 403 },
    );
  }

  await ConnectToDB();
  const room = await ClassRoom.findById(classId);
  if (!room) {
    return NextResponse.json({ error: "Class not found" }, { status: 404 });
  }
  if (room.tutorEmail !== session.user.email) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { students: rawStudents } = await request.json();
  const incoming = normalizeStudents(rawStudents);
  const existingEmails = new Set(room.students.map((s) => s.email));
  const newStudents = incoming.filter((s) => !existingEmails.has(s.email));

  if (!newStudents.length) {
    return NextResponse.json(
      { error: "No new students to add" },
      { status: 400 },
    );
  }

  room.students.push(...newStudents);
  await room.save();

  const { emailsSent, emailErrors, whatsappInvites } = await sendClassInvites({
    students: newStudents,
    title: room.title,
    meetLink: room.meetLink,
  });

  return NextResponse.json(
    { room, emailsSent, emailErrors, whatsappInvites },
    { status: 201 },
  );
}
