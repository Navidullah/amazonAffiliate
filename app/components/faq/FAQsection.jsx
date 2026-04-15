// components/FAQSection.jsx
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Is this Facebook video downloader free?",
    answer:
      "Yes, our Facebook video downloader is completely free to use with no hidden charges or subscription fees.",
  },
  {
    question: "Can I download Facebook Reels?",
    answer:
      "Absolutely! Our tool supports both Facebook videos and Reels. Just paste the Reel URL and download.",
  },
  {
    question: "Does it work on mobile devices?",
    answer:
      "Yes, our tool is fully responsive and works perfectly on Android, iOS, and all mobile browsers.",
  },
  {
    question: "What video qualities are available?",
    answer:
      "You can download videos in HD (1080p, 720p), SD (480p), and mobile-optimized qualities when available.",
  },
  {
    question: "Is it safe to use?",
    answer:
      "Yes, we don't store any videos or personal data. All processing happens in real-time and your privacy is protected.",
  },
  {
    question: "Do I need to install any software?",
    answer:
      "No installation needed! Our tool works directly in your web browser on any device.",
  },
  {
    question: "Can I download private videos?",
    answer:
      "No, you can only download public videos due to Facebook's privacy policies.",
  },
  {
    question: "Is there any limit on downloads?",
    answer: "No, you can download unlimited videos with no restrictions.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="px-4 py-16 md:py-24">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Everything you need to know about our downloader
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border bg-card overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between p-5 text-left font-medium hover:bg-muted/50 transition-colors"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground transition-transform ${openIndex === index ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`grid transition-all duration-200 ease-in-out ${openIndex === index ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"}`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 text-muted-foreground">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
