import ComingSoonCurriculum from "../ComingSoonCurriculum";

const SITE = "https://www.shopyor.com";

// Staged shell — noindex until real GCSE books are uploaded, so we don't
// publish a thin/empty page. Flip metadata.robots and add the FAQ/JSON-LD
// treatment (see app/books/fbise-mathematics/page.jsx) once books exist here.
export const metadata = {
  metadataBase: new URL(SITE),
  title: { absolute: "GCSE Mathematics Books — Coming Soon | Shopyor" },
  description: "GCSE Mathematics books and resources are coming soon to Shopyor — read online free, no download, no sign-up.",
  alternates: { canonical: `${SITE}/books/gcse-mathematics` },
  robots: { index: false, follow: true },
};

export default function GcseBooksPage() {
  return (
    <ComingSoonCurriculum
      curriculum="GCSE"
      blurb="UK GCSE Mathematics textbooks and revision resources are on the way. In the meantime, browse what's already available."
    />
  );
}
