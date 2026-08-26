// publish-ai-math-solver-blog.js
// One-off script to publish a blog post introducing the AI Math Solver
// (/maths/solver) — a free, text-based AI math problem solver covering
// algebra, equations, calculus, trigonometry, geometry and word problems
// with full step-by-step explanations. Idempotent: re-running updates the
// same post (matched by slug).
//   Run: node publish-ai-math-solver-blog.js
// Reads the SAME database the live site uses (DATABASE_URL from .env.local).
require("dotenv").config({ path: ".env.local" });
const { MongoClient } = require("mongodb");

const uri = process.env.DATABASE_URL;
if (!uri) {
  console.error(
    "❌ DATABASE_URL is not set. Add it to .env.local (the same value your\n" +
      "   live site / Vercel uses), then run `node publish-ai-math-solver-blog.js` again.",
  );
  process.exit(1);
}

const SLUG = "free-ai-math-solver-algebra-equations-calculus-step-by-step";
const TITLE =
  "Free AI Math Solver: Solve Algebra, Equations and Calculus Step by Step";
const EXCERPT =
  "A free AI math solver that explains algebra, equations, calculus, trigonometry and word problems step by step — not just the final answer. No signup, works for school through university level.";
const CATEGORY = "AI Study Tools";
const TAGS = [
  "ai math solver",
  "math solver",
  "algebra calculator",
  "equation solver",
  "calculus solver",
  "step by step math solver",
  "free math problem solver",
  "math homework solver",
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is the AI Math Solver really free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — it's free with no signup or account required. Type your question, pick a level, and get a step-by-step answer. There's a daily question limit that resets every day so the tool stays free for everyone.",
      },
    },
    {
      "@type": "Question",
      name: "What kinds of math problems can it solve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Algebra and equation solving (including quadratic equations and simultaneous equations), trigonometry, calculus (derivatives and integrals), geometry, statistics, and word problems — at school, college, or university level, with the explanation style adjusted to match the level you choose.",
      },
    },
    {
      "@type": "Question",
      name: "Does it show the steps, or just the final answer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It always shows the full working, broken into numbered steps explained in plain English, plus a final answer and a 'check yourself' tip so you can verify it makes sense — the same way a tutor would walk through a problem, not just a single number.",
      },
    },
    {
      "@type": "Question",
      name: "Can it draw graphs or diagrams?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, automatically when a question calls for one. Plotting a function, comparing shapes, or working with a data set generates an actual graph, labelled diagram, or table alongside the written steps.",
      },
    },
    {
      "@type": "Question",
      name: "Does it scan photos of handwritten homework?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No — it's a text-based solver. You type or paste your question rather than photographing it. If you need a specific number, equation, or problem statement solved, typing it in gets the most accurate step-by-step explanation.",
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
      name: "AI Math Solver",
      item: `https://www.shopyor.com/blog/${SLUG}`,
    },
  ],
};

const CONTENT = `
<p>Search "math solver" or "algebra calculator" and most results fall into one of two camps: a narrow calculator that solves exactly one type of problem and nothing else, or a photo-scanning app that needs a clear picture of your handwriting to work at all. Neither is much help if you've got a calculus question typed out and just want the method explained, not a single number spat back at you.</p>

<p>That's the gap the new <a href="/maths/solver">AI Math Solver</a> is built to fill: a free, text-based math problem solver that handles algebra, equations, calculus, trigonometry, geometry and word problems in one place, with a full step-by-step explanation every time — not just the final answer.</p>

<p><strong>Table of Contents</strong></p>
<ol>
  <li><a href="#what-is-it">What Is the AI Math Solver?</a></li>
  <li><a href="#subjects">What Kinds of Problems It Solves</a></li>
  <li><a href="#steps">Why Step-by-Step Beats a Single Answer</a></li>
  <li><a href="#visuals">Graphs, Diagrams and Tables — When They Actually Help</a></li>
  <li><a href="#levels">School, College or University — Pick Your Level</a></li>
  <li><a href="#not-a-scanner">What It Isn't: Not a Photo Scanner</a></li>
  <li><a href="#tips">How to Ask a Good Question</a></li>
  <li><a href="#faq">Frequently Asked Questions</a></li>
  <li><a href="#conclusion">Conclusion</a></li>
</ol>

<hr />

<h2 id="what-is-it">What Is the AI Math Solver?</h2>
<p>The <a href="/maths/solver">AI Math Solver</a> is a free tool that takes any math question you type in and returns a complete, step-by-step explanation of how to solve it — the method a tutor would use, not just the result. Type an equation, a word problem, or a calculus question, choose your level, and within seconds you get the problem restated, each step explained in plain English, a final answer, and a short "check yourself" tip so you can verify the answer independently rather than just trusting it.</p>

<p>There's no signup, no account, and no software to install — it runs entirely in the browser with a daily question limit that resets every day.</p>

<hr />

<h2 id="subjects">What Kinds of Problems It Solves</h2>
<p>Rather than being a single-purpose <strong>equation solver</strong> or a narrow <strong>algebra calculator</strong>, it's built to cover the full range of what a student actually runs into across a school or university career:</p>

<ul>
  <li><strong>Algebra</strong> — simplifying expressions, solving linear and quadratic equations, simultaneous equations</li>
  <li><strong>Equations</strong> — from a simple one-step equation through multi-step and quadratic equation solving</li>
  <li><strong>Calculus</strong> — derivatives, integrals, and working through a <strong>calculus solver</strong>-style problem with the reasoning shown at each step</li>
  <li><strong>Trigonometry</strong> — identities, triangle problems, and using a <strong>trigonometry calculator</strong> style approach with the method explained, not just the value</li>
  <li><strong>Geometry</strong> — area, perimeter, volume, and shape properties, with a diagram generated where it helps</li>
  <li><strong>Word problems</strong> — turning a real-world question into the right equation or method before solving it</li>
  <li><strong>Statistics</strong> — mean, median, probability, and data-based questions</li>
</ul>

<p>Whether you're after a <strong>free math problem solver</strong> for a one-off homework question or a <strong>math homework solver</strong> you can come back to across a whole topic, the same tool handles it — the level picker (covered below) is what adjusts how it explains itself, not a different tool for each subject.</p>

<hr />

<h2 id="steps">Why Step-by-Step Beats a Single Answer</h2>
<p>A plain calculator gives you a number. That's fine if all you needed was the number — but if you're trying to actually learn the method, understand where you went wrong on your own attempt, or double-check your own working, a bare answer doesn't help much.</p>

<p>Every solution from the AI Math Solver is broken into numbered steps, each with a short explanation of <em>why</em> that move was made — not just what the next line of algebra is. Solving <code>2x + 5 = 17</code>, for example, doesn't just jump to <code>x = 6</code>; it shows subtracting 5 from both sides first, then dividing by 2, with a final substitution check confirming the answer. That's the difference between a <strong>step by step math solver</strong> and a plain calculator: the point isn't just getting unstuck on one question, it's understanding the method well enough to do the next one yourself.</p>

<hr />

<h2 id="visuals">Graphs, Diagrams and Tables — When They Actually Help</h2>
<p>Some questions are genuinely easier to understand with a picture. Ask it to plot a function like <code>y = x² - 4</code> and find where it crosses the x-axis, and alongside the algebra you get an actual plotted graph showing the parabola and its intercepts — not a text description of what the graph would look like. The same applies to geometry diagrams and data tables: they're generated automatically only when the question calls for one, so a plain algebra question stays plain text rather than being padded out with an unnecessary image.</p>

<hr />

<h2 id="levels">School, College or University — Pick Your Level</h2>
<p>Before asking a question, you choose one of three levels:</p>
<ul>
  <li><strong>School (ages 11-16)</strong> — algebra basics, fractions, simple equations, introductory geometry</li>
  <li><strong>College</strong> — further algebra, trigonometry, introductory calculus</li>
  <li><strong>University</strong> — calculus, linear algebra, statistics, and more advanced topics</li>
</ul>
<p>The level changes how the explanation is written and which notation is used, so a school-level answer won't suddenly introduce university-level notation you haven't been taught yet, and a university-level question gets the depth it actually needs rather than a simplified version.</p>

<hr />

<h2 id="not-a-scanner">What It Isn't: Not a Photo Scanner</h2>
<p>Worth being upfront about: this is a <strong>text-based</strong> math solver. You type or paste your question in — it doesn't scan a photo of handwritten homework or a textbook page the way some apps do. If your question comes from a printed page, typing out the actual numbers and equation takes a few extra seconds but gets a more accurate result than an OCR misread of messy handwriting ever would.</p>

<hr />

<h2 id="tips">How to Ask a Good Question</h2>
<ul>
  <li><strong>Be specific.</strong> "Solve 2x + 5 = 17" gets a far better answer than "help with algebra."</li>
  <li><strong>One question at a time.</strong> For a multi-part problem, ask each part separately for a clearer, more focused explanation.</li>
  <li><strong>Pick the right level.</strong> School, College and University change how much detail and which notation is used.</li>
  <li><strong>Mention where you got stuck.</strong> If you've already tried something, saying where it went wrong lets the explanation pick up from there instead of starting over.</li>
</ul>

<hr />

<h2 id="faq">Frequently Asked Questions</h2>

<h3>Is the AI Math Solver really free?</h3>
<p>Yes — free with no signup or account required, with a daily question limit that resets every day.</p>

<h3>What kinds of math problems can it solve?</h3>
<p>Algebra, equations (including quadratic and simultaneous equations), trigonometry, calculus, geometry, statistics, and word problems, at school, college, or university level.</p>

<h3>Does it show the steps, or just the final answer?</h3>
<p>It always shows the full working in numbered steps, plus a final answer and a "check yourself" tip.</p>

<h3>Can it draw graphs or diagrams?</h3>
<p>Yes, automatically when a question calls for one — a plotted graph, labelled diagram, or data table alongside the steps.</p>

<h3>Does it scan photos of handwritten homework?</h3>
<p>No — it's a text-based solver. Type or paste your question in for the most accurate result.</p>

<hr />

<h2 id="conclusion">Conclusion</h2>
<p>A calculator that only gives you a number is only half the tool you actually need when you're trying to learn something, not just get past one question. The AI Math Solver is built for the other half — a free, step-by-step explanation across algebra, equations, calculus, trigonometry, geometry and word problems, at whatever level you're learning it.</p>
<p><strong>Ready to try it?</strong> Head to the <a href="/maths/solver">AI Math Solver</a> and type in your next question, explore the <a href="/maths">Year 6 Maths Challenge</a> for structured practice with progress tracking, or read one of the deeper guides — <a href="/blog/ai-math-solver-university-differential-equations-matrices">university-level differential equations and matrices</a>, or <a href="/blog/polynomial-factoring-inequality-solver-with-steps">polynomial factoring and inequality solving</a>.</p>

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
