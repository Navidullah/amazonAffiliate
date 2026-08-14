// Shared FAQ shown on every product detail page — used both for the visible
// accordion (app/products/[slug]/page.jsx) and its FAQPage JSON-LD. These
// claims are true for every product in the store (same checkout, delivery,
// and refund mechanics), so one shared array is correct here — keep the
// visible text and schema in sync.
export const PRODUCT_FAQ = [
  {
    question: "What file format do I get, and can I print it?",
    answer:
      "Every pack downloads as a single PDF, formatted to print cleanly on standard A4 or US Letter paper. It's yours to print as many times as you need for personal, tutoring, or single-classroom use.",
  },
  {
    question: "How quickly can I download it after paying?",
    answer:
      "Your download unlocks automatically the moment payment is confirmed — usually within a few seconds of checkout. There's no email delivery wait and no account required.",
  },
  {
    question: "Does it include the answers and mark scheme?",
    answer:
      "Yes — every pack includes a full answer and mark scheme alongside the questions, so it can be marked by a parent or tutor without a teaching background.",
  },
  {
    question: "What if I'm not happy with my purchase?",
    answer:
      "See our Refund Policy for the full terms — as a digital product, refund eligibility depends on whether the file has already been downloaded, in line with UK digital-content consumer rights.",
  },
  {
    question: "Is this a subscription?",
    answer:
      "No. This is a single one-time payment for this pack — there's no recurring charge, no account, and no email sign-up required.",
  },
];
