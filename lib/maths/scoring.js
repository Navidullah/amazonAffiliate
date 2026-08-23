// Scoring rules for one quiz session.
// Base points come from each question's own `points` field (set per
// difficulty when the question was authored: easy 10 / medium 15 / hard 20).
// Streak bonuses are session-scoped and only ever awarded once per
// threshold crossing, tracked by the caller (QuizEngine) via
// `awardedStreakBonuses`.

export const STREAK_BONUSES = [
  { streak: 3, bonus: 5 },
  { streak: 5, bonus: 10 },
];

/**
 * Given the current streak (consecutive correct answers, including the one
 * just answered) and the set of thresholds already paid out this session,
 * returns { bonus, newlyAwarded } — bonus to add now, and updated award set.
 */
export function getStreakBonus(streak, awardedStreakBonuses) {
  const awarded = new Set(awardedStreakBonuses);
  let bonus = 0;

  for (const { streak: threshold, bonus: amount } of STREAK_BONUSES) {
    if (streak >= threshold && !awarded.has(threshold)) {
      bonus += amount;
      awarded.add(threshold);
    }
  }

  return { bonus, awardedStreakBonuses: awarded };
}

export function calculateAccuracy(correctCount, totalCount) {
  if (totalCount === 0) return 0;
  return Math.round((correctCount / totalCount) * 100);
}
