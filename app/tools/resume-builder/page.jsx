import ResumeBuilder from "./ResumeBuilder";

export const metadata = {
  title: "Free Resume Builder — Modern Professional CV Maker (PDF) | Shopyor",
  description:
    "Build a modern, professional resume online for free. Pick from premium templates, customize colors and fonts, see a live preview, and export a print-perfect PDF. No sign-up, no watermark — everything stays in your browser.",
  keywords: [
    "resume builder",
    "free resume builder",
    "online resume maker",
    "cv maker",
    "professional resume templates",
    "resume builder pdf",
    "modern resume template",
    "ats friendly resume",
    "curriculum vitae maker",
    "resume generator",
    "free cv builder online",
    "resume builder no sign up",
  ],
  alternates: {
    canonical: "https://shopyor.com/tools/resume-builder",
  },
  openGraph: {
    title: "Free Resume Builder — Modern Professional CV Maker",
    description:
      "Create a polished resume with premium templates and export a print-perfect PDF. Free, instant, and 100% browser-based.",
    type: "website",
    url: "https://shopyor.com/tools/resume-builder",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Resume Builder — Modern CV Maker (PDF)",
    description:
      "Premium resume templates, live preview, and one-click PDF export. Free and private.",
  },
};

export default function Page() {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Resume Builder",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    url: "https://shopyor.com/tools/resume-builder",
    description:
      "Free online resume builder with premium templates, live preview and print-perfect PDF export. Runs entirely in your browser.",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is this resume builder really free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The Shopyor Resume Builder is completely free with no sign-up and no watermark. Your information never leaves your browser.",
        },
      },
      {
        "@type": "Question",
        name: "How do I download my resume as a PDF?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Click 'Download PDF'. The builder opens your browser's print dialog with only the resume sheet — choose 'Save as PDF' for a crisp, selectable-text, ATS-friendly file.",
        },
      },
      {
        "@type": "Question",
        name: "Are the templates ATS-friendly?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Every template uses real, selectable text (not an image), clean section headings and standard ordering, so applicant tracking systems can parse them correctly. The Classic and Minimal templates are the most ATS-safe.",
        },
      },
      {
        "@type": "Question",
        name: "Is my data saved or uploaded anywhere?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nothing is uploaded. Your resume is saved locally in your own browser so you can come back later, and you can export or import it as a JSON file at any time.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ResumeBuilder />
    </>
  );
}
