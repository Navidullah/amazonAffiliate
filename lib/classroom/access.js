import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import User from "@/lib/models/User";
import { ConnectToDB } from "@/lib/db";

// Resolves the current session and whether they're an admin (tutor),
// re-verified against the DB rather than trusting the JWT role claim —
// same pattern as app/api/blog/admin/route.js.
export async function getSessionUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return { session: null, isAdmin: false };

  await ConnectToDB();
  const user = await User.findOne({ email: session.user.email });
  return { session, isAdmin: user?.role === "admin" };
}

export function isRoomMember(room, email, isAdmin) {
  if (!room || !email) return false;
  if (isAdmin && room.tutorEmail === email) return true;
  return room.students.some((s) => s.email === email);
}
