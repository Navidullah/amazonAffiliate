// Shared source of truth for the homepage FAQ — used both for the visible
// accordion (StoreHome.jsx) and the FAQPage JSON-LD (app/page.jsx). Keep
// these in sync; Google penalizes schema that doesn't match visible content.
export const HOMEPAGE_FAQ = [
  {
    question: "What resources does Shopyor sell?",
    answer:
      "Shopyor's main focus is fully worked exam past-paper solutions — currently Cambridge IGCSE Mathematics 0580, with more papers and IB Maths resources planned — every question solved step-by-step in mark-scheme order with an examiner tip on common mistakes. Alongside these, Shopyor also sells UK KS2 Year 6 Maths worksheets with worked examples, working space, and a full answer key. All resources download as PDFs.",
  },
  {
    question: "Are the IGCSE solutions the same as the official mark scheme?",
    answer:
      "The solutions are original worked-through answers written by Shopyor, aligned to how the official Cambridge mark scheme awards marks (method, accuracy, and B marks shown at each step). They reference the official paper code and question numbers but do not reproduce Cambridge's copyrighted question text — you'll need your own copy of the question paper alongside the guide. Not affiliated with or endorsed by Cambridge Assessment International Education.",
  },
  {
    question: "Are the KS2 worksheets the same as the official SATs papers?",
    answer:
      "No — these are original practice materials written to the Year 6 (KS2) Maths curriculum, not past or leaked official papers. They're designed to build topic confidence and give pupils realistic practice ahead of Year 6 SATs, covering the same content areas and difficulty level as the actual assessment.",
  },
  {
    question: "Do I need to create an account or subscribe?",
    answer:
      "No. Shopyor is pay-per-download — pick a pack, pay once via a secure checkout, and your PDF is available to download immediately after payment. There's no account to create, no recurring subscription, and no email list to join, wherever in the world you're buying from.",
  },
  {
    question: "Can I print multiple copies for my class or tutoring group?",
    answer:
      "Yes — once purchased, the PDF is yours to print as many times as you need for personal, tutoring, or single-classroom use. Bulk school-wide licensing isn't offered yet.",
  },
  {
    question: "How do I receive my download after paying?",
    answer:
      "After checkout, you're automatically redirected to a download page on Shopyor — your PDF unlocks as soon as payment is confirmed, usually within a few seconds. There's no email delivery wait.",
  },
  {
    question: "Is this suitable for home learning, or only for teachers?",
    answer:
      "Both — the packs are used by parents and self-study students, private tutors, and teachers looking for ready-made practice or worked-solution material without a subscription. Every pack includes an answer key or mark scheme so it can be marked correctly without a teaching background.",
  },
];
