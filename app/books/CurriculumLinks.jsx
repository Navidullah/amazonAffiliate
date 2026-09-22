import Link from "next/link";
import { BOOK_CURRICULA } from "@/lib/constants/bookCurricula";

// FBISE/IGCSE have live books; IB has a live paid product (no book yet) but
// still counts as "live" content. GCSE has neither yet, so its page stays a
// "coming soon" shell. Update this once GCSE content goes live.
const LIVE_CURRICULA = ["FBISE", "IGCSE", "IB"];

const CURRICULUM_SLUGS = {
  FBISE: "fbise-mathematics",
  IB: "ib-mathematics",
  IGCSE: "igcse-mathematics",
  GCSE: "gcse-mathematics",
};

export default function CurriculumLinks({ current }) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      {BOOK_CURRICULA.map((c) => {
        const isLive = LIVE_CURRICULA.includes(c);
        const isCurrent = current === c;
        return (
          <Link
            key={c}
            href={`/books/${CURRICULUM_SLUGS[c]}`}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
              isCurrent
                ? "bg-gradient-to-r from-indigo-600 to-fuchsia-500 text-white shadow-md"
                : "border border-gray-200/70 bg-white/70 text-gray-600 hover:border-indigo-300 hover:text-indigo-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-300 dark:hover:text-indigo-300"
            }`}
          >
            {c}
            {!isLive && !isCurrent && (
              <span className="text-xs font-normal text-gray-400 dark:text-gray-500">soon</span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
