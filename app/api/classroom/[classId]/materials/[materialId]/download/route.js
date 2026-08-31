import { NextResponse } from "next/server";
import { get } from "@vercel/blob";
import { ConnectToDB } from "@/lib/db";
import ClassRoom from "@/lib/models/ClassRoom";
import { getSessionUser, isRoomMember } from "@/lib/classroom/access";

export async function GET(_request, { params }) {
  const { classId, materialId } = await params;
  const { session, isAdmin } = await getSessionUser();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ConnectToDB();
  const room = await ClassRoom.findById(classId).lean();
  if (!room || !isRoomMember(room, session.user.email, isAdmin)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const material = room.materials.find((m) => String(m._id) === materialId);
  if (!material) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const result = await get(material.blobPath, { access: "private" });
  if (result?.statusCode !== 200 || !result.stream) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  return new NextResponse(result.stream, {
    headers: {
      "Content-Type": result.blob.contentType || "application/octet-stream",
      "Content-Disposition": `attachment; filename="${material.fileName || "file"}"`,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, no-store",
    },
  });
}
