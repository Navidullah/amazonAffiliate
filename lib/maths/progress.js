// localStorage-backed progress tracking for Maths Challenge (v1 — no
// login/DB). All functions are SSR-safe (no-op / defaults when `window`
// isn't available) and pure with respect to their inputs where possible.

import { UK_YEAR_6_TOPICS } from "./topics";
import { getAllQuestionsForTopic } from "./bank";

const STORAGE_KEY = "shopyor:maths:v1";

const EMPTY_PROGRESS = () => ({
  version: 1,
  totalPoints: 0,
  questionsAnsweredTotal: 0,
  correctAnsweredTotal: 0,
  bestStreak: 0,
  badges: [],
  lastActivity: null,
  topics: {}, // { [topicSlug]: { attempts, correctQuestionIds: [], bestAccuracy, completed } }
  dailyChallenge: { history: {} }, // { [dateKey]: { completed, score, accuracy } }
});

export function getProgress() {
  if (typeof window === "undefined") return EMPTY_PROGRESS();

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_PROGRESS();
    const parsed = JSON.parse(raw);
    // Merge onto a fresh default so any new fields added later always exist.
    return { ...EMPTY_PROGRESS(), ...parsed, topics: parsed.topics || {}, dailyChallenge: parsed.dailyChallenge || { history: {} } };
  } catch {
    return EMPTY_PROGRESS();
  }
}

export function overwriteProgress(progress) {
  saveProgress(progress);
  return progress;
}

function saveProgress(progress) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // localStorage unavailable (private mode, quota, etc.) — fail silently,
    // progress just won't persist this session.
  }
}

export function getTopicTotalQuestions(topicSlug) {
  return getAllQuestionsForTopic("UK", 6, topicSlug).length;
}

export function getTopicProgressPercent(progress, topicSlug) {
  const total = getTopicTotalQuestions(topicSlug);
  if (total === 0) return 0;
  const correctIds = progress.topics[topicSlug]?.correctQuestionIds || [];
  return Math.min(100, Math.round((correctIds.length / total) * 100));
}

export function getOverallProgressPercent(progress) {
  const percents = UK_YEAR_6_TOPICS.map((t) => getTopicProgressPercent(progress, t.slug));
  if (percents.length === 0) return 0;
  return Math.round(percents.reduce((sum, p) => sum + p, 0) / percents.length);
}

export function getTopicsCompletedCount(progress) {
  return UK_YEAR_6_TOPICS.filter((t) => progress.topics[t.slug]?.completed).length;
}

export function getOverallAccuracy(progress) {
  if (progress.questionsAnsweredTotal === 0) return 0;
  return Math.round((progress.correctAnsweredTotal / progress.questionsAnsweredTotal) * 100);
}

/**
 * Records the outcome of one completed quiz session (topic practice or
 * daily challenge) and returns the updated progress object.
 *
 * sessionResult: {
 *   topicSlug?: string,       // omitted for the daily challenge
 *   isDailyChallenge?: boolean,
 *   dateKey?: string,         // required when isDailyChallenge
 *   answeredQuestions: [{ id, correct }],
 *   pointsEarned: number,
 *   sessionBestStreak: number,
 * }
 */
export function saveSessionResult(sessionResult) {
  const progress = getProgress();
  const {
    topicSlug,
    isDailyChallenge,
    dateKey,
    answeredQuestions,
    pointsEarned,
    sessionBestStreak,
  } = sessionResult;

  const correctInSession = answeredQuestions.filter((a) => a.correct).length;

  progress.totalPoints += pointsEarned;
  progress.questionsAnsweredTotal += answeredQuestions.length;
  progress.correctAnsweredTotal += correctInSession;
  progress.bestStreak = Math.max(progress.bestStreak, sessionBestStreak);
  progress.lastActivity = new Date().toISOString();

  if (topicSlug) {
    const existing = progress.topics[topicSlug] || {
      attempts: 0,
      correctQuestionIds: [],
      bestAccuracy: 0,
      completed: false,
    };
    const correctIds = new Set(existing.correctQuestionIds);
    answeredQuestions.forEach((a) => {
      if (a.correct) correctIds.add(a.id);
    });

    const sessionAccuracy = Math.round((correctInSession / answeredQuestions.length) * 100);
    const total = getTopicTotalQuestions(topicSlug);

    progress.topics[topicSlug] = {
      attempts: existing.attempts + 1,
      correctQuestionIds: Array.from(correctIds),
      bestAccuracy: Math.max(existing.bestAccuracy, sessionAccuracy),
      completed: correctIds.size >= total && total > 0,
    };
  }

  if (isDailyChallenge && dateKey) {
    const sessionAccuracy = Math.round((correctInSession / answeredQuestions.length) * 100);
    progress.dailyChallenge.history[dateKey] = {
      completed: true,
      score: pointsEarned,
      accuracy: sessionAccuracy,
    };
  }

  saveProgress(progress);
  return progress;
}

export function hasCompletedDailyChallenge(progress, dateKey) {
  return Boolean(progress.dailyChallenge.history[dateKey]?.completed);
}

export function addBadges(badgeIds) {
  if (badgeIds.length === 0) return getProgress();
  const progress = getProgress();
  const existing = new Set(progress.badges);
  badgeIds.forEach((id) => existing.add(id));
  progress.badges = Array.from(existing);
  saveProgress(progress);
  return progress;
}

export function resetProgress() {
  saveProgress(EMPTY_PROGRESS());
  return EMPTY_PROGRESS();
}
