import { getTransporter } from "@/lib/email";

export const SITE = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";

export function normalizeStudents(input) {
  if (!Array.isArray(input)) return [];
  return input
    .map((s) => ({
      email: String(s?.email || "").trim().toLowerCase(),
      whatsappNumber: String(s?.whatsappNumber || "").trim(),
    }))
    .filter((s) => s.email);
}

// wa.me needs digits only (country code + number, no +/spaces/dashes).
export function toWhatsAppLink(number, text) {
  const digits = String(number || "").replace(/[^0-9]/g, "");
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

// Best-effort — a failure here shouldn't fail the caller's request.
// Returns { emailsSent, emailErrors, whatsappInvites }.
export async function sendClassInvites({ students, title, meetLink }) {
  let emailsSent = 0;
  const emailErrors = [];

  if (students.length && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    const transporter = getTransporter();
    for (const student of students) {
      try {
        await sendInviteEmail(transporter, { to: student.email, title, meetLink });
        emailsSent += 1;
      } catch (err) {
        emailErrors.push(student.email);
      }
    }
  }

  const inviteText = `You've been added to "${title}" on Shopyor Classroom. Meet link: ${meetLink}. Sign in at ${SITE}/classroom to see materials and submit your work.`;
  const whatsappInvites = students
    .filter((s) => s.whatsappNumber)
    .map((s) => ({ email: s.email, link: toWhatsAppLink(s.whatsappNumber, inviteText) }))
    .filter((s) => s.link);

  return { emailsSent, emailErrors, whatsappInvites };
}
