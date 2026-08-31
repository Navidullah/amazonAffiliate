import { NextResponse } from "next/server";
import { ConnectToDB } from "@/lib/db";
import ClassRoom from "@/lib/models/ClassRoom";
import { getSessionUser, isRoomMember } from "@/lib/classroom/access";

export async function GET(_request, { params }) {
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
  if (!isRoomMember(room, session.user.email, isAdmin)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json({
    room,
    isTutor: isAdmin && room.tutorEmail === session.user.email,
  });
}

// PUT update the class's Google Meet link (tutor only) — Meet links expire
// after a while, so the tutor needs a way to swap in a fresh one without
// recreating the whole class (which would lose students/materials/history).
export async function PUT(request, { params }) {
  const { classId } = await params;
  const { session, isAdmin } = await getSessionUser();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isAdmin) {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }

  await ConnectToDB();
  const room = await ClassRoom.findById(classId);
  if (!room) {
    return NextResponse.json({ error: "Class not found" }, { status: 404 });
  }
  if (room.tutorEmail !== session.user.email) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { meetLink } = await request.json();
  if (!meetLink || typeof meetLink !== "string" || !meetLink.trim()) {
    return NextResponse.json({ error: "A meet link is required" }, { status: 400 });
  }

  room.meetLink = meetLink.trim();
  await room.save();

  return NextResponse.json({ room });
}
