// publish-igcse-october-november-2026-exam-prep-blog.js
// One-off script to publish a blog post covering the IGCSE October/November
// 2026 exam series — a distinct, less-covered session from the May/June
// series already featured in other posts. Targets resit/Nov-session
// candidates and cross-links to the IGCSE 0580 worked-solutions product.
// Idempotent: re-running updates the same post (matched by slug).
//   Run: node publish-igcse-october-november-2026-exam-prep-blog.js
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

const SLUG = "igcse-october-november-2026-exam-prep-guide";
const TITLE =
  "IGCSE October/November 2026 Exam Series: A Prep Guide for Resit and Southern-Hemisphere Candidates";
const EXCERPT =
  "The IGCSE October/November series is easy to overlook if you're used to May/June coverage — but it's the main session for many Southern Hemisphere schools and the standard resit window everywhere else. Here's how it differs and how to prepare with the right past papers.";
const CATEGORY = "IGCSE";
const TAGS = [
  "igcse october november 2026",
  "igcse resit exams",
  "igcse oct nov exam series",
  "igcse 0580 october november past papers",
  "igcse exam series differences",
  "southern hemisphere igcse exams",
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Who actually sits the IGCSE October/November exam series?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Two main groups: Southern Hemisphere schools (parts of Africa, South America, Australia, and similar academic-calendar regions) for whom October/November is their main annual exam session, and candidates worldwide resitting a subject after the May/June series, including private candidates.",
      },
    },
    {
      "@type": "Question",
      name: "Is the October/November paper the same difficulty as May/June?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both series are set to the same syllabus and the same grading standard — Cambridge sets separate grade boundaries for each series specifically so a grade means the same thing regardless of which session a candidate sat. The specific questions differ, but the depth of knowledge and command-word expectations do not.",
      },
    },
    {
      "@type": "Question",
      name: "Are fewer subjects offered in October/November than May/June?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Generally yes — the October/November series typically offers a narrower subject list than the larger May/June series, since May/June is the primary session for the majority of Northern Hemisphere schools. Always check your specific subject's availability directly against Cambridge's published timetable for the session you're registering for.",
      },
    },
    {
      "@type": "Question",
      name: "Should resit candidates use May/June past papers to prepare for an October/November resit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — past papers from either series are valid practice, since both are set to the identical syllabus and mark scheme standard. Using the most recent 2-3 series of either session gives the most current picture of question style and command-word phrasing.",
      },
    },
    {
      "@type": "Question",
      name: "How much time should a resit candidate budget before an October/November exam?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "That depends on how narrow the original gap was, but a focused, mark-scheme-driven review of the specific topics that cost marks the first time — rather than a full re-study of the entire syllabus — is generally the more efficient use of a shorter resit preparation window.",
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
      name: "IGCSE October/November 2026 Exam Prep Guide",
      item: `https://www.shopyor.com/blog/${SLUG}`,
    },
  ],
};

const CONTENT = `
<p>Most IGCSE advice online is written for the May/June series, since that's the largest session by candidate numbers. But the October/November series matters just as much to the students sitting it — whether that's because it's your school's main annual exam session, or because you're resitting a subject after May/June. This guide covers what's actually different about the October/November series, and how to prepare for it correctly.</p>

<p><strong>Table of Contents</strong></p>
<ol>
  <li><a href="#who-sits">Who Actually Sits the October/November Series</a></li>
  <li><a href="#same-standard">Same Syllabus, Same Grading Standard</a></li>
  <li><a href="#subject-availability">Subject Availability Differences</a></li>
  <li><a href="#resit-strategy">A Focused Strategy for Resit Candidates</a></li>
  <li><a href="#using-past-papers">Which Past Papers to Actually Use</a></li>
  <li><a href="#faq">Frequently Asked Questions</a></li>
  <li><a href="#conclusion">Conclusion</a></li>
</ol>

<hr />

<h2 id="who-sits">Who Actually Sits the October/November Series</h2>
<p>Two distinct groups make up most of the October/November candidature. The first is Southern Hemisphere schools — across parts of Africa, South America, Australia, and similar academic-calendar regions — for whom October/November lines up with the end of their academic year, making it their primary annual IGCSE session rather than a secondary one. The second is resit candidates worldwide, including private candidates, retaking a subject after the May/June series to improve a grade.</p>

<hr />

<h2 id="same-standard">Same Syllabus, Same Grading Standard</h2>
<p>A common worry among resit candidates is whether the October/November paper is "easier" or "harder" than May/June. It's neither, by design: both series are set against the identical syllabus, and Cambridge sets separate grade boundaries for each series specifically so that a given grade represents the same standard of achievement no matter which session a candidate sat. The individual questions differ between series, but the depth of knowledge and command-word expectations (what "explain," "calculate," "justify" actually require) stay consistent.</p>

<hr />

<h2 id="subject-availability">Subject Availability Differences</h2>
<p>One genuine practical difference: the October/November series typically offers a narrower range of subjects than the larger May/June series, which functions as the primary session for the majority of Northern Hemisphere schools. Not every subject a school offers in May/June is guaranteed to run in October/November. Always check the specific subject against Cambridge's own published timetable for the exact session being registered for, rather than assuming full parity between the two series.</p>

<hr />

<h2 id="resit-strategy">A Focused Strategy for Resit Candidates</h2>
<p>Resit preparation windows are usually shorter than a first-attempt study period, which changes the most efficient strategy:</p>
<ol>
  <li><strong>Start from your actual marked paper or feedback, not a fresh full review.</strong> The specific topics and question types that cost marks the first time are the highest-leverage place to focus.</li>
  <li><strong>Re-check command words specifically.</strong> A large share of lost marks on a first attempt come from answering the wrong type of question for the command word used (e.g. describing instead of explaining), not from not knowing the content at all.</li>
  <li><strong>Time full past papers under real conditions at least once</strong>, even in a compressed prep window — timing pressure is often the actual reason marks were lost, separate from content knowledge.</li>
  <li><strong>Use the most recent 2-3 series of past papers</strong> (from either May/June or October/November — both are valid, since the standard is identical) rather than older papers that may reflect outdated question styles.</li>
</ol>

<hr />

<h2 id="using-past-papers">Which Past Papers to Actually Use</h2>
<p>Because May/June and October/November share the same syllabus and grading standard, past papers and worked solutions from either series are valid preparation material — there's no need to restrict practice to only "matching season" papers. What matters more is recency (the last 2-3 series) and working through full mark schemes rather than just checking final answers.</p>

<p>Shopyor's IGCSE Mathematics 0580 Extended Paper 2 worked solutions (May/June 2025, non-calculator) walk through every question exactly as an examiner would mark it — the technique and mark-scheme habits transfer directly to an October/November paper on the same syllabus:</p>

<p><a href="/products/igcse-0580-extended-paper2-mayjune2025-worked-solutions">View: IGCSE Mathematics 0580 Paper 2 Worked Solutions (Extended, Non-Calculator) →</a></p>

<p>For a deeper walkthrough of this paper's structure, see our <a href="/blog/igcse-0580-paper-2-worked-solutions-revision-guide">IGCSE 0580 Paper 2 revision guide</a>. Browse the full catalog: <a href="/products">All worked solutions and practice packs →</a></p>

<hr />

<h2 id="faq">Frequently Asked Questions</h2>

<h3>Who actually sits the IGCSE October/November exam series?</h3>
<p>Mainly Southern Hemisphere schools for whom it's the main annual session, plus resit and private candidates retaking a subject after May/June.</p>

<h3>Is the October/November paper the same difficulty as May/June?</h3>
<p>Both are set to the same syllabus and grading standard, with separate grade boundaries per series to keep a given grade equivalent across sessions.</p>

<h3>Are fewer subjects offered in October/November than May/June?</h3>
<p>Generally yes — always check your specific subject against Cambridge's published timetable for the session you're registering for.</p>

<h3>Should resit candidates use May/June past papers to prepare for an October/November resit?</h3>
<p>Yes — both series share the same syllabus and standard, so past papers from either are valid practice, ideally the most recent 2-3 series.</p>

<h3>How much time should a resit candidate budget before an October/November exam?</h3>
<p>It depends on the original gap, but a focused review targeting the specific topics that cost marks the first time is usually more efficient than a full syllabus re-study in a shorter window.</p>

<hr />

<h2 id="conclusion">Conclusion</h2>
<p>The October/November series isn't a lesser or easier version of May/June — it's set to the same syllabus and graded to the same standard, just with a narrower subject list and a different candidate mix (Southern Hemisphere main-session students and resit candidates). Preparing for it well means using recent past papers from either series, focusing resit prep on where marks were actually lost, and practicing against real mark schemes rather than just checking final answers.</p>
<p><strong>Here's what to remember:</strong></p>
<ul>
  <li>October/November is the primary session for many Southern Hemisphere schools and the standard resit window elsewhere.</li>
  <li>Same syllabus, same grading standard as May/June — separate grade boundaries keep results comparable.</li>
  <li>Resit prep is most efficient when targeted at specific lost-mark topics, not a full re-study.</li>
</ul>
<p><strong>Preparing for IGCSE Maths?</strong> Get the <a href="/products/igcse-0580-extended-paper2-mayjune2025-worked-solutions">IGCSE Mathematics 0580 Paper 2 Worked Solutions</a> — instant PDF download, every step marked the way an examiner would, pay once.</p>

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
