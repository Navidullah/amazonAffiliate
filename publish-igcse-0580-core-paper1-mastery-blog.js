// publish-igcse-0580-core-paper1-mastery-blog.js
// One-off script to publish a blog post covering the IGCSE Mathematics 0580
// Core Paper 1 Mastery ebook (revision guide product).
// Idempotent: re-running updates the same post (matched by slug).
//   Run: node publish-igcse-0580-core-paper1-mastery-blog.js
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

const SLUG = "igcse-0580-core-paper-1-mastery-revision-guide";
const TITLE =
  "IGCSE Mathematics 0580 Core Paper 1: The Complete Revision Guide";
const EXCERPT =
  "A study plan for Cambridge IGCSE Mathematics 0580 Core Paper 1 (Non-calculator) — what the paper tests, how to build manual-arithmetic fluency, the exam techniques examiners reward, and a complete 23-chapter Core Paper 1 revision guide with worked examples and a full practice paper.";
const CATEGORY = "IGCSE Maths";
const TAGS = [
  "igcse 0580",
  "igcse mathematics core",
  "igcse mathematics 0580 core",
  "cambridge igcse mathematics 0580",
  "0580 core paper 1",
  "igcse core paper 1 revision",
  "igcse maths core tier grades c-g",
  "igcse maths revision guide",
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is IGCSE Mathematics 0580 Core Paper 1?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "0580 is the Cambridge syllabus code for IGCSE Mathematics. Students taking the Core tier sit Paper 1 (non-calculator) and Paper 3 (calculator allowed). Paper 1 is 1 hour 30 minutes and worth 56 marks, covering the full Core-tier content range — number, algebra, geometry, mensuration, and statistics — without a calculator, and is graded on the Core scale (grades C to G).",
      },
    },
    {
      "@type": "Question",
      name: "What's the difference between Core and Extended tier?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Core tier covers a narrower range of content than Extended tier and caps the achievable grade at C, but it's a more accessible route for students who need a secure grade without the harder Extended-only topics like calculus-adjacent algebra, advanced trigonometry (sine/cosine rule in 3D), and more complex vector proofs. Core Paper 1 and Paper 3 mirror the Extended split (non-calculator/calculator) but examine the reduced Core content list.",
      },
    },
    {
      "@type": "Question",
      name: "How should I revise for Core Paper 1 specifically?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Work through Core topics in a fixed structure: learn the key facts and rules, study a fully worked example, do timed no-calculator practice questions, then revisit anything you got wrong. Since Paper 1 is non-calculator, mental and written arithmetic fluency — fraction and percentage calculations, rounding, standard form — needs to be practiced on its own, separately from the topic content, because it's often the actual source of lost marks, not the maths itself.",
      },
    },
    {
      "@type": "Question",
      name: "What topics does Core Paper 1 actually cover?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Core Paper 1 draws from: number (place value, rounding, unit conversion, directed numbers, factors/HCF/LCM, prime factorisation), algebra (simplifying, factorising, sequences and the nth term), geometry (angle facts with parallel lines, transformations, circle theorems basics, 3D nets and volume), graphs (distance-time graphs, simultaneous equations), and statistics/probability (probability tree diagrams, scatter diagrams and correlation). A single paper typically samples across most of these areas.",
      },
    },
    {
      "@type": "Question",
      name: "Is a revision guide better than just doing past papers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "They serve different purposes and work best together. Past papers show you exam-format questions but assume you already know the method; a structured revision guide builds the method itself first — key facts, worked examples, common-mistake warnings — before moving to exam-style and past-paper-style practice, which is more effective for students still consolidating Core-tier content rather than just testing exam technique.",
      },
    },
    {
      "@type": "Question",
      name: "What's included in the Core Paper 1 Mastery ebook?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "23 chapters covering every Core topic examinable on Paper 1, each following the same structure: key facts, step-by-step worked examples with examiner tips, common-mistake call-outs, practice questions, activities, challenge questions, and a one-page revision summary. It ends with a full 80-mark practice paper with a complete mark scheme. It's a one-time $5 PDF download for the 2025-2027 syllabus, targeting grades C-G.",
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
      name: "IGCSE Mathematics 0580 Core Paper 1 Revision Guide",
      item: `https://www.shopyor.com/blog/${SLUG}`,
    },
  ],
};

const CONTENT = `
<p>Cambridge IGCSE Mathematics 0580 Core Paper 1 rewards a specific kind of preparation: knowing the Core-tier content cold, and being able to do every calculation by hand without a calculator to fall back on. Students who understand the topics but haven't built that manual fluency often lose marks on questions they could solve easily with a calculator in hand. This guide covers what Core Paper 1 actually tests, how it differs from Extended tier, the topics that come up most, and how to structure revision so it actually moves your grade — including a complete 23-chapter Core Paper 1 study guide.</p>

<p><strong>Table of Contents</strong></p>
<ol>
  <li><a href="#what-is-core-paper-1">What Is IGCSE 0580 Core Paper 1?</a></li>
  <li><a href="#core-vs-extended">Core vs Extended: What's the Real Difference?</a></li>
  <li><a href="#topics">What Topics Actually Come Up on Core Paper 1</a></li>
  <li><a href="#how-to-revise">How to Structure Core Paper 1 Revision</a></li>
  <li><a href="#guide">The Complete Core Paper 1 Mastery Guide</a></li>
  <li><a href="#mistakes">Where Core Students Lose Marks Most Often</a></li>
  <li><a href="#faq">Frequently Asked Questions</a></li>
  <li><a href="#conclusion">Conclusion</a></li>
</ol>

<hr />

<h2 id="what-is-core-paper-1">What Is IGCSE 0580 Core Paper 1?</h2>
<p><strong>0580</strong> is the Cambridge syllabus code for IGCSE Mathematics. Students on the <strong>Core tier</strong> sit Paper 1 (non-calculator, 1 hour 30 minutes, 56 marks) and Paper 3 (calculator allowed, 2 hours, 104 marks). Core tier is graded on a capped scale up to grade C, and is designed for students who benefit from a narrower, more manageable content range than Extended tier while still earning a recognised Cambridge IGCSE grade.</p>

<p>Because Paper 1 is non-calculator, every arithmetic step — converting a fraction, working out a percentage, rounding to a given number of significant figures — has to be done by hand. That's a different skill from knowing the topic, and it's one of the most under-revised parts of Core Paper 1 preparation.</p>

<hr />

<h2 id="core-vs-extended">Core vs Extended: What's the Real Difference?</h2>
<p>Core and Extended share the same paper structure (non-calculator + calculator), but Core covers a reduced content list and caps the top grade at C. Topics that are Extended-only — the sine and cosine rules, more advanced trigonometric graphs, harder algebraic manipulation, vector proof questions — don't appear on Core papers at all.</p>

<p>This matters for revision: time spent on Extended-only content is time not spent mastering the Core topics that will actually be examined. A Core-specific revision guide keeps study time focused on exactly what Core Paper 1 can ask.</p>

<hr />

<h2 id="topics">What Topics Actually Come Up on Core Paper 1</h2>
<p>Across recent Core Paper 1 papers, questions consistently draw from a recognisable set of areas:</p>

<ul>
  <li><strong>Number:</strong> place value and rounding, unit conversion, directed numbers, factors, HCF/LCM, prime factorisation</li>
  <li><strong>Algebra:</strong> simplifying and factorising expressions, sequences and the nth term</li>
  <li><strong>Geometry:</strong> angle facts with parallel lines, transformations (rotation, translation, enlargement), circle theorem basics, 3D nets and volume</li>
  <li><strong>Graphs and equations:</strong> distance-time graphs, simultaneous equations, standard form</li>
  <li><strong>Statistics and probability:</strong> probability tree diagrams, scatter diagrams and correlation</li>
</ul>

<p>A single Core Paper 1 typically samples across most of these areas, which is why a topic-by-topic revision guide that mirrors the actual syllabus range is more efficient than working through a general textbook that also covers Extended-only material you won't be examined on.</p>

<hr />

<h2 id="how-to-revise">How to Structure Core Paper 1 Revision</h2>
<p>The revision approach that actually moves a Core grade follows a consistent pattern per topic:</p>

<ol>
  <li><strong>Learn the key facts first.</strong> Every Core topic has a small set of rules and methods you must know cold before attempting questions — trying to guess a method under exam pressure wastes time you don't have.</li>
  <li><strong>Study a fully worked example.</strong> See every step written out, in the order an examiner wants to see it, before attempting the topic yourself.</li>
  <li><strong>Practice without a calculator, timed.</strong> Since Paper 1 is non-calculator, practicing under the same condition builds the specific arithmetic fluency the real paper demands.</li>
  <li><strong>Mark it, then revisit anything wrong.</strong> Read the common-mistake note for that topic before moving on — the same errors repeat across sittings, and knowing what they are before the exam prevents them.</li>
  <li><strong>Do a revision summary pass close to the exam.</strong> A one-page-per-topic summary is what you should be reviewing the night before, not full worked examples again.</li>
</ol>

<hr />

<h2 id="guide">The Complete Core Paper 1 Mastery Guide</h2>
<p>Shopyor has published a complete <strong>Cambridge IGCSE Mathematics 0580 Core Paper 1 Mastery</strong> ebook built around this exact structure: 23 chapters covering every Core topic examinable on Paper 1, each with key facts, step-by-step worked examples with examiner tips, no-calculator skill sections, common-mistake call-outs, practice questions, activities, challenge questions, and a one-page revision summary — finishing with a full 80-mark practice paper and complete mark scheme.</p>

<p><a href="/products/igcse-0580-core-paper1-mastery-complete-ebook">View: IGCSE Mathematics 0580 Core Paper 1 Mastery — Complete Revision Guide →</a></p>

<p>It's a one-time $5 PDF download, written for the 2025-2027 syllabus and targeting grades C-G. No subscription, no account, no sign-up — the download unlocks instantly after payment.</p>
<p><strong>Already have a specific past paper to practice?</strong> See our <a href="/blog/igcse-0580-core-paper-1-worked-solutions-mayjune2025">Core Paper 1 May/June 2025 worked solutions</a> for step-by-step answers to a real exam.</p>
<p><strong>Browse the full catalog:</strong> <a href="/products">All worked solutions and revision guides →</a></p>

<hr />

<h2 id="mistakes">Where Core Students Lose Marks Most Often</h2>
<ul>
  <li><strong>Rushing arithmetic under no-calculator conditions.</strong> A fraction or percentage calculation done too quickly by hand is one of the most common sources of an otherwise-correct method losing the final accuracy mark.</li>
  <li><strong>Skipping working on questions that look easy.</strong> Method marks are awarded for shown working, not just a correct final answer — an unshown mental calculation can cost a mark even when it's right.</li>
  <li><strong>Confusing Core content with Extended content while revising.</strong> Practicing from a mixed-tier resource wastes time on topics — like the sine/cosine rule — that Core Paper 1 will never actually ask.</li>
  <li><strong>Not reviewing common mistakes before the exam.</strong> The same handful of errors repeat topic after topic, session after session — knowing them in advance is often worth more than an extra hour of general practice.</li>
</ul>

<hr />

<h2 id="faq">Frequently Asked Questions</h2>

<h3>What is IGCSE Mathematics 0580 Core Paper 1?</h3>
<p>0580 is the Cambridge syllabus code for IGCSE Mathematics. Core-tier students sit Paper 1 (non-calculator, 1 hour 30 minutes, 56 marks) and Paper 3 (calculator allowed). Core tier is capped at grade C but covers a narrower content range than Extended.</p>

<h3>What's the difference between Core and Extended tier?</h3>
<p>Core covers a narrower content range and caps the achievable grade at C, leaving out Extended-only topics like the sine/cosine rule and harder algebra. Both tiers share the same non-calculator/calculator paper structure.</p>

<h3>How should I revise for Core Paper 1 specifically?</h3>
<p>Learn the key facts for each topic, study a worked example, practice without a calculator under timed conditions, then revisit mistakes using a common-mistake reference before moving on.</p>

<h3>What topics does Core Paper 1 actually cover?</h3>
<p>Number (rounding, HCF/LCM, factors), algebra (simplifying, sequences), geometry (angles, transformations, circle basics), graphs (distance-time, simultaneous equations), and statistics/probability (tree diagrams, scatter diagrams).</p>

<h3>Is a revision guide better than just doing past papers?</h3>
<p>They work best together — a structured guide builds the method first, then past papers test exam technique on that foundation, which is more effective than jumping straight to past papers before the underlying content is secure.</p>

<h3>What's included in the Core Paper 1 Mastery ebook?</h3>
<p>23 chapters covering every Core topic on Paper 1, with worked examples, examiner tips, common-mistake warnings, practice and challenge questions, revision summaries, and a full 80-mark practice paper with mark scheme. One-time $5 PDF download for the 2025-2027 syllabus.</p>

<hr />

<h2 id="conclusion">Conclusion</h2>
<p>Core Paper 1 doesn't reward guesswork under pressure — it rewards students who know the Core-tier content cold and can do every calculation by hand without relying on a calculator. The fastest way to close that gap is a revision structure that builds method first, then tests it under real exam conditions.</p>
<p><strong>Here's what to remember:</strong></p>
<ul>
  <li>Core Paper 1 tests a narrower content range than Extended — don't waste revision time on topics you won't be examined on.</li>
  <li>Manual arithmetic fluency matters as much as topic knowledge on a non-calculator paper.</li>
  <li>Learn common mistakes before the exam — the same errors repeat across sittings.</li>
</ul>
<p><strong>Ready to revise?</strong> Get the <a href="/products/igcse-0580-core-paper1-mastery-complete-ebook">IGCSE Mathematics 0580 Core Paper 1 Mastery — Complete Revision Guide</a> — instant PDF download, 23 chapters, worked examples, and a full practice paper.</p>

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
