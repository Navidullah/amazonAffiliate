// Shared source of truth for the /maths/solver FAQ — both the visible
// accordion (MathSolverPageExperience.jsx) and the FAQPage JSON-LD in
// page.jsx render from this array so the two can never drift out of sync.

export const MATH_SOLVER_FAQ = [
  {
    q: "Is the AI Math Solver free, and do I need to sign up?",
    a: "You get one free question per day with no signup or account required — just type your question and pick your level. Need more than one question on the same day? A small one-time payment unlocks unlimited questions for the rest of that day, and it goes back to one free question again tomorrow either way.",
  },
  {
    q: "What levels and topics does it cover?",
    a: "You can choose School (ages 11-16, covering things like algebra basics, fractions, geometry and simple equations), College (further algebra, trigonometry, introductory calculus), or University (calculus, linear algebra, statistics, and more advanced topics). The explanation style and notation adjust to match the level you pick, so a school-level answer won't suddenly use university notation you haven't learned yet.",
  },
  {
    q: "Does it just give the final answer, or does it explain the steps?",
    a: "It always shows the full working, broken into numbered steps with a plain-English explanation for each one — not just the final answer. Every solution also ends with a 'check yourself' tip so you can verify the answer makes sense yourself, the same way a teacher would ask you to check your work.",
  },
  {
    q: "Does it draw diagrams, graphs, or tables?",
    a: "Yes, automatically when they help. If your question involves plotting a function, comparing shapes, or working with a data set, the solver generates an actual graph, labelled diagram, or table alongside the written steps — not just a text description of what it would look like.",
  },
  {
    q: "What does the day pass unlock, and how do I pay?",
    a: "Once you've used your free question for the day, unlocking costs a small one-time payment through our checkout provider — no account or subscription required. It unlocks unlimited questions for the rest of that calendar day only; it isn't a recurring charge, and access goes back to one free question again the next day.",
  },
  {
    q: "Is my question saved or shared with anyone?",
    a: "Your question is sent securely to generate the answer, but the text itself isn't stored against your identity — we only track how many questions were asked today (by IP address, or by account if you're signed in) to enforce the free limit and day pass. We don't publish, sell, or share the questions you ask.",
  },
  {
    q: "Can I use this for homework? Is that cheating?",
    a: "That depends on how you use it. Used to check your own working, understand a method you're stuck on, or see a fully worked example before attempting similar questions yourself, it's a genuinely useful study tool — the same way a textbook's worked examples or a tutor's explanation would be. Copying an answer straight into homework without understanding the steps defeats the purpose and may break your school or course's academic integrity rules, so always check what your teacher or institution allows before submitting AI-assisted work as your own.",
  },
  {
    q: "What if the explanation seems wrong?",
    a: "AI can occasionally make mistakes, especially on unusual or ambiguous questions — always check the final answer against the 'check yourself' step, and cross-reference with your textbook or teacher if something looks off. If your question was ambiguous (for example, missing a number or unclear notation), try rephrasing it more precisely and asking again.",
  },
  {
    q: "What kind of questions work best?",
    a: "Specific, complete questions get the best results — include the actual numbers, equation, or problem statement rather than a vague description like 'help with fractions'. If a question has multiple separate parts, asking them one at a time usually gives a clearer, more focused explanation than bundling everything into one message.",
  },
];
