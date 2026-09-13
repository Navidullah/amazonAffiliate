// publish-ib-curriculum-changes-2026-2027-blog.js
// One-off script to publish a blog post covering the IB Diploma Programme's
// 2026-2027 curriculum review (new History syllabus, upcoming Maths AA/AI
// review, phased first-teaching dates) — a trending, newsworthy topic that
// cross-links to the existing IB AA HL Paper 1 practice product/post.
// Idempotent: re-running updates the same post (matched by slug).
//   Run: node publish-ib-curriculum-changes-2026-2027-blog.js
// Reads the SAME database the live site uses (DATABASE_URL from .env.local).
require("dotenv").config({ path: ".env.local" });
const { MongoClient } = require("mongodb");

const uri = process.env.DATABASE_URL;
if (!uri) {
  console.error(
    "❌ DATABASE_URL is not set. Add it to .env.local (the same value your\n" +
      "   live site / Vercel uses), then run this script again.",
  );
  process.exit(1);
}

const SLUG = "ib-diploma-curriculum-changes-2026-2027";
const TITLE =
  "IB Diploma Curriculum Changes 2026-2027: What's Actually New (History, Maths AA/AI, and First-Exam Dates)";
const EXCERPT =
  "The IB is rolling out its next curriculum review in phases through 2026-2027 — new History teaching from August 2026, Mathematics: AA/AI and Language B following in August 2027. Here's what's changing, when it actually hits your exams, and why current AA HL students aren't affected yet.";
const CATEGORY = "IB";
const TAGS = [
  "ib curriculum changes 2026",
  "ib diploma programme updates 2027",
  "ib history new curriculum",
  "ib maths aa ai curriculum review",
  "ib diploma first teaching 2027",
  "when do ib curriculum changes start",
  "ib subject guide changes 2026 2027",
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What IB Diploma subjects are changing for 2026-2027?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "History is first, with a new syllabus for first teaching from August 2026 and first exams in May 2028. Mathematics: Analysis and Approaches, Mathematics: Applications and Interpretation, Language ab initio, Language B, Religion and Society, and Dance follow with first teaching from August 2027, meaning first exams land around 2029. Other subjects continue on their existing syllabus until the IB publishes their own review dates.",
      },
    },
    {
      "@type": "Question",
      name: "Does this affect students sitting exams in May 2026 or May 2027?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. A subject change only applies to students who begin that subject's first teaching in the syllabus's stated start month. Students already partway through the current AA HL, AI, or Language B syllabus when a new version launches finish on the syllabus they started, not the new one.",
      },
    },
    {
      "@type": "Question",
      name: "Why is the IB revising History first?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The new History curriculum emphasizes inquiry, evidence, and judgement as core skills, with a slightly reduced number of extended-response questions on the final paper compared to the outgoing syllabus — part of a broader IB push toward assessing how students reason with evidence, not just what they can recall.",
      },
    },
    {
      "@type": "Question",
      name: "Is Mathematics: AA HL changing for the May 2026 exam session?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Mathematics: AA and AI are in the second wave of this review, with first teaching starting August 2027 — meaning students sitting AA HL Paper 1, 2, or 3 in May 2026 or May 2027 are on the current, unchanged syllabus.",
      },
    },
    {
      "@type": "Question",
      name: "Where can I check the official first-teaching and first-exam dates for my subject?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The IB publishes subject-by-subject syllabus and assessment timelines on its own Diploma Programme assessment pages — always confirm your specific subject's dates there or through your school's IB coordinator, since staggered rollouts mean two students in the same cohort can be on different syllabus versions for different subjects.",
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
      name: "IB Diploma Curriculum Changes 2026-2027",
      item: `https://www.shopyor.com/blog/${SLUG}`,
    },
  ],
};

const CONTENT = `
<p>Every few years the IB revises a batch of Diploma Programme subject guides, and 2026-2027 is one of those cycles. If you've seen headlines about "IB curriculum changes" and aren't sure whether they apply to you, the short version is: it depends entirely on which subject you're taking and when you started it. This guide breaks down exactly what's changing, when each change actually takes effect in an exam, and why most current students — including anyone practicing for a May 2026 or May 2027 exam session — aren't affected yet.</p>

<p><strong>Table of Contents</strong></p>
<ol>
  <li><a href="#whats-changing">What's Actually Changing</a></li>
  <li><a href="#timeline">The Rollout Timeline: First Teaching vs. First Exams</a></li>
  <li><a href="#history">New History Syllabus: What's Different</a></li>
  <li><a href="#maths">Mathematics AA/AI: What to Expect in 2027</a></li>
  <li><a href="#who-affected">Who This Actually Affects</a></li>
  <li><a href="#practice">Practicing for the Current Syllabus</a></li>
  <li><a href="#faq">Frequently Asked Questions</a></li>
  <li><a href="#conclusion">Conclusion</a></li>
</ol>

<hr />

<h2 id="whats-changing">What's Actually Changing</h2>
<p>The IB's current review cycle touches several Diploma Programme subjects on a staggered schedule rather than all at once. History is furthest along, with a revised syllabus for first teaching from August 2026. Mathematics: Analysis and Approaches (AA), Mathematics: Applications and Interpretation (AI), Language ab initio, Language B, Religion and Society, and Dance follow in a second wave, with first teaching from August 2027.</p>

<p>This is separate from the IB's rollout of digital exams, which is a different, parallel initiative affecting how exams are delivered (screen vs. paper) rather than what's on the syllabus. A subject can have a syllabus update, a digital-exam option, both, or neither in any given exam session.</p>

<hr />

<h2 id="timeline">The Rollout Timeline: First Teaching vs. First Exams</h2>
<p>The single most important detail to get right here is the gap between "first teaching" and "first exams." IB Diploma courses run over two years, so a syllabus that starts first teaching in August of one year doesn't produce its first graduating exam cohort until roughly two years later:</p>

<ul>
  <li><strong>History:</strong> first teaching August 2026 → first exams May 2028.</li>
  <li><strong>Mathematics AA/AI, Language ab initio, Language B, Religion and Society, Dance:</strong> first teaching August 2027 → first exams landing around 2029.</li>
</ul>

<p>This is why a student starting DP1 in August 2026 and a student starting DP1 in August 2027 can end up on genuinely different syllabus versions for the same subject — the change applies from the moment a cohort starts the course, not from a single fixed calendar date across every student.</p>

<hr />

<h2 id="history">New History Syllabus: What's Different</h2>
<p>The revised IB History syllabus puts more explicit weight on inquiry, evidence evaluation, and historical judgement as assessed skills, alongside a slightly reduced number of extended-response questions on the final paper compared to the outgoing version. The direction mirrors a broader pattern across IB subject reviews in recent cycles: less reward for pure recall, more reward for demonstrating how a conclusion was reached from the evidence given.</p>

<hr />

<h2 id="maths">Mathematics AA/AI: What to Expect in 2027</h2>
<p>Mathematics: Analysis and Approaches and Mathematics: Applications and Interpretation are both in the second wave, with first teaching from August 2027. The IB has not published full syllabus content changes for these subjects as of this update — schools and students should check the IB's own Diploma Programme assessment pages directly once the detailed subject guide is released, rather than relying on secondhand summaries for exact topic-level changes.</p>

<p>What is confirmed is the timing: any student sitting AA or AI Paper 1, 2, or 3 in May 2026 or May 2027 is on the current, unrevised syllabus. The change only reaches an exam paper once a cohort that started the new syllabus in August 2027 reaches its own final exam session.</p>

<hr />

<h2 id="who-affected">Who This Actually Affects</h2>
<ul>
  <li><strong>Not affected:</strong> any student already enrolled in AA, AI, Language B, or the current History syllabus ahead of their subject's stated first-teaching date — you finish on the syllabus you started.</li>
  <li><strong>Not affected (yet):</strong> students sitting May 2026 or May 2027 exams in any of the listed subjects.</li>
  <li><strong>Affected:</strong> students beginning DP1 in History from August 2026, or in AA/AI, Language ab initio, Language B, Religion and Society, or Dance from August 2027 onward.</li>
  <li><strong>Always check directly:</strong> your school's IB coordinator or the IB's own subject guide pages, since staggered timelines mean two students in the same year group can be on different syllabus versions for different subjects.</li>
</ul>

<hr />

<h2 id="practice">Practicing for the Current Syllabus</h2>
<p>If you're sitting AA HL Paper 1 in the current or upcoming exam session, the syllabus you're being tested on today is unaffected by the 2027 review. Shopyor's original AA HL Paper 1-style practice set — written to match the current syllabus, question format, and mark allocations, with method marks tagged M1/A1/R1 on every worked step — is a companion to <a href="/blog/ib-math-aa-hl-paper-1-practice-worked-solutions">our full guide to how Paper 1 marking actually works</a>, not affected by any of the changes described above.</p>

<p><a href="/products/ib-aahl-paper1-set1-worked-solutions">View: IB Math AA HL Paper 1 Style — Original Practice Questions with Worked Solutions →</a></p>

<p>This is original Shopyor practice content written to match the current AA HL Paper 1 format — not a solved official IB past paper, and not affiliated with or endorsed by the International Baccalaureate Organization (IBO).</p>
<p><strong>Also useful:</strong> if you're weighing IB against IGCSE-then-A-Level as a pathway, see our <a href="/blog/igcse-vs-ib-2026-comparison">IGCSE vs. IB 2026 comparison</a>. Browse the full catalog: <a href="/products">All worked solutions and practice packs →</a></p>

<hr />

<h2 id="faq">Frequently Asked Questions</h2>

<h3>What IB Diploma subjects are changing for 2026-2027?</h3>
<p>History first, for first teaching from August 2026 (first exams May 2028). Mathematics: AA and AI, Language ab initio, Language B, Religion and Society, and Dance follow with first teaching from August 2027.</p>

<h3>Does this affect students sitting exams in May 2026 or May 2027?</h3>
<p>No. Students already on a syllabus finish on that version; the change only applies from each subject's stated first-teaching start date going forward.</p>

<h3>Why is the IB revising History first?</h3>
<p>The new syllabus emphasizes inquiry, evidence, and judgement, with a slightly reduced number of extended-response questions on the final paper versus the outgoing syllabus.</p>

<h3>Is Mathematics: AA HL changing for the May 2026 exam session?</h3>
<p>No. AA and AI are in the second wave, with first teaching starting August 2027 — current exam sessions are unaffected.</p>

<h3>Where can I check the official first-teaching and first-exam dates for my subject?</h3>
<p>On the IB's own Diploma Programme assessment pages, or through your school's IB coordinator — always confirm subject-by-subject rather than assuming one date applies across the board.</p>

<hr />

<h2 id="conclusion">Conclusion</h2>
<p>The 2026-2027 IB curriculum review is real, but it's staggered and forward-looking, not retroactive. History leads with first teaching in August 2026; Mathematics AA/AI and several other subjects follow a year later. If you're currently preparing for an AA HL exam in the near term, your syllabus is unaffected — the practical takeaway is simply to confirm your own subject's first-teaching date directly with the IB or your coordinator rather than assuming a headline about "IB changes" applies to your specific exam session.</p>
<p><strong>Here's what to remember:</strong></p>
<ul>
  <li>History changes first (teaching from August 2026); Maths AA/AI and others follow a year later (teaching from August 2027).</li>
  <li>"First teaching" and "first exams" are roughly two years apart — a change never applies retroactively to a cohort already underway.</li>
  <li>Current AA HL students preparing for near-term exam sessions are on the unchanged syllabus.</li>
</ul>
<p><strong>Practicing for AA HL Paper 1 now?</strong> Get the <a href="/products/ib-aahl-paper1-set1-worked-solutions">IB Math AA HL Paper 1 Style Practice Set</a> — instant PDF download, fully worked solutions with method-mark tags, pay once.</p>

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
        $setOnInsert: {
          createdAt: now,
          views: 0,
        },
      },
      { upsert: true },
    );

    console.log("Author:", authorName, authorId ? `(${authorId})` : "(no id)");
    console.log("Word count:", wordCount, "| Reading time:", readingTime, "min");
    if (result.upsertedId) {
      console.log("✅ Published NEW post:", result.upsertedId);
    } else {
      console.log("✅ Updated existing post (matched:", result.matchedCount + ")");
    }
    console.log("URL: https://www.shopyor.com/blog/" + SLUG);
  } finally {
    await client.close();
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
