// publish-igcse-0580-core-paper1-mayjune2025-blog.js
// One-off script to publish a blog post covering the IGCSE Mathematics 0580
// Core Paper 1 (May/June 2025) Worked Solutions product — sold both as a
// paid-download digital product and as a free-to-read Book.
// Idempotent: re-running updates the same post (matched by slug).
//   Run: node publish-igcse-0580-core-paper1-mayjune2025-blog.js
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

const SLUG = "igcse-0580-core-paper-1-worked-solutions-mayjune2025";
const TITLE =
  "IGCSE Mathematics 0580 Core Paper 1 (May/June 2025): Full Worked Solutions";
const EXCERPT =
  "Step-by-step worked solutions to the real Cambridge IGCSE Mathematics 0580 Core Paper 1 (Variant 11) exam from May/June 2025 — all 26 questions solved with examiner tips and mark-scheme notation, plus how to actually use past-paper solutions to revise.";
const CATEGORY = "IGCSE Maths";
const TAGS = [
  "igcse 0580",
  "igcse mathematics core",
  "igcse 0580 core paper 1",
  "igcse maths past papers",
  "0580/11 may june 2025",
  "igcse core paper 1 worked solutions",
  "cambridge igcse maths past paper solutions",
  "igcse maths variant 11",
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Which exam do these worked solutions cover?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This pack covers the real Cambridge IGCSE Mathematics 0580 Paper 1 (Core tier, Variant 11) exam from the May/June 2025 session — all 26 questions, solved in full with the reasoning behind every step, examiner tips flagging common mistakes, and mark-scheme notation (M1, A1, B1) shown alongside each answer.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need the official question paper too?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The question wording in this guide is paraphrased in Shopyor's own words rather than reproduced from Cambridge's copyrighted paper, though question numbers and mark allocations follow the original paper for easy cross-reference. You'll get the most value working from the real May/June 2025 Paper 1 question paper alongside the solutions.",
      },
    },
    {
      "@type": "Question",
      name: "What topics does this paper cover?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The May/June 2025 Core Paper 1 covers the full Core syllabus range examined on Paper 1: place value and rounding, unit conversion, directed numbers, factors/HCF/LCM and prime factorisation, algebraic simplifying and factorising, sequences and the nth term, distance-time graphs, 3D nets and volume, angle facts with parallel lines, probability tree diagrams, scatter diagrams and correlation, circle theorems, geometric transformations, standard form, and simultaneous equations.",
      },
    },
    {
      "@type": "Question",
      name: "How should I use these worked solutions to revise?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Attempt each question from the real paper first, under timed conditions if possible, before checking the solution. Then compare your working step by step against the mark-scheme-ordered method, not just the final answer, so you can see exactly where a method (M), accuracy (A), or independent (B) mark was earned or lost.",
      },
    },
    {
      "@type": "Question",
      name: "Can I read this for free, or is it a paid download?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both. You can read the full worked solutions for free directly in the browser. A one-time $4.99 payment unlocks the downloadable PDF for offline study and printing — no subscription or account required.",
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
      name: "IGCSE Mathematics 0580 Core Paper 1 Worked Solutions May/June 2025",
      item: `https://www.shopyor.com/blog/${SLUG}`,
    },
  ],
};

const CONTENT = `
<p>If you've just sat, or are about to revise from, the Cambridge IGCSE Mathematics 0580 Core Paper 1 exam from the May/June 2025 session, seeing exactly how each mark was earned matters more than just knowing the final answer. This guide walks through what the paper covers, how to use worked past-paper solutions properly, and links to a complete step-by-step solutions pack for all 26 questions on the May/June 2025 Core Paper 1 (Variant 11) paper.</p>

<p><strong>Table of Contents</strong></p>
<ol>
  <li><a href="#about-this-paper">About the May/June 2025 Core Paper 1</a></li>
  <li><a href="#topics">Topics Covered on This Paper</a></li>
  <li><a href="#how-to-revise">How to Use These Worked Solutions</a></li>
  <li><a href="#solutions">Full Worked Solutions — May/June 2025</a></li>
  <li><a href="#mistakes">Common Mistakes This Paper Exposes</a></li>
  <li><a href="#faq">Frequently Asked Questions</a></li>
  <li><a href="#conclusion">Conclusion</a></li>
</ol>

<hr />

<h2 id="about-this-paper">About the May/June 2025 Core Paper 1</h2>
<p>Cambridge IGCSE Mathematics 0580 Core Paper 1 (Variant 11), sat in the <strong>May/June 2025</strong> session, is the Core-tier non-calculator paper — 1 hour 30 minutes, 56 marks, drawing across the full Core syllabus range. Like every Paper 1 sitting, every calculation on this paper has to be done by hand, which is exactly where Core students most often lose marks even when they know the underlying topic.</p>

<hr />

<h2 id="topics">Topics Covered on This Paper</h2>
<p>The 26 questions on this paper span the full Core Paper 1 syllabus range:</p>

<ul>
  <li><strong>Number:</strong> place value and rounding, unit conversion, directed numbers, factors, HCF/LCM, prime factorisation</li>
  <li><strong>Algebra:</strong> simplifying and factorising expressions, sequences and the nth term</li>
  <li><strong>Geometry:</strong> angle facts with parallel lines, geometric transformations (rotation, translation, enlargement), circle theorems, 3D nets and volume</li>
  <li><strong>Graphs and equations:</strong> distance-time graphs, simultaneous equations, standard form</li>
  <li><strong>Statistics and probability:</strong> probability tree diagrams, scatter diagrams and correlation</li>
</ul>

<hr />

<h2 id="how-to-revise">How to Use These Worked Solutions</h2>
<p>Worked solutions are most useful when they're used to check reasoning, not just answers:</p>

<ol>
  <li><strong>Attempt the real question first,</strong> from the official May/June 2025 paper, ideally timed and without a calculator.</li>
  <li><strong>Compare method against mark-scheme notation.</strong> Each step in this guide is labelled the way Cambridge mark schemes award marks (M1, A1, B1), so you can see precisely where a mark was earned or lost, not just whether the final answer matched.</li>
  <li><strong>Read the examiner tip on every question.</strong> The most common mistake on a question tends to be specific and repeatable across sittings — knowing it in advance is often worth more than re-deriving the method a second time.</li>
  <li><strong>Redo it unaided a few days later.</strong> Reproducing the full method without looking is the real test of whether it's learned.</li>
</ol>

<hr />

<h2 id="solutions">Full Worked Solutions — May/June 2025</h2>
<p>Shopyor has published a complete worked-solutions pack for this exact paper — <strong>Cambridge IGCSE Mathematics 0580 Paper 1 (Core tier, Variant 11), May/June 2025</strong> — all 26 questions solved step by step, with the reasoning behind every step, examiner tips on common mistakes, and mark-scheme notation shown alongside each answer.</p>

<p><a href="/products/igcse-0580-core-paper1-mayjune2025-worked-solutions">View: IGCSE 0580 Core Paper 1 Worked Solutions (May/June 2025) →</a></p>

<p>You can read the full solutions free in the browser, or unlock the downloadable PDF for a one-time $4.99 payment — no subscription, no account required. Question wording is paraphrased in our own words rather than reproduced from Cambridge's copyrighted paper, so you'll want your own copy of the official May/June 2025 Paper 1 question paper alongside it.</p>
<p><strong>Studying for a future sitting instead?</strong> See the <a href="/blog/igcse-0580-core-paper-1-mastery-revision-guide">complete Core Paper 1 revision guide</a> for a full 23-chapter study plan.</p>
<p><strong>Browse the full catalog:</strong> <a href="/products">All worked solutions and revision guides →</a></p>

<hr />

<h2 id="mistakes">Common Mistakes This Paper Exposes</h2>
<ul>
  <li><strong>Rounding too early.</strong> An intermediate value rounded before the final step is one of the most common ways an otherwise-correct method still loses the accuracy mark.</li>
  <li><strong>Skipping working on questions that look short.</strong> Method marks are awarded for shown working — a correct final answer with no working can still lose marks.</li>
  <li><strong>Misreading multi-part questions.</strong> On (a)/(b)/(i)/(ii)-style questions, answering the part you expected rather than the one actually asked is a repeat source of lost marks.</li>
  <li><strong>Giving an answer in the wrong form.</strong> A numerically correct answer given as a decimal instead of the exact form requested can still lose the accuracy mark.</li>
</ul>

<hr />

<h2 id="faq">Frequently Asked Questions</h2>

<h3>Which exam do these worked solutions cover?</h3>
<p>The real Cambridge IGCSE Mathematics 0580 Paper 1 (Core tier, Variant 11) exam from May/June 2025 — all 26 questions, solved in full with examiner tips and mark-scheme notation.</p>

<h3>Do I need the official question paper too?</h3>
<p>Yes — question wording here is paraphrased rather than reproduced from Cambridge's copyrighted paper, though question numbers and marks follow the original for easy cross-reference.</p>

<h3>What topics does this paper cover?</h3>
<p>The full Core syllabus range examined on Paper 1: number, algebra, geometry, graphs and equations, and statistics/probability.</p>

<h3>How should I use these worked solutions to revise?</h3>
<p>Attempt each question first, then compare your working step by step against the mark-scheme-ordered method, not just the final answer.</p>

<h3>Can I read this for free, or is it a paid download?</h3>
<p>Both — free to read in the browser, or a one-time $4.99 payment to unlock the downloadable PDF for offline study and printing.</p>

<hr />

<h2 id="conclusion">Conclusion</h2>
<p>The May/June 2025 Core Paper 1 tests the same Core-tier content as every other sitting, under the same non-calculator conditions — which means the marks lost or gained usually come down to method discipline, not just topic knowledge. Working through this paper against step-by-step, mark-scheme-aligned solutions is the fastest way to see exactly where that discipline needs work.</p>
<p><strong>Ready to check your working?</strong> Read or download the <a href="/products/igcse-0580-core-paper1-mayjune2025-worked-solutions">IGCSE 0580 Core Paper 1 Worked Solutions (May/June 2025)</a> — free to read, $4.99 to download.</p>

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
  console.error("❌ Failed:", e);
  process.exit(1);
});
