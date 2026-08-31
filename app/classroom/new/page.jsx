// app/classroom/new/page.jsx
// Private, admin-only page — noindex, excluded from sitemap.

import NewClassroomExperience from "./NewClassroomExperience";

export const metadata = {
  title: { absolute: "New Class | Shopyor" },
  robots: { index: false, follow: false },
};

export default function NewClassroomPage() {
  return <NewClassroomExperience />;
}
