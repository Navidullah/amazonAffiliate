// app/classroom/page.jsx
// Private, per-user page (like /maths/dashboard) — noindex, excluded from sitemap.

import ClassroomListExperience from "./ClassroomListExperience";

export const metadata = {
  title: { absolute: "Classroom | Shopyor" },
  robots: { index: false, follow: false },
};

export default function ClassroomPage() {
  return <ClassroomListExperience />;
}
