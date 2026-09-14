"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function CurriculumFaq({ faqs }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="mx-auto mt-4 max-w-3xl space-y-3">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={faq.q}
            className="overflow-hidden rounded-2xl border border-gray-200/70 bg-white/70 dark:border-white/10 dark:bg-white/[0.03]"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{faq.q}</span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{faq.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
