// app/classroom/[classId]/page.jsx
// Private, per-room page — noindex, excluded from sitemap.

import ClassroomRoomExperience from "./ClassroomRoomExperience";

export const metadata = {
  title: { absolute: "Classroom | Shopyor" },
  robots: { index: false, follow: false },
};

export default async function ClassroomRoomPage({ params }) {
  const { classId } = await params;
  return <ClassroomRoomExperience classId={classId} />;
}
