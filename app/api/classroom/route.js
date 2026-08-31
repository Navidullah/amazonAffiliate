import { NextResponse } from "next/server";
import { ConnectToDB } from "@/lib/db";
import ClassRoom from "@/lib/models/ClassRoom";
import { getSessionUser } from "@/lib/classroom/access";
import { normalizeStudents, sendClassInvites } from "@/lib/classroom/invite";

export async function POST(request) {
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

  const { title, meetLink, students: rawStudents } = await request.json();
  if (!title?.trim() || !meetLink?.trim()) {
    return NextResponse.json(
      { error: "Title and meet link are required" },
      { status: 400 },
    );
  }

  const students = normalizeStudents(rawStudents);

  await ConnectToDB();
  const room = await ClassRoom.create({
    title: title.trim(),
    meetLink: meetLink.trim(),
    tutorEmail: session.user.email,
    students,
  });

  const { emailsSent, emailErrors, whatsappInvites } = await sendClassInvites({
    students,
    title: room.title,
    meetLink: room.meetLink,
  });

  return NextResponse.json(
    { room, emailsSent, emailErrors, whatsappInvites },
    { status: 201 },
  );
}

export async function GET() {
  const { session, isAdmin } = await getSessionUser();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ConnectToDB();
  const rooms = isAdmin
    ? await ClassRoom.find({ tutorEmail: session.user.email })
        .sort({ createdAt: -1 })
        .lean()
    : await ClassRoom.find({ "students.email": session.user.email })
        .sort({ createdAt: -1 })
        .lean();

  return NextResponse.json({ rooms, isAdmin });
}
