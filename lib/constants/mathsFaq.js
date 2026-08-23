// Shared source of truth for the /maths FAQ — both the visible accordion
// (MathsLandingExperience.jsx) and the FAQPage JSON-LD in page.jsx render
// from this array so the two can never drift out of sync.

export const MATHS_FAQ = [
  {
    q: "Is Maths Challenge free, and does my child need to sign up?",
    a: "Yes, it's completely free with no signup required to start practising. Your child can open a topic and answer questions straight away, and their progress (points, streaks, and which questions they've got right) is saved automatically in the browser they're using. Signing in is entirely optional — it only exists so progress can follow your child across devices (a tablet at home and a laptop at school, for example) instead of staying stuck in one browser. There's no paywall, no premium tier, and no ads on the practice pages.",
  },
  {
    q: "Does this cover the UK Year 6 / KS2 maths curriculum?",
    a: "Yes. All 15 topics — place value, the four operations, factors/multiples/primes, fractions, decimals, percentages, ratio and proportion, algebra, measurement, perimeter/area/volume, properties of shapes, position and direction, statistics, word problems, and mathematical reasoning — map directly onto the UK National Curriculum for Year 6 mathematics (Key Stage 2). These are the same topic areas assessed in the KS2 maths SATs, so regular practice here reinforces exactly what a Year 6 class is expected to know, without following an exam-paper format.",
  },
  {
    q: "My child attends a British curriculum school outside the UK — is this still useful?",
    a: "Yes. Year 6 and Key Stage 2 (KS2) are UK National Curriculum terms, and they're used by British curriculum and international schools worldwide, including many in Pakistan, India, Nigeria, the UAE, the Philippines, and Bangladesh. If your child's school follows the English National Curriculum or a British-curriculum syllabus (rather than a local Grade 6 curriculum), the 15 topics here line up with what they're being taught, regardless of which country you're practising from.",
  },
  {
    q: "How is this different from downloading a Year 6 maths worksheet?",
    a: "A worksheet gives your child a fixed set of questions and no feedback until an adult marks it. Maths Challenge marks each answer instantly, and — importantly — explains the correct method whether the answer was right or wrong, so a mistake becomes a quick lesson rather than just a red cross. Questions are also randomised and mixed by difficulty (easy, medium, hard, or mixed) each time, so a child can practise the same topic repeatedly without memorising a fixed answer sheet. If you'd rather have printable, offline practice, ShopYor's separate Year 6 worksheet packs cover the same fractions topic in PDF form.",
  },
  {
    q: "Can I see how my child is progressing?",
    a: "Yes. Every practice session updates a progress dashboard showing overall points, total questions answered, accuracy percentage, and how many of the 15 topics your child has fully completed (meaning every question in that topic's bank has been answered correctly at least once). If you sign in, that dashboard is saved to your account under 'My Maths Progress' and stays available the next time you log in, on any device — not just the one your child happened to be using that day.",
  },
  {
    q: "Is it safe for children to use, and is any personal data collected?",
    a: "Without signing in, no personal data is collected at all — progress is stored only in the browser's local storage on your child's own device and is never sent anywhere. If you choose to sign in (optional, via Google or GitHub) so progress follows your child across devices, only the progress data itself (points, badges, and which questions have been answered) is stored against your account — never used for advertising, and there are no ads or third-party trackers on the practice pages themselves.",
  },
  {
    q: "How much daily maths practice is recommended for a Year 6 child?",
    a: "Most primary teachers suggest short, frequent practice — around 10 to 15 minutes a day — is more effective for retention than one long weekly session, since it keeps number facts and methods fresh without causing fatigue. The Daily Maths Challenge (5 mixed questions, refreshed every day) is sized for exactly that kind of quick daily habit, while the full topic practice sessions (around 10 questions each) suit a slightly longer sitting when your child wants to focus on one weak area, like fractions or ratio, in more depth.",
  },
  {
    q: "Can teachers use this in the classroom, not just at home?",
    a: "Yes — nothing about it is designed only for home use. A teacher can display a topic on a whiteboard for whole-class practice, or set individual students a specific topic (say, 'Perimeter, Area and Volume') to work through independently on classroom devices, since each topic is a self-contained page with its own URL. There's no class-management or gradebook feature yet, so it works best as a supplementary practice tool alongside your existing scheme of work, rather than a replacement for it.",
  },
  {
    q: "What if my child gets a question wrong — do they just move on?",
    a: "No — every incorrect answer shows a short explanation of the correct method before your child continues, following the same rule as the correct-answer feedback. For example, on a fractions question about adding 3/8 and 2/8, an incorrect answer explains that when denominators match you add the numerators and keep the denominator the same. The goal is that a wrong answer still teaches something, rather than just being marked and forgotten — a real gap in most auto-marked online quizzes, which usually only reveal the correct answer, not the reasoning.",
  },
  {
    q: "Do you plan to add other year groups or curricula?",
    a: "Yes — UK Year 6 is the first curriculum built, but the site is structured so Year 3, 4 and 5, GCSE and IGCSE, and non-UK curricula (US grades 5-6, Australian Year 6, and Singapore Primary 6) can be added the same way, without changing how the practice pages work. If your child needs a different year group or curriculum right now, it isn't available yet — check back, or use the Daily Challenge and Year 6 topics as general number-sense practice in the meantime.",
  },
];

/**
 * Per-topic FAQ (3 items), templated with the topic's own data rather than
 * hand-written per topic — 15 fully custom FAQ sets would be a lot of
 * near-duplicate content to maintain honestly. Still reads naturally
 * because every sentence pulls a real field (title/category/description),
 * not boilerplate padding. Used for both the visible accordion and the
 * FAQPage schema on each topic page, so they can't drift apart.
 */
export function getTopicFaq(topic) {
  return [
    {
      q: `What does the Year 6 ${topic.title} topic cover?`,
      a: `${topic.shortDescription} This sits within the ${topic.category} strand of the UK National Curriculum for Key Stage 2 (KS2) maths, and every question is written to match what a Year 6 pupil is expected to know by the end of the school year — not simplified or extended beyond the actual curriculum content for this topic.`,
    },
    {
      q: `How many ${topic.title} questions are there, and can my child repeat them?`,
      a: `This topic has its own question bank mixing easy, medium and hard questions, and you can choose a specific difficulty (or Mixed, for a bit of everything) before starting. Each attempt pulls a fresh, randomised set rather than repeating the exact same questions in the same order, so your child can practise ${topic.title} as many times as they need without the answers becoming memorised rather than understood.`,
    },
    {
      q: `Is ${topic.title} tested in the KS2 SATs?`,
      a: `Yes — the KS2 maths SATs, taken at the end of Year 6, assess the full National Curriculum for that year, which includes ${topic.title.toLowerCase()} alongside every other topic listed on the Year 6 Maths Challenge page. This practice page isn't formatted as a SATs-style exam paper, but reinforcing the underlying method here — with an explanation every time, right or wrong — builds the same skill a SATs question on this topic would test.`,
    },
  ];
}

// Shorter FAQ for the /maths/year-6 topic-grid hub — different questions
// from MATHS_FAQ (landing page) to avoid duplicate on-page content between
// the two, while still answering the choose-a-topic-specific questions a
// parent lands on this page asking.
export const YEAR6_HUB_FAQ = [
  {
    q: "Which Year 6 maths topic should my child start with?",
    a: "If you're not sure where to start, Place Value and the Four Operations are the foundation everything else builds on, so they're a safe first choice for any Year 6 child. If you already know your child struggles with a specific area — fractions and ratio are the two topics that trip up the most Year 6 pupils — jump straight to that topic instead. Each topic shows a live progress percentage once your child has answered a few questions, so you'll quickly see which of the 15 areas need the most repeat practice.",
  },
  {
    q: "How are the 15 Year 6 maths topics organised?",
    a: "They're grouped into six curriculum strands, matching how the UK National Curriculum itself organises Key Stage 2 maths: Number (place value, the four operations, factors/multiples/primes, fractions, decimals, percentages, ratio and proportion), Algebra, Measurement (including perimeter, area and volume), Geometry (properties of shapes, and position and direction), Statistics, and Problem Solving (word problems and mathematical reasoning). This mirrors how most Year 6 classrooms sequence the curriculum across the school year.",
  },
  {
    q: "Can my child repeat the same topic more than once?",
    a: "Yes, as many times as they like. Each attempt pulls a fresh, randomised set of questions from that topic's full question bank rather than repeating the exact same set, and a topic is marked 'completed' in the progress dashboard once every question in its bank has been answered correctly at least once across all attempts — so repeated practice keeps making genuine progress rather than just repeating a memorised sheet.",
  },
];
