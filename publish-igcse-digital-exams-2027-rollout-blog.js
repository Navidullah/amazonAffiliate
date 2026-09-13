// publish-igcse-digital-exams-2027-rollout-blog.js
// One-off script to publish a blog post covering Cambridge International's
// 2027 global digital-exam rollout — the next phase after the 2026
// early-adopter trial already covered in the existing
// "cambridge-igcse-digital-exams-2026" post. Distinct angle: what changes
// in 2027, which subjects, and whether past-paper practice still applies.
// Idempotent: re-running updates the same post (matched by slug).
//   Run: node publish-igcse-digital-exams-2027-rollout-blog.js
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

const SLUG = "cambridge-igcse-digital-exams-2027-global-rollout";
const TITLE =
  "Cambridge IGCSE Digital Exams 2027: The Global Rollout Explained (What Changes, What Doesn't)";
const EXCERPT =
  "After a small 2026 early-adopter trial, Cambridge International opens digital exams to schools worldwide from 2027. Here's which subjects are involved, what paper exams still look like, and why past-paper practice matters just as much either way.";
const CATEGORY = "IGCSE";
const TAGS = [
  "cambridge igcse digital exams 2027",
  "igcse computer based exams",
  "cambridge international digital rollout",
  "igcse paper exams vs digital exams",
  "cambridge early adopter programme",
  "igcse 0580 digital exam",
  "cambridge digital exam subjects 2027",
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "When does Cambridge IGCSE go digital worldwide?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cambridge International's global rollout of digital exams officially opens to schools in 2027. This follows a smaller-scale trial in June 2026, where a limited group of schools in Cambridge's Early Adopter Programme sat the first live digital IGCSE papers.",
      },
    },
    {
      "@type": "Question",
      name: "Which IGCSE subjects had digital exams first?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The June 2026 early-adopter trial covered only the multiple-choice papers for five subjects: IGCSE Biology (0610), Chemistry (0620), Physics (0625), Accounting (0452), and Economics (0455). Full-subject digital coverage, including subjects like Mathematics (0580), expands as the rollout continues from 2027 onward.",
      },
    },
    {
      "@type": "Question",
      name: "Will every school be forced to switch to digital exams?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Paper exams remain available and no student is required to sit a digital exam. Even once a school can opt in from 2027, doing so is a choice, not a mandate — Cambridge's own stated long-term goal is for 85% of its qualifications to have a digital option available by 2033, meaning an option, not a requirement.",
      },
    },
    {
      "@type": "Question",
      name: "Does going digital change what's actually tested?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The syllabus content, command words, and mark schemes are unchanged by the exam's delivery format — a digital multiple-choice paper tests the same content as its paper equivalent. What changes is the interface (clicking/typing on a laptop instead of writing on paper), not the underlying subject knowledge required.",
      },
    },
    {
      "@type": "Question",
      name: "Does past-paper practice still make sense if my school goes digital?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Past papers and worked solutions test whether you know the content and can apply the mark scheme correctly — that skill transfers directly whether you're writing an answer on paper or typing it on a screen. The exam format changes; the syllabus and marking standards it's tested against do not.",
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
      name: "Cambridge IGCSE Digital Exams 2027 Rollout",
      item: `https://www.shopyor.com/blog/${SLUG}`,
    },
  ],
};

const CONTENT = `
<p>Cambridge International's digital exam programme moved from small trial to global rollout plan in 2026-2027. If your school has mentioned "digital exams" and you're not sure what it actually means for how you sit IGCSE, this guide covers exactly what changed in the 2026 trial, what opens up from 2027, and — the part that actually matters for revision — whether it changes how you should be practicing.</p>

<p><strong>Table of Contents</strong></p>
<ol>
  <li><a href="#trial">The 2026 Early-Adopter Trial</a></li>
  <li><a href="#2027-rollout">What Opens Up in 2027</a></li>
  <li><a href="#what-changes">What Actually Changes for Students</a></li>
  <li><a href="#what-doesnt">What Doesn't Change</a></li>
  <li><a href="#practice-still-matters">Why Past-Paper Practice Still Matters</a></li>
  <li><a href="#faq">Frequently Asked Questions</a></li>
  <li><a href="#conclusion">Conclusion</a></li>
</ol>

<hr />

<h2 id="trial">The 2026 Early-Adopter Trial</h2>
<p>In June 2026, a small group of schools taking part in Cambridge's Early Adopter Programme sat the first live Cambridge digital exams. Five Cambridge IGCSE multiple-choice papers moved onto laptops: Biology (0610), Chemistry (0620), Physics (0625), Accounting (0452), and Economics (0455) — and only their multiple-choice components, not the full written papers for those subjects. For the background on how this trial started, see our <a href="/blog/cambridge-igcse-digital-exams-2026">earlier coverage of the 2026 digital exam launch</a>.</p>

<hr />

<h2 id="2027-rollout">What Opens Up in 2027</h2>
<p>2027 is when Cambridge International officially opens the global rollout — schools around the world can choose to join, expanding beyond the small early-adopter group. This is still opt-in at the school level, not a blanket switch. Cambridge's own long-term goal is for 85% of its qualifications to have a digital option by 2033, which is framed explicitly as an available option, not a requirement to phase out paper.</p>

<hr />

<h2 id="what-changes">What Actually Changes for Students</h2>
<ul>
  <li><strong>The input method:</strong> answering multiple-choice questions on a screen instead of shading a bubble on paper.</li>
  <li><strong>Which papers, for now:</strong> the rollout has started with multiple-choice components in a handful of subjects — full written-paper digital exams are not the first phase.</li>
  <li><strong>School-level choice:</strong> whether a given school offers a digital option at all is decided by that school opting into the programme, not set centrally for every candidate worldwide at once.</li>
</ul>

<hr />

<h2 id="what-doesnt">What Doesn't Change</h2>
<ul>
  <li><strong>Syllabus content</strong> — the topics, command words, and depth of knowledge tested are identical regardless of delivery format.</li>
  <li><strong>Mark schemes</strong> — a digital multiple-choice answer is marked against the exact same correct-option key as its paper equivalent.</li>
  <li><strong>Grade boundaries</strong> — Cambridge has stated grade boundaries are set so a result should be comparable whether a student sat the digital or paper version.</li>
  <li><strong>Availability of paper exams</strong> — no student is forced onto a digital exam; paper remains an option throughout this rollout phase.</li>
</ul>

<hr />

<h2 id="practice-still-matters">Why Past-Paper Practice Still Matters</h2>
<p>Because the underlying syllabus and mark scheme don't change with the delivery format, the actual skill of practicing against real past papers and worked solutions transfers directly. Knowing how examiners award marks, what command words like "explain" versus "state" actually require, and where students typically lose marks is exactly as relevant whether the final exam is on paper or a laptop.</p>

<p>Shopyor's IGCSE Mathematics 0580 Extended Paper 2 worked solutions (May/June 2025, non-calculator) walk through every question step by step exactly as an examiner would mark it — content and technique, not exam format:</p>

<p><a href="/products/igcse-0580-extended-paper2-mayjune2025-worked-solutions">View: IGCSE Mathematics 0580 Paper 2 Worked Solutions (Extended, Non-Calculator) →</a></p>

<p>For the full walkthrough of this paper's structure and how to use worked solutions effectively, see our <a href="/blog/igcse-0580-paper-2-worked-solutions-revision-guide">IGCSE 0580 Paper 2 revision guide</a>. Browse the full catalog: <a href="/products">All worked solutions and practice packs →</a></p>

<hr />

<h2 id="faq">Frequently Asked Questions</h2>

<h3>When does Cambridge IGCSE go digital worldwide?</h3>
<p>The global rollout officially opens to schools from 2027, following a smaller June 2026 early-adopter trial.</p>

<h3>Which IGCSE subjects had digital exams first?</h3>
<p>The June 2026 trial covered only the multiple-choice papers for Biology (0610), Chemistry (0620), Physics (0625), Accounting (0452), and Economics (0455).</p>

<h3>Will every school be forced to switch to digital exams?</h3>
<p>No. Paper exams remain available; joining the digital option from 2027 is a school-level choice, not a mandate.</p>

<h3>Does going digital change what's actually tested?</h3>
<p>No. Syllabus content, command words, and mark schemes are unchanged — only the input method (screen vs. paper) changes.</p>

<h3>Does past-paper practice still make sense if my school goes digital?</h3>
<p>Yes. The content and marking standard tested are identical either way, so past-paper and worked-solution practice transfers directly regardless of exam format.</p>

<hr />

<h2 id="conclusion">Conclusion</h2>
<p>The 2027 digital rollout is a delivery-format change, not a syllabus change — the same content, command words, and mark schemes apply whether a student answers on paper or on a laptop. The practical takeaway for revision doesn't shift: understanding how marks are actually awarded on real past papers is still the highest-leverage way to prepare, regardless of which format your specific exam session ends up using.</p>
<p><strong>Here's what to remember:</strong></p>
<ul>
  <li>2026 was a small multiple-choice-only trial across 5 subjects; 2027 opens the option to schools globally.</li>
  <li>Digital exams change the interface, not the syllabus, command words, or mark schemes.</li>
  <li>No student is forced onto a digital exam — paper remains available throughout this rollout.</li>
</ul>
<p><strong>Practicing for IGCSE Maths right now?</strong> Get the <a href="/products/igcse-0580-extended-paper2-mayjune2025-worked-solutions">IGCSE Mathematics 0580 Paper 2 Worked Solutions</a> — instant PDF download, every step marked the way an examiner would, pay once.</p>

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
