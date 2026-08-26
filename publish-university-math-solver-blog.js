// publish-university-math-solver-blog.js
// One-off script to publish a blog post about using the AI Math Solver
// (/maths/solver) for university-level math — differential equations,
// matrices/linear algebra, statistics, limits, series and integrals.
// Deliberately covers different keyword-planner terms than
// publish-ai-math-solver-blog.js (which targets the general/school-level
// terms) to avoid cannibalizing the same search intent. Idempotent:
// re-running updates the same post (matched by slug).
//   Run: node publish-university-math-solver-blog.js
// Reads the SAME database the live site uses (DATABASE_URL from .env.local).
require("dotenv").config({ path: ".env.local" });
const { MongoClient } = require("mongodb");

const uri = process.env.DATABASE_URL;
if (!uri) {
  console.error(
    "❌ DATABASE_URL is not set. Add it to .env.local (the same value your\n" +
      "   live site / Vercel uses), then run `node publish-university-math-solver-blog.js` again.",
  );
  process.exit(1);
}

const SLUG = "ai-math-solver-university-differential-equations-matrices";
const TITLE =
  "AI Math Solver for University Students: Differential Equations, Matrices & More";
const EXCERPT =
  "A free AI math solver for university-level math — differential equations, matrices and linear algebra, statistics, limits, series, and integrals — with every step explained, not just a Wolfram-style output box.";
const CATEGORY = "AI Study Tools";
const TAGS = [
  "differential equation solver",
  "matrix calculator",
  "linear algebra solver",
  "statistics problem solver",
  "calculus solver",
  "limits calculator",
  "integral calculus solver",
  "university math solver",
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can it actually solve differential equations, or just simple algebra?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It handles differential equations directly — separable equations, first and second order, and other standard university-level forms — showing the full method (separating variables, integrating, applying initial conditions where given) rather than just returning a formula.",
      },
    },
    {
      "@type": "Question",
      name: "Does it solve matrix and linear algebra problems?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — matrix multiplication, determinants, eigenvalues, and solving systems of linear equations via matrices, with each step of the working shown, not just the resulting matrix.",
      },
    },
    {
      "@type": "Question",
      name: "Is it free for university-level questions too?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the same free tool and daily question limit applies regardless of level — university-level questions aren't behind a separate paywall or a reduced limit.",
      },
    },
    {
      "@type": "Question",
      name: "How is this different from Wolfram Alpha or Symbolab?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wolfram Alpha and Symbolab are excellent computational engines, but their free tiers often show the answer with the full step-by-step method locked behind a paid subscription. This tool shows the complete step-by-step explanation for free, written in plain English rather than dense mathematical notation alone.",
      },
    },
    {
      "@type": "Question",
      name: "Can it plot graphs for calculus or statistics questions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, automatically when a question calls for one — a plotted function, a labelled diagram, or a data table is generated alongside the written steps whenever it genuinely helps explain the answer.",
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
      name: "University Math Solver",
      item: `https://www.shopyor.com/blog/${SLUG}`,
    },
  ],
};

const CONTENT = `
<p>By the time math homework means differential equations, matrix algebra, or a limits problem from a first-year calculus course, most of the "free math solver" tools built for GCSE-level algebra stop being useful. What's actually needed at that level is a tool that can handle a genuinely harder question — and still explain the method, not just spit out a formula or a boxed answer the way a lot of computational engines do on their free tier.</p>

<p>The <a href="/maths/solver">AI Math Solver</a>'s University level is built for exactly that: differential equations, matrices and linear algebra, statistics and probability, limits, series, and integrals — all explained step by step, for free.</p>

<p><strong>Table of Contents</strong></p>
<ol>
  <li><a href="#differential-equations">Differential Equations, Explained Step by Step</a></li>
  <li><a href="#matrices">Matrices and Linear Algebra</a></li>
  <li><a href="#calculus">Limits, Integrals and Series</a></li>
  <li><a href="#statistics">Statistics and Probability</a></li>
  <li><a href="#vs-wolfram">How This Differs From Wolfram Alpha or Symbolab</a></li>
  <li><a href="#example">A Worked Example</a></li>
  <li><a href="#tips">Getting the Most Out of It as a University Student</a></li>
  <li><a href="#faq">Frequently Asked Questions</a></li>
  <li><a href="#conclusion">Conclusion</a></li>
</ol>

<hr />

<h2 id="differential-equations">Differential Equations, Explained Step by Step</h2>
<p>Ask a plain <strong>differential equation solver</strong> to solve <code>dy/dx = 3y</code> and most give you the answer, <code>y = Ce^(3x)</code>, with no working shown. The AI Math Solver instead separates the variables, integrates both sides, and explains why each move was made — the same method a lecturer would write on a whiteboard. It covers the standard first-order forms taught in most introductory differential equations courses: separable equations, linear first-order equations, and — depending on the specific question — higher-order and initial-value problems.</p>

<hr />

<h2 id="matrices">Matrices and Linear Algebra</h2>
<p>Linear algebra questions — matrix multiplication, finding a determinant, solving a system of equations via matrices, or finding eigenvalues — get the same treatment. Rather than a single resulting matrix with no explanation of how each entry was calculated, you get the row-by-row working, so a mistake in your own attempt is easy to spot rather than just confirmed wrong.</p>

<hr />

<h2 id="calculus">Limits, Integrals and Series</h2>
<p>Beyond the basic derivative and integral questions covered at college level, the solver handles the university-level extensions: evaluating limits (including indeterminate forms), definite and indefinite integrals, integration techniques like substitution or partial fractions, and arithmetic and geometric series and sequences — each with the reasoning behind every step written out, not just the final expression.</p>

<hr />

<h2 id="statistics">Statistics and Probability</h2>
<p>Statistics and probability questions — from a straightforward mean/median/mode calculation to a probability word problem or a data-set question — are solved the same way: the method first, the answer second. If a question genuinely calls for a table or chart to make the data clearer, one is generated automatically alongside the steps.</p>

<hr />

<h2 id="vs-wolfram">How This Differs From Wolfram Alpha or Symbolab</h2>
<p>Wolfram Alpha and Symbolab are genuinely powerful computational engines, and there's no pretending otherwise — but on their free tier, the full step-by-step breakdown is frequently locked behind a paid subscription, leaving the free result as just the final answer. The AI Math Solver's step-by-step explanation is free at every level, university included, written in plain English rather than dense notation alone, precisely because the point of asking isn't just to get unstuck on one question — it's to actually understand the method well enough to handle the next one without help.</p>

<hr />

<h2 id="example">A Worked Example</h2>
<p>Asking "Solve the differential equation dy/dx = 3y" at University level returns something close to this structure:</p>
<ol>
  <li><strong>Separate variables</strong> — divide both sides by y and multiply by dx to get <code>dy/y = 3 dx</code></li>
  <li><strong>Integrate both sides</strong> — giving <code>ln|y| = 3x + C</code></li>
  <li><strong>Solve for y</strong> — exponentiating both sides to reach the general solution <code>y = Ce^(3x)</code></li>
</ol>
<p>Each step explains the reasoning behind the move, not just the algebra — the same as a worked example in a textbook, generated on demand for the exact question asked rather than the closest example a textbook happened to include.</p>

<hr />

<h2 id="tips">Getting the Most Out of It as a University Student</h2>
<ul>
  <li><strong>Include the full problem statement.</strong> For differential equations, mention any given initial conditions; for matrices, give every entry rather than describing the matrix in words.</li>
  <li><strong>Select University level.</strong> This unlocks the correct depth of notation and method rather than a simplified explanation aimed at a younger student.</li>
  <li><strong>Ask follow-up questions separately.</strong> If a problem has multiple parts (solve, then verify, then interpret), submitting each part as its own question keeps each explanation focused.</li>
  <li><strong>Use it to check your own working, not replace it.</strong> Attempt the problem first, then compare your steps against the explanation to catch exactly where a method went wrong.</li>
</ul>

<hr />

<h2 id="faq">Frequently Asked Questions</h2>

<h3>Can it actually solve differential equations, or just simple algebra?</h3>
<p>It handles differential equations directly — separable, first and second order, and other standard university-level forms — showing the full method, not just a formula.</p>

<h3>Does it solve matrix and linear algebra problems?</h3>
<p>Yes — matrix multiplication, determinants, eigenvalues, and solving systems via matrices, with each step shown.</p>

<h3>Is it free for university-level questions too?</h3>
<p>Yes, the same free tool and daily limit applies at every level.</p>

<h3>How is this different from Wolfram Alpha or Symbolab?</h3>
<p>Those are excellent computational engines, but their step-by-step breakdown is often paywalled on the free tier. This tool's step-by-step explanation is free at every level.</p>

<h3>Can it plot graphs for calculus or statistics questions?</h3>
<p>Yes, automatically when a question calls for a plotted function, diagram, or data table.</p>

<hr />

<h2 id="conclusion">Conclusion</h2>
<p>University-level math deserves more than a boxed answer with no working — whether that's a differential equation, a matrix problem, or a limits question from a first-year calculus module. The AI Math Solver's University level is built to explain the full method behind each of those, for free.</p>
<p><strong>Ready to try it?</strong> Head to the <a href="/maths/solver">AI Math Solver</a>, pick University level, and type in your next problem — or read the <a href="/blog/free-ai-math-solver-algebra-equations-calculus-step-by-step">general AI Math Solver guide</a> for school and college-level coverage.</p>

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
