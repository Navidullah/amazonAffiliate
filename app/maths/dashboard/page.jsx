// app/maths/dashboard/page.jsx
// Private, per-user page (like /order/*) — noindex, excluded from sitemap.

import MathsDashboardExperience from "./MathsDashboardExperience";

export const metadata = {
  title: { absolute: "My Maths Progress | Shopyor" },
  robots: { index: false, follow: false },
};

export default function MathsDashboardPage() {
  return <MathsDashboardExperience />;
}
