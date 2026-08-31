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
