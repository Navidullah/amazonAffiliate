import { NextResponse } from "next/server";
import { del } from "@vercel/blob";
import { ConnectToDB } from "@/lib/db";
import ClassRoom from "@/lib/models/ClassRoom";
import { getSessionUser } from "@/lib/classroom/access";

export async function DELETE(_request, { params }) {
  const { classId, materialId } = await params;
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

  const material = room.materials.id(materialId);
  if (!material) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  await del(material.blobPath).catch(() => {});
  material.deleteOne();
  await room.save();

  return NextResponse.json({ room });
}
