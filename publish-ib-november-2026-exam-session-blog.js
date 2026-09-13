// publish-ib-november-2026-exam-session-blog.js
// One-off script to publish a blog post covering the IB's November 2026
// exam session — the expanded digital-exam option for Language and
// Literature / Language Acquisition subjects, distinct from the May 2026
// results coverage already published in "ib-results-2026-explained".
// Idempotent: re-running updates the same post (matched by slug).
//   Run: node publish-ib-november-2026-exam-session-blog.js
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

const SLUG = "ib-november-2026-exam-session-digital-exams";
const TITLE =
  "IB November 2026 Exam Session: Digital Exams Expand to Language & Literature, Language Acquisition";
const EXCERPT =
  "The IB's November 2026 exam session widens its digital-exam option beyond the May 2026 launch, with Language and Literature and Language Acquisition subjects now included for every IB World School. Here's what's actually optional, what isn't, and what November candidates need to know.";
const CATEGORY = "IB";
const TAGS = [
  "ib november 2026 exam session",
  "ib digital exams november 2026",
  "ib language and literature digital exam",
  "ib language acquisition digital exam",
  "ib exam timetable november 2026",
  "ib digital exam rollout 2026 2029",
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What's different about the IB's November 2026 exam session?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "From November 2026, all IB World Schools have the option to sit online exams for select subjects — specifically Language and Literature and Language Acquisition — expanding the digital-exam programme beyond its initial May 2026 launch.",
      },
    },
    {
      "@type": "Question",
      name: "Do students have to choose a digital exam in November 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. During this early rollout phase, students in the covered subjects can choose between a digital or paper exam. It is an added option for schools and candidates, not a replacement for the paper format.",
      },
    },
    {
      "@type": "Question",
      name: "Will a digital exam result be graded differently from a paper exam result?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Grade boundaries are set so that a student should be able to achieve the same result whether they sit the digital or paper version of an exam, per the IB's own stated approach to this rollout.",
      },
    },
    {
      "@type": "Question",
      name: "Is the November session the same as the May exam session?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The IB Diploma Programme runs two annual exam sessions, May and November, serving different cohorts (commonly schools following a Northern vs. Southern Hemisphere academic calendar, plus some November-only candidates). The digital-exam rollout applies across both sessions but on its own phased timeline — May 2026 launched first, November 2026 widened the subject list.",
      },
    },
    {
      "@type": "Question",
      name: "What's the long-term plan for IB digital exams beyond 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The IB has stated it plans to introduce digital exams across subject groups in a phased approach from 2026 through 2029, alongside a separate systems-transformation pilot programme running from 2025-2027 with expansion to around 20 early-adopter schools globally by 2028.",
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
      name: "IB November 2026 Exam Session",
      item: `https://www.shopyor.com/blog/${SLUG}`,
    },
  ],
};

const CONTENT = `
<p>The IB's digital-exam programme didn't stop at its May 2026 launch. From November 2026, the option widens to every IB World School for two more subject groups — Language and Literature, and Language Acquisition. If you're a November-session candidate (or your school is deciding whether to opt in), here's exactly what's new, what's optional, and how this fits into the IB's longer digital rollout plan.</p>

<p><strong>Table of Contents</strong></p>
<ol>
  <li><a href="#whats-new">What's New for November 2026</a></li>
  <li><a href="#may-vs-november">May 2026 Launch vs. November 2026 Expansion</a></li>
  <li><a href="#optional">Why It's Optional, Not Mandatory</a></li>
  <li><a href="#grading">How Grading Stays Comparable</a></li>
  <li><a href="#longer-timeline">The Longer 2026-2029 Rollout Plan</a></li>
  <li><a href="#faq">Frequently Asked Questions</a></li>
  <li><a href="#conclusion">Conclusion</a></li>
</ol>

<hr />

<h2 id="whats-new">What's New for November 2026</h2>
<p>From November 2026, all IB World Schools have the option to sit online exams for select subjects — Language and Literature and Language Acquisition are the two named subject groups included at this stage. This follows the IB's initial digital-exam launch for the IB Diploma Programme (IBDP) and IB Career-related Programme (CP) in May 2026.</p>

<hr />

<h2 id="may-vs-november">May 2026 Launch vs. November 2026 Expansion</h2>
<p>May 2026 was the first live exam session to include a digital-exam option under this programme. November 2026 widens the subject coverage to Language and Literature and Language Acquisition specifically, and extends the option to all IB World Schools rather than a narrower early-access group. The two sessions serve different candidate cohorts (schools on different academic-year calendars, plus November-only candidates), so the same rollout milestone reaches each session on its own schedule rather than simultaneously.</p>

<hr />

<h2 id="optional">Why It's Optional, Not Mandatory</h2>
<p>During this early rollout phase, students in the covered subjects can choose between a digital or a paper exam — schools are not required to switch, and individual candidates within a participating school aren't forced onto the digital format either. This mirrors the same opt-in structure the IB and Cambridge International have both taken with their respective digital-exam rollouts: expand access first, keep paper available as the parallel default, and let adoption grow at the school's own pace.</p>

<hr />

<h2 id="grading">How Grading Stays Comparable</h2>
<p>A common concern with any new exam format is whether it disadvantages students who choose it (or don't). The IB's stated approach is that grade boundaries are set so a student could get the same result whether they take the digital or paper assessment for a given subject — meaning the format choice is designed to be neutral to outcome, not a separate harder or easier track.</p>

<hr />

<h2 id="longer-timeline">The Longer 2026-2029 Rollout Plan</h2>
<p>November 2026's expansion is one step in a longer, explicitly phased plan: the IB intends to introduce digital exams across subject groups from 2026 through 2029. Running alongside this is a separate systems-transformation pilot programme in a first assessment-and-refinement phase from 2025-2027, expanding to roughly 20 early-adopter schools globally by 2028 — a broader initiative than the exam-format rollout alone, worth distinguishing if you see both mentioned together in IB communications.</p>

<hr />

<h2 id="faq">Frequently Asked Questions</h2>

<h3>What's different about the IB's November 2026 exam session?</h3>
<p>All IB World Schools now have the option to sit online exams for Language and Literature and Language Acquisition, expanding beyond the May 2026 digital-exam launch.</p>

<h3>Do students have to choose a digital exam in November 2026?</h3>
<p>No — it's an added option alongside the paper format, not a replacement, during this early rollout phase.</p>

<h3>Will a digital exam result be graded differently from a paper exam result?</h3>
<p>No. Grade boundaries are set so a student could achieve the same result on either format.</p>

<h3>Is the November session the same as the May exam session?</h3>
<p>No — May and November are separate annual IB exam sessions serving different cohorts; the digital rollout reaches each on its own phased timeline.</p>

<h3>What's the long-term plan for IB digital exams beyond 2026?</h3>
<p>A phased introduction across subject groups from 2026 through 2029, alongside a separate systems-transformation pilot expanding to about 20 early-adopter schools globally by 2028.</p>

<hr />

<h2 id="conclusion">Conclusion</h2>
<p>November 2026 is a genuine expansion of the IB's digital-exam option, not a change to what's tested or how it's graded — Language and Literature and Language Acquisition candidates can now choose a digital format at any IB World School, with paper remaining fully available. The syllabus content and mark schemes behind either format stay the same, which is exactly why targeted, mark-scheme-accurate practice remains the highest-leverage prep regardless of which exam format a school or student ultimately picks.</p>
<p><strong>Here's what to remember:</strong></p>
<ul>
  <li>November 2026 adds Language and Literature and Language Acquisition to the IB's digital-exam option, available to all IB World Schools.</li>
  <li>It's optional — students can choose digital or paper for covered subjects.</li>
  <li>Grade boundaries are designed to be comparable across both formats.</li>
</ul>
<p><strong>Preparing for an IB Maths exam session?</strong> See our <a href="/blog/ib-math-aa-hl-paper-1-practice-worked-solutions">guide to how AA HL Paper 1 marking actually works</a>, or get the <a href="/products/ib-aahl-paper1-set1-worked-solutions">IB Math AA HL Paper 1 Style Practice Set</a> — instant PDF download, pay once. Browse the full catalog: <a href="/products">All worked solutions and practice packs →</a></p>

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
