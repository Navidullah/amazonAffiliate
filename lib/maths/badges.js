import { UK_YEAR_6_TOPICS } from "./topics";

// icon is a lucide-react component name (string), resolved in BadgeGrid.jsx
// — kept consistent with how topics.js stores icons.
export const BADGES = [
  {
    id: "first-step",
    icon: "Sprout",
    title: "First Step",
    description: "Complete your first challenge.",
  },
  {
    id: "quick-learner",
    icon: "Star",
    title: "Quick Learner",
    description: "Answer 5 questions correctly.",
  },
  {
    id: "maths-streak",
    icon: "Flame",
    title: "Maths Streak",
    description: "Get 5 correct answers in a row.",
  },
  {
    id: "fraction-master",
    icon: "PieChart",
    title: "Fraction Master",
    description: "Complete the Fractions topic.",
  },
  {
    id: "year-6-champion",
    icon: "Trophy",
    title: "Year 6 Champion",
    description: "Complete all Year 6 topics.",
  },
];

export const getBadge = (id) => BADGES.find((b) => b.id === id) || null;

/**
 * Pure function: given progress before and after a session, returns the
 * list of badge ids newly earned this session (already-unlocked badges are
 * excluded via `progress.badges`, which the caller passes in `next`).
 */
export function evaluateNewBadges(prevProgress, nextProgress) {
  const alreadyHas = new Set(prevProgress.badges);
  const newlyEarned = [];

  const check = (id, condition) => {
    if (!alreadyHas.has(id) && condition) newlyEarned.push(id);
  };

  check("first-step", nextProgress.questionsAnsweredTotal > 0);
  check("quick-learner", nextProgress.correctAnsweredTotal >= 5);
  check("maths-streak", nextProgress.bestStreak >= 5);
  check("fraction-master", Boolean(nextProgress.topics["fractions"]?.completed));
  check(
    "year-6-champion",
    UK_YEAR_6_TOPICS.every((t) => nextProgress.topics[t.slug]?.completed),
  );

  return newlyEarned;
}
