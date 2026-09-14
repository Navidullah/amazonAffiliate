import ComingSoonCurriculum from "../ComingSoonCurriculum";

const SITE = "https://www.shopyor.com";

// Staged shell — noindex until real IB books are uploaded, so we don't
// publish a thin/empty page. Flip metadata.robots and add the FAQ/JSON-LD
// treatment (see app/books/fbise/page.jsx) once books exist here.
export const metadata = {
  metadataBase: new URL(SITE),
  title: { absolute: "IB Mathematics Books — Coming Soon | Shopyor" },
  description: "IB Mathematics books and resources are coming soon to Shopyor — read online free, no download, no sign-up.",
  alternates: { canonical: `${SITE}/books/ib` },
  robots: { index: false, follow: true },
};

export default function IbBooksPage() {
  return (
    <ComingSoonCurriculum
      curriculum="IB"
      blurb="IB Diploma Mathematics resources — Analysis & Approaches and Applications & Interpretation — are on the way. In the meantime, browse what's already available."
    />
  );
}
