import { NextResponse } from "next/server";
import { ConnectToDB } from "@/lib/db";
import ClassRoom from "@/lib/models/ClassRoom";
import { getSessionUser } from "@/lib/classroom/access";
import { getTransporter } from "@/lib/email";

const SITE = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";

function normalizeStudents(input) {
  if (!Array.isArray(input)) return [];
  return input
    .map((s) => ({
      email: String(s?.email || "").trim().toLowerCase(),
      whatsappNumber: String(s?.whatsappNumber || "").trim(),
    }))
    .filter((s) => s.email);
}

// wa.me needs digits only (country code + number, no +/spaces/dashes).
function toWhatsAppLink(number, text) {
  const digits = number.replace(/[^0-9]/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

async function sendInviteEmail(transporter, { to, title, meetLink }) {
  await transporter.sendMail({
    from: `"Shopyor Classroom" <${process.env.EMAIL_USER}>`,
    to,
    subject: `You've been added to "${title}" on Shopyor Classroom`,
    text: `You've been added to the class "${title}".\n\nMeet link: ${meetLink}\n\nSign in at ${SITE}/classroom with this email address to see your class materials and submit your work.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #7c3aed;">You've been added to a class</h2>
        <p><strong>${title}</strong></p>
        <p><a href="${meetLink}" style="color:#7c3aed;">Join the meet link</a></p>
        <p>Sign in at <a href="${SITE}/classroom" style="color:#7c3aed;">${SITE}/classroom</a> with this email address to see your class materials and submit your work.</p>
      </div>
    `,
  });
}

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

  // Best-effort email invites — a failure here shouldn't fail class creation.
  let emailsSent = 0;
  const emailErrors = [];
  if (students.length && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    const transporter = getTransporter();
    for (const student of students) {
      try {
        await sendInviteEmail(transporter, {
          to: student.email,
          title: room.title,
          meetLink: room.meetLink,
        });
        emailsSent += 1;
      } catch (err) {
        emailErrors.push(student.email);
      }
    }
  }

  const inviteText = `You've been added to "${room.title}" on Shopyor Classroom. Meet link: ${room.meetLink}. Sign in at ${SITE}/classroom to see materials and submit your work.`;
  const whatsappInvites = students
    .filter((s) => s.whatsappNumber)
    .map((s) => ({
      email: s.email,
      link: toWhatsAppLink(s.whatsappNumber, inviteText),
    }))
    .filter((s) => s.link);

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
