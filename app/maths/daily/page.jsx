// app/maths/daily/page.jsx
// Excluded from the sitemap (see next-sitemap.config.cjs) — content rotates
// daily and isn't meant to rank as a stable landing page.

import DailyChallengeExperience from "./DailyChallengeExperience";

export const metadata = {
  title: { absolute: "Daily Maths Challenge | Shopyor" },
  robots: { index: false, follow: true },
};

export default function DailyChallengePage() {
  return <DailyChallengeExperience />;
}
