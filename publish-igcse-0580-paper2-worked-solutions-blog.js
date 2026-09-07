// publish-igcse-0580-paper2-worked-solutions-blog.js
// One-off script to publish a blog post covering the IGCSE Mathematics 0580
// Extended Paper 2 (Non-Calculator) Worked Solutions product — the first
// IGCSE product sold on the homepage/products catalog.
// Idempotent: re-running updates the same post (matched by slug).
//   Run: node publish-igcse-0580-paper2-worked-solutions-blog.js
// Reads the SAME database the live site uses (DATABASE_URL from .env.local).
require("dotenv").config({ path: ".env.local" });
const { MongoClient } = require("mongodb");

const uri = process.env.DATABASE_URL;
if (!uri) {
  console.error(
    "❌ DATABASE_URL is not set. Add it to .env.local (the same value your\n" +
      "   live site / Vercel uses), then run `node publish-igcse-0580-paper2-worked-solutions-blog.js` again.",
  );
  process.exit(1);
}

const SLUG = "igcse-0580-paper-2-worked-solutions-revision-guide";
const TITLE =
  "IGCSE Mathematics 0580 Paper 2: Past Paper Worked Solutions & Revision Guide";
const EXCERPT =
  "A revision guide to Cambridge IGCSE Mathematics 0580 Paper 2 (Non-calculator) — what the paper actually tests, why it trips students up, how to revise with worked past-paper solutions, and a full May/June 2025 worked-solutions pack.";
const CATEGORY = "IGCSE Maths";
const TAGS = [
  "igcse 0580",
  "igcse mathematics",
  "igcse mathematics 0580",
  "cambridge igcse mathematics 0580",
  "0580 mathematics",
  "0580 igcse maths past papers",
  "0580 igcse maths paper 2",
  "igcse maths paper 2 worked solutions",
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is IGCSE Mathematics 0580 Paper 2?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "0580 is the syllabus code for Cambridge IGCSE Mathematics. Paper 2 is the Extended-tier non-calculator paper, sat alongside Paper 4 (the calculator paper) by students taking the Extended tier. It's typically 1 hour 30 minutes and worth 70 marks, covering the full range of Extended-tier topics — number, algebra, geometry, statistics, and probability — without a calculator.",
      },
    },
    {
      "@type": "Question",
      name: "Why is the non-calculator paper harder for most students?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It's not that the maths itself is harder than Paper 4 — it's that every arithmetic step has to be done by hand, so small slips (a misplaced decimal, an arithmetic error in a multi-step surds or standard form question) cost marks that a calculator would have prevented. Students who are used to leaning on a calculator for routine computation often lose more marks on Paper 2 than on Paper 4, even when they understand the underlying method.",
      },
    },
    {
      "@type": "Question",
      name: "How should I use worked past-paper solutions to revise?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Attempt the real question from the official paper first, under timed conditions if possible, before looking at the worked solution. Then compare your working line by line against the mark-scheme-ordered steps, not just the final answer — the goal is to see exactly where a method (M) mark, accuracy (A) mark, or independent (B) mark was earned or lost, since that's how Cambridge examiners actually award marks.",
      },
    },
    {
      "@type": "Question",
      name: "What topics come up most on IGCSE 0580 Paper 2?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Recent Paper 2 papers consistently draw from: number topics (HCF/LCM, standard form, recurring decimals, surds, indices), algebra (linear equations, sequences, algebraic fractions), geometry (symmetry, bearings, angles, circle theorems, vectors, transformations), mensuration (arc length, surface area), graphs (reciprocal functions), and statistics (mean, histograms, cumulative frequency). A single paper typically touches most of these areas across its 19-20 questions.",
      },
    },
    {
      "@type": "Question",
      name: "Are these solutions the same as Cambridge's official mark scheme?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The worked solutions are written independently by Shopyor, following the same method-mark structure Cambridge mark schemes use (showing each M1/A1/B1-style step in order), and they reference the official paper code and question numbers. They do not reproduce Cambridge's copyrighted question text, so you'll need your own copy of the question paper alongside the guide. Not affiliated with or endorsed by Cambridge Assessment International Education.",
      },
    },
    {
      "@type": "Question",
      name: "Is the May/June 2025 worked-solutions pack free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No — it's a one-time $5 PDF download covering all questions on the paper, with step-by-step worked solutions and an examiner tip on every question. There's no subscription or account required; the download unlocks instantly after payment.",
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
      name: "IGCSE Mathematics 0580 Paper 2 Revision Guide",
      item: `https://www.shopyor.com/blog/${SLUG}`,
    },
  ],
};

const CONTENT = `
<p>If you've sat a past Cambridge IGCSE Mathematics 0580 Paper 2 and walked out knowing you understood most of the topics but still lost marks you can't fully explain, you're not alone. Paper 2 — the Extended-tier <strong>non-calculator</strong> paper — is where students who are otherwise strong at maths lose marks not because they don't know the method, but because a single arithmetic slip mid-question derails the whole answer. This guide breaks down what Paper 2 actually tests, why it catches students out, and how to revise with worked past-paper solutions properly — including a full worked-solutions pack for the May/June 2025 paper.</p>

<p><strong>Table of Contents</strong></p>
<ol>
  <li><a href="#what-is-0580-paper-2">What Is IGCSE 0580 Paper 2?</a></li>
  <li><a href="#why-hard">Why the Non-Calculator Paper Catches Students Out</a></li>
  <li><a href="#topics">What Topics Actually Come Up</a></li>
  <li><a href="#how-to-revise">How to Revise With Worked Past-Paper Solutions</a></li>
  <li><a href="#practice">Worked Solutions: May/June 2025 Paper 2</a></li>
  <li><a href="#mistakes">Mistakes Examiners See Most Often</a></li>
  <li><a href="#faq">Frequently Asked Questions</a></li>
  <li><a href="#conclusion">Conclusion</a></li>
</ol>

<hr />

<h2 id="what-is-0580-paper-2">What Is IGCSE 0580 Paper 2?</h2>
<p><strong>0580</strong> is the Cambridge syllabus code for IGCSE Mathematics. Students taking the <strong>Extended tier</strong> sit two written papers: Paper 2 (non-calculator, 1 hour 30 minutes, 70 marks) and Paper 4 (calculator allowed, 2 hours 15 minutes, 130 marks). Both cover the same Extended-tier content — number, algebra, coordinate geometry, geometry, mensuration, trigonometry, statistics, and probability — but Paper 2 asks students to do every step of the arithmetic by hand.</p>

<p>That distinction matters more than it sounds. A question that would take thirty seconds on a calculator — evaluating a surd expression, converting a recurring decimal to a fraction, working out a standard form calculation — has to be done with pencil-and-paper working on Paper 2, and every one of those steps is a place a mark can be lost even when the overall method is correct.</p>

<hr />

<h2 id="why-hard">Why the Non-Calculator Paper Catches Students Out</h2>
<p>Students preparing for IGCSE 0580 often revise Paper 2 and Paper 4 as if they're testing different things. They're not — the topic list is almost identical. What's different is where marks actually get lost:</p>

<ul>
  <li><strong>Arithmetic slips compound.</strong> A multi-step question (say, a surds simplification followed by a substitution) only needs one small hand-calculation error to throw off every step that follows, even when the method shown is entirely correct.</li>
  <li><strong>Calculator habits don't transfer.</strong> Students who default to a calculator for routine computation during normal practice haven't built the manual-arithmetic fluency Paper 2 assumes — fraction arithmetic, mental percentage calculations, and recurring decimal conversions all need to be second nature.</li>
  <li><strong>Time pressure is tighter per mark.</strong> At roughly 77 seconds per mark (70 marks in 90 minutes), there's little room to redo a calculation by hand if the first attempt goes wrong.</li>
</ul>

<p>None of this means Paper 2 tests harder maths — it tests the same maths under conditions that expose gaps a calculator normally papers over. That's exactly why targeted Paper 2 practice, not just general topic revision, makes a measurable difference.</p>

<hr />

<h2 id="topics">What Topics Actually Come Up</h2>
<p>Looking across recent Extended Paper 2 papers, the questions consistently draw from a recognisable set of topic areas:</p>

<ul>
  <li><strong>Number:</strong> HCF and LCM, standard form, recurring decimals, surds, indices</li>
  <li><strong>Algebra:</strong> linear equations, sequences, algebraic fractions</li>
  <li><strong>Geometry:</strong> symmetry, bearings and scale drawing, angles (parallel lines), circle theorems, vectors, transformations</li>
  <li><strong>Mensuration:</strong> arc length, surface area</li>
  <li><strong>Graphs:</strong> reciprocal functions</li>
  <li><strong>Statistics and probability:</strong> mean, histograms, cumulative frequency, basic probability</li>
</ul>

<p>A single 90-minute paper typically touches most of these areas across roughly 19-20 questions (many split into (a)/(b)/(i)/(ii) parts), which is exactly why past-paper practice — seeing how each topic is actually phrased and marked in a real exam — is more useful than working through a textbook topic-by-topic in isolation.</p>

<hr />

<h2 id="how-to-revise">How to Revise With Worked Past-Paper Solutions</h2>
<p>Worked solutions are only as useful as how you use them. The approach that actually moves a grade:</p>

<ol>
  <li><strong>Attempt the real question first,</strong> from the official question paper, ideally timed. Don't look at the solution until you've genuinely tried.</li>
  <li><strong>Compare method, not just the final answer.</strong> Cambridge mark schemes award marks at each step — method (M), accuracy (A), and independent (B) marks. A worked solution that shows each step in mark-scheme order lets you see exactly where you'd have earned or lost a mark, even if your final answer was wrong.</li>
  <li><strong>Read the examiner tip, not just the working.</strong> The most common mistake on a question is often specific and repeatable — knowing what it is before you sit a similar question in a mock or the real exam is worth more than re-deriving the method from scratch a second time.</li>
  <li><strong>Redo it without looking, a few days later.</strong> If you can reproduce the full method unaided after a gap, it's actually learned — not just recognised.</li>
</ol>

<hr />

<h2 id="practice">Worked Solutions: May/June 2025 Paper 2</h2>
<p>To go with this guide, Shopyor has published a full worked-solutions pack for the <strong>Cambridge IGCSE Mathematics 0580 Extended Paper 2 (Non-calculator), May/June 2025 session</strong> — every question solved step-by-step in the order the mark scheme awards marks, with a solution diagram wherever the question involves a grid, graph, or construction, and an examiner tip on every question flagging the most common mistake.</p>

<p><a href="/products/igcse-0580-extended-paper2-mayjune2025-worked-solutions">View: IGCSE Mathematics 0580 Paper 2 Worked Solutions (May/June 2025) →</a></p>

<p>It's a one-time $5 PDF download — no subscription, no account, no sign-up. You'll need your own copy of the official May/June 2025 Paper 2 question paper alongside it, since the guide references question numbers and topics but doesn't reproduce Cambridge's copyrighted question text.</p>
<p><strong>Browse the full catalog:</strong> <a href="/products">All worked solutions and worksheets →</a></p>

<hr />

<h2 id="mistakes">Mistakes Examiners See Most Often</h2>
<ul>
  <li><strong>Skipping working on "easy-looking" questions.</strong> Method marks are awarded for working, not just a correct final answer — a right answer with no working shown can lose marks it would otherwise have earned.</li>
  <li><strong>Rounding too early.</strong> Rounding an intermediate value before the final step is one of the most common ways an otherwise-correct method still loses the accuracy mark.</li>
  <li><strong>Misreading what's actually being asked.</strong> Especially on multi-part questions, students sometimes answer the question they expected rather than the one actually printed — reading the full question stem twice before starting helps.</li>
  <li><strong>Not checking units and form.</strong> A numerically correct answer given in the wrong form (e.g. a decimal instead of the exact surd form requested) can still lose the accuracy mark even when every step of the method was right.</li>
</ul>

<hr />

<h2 id="faq">Frequently Asked Questions</h2>

<h3>What is IGCSE Mathematics 0580 Paper 2?</h3>
<p>0580 is the syllabus code for Cambridge IGCSE Mathematics. Paper 2 is the Extended-tier non-calculator paper, sat alongside Paper 4 (the calculator paper) by students taking the Extended tier. It's typically 1 hour 30 minutes and worth 70 marks, covering the full range of Extended-tier topics without a calculator.</p>

<h3>Why is the non-calculator paper harder for most students?</h3>
<p>It's not that the maths itself is harder than Paper 4 — it's that every arithmetic step has to be done by hand, so small slips cost marks that a calculator would have prevented. Students used to leaning on a calculator for routine computation often lose more marks on Paper 2 than on Paper 4, even when they understand the underlying method.</p>

<h3>How should I use worked past-paper solutions to revise?</h3>
<p>Attempt the real question from the official paper first, under timed conditions if possible, before looking at the worked solution. Then compare your working line by line against the mark-scheme-ordered steps, not just the final answer.</p>

<h3>What topics come up most on IGCSE 0580 Paper 2?</h3>
<p>Number topics (HCF/LCM, standard form, recurring decimals, surds, indices), algebra (linear equations, sequences, algebraic fractions), geometry (symmetry, bearings, angles, circle theorems, vectors, transformations), mensuration, graphs, and statistics.</p>

<h3>Are these solutions the same as Cambridge's official mark scheme?</h3>
<p>The worked solutions are written independently by Shopyor, following the same method-mark structure Cambridge mark schemes use, referencing the official paper code and question numbers. They do not reproduce Cambridge's copyrighted question text. Not affiliated with or endorsed by Cambridge Assessment International Education.</p>

<h3>Is the May/June 2025 worked-solutions pack free?</h3>
<p>No — it's a one-time $5 PDF download covering all questions on the paper, with step-by-step worked solutions and an examiner tip on every question. No subscription or account required.</p>

<hr />

<h2 id="conclusion">Conclusion</h2>
<p>IGCSE Mathematics 0580 Paper 2 doesn't test harder content than Paper 4 — it tests the same topics under conditions that expose exactly where your manual arithmetic and method discipline are weakest. The fastest way to close that gap isn't more general topic revision, it's working through real past papers and checking your method against how marks are actually awarded, step by step.</p>
<p><strong>Here's what to remember:</strong></p>
<ul>
  <li>Every arithmetic step on Paper 2 is a place a method or accuracy mark can be lost — practice manual fluency, not just topic knowledge.</li>
  <li>Compare your working against mark-scheme-ordered steps, not just the final answer, when reviewing past papers.</li>
  <li>The same mistakes repeat across papers — rounding too early, skipping working, wrong final form — learn to spot them before the real exam.</li>
</ul>
<p><strong>Ready to practice?</strong> Get the <a href="/products/igcse-0580-extended-paper2-mayjune2025-worked-solutions">IGCSE Mathematics 0580 Paper 2 Worked Solutions (May/June 2025)</a> — instant PDF download, step-by-step solutions with examiner tips, pay once.</p>

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
