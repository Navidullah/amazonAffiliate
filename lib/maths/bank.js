// Question-bank access layer. This is the ONLY module that knows questions
// currently come from static imports (lib/maths/questions/index.js) — a
// later move to a database/API only needs to change this file.

import { QUESTION_BANK } from "./questions";
import { UK_YEAR_6_TOPICS } from "./topics";

const QUESTIONS_PER_CHALLENGE = 10;
const DAILY_CHALLENGE_SIZE = 5;

/** Small deterministic string hash -> 32-bit int, used to seed shuffles. */
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash >>> 0;
}

/** Mulberry32 PRNG — tiny, deterministic, good enough for shuffling questions. */
function seededRandom(seed) {
  let t = seed;
  return function () {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

/** Fisher-Yates shuffle. Uses Math.random() unless a seeded rng is passed. */
function shuffle(array, rng = Math.random) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function bankKey(curriculum, year, topicSlug) {
  return `${curriculum}-${year}-${topicSlug}`;
}

export function getAllQuestionsForTopic(curriculum, year, topicSlug) {
  return QUESTION_BANK[bankKey(curriculum, year, topicSlug)] || [];
}

/**
 * Returns a randomised, non-repeating set of up to QUESTIONS_PER_CHALLENGE
 * questions for one topic, optionally filtered by difficulty
 * ("easy" | "medium" | "hard" | "mixed").
 */
export function getTopicQuestions(curriculum, year, topicSlug, difficulty = "mixed") {
  const all = getAllQuestionsForTopic(curriculum, year, topicSlug);
  const pool = difficulty === "mixed" ? all : all.filter((q) => q.difficulty === difficulty);
  const source = pool.length > 0 ? pool : all; // fall back to full topic pool if a difficulty is empty
  return shuffle(source).slice(0, Math.min(QUESTIONS_PER_CHALLENGE, source.length));
}

/**
 * Deterministic "question of the day" set: same date string -> same
 * questions for every visitor, changes at midnight. Pulls from across all
 * UK Year 6 topics so it feels like a mixed daily challenge.
 */
export function getDailyChallengeQuestions(date = new Date()) {
  const dateKey = date.toISOString().slice(0, 10); // YYYY-MM-DD
  const rng = seededRandom(hashString(`maths-daily-${dateKey}`));

  const allQuestions = UK_YEAR_6_TOPICS.flatMap((topic) =>
    getAllQuestionsForTopic("UK", 6, topic.slug),
  );

  return shuffle(allQuestions, rng).slice(0, DAILY_CHALLENGE_SIZE);
}

export function getDailyChallengeDateKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export { QUESTIONS_PER_CHALLENGE, DAILY_CHALLENGE_SIZE };
