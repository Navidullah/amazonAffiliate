// publish-gcse-igcse-maths-revision-plan-blog.js
// One-off script to publish an original, standalone GCSE/IGCSE maths revision
// study-plan article into MongoDB. Genuinely evergreen study-skills content,
// not tied to promoting a single paid product — links to the free Year 6
// Maths Challenge, IGCSE worked-solutions blog posts, and the math solver
// where naturally relevant, but stands alone as useful reading.
// Idempotent: re-running updates the same post (matched by slug).
//   Run: node publish-gcse-igcse-maths-revision-plan-blog.js
require("dotenv").config({ path: ".env.local" });
const { MongoClient } = require("mongodb");

const uri = process.env.DATABASE_URL;
if (!uri) {
  console.error("❌ DATABASE_URL is not set in .env.local.");
  process.exit(1);
}

const SLUG = "how-to-revise-for-gcse-igcse-maths-study-plan";
const TITLE = "How to Revise for GCSE or IGCSE Maths: A Study Plan That Actually Works";
const EXCERPT =
  "A practical, week-by-week revision method for GCSE and IGCSE maths — how to identify weak topics honestly, how much past-paper practice is actually useful, and the common mistakes that waste revision time.";
const CATEGORY = "Study Tips";
const TAGS = [
  "gcse maths revision",
  "igcse maths revision",
  "how to revise for maths",
  "past paper practice",
  "maths study plan",
  "exam revision tips",
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How many weeks before the exam should I start revising maths?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Eight to ten weeks is a realistic window for most students to properly cover weak topics and get through several past papers without cramming. Starting earlier isn't wasted — spaced-out revision over a longer period is well documented to produce better retention than the same number of hours compressed into two or three weeks.",
      },
    },
    {
      "@type": "Question",
      name: "Should I revise every topic equally, or focus on my weak areas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Focus most of your time on weak and medium-confidence topics, not the ones you already find easy. A common mistake is spending revision time re-doing topics you're already strong in because it feels productive and doesn't involve getting things wrong — but that time is far better spent on the two or three topics that are actually costing you marks.",
      },
    },
    {
      "@type": "Question",
      name: "How many past papers should I complete before the exam?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most students benefit from working through at least 6 to 10 full past papers under timed conditions, spread across the final month of revision, with a genuine review of every mistake afterward. Doing more papers without reviewing the mistakes properly gives diminishing returns — the review is where the actual learning happens, not the act of sitting the paper.",
      },
    },
    {
      "@type": "Question",
      name: "Is it better to revise by topic or by doing mixed past papers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both, in sequence. Early revision should be topic-by-topic, so you can build and check understanding of one method at a time without other topics interfering. In the final few weeks, switch to mixed, timed past papers, since real exams mix topics unpredictably and you need practice recognising which method a question needs without being told the topic in advance.",
      },
    },
    {
      "@type": "Question",
      name: "What should I do if I get a past paper question wrong?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Work out exactly why — a careless slip, a misread question, or a genuine gap in method — before moving on, since each requires a different fix. A careless slip needs slower, more careful working next time; a misread question needs practice underlining key words; a genuine method gap needs you to go back to that topic's notes and redo similar questions until the method is solid, not just the one question you got wrong.",
      },
    },
  ],
};

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.shopyor.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.shopyor.com/blog" },
    {
      "@type": "ListItem",
      position: 3,
      name: "How to Revise for GCSE/IGCSE Maths",
      item: `https://www.shopyor.com/blog/${SLUG}`,
    },
  ],
};

const CONTENT = `
<p>"Just do more past papers" is the most common maths revision advice there is — and it's not wrong, exactly, but it's incomplete. Past papers matter, but doing them without a plan for which topics need the time, and without properly reviewing what goes wrong, wastes hours that could have been spent far more effectively.</p>

<p>This is a practical, week-by-week approach to GCSE and IGCSE maths revision, built around three things that actually move a grade: honestly identifying weak topics, practising them in the right order, and reviewing mistakes properly instead of just moving on to the next question.</p>

<p><strong>In this guide:</strong></p>
<ol>
  <li><a href="#audit">Step 1 — an honest topic audit</a></li>
  <li><a href="#weeks-1-4">Weeks 1–4: topic-by-topic revision</a></li>
  <li><a href="#weeks-5-7">Weeks 5–7: mixed practice and timed papers</a></li>
  <li><a href="#final-week">Final week: light review, not new topics</a></li>
  <li><a href="#reviewing-mistakes">How to actually review a mistake</a></li>
  <li><a href="#calculator-vs-noncalc">Calculator vs non-calculator papers</a></li>
  <li><a href="#common-mistakes">Common revision mistakes to avoid</a></li>
  <li><a href="#faq">Frequently asked questions</a></li>
</ol>

<hr />

<h2 id="audit">Step 1 — an honest topic audit</h2>
<p>Before making any kind of schedule, list every topic on your specification and rate each one honestly: confident, okay, or weak. The word "honestly" matters more than it sounds — it's tempting to rate a topic as "okay" because you understood it in class, even if you haven't actually solved a question on it unassisted in months. A better test: could you do a mid-difficulty question on this topic right now, from memory, with no notes? If not, it's weak, regardless of how it felt in the lesson.</p>
<p>This audit is what the rest of the plan is built around — most of your revision time should go to the weak list, a smaller amount to "okay," and almost none to topics you're already confident in beyond the occasional refresher.</p>

<hr />

<h2 id="weeks-1-4">Weeks 1–4: topic-by-topic revision</h2>
<p>Work through your weak-topic list one at a time, in roughly this order for each topic:</p>
<ol>
  <li><strong>Re-read or re-watch the core method</strong> — notes, a textbook chapter, or a short explainer video. Keep this stage brief; the goal is a refresher, not re-learning from scratch.</li>
  <li><strong>Do 8–10 questions on that topic alone</strong>, starting easy and increasing in difficulty, checking answers as you go rather than in one batch at the end.</li>
  <li><strong>Redo any question you got wrong</strong> the next day, without looking at the worked solution first, to check whether the method has actually stuck.</li>
</ol>
<p>Spend two to three days per weak topic, then move to the next. Four weeks is usually enough to work through 8–12 weak topics this way, which covers most students' real gap list.</p>

<hr />

<h2 id="weeks-5-7">Weeks 5–7: mixed practice and timed papers</h2>
<p>This is where the approach shifts from single-topic practice to full, timed past papers. This matters because real exam papers deliberately mix topics without telling you which method a question needs — recognising "this is a Pythagoras question" or "this needs simultaneous equations" from the wording alone is a separate skill from knowing the method itself, and it only comes from mixed practice.</p>
<p>Do one full past paper under proper timed conditions roughly every 3–4 days during this stretch — that's around 6–8 papers across the three weeks, which lines up with most exam boards' recommendation of covering at least the last 5–6 years of past papers before the exam. Mark each paper against the official mark scheme, not just "did I get the right number," since method marks matter and partial credit for correct working is a real part of the final grade.</p>

<hr />

<h2 id="final-week">Final week: light review, not new topics</h2>
<p>The final week before the exam is not the time to tackle a topic you've been avoiding — starting something new this late, under pressure, tends to create anxiety without meaningfully improving the mark. Instead, review your notes from the weak topics you worked through in weeks 1–4, redo two or three questions from each to confirm the method is still solid, and do one final timed paper early in the week (not the day before) so there's still time to review it properly.</p>

<hr />

<h2 id="reviewing-mistakes">How to actually review a mistake</h2>
<p>This is the single most skipped step, and arguably the most valuable one. When a past-paper answer is wrong, don't just read the correct answer and move on — work out <em>why</em> it went wrong, because the fix is different depending on the cause:</p>
<ul>
  <li><strong>Careless slip</strong> (arithmetic error, copied a number wrong) — the method was right. The fix is slowing down and checking working, not re-learning the topic.</li>
  <li><strong>Misread the question</strong> (missed a units conversion, answered the wrong part) — the fix is practising underlining key words and numbers before starting to calculate.</li>
  <li><strong>Genuine method gap</strong> (didn't know which formula or approach to use) — the fix is going back to that topic's notes and doing several more similar questions, not just the one you got wrong.</li>
</ul>
<p>Keep a short running list of your most common mistake type across several papers — most students find one or two categories account for the majority of lost marks, and that list becomes the most useful revision guide you'll have in the final two weeks.</p>

<hr />

<h2 id="calculator-vs-noncalc">Calculator vs non-calculator papers</h2>
<p>Both GCSE and IGCSE maths split marks across a non-calculator paper and one or more calculator papers, and they test genuinely different skills — non-calculator papers reward accurate mental and written methods (long multiplication, fraction arithmetic, working with surds), while calculator papers move faster and put more weight on problem-solving across multiple steps. Revise them separately rather than assuming calculator-paper fluency transfers automatically; a student who's strong on a calculator paper can still lose easy marks on non-calculator arithmetic simply from being out of practice doing it by hand.</p>

<hr />

<h2 id="common-mistakes">Common revision mistakes to avoid</h2>
<ul>
  <li><strong>Re-revising strong topics.</strong> It feels productive because you get answers right, but it doesn't move your grade — time is better spent where marks are actually being lost.</li>
  <li><strong>Only reading worked solutions, never attempting the question first.</strong> Recognising a method when you see it solved is a much weaker skill than producing it yourself under exam conditions.</li>
  <li><strong>Skipping the mark scheme.</strong> Checking only whether the final answer matches misses method marks, and misses patterns in exactly where marks are typically lost.</li>
  <li><strong>Cramming all past papers into the final week.</strong> Papers done too close together, with no time to properly review mistakes between them, teach far less than the same number of papers spaced out.</li>
  <li><strong>Ignoring show-your-working questions.</strong> "Show that" and multi-step questions are marked on method, not just the final line — skipping steps to save time in practice builds a habit that costs marks in the real exam.</li>
</ul>

<hr />

<h2 id="faq">Frequently Asked Questions</h2>

<h3>How many weeks before the exam should I start revising maths?</h3>
<p>Eight to ten weeks is a realistic window for most students to properly cover weak topics and get through several past papers without cramming. Starting earlier isn't wasted — spaced-out revision over a longer period is well documented to produce better retention than the same number of hours compressed into two or three weeks.</p>

<h3>Should I revise every topic equally, or focus on my weak areas?</h3>
<p>Focus most of your time on weak and medium-confidence topics, not the ones you already find easy. A common mistake is spending revision time re-doing topics you're already strong in because it feels productive and doesn't involve getting things wrong — but that time is far better spent on the two or three topics that are actually costing you marks.</p>

<h3>How many past papers should I complete before the exam?</h3>
<p>Most students benefit from working through at least 6 to 10 full past papers under timed conditions, spread across the final month of revision, with a genuine review of every mistake afterward. Doing more papers without reviewing the mistakes properly gives diminishing returns — the review is where the actual learning happens, not the act of sitting the paper.</p>

<h3>Is it better to revise by topic or by doing mixed past papers?</h3>
<p>Both, in sequence. Early revision should be topic-by-topic, so you can build and check understanding of one method at a time without other topics interfering. In the final few weeks, switch to mixed, timed past papers, since real exams mix topics unpredictably and you need practice recognising which method a question needs without being told the topic in advance.</p>

<h3>What should I do if I get a past paper question wrong?</h3>
<p>Work out exactly why — a careless slip, a misread question, or a genuine gap in method — before moving on, since each requires a different fix. A careless slip needs slower, more careful working next time; a misread question needs practice underlining key words; a genuine method gap needs you to go back to that topic's notes and redo similar questions until the method is solid, not just the one question you got wrong.</p>

<hr />

<h2>Where to practise</h2>
<p>If you're working through IGCSE past-paper style questions with full worked solutions, Shopyor has step-by-step past-paper solution sets for <a href="/blog/igcse-0580-paper-2-worked-solutions-revision-guide">IGCSE 0580 Paper 2</a> and <a href="/blog/igcse-0580-core-paper-1-worked-solutions-mayjune2025">Core Paper 1</a>. Younger students building foundational number skills before GCSE/IGCSE can practise for free with the <a href="/maths">Year 6 Maths Challenge</a>, and if you get stuck on a specific step and want it explained rather than just answered, the <a href="/maths/solver">AI Math Solver</a> shows full working for algebra, equations, and calculus problems.</p>

<script type="application/ld+json">${JSON.stringify(FAQ_SCHEMA)}</script>
<script type="application/ld+json">${JSON.stringify(BREADCRUMB_SCHEMA)}</script>
`.trim();

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("app");
    const blogs = db.collection("blogs");
    const users = db.collection("users");

    let author = (await users.findOne({ role: "admin" })) || (await users.findOne({}));
    const authorName = author?.name || author?.email || "Shopyor Team";
    const authorId = author?._id || null;

    const plain = CONTENT.replace(/<[^>]+>/g, " ");
    const wordCount = plain.trim().split(/\s+/).filter(Boolean).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    const now = new Date();

    const result = await blogs.updateOne(
      { slug: SLUG },
      {
        $set: {
          title: TITLE,
          content: CONTENT,
          excerpt: EXCERPT,
          category: CATEGORY,
          tags: TAGS,
          author: authorName,
          authorId,
          readingTime,
          isPublished: true,
          updatedAt: now,
          publishedAt: now,
        },
        $setOnInsert: { createdAt: now, views: 0 },
      },
      { upsert: true },
    );

    console.log("Author:", authorName, authorId ? `(${authorId})` : "(no id)");
    console.log("Word count:", wordCount, "| Reading time:", readingTime, "min");
    console.log(result.upsertedId ? "✅ Published NEW post:" : "✅ Updated existing post (matched:", result.upsertedId || result.matchedCount, ")");
    console.log("URL: https://www.shopyor.com/blog/" + SLUG);
  } finally {
    await client.close();
  }
}

run().catch((e) => {
  console.error("❌ Failed:", e);
  process.exit(1);
});
