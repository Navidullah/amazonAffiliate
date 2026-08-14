"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

function FaqItem({ faq, index }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200/70 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-sm font-semibold text-gray-900 dark:text-white sm:text-base">
          {faq.question}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-gray-500 transition-transform duration-300 dark:text-gray-400 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {/* Answer stays in the DOM even when collapsed (max-height, not
          conditional render) so it's crawlable for SEO. */}
      <div
        className="grid transition-all duration-300 ease-in-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

/** Renders a list of {question, answer} items as a height-animated accordion. */
export default function FaqAccordion({ items }) {
  return (
    <div className="space-y-3">
      {items.map((faq, i) => (
        <FaqItem key={faq.question} faq={faq} index={i} />
      ))}
    </div>
  );
}
