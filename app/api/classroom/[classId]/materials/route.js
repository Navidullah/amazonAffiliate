import { NextResponse } from "next/server";
import { ConnectToDB } from "@/lib/db";
import ClassRoom from "@/lib/models/ClassRoom";
import { getSessionUser } from "@/lib/classroom/access";

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

  const { title, type, blobUrl, fileName } = await request.json();

  if (!title || !["assignment", "quiz"].includes(type) || !blobUrl || !fileName) {
    return NextResponse.json(
      { error: "title, type, blobUrl and fileName are required" },
      { status: 400 },
    );
  }
  if (!blobUrl.startsWith(`https://`) || !blobUrl.includes(`/classroom/${classId}/materials/`)) {
    return NextResponse.json({ error: "Invalid blobUrl" }, { status: 400 });
  }

  room.materials.push({
    title: String(title),
    type,
    blobPath: blobUrl,
    fileName: String(fileName),
  });
  await room.save();

  return NextResponse.json({ room }, { status: 201 });
}
