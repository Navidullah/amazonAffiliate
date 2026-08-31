import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
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

  const formData = await request.formData();
  const file = formData.get("file");
  const title = formData.get("title");
  const type = formData.get("type");

  if (!(file instanceof File) || !title || !["assignment", "quiz"].includes(type)) {
    return NextResponse.json(
      { error: "file, title and a valid type are required" },
      { status: 400 },
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const blob = await put(`classroom/${classId}/materials/${file.name}`, buffer, {
    access: "private",
    addRandomSuffix: true,
  });

  room.materials.push({
    title: String(title),
    type,
    blobPath: blob.url,
    fileName: file.name,
  });
  await room.save();

  return NextResponse.json({ room }, { status: 201 });
}
