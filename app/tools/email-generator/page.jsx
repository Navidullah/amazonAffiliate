import { AIEmailGenerator } from "./ai-email-generator";

export const metadata = {
  title: "AI Email Generator - Write Perfect Emails in Seconds",
  description:
    "Generate professional, friendly, or persuasive emails instantly with AI. Save time and write better emails.",
};

export default function EmailGeneratorPage() {
  return (
    <main className="container max-w-4xl mx-auto py-10 px-4">
      <AIEmailGenerator />
    </main>
  );
}
