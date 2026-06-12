// app/contact/layout.jsx — metadata for the client-rendered contact page
export const metadata = {
  title: "Contact Us",
  description:
    "Contact the Shopyor team. Send questions, feedback, or support requests about our free online tools and we'll get back to you by email.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: "https://www.shopyor.com/contact",
    title: "Contact Us | Shopyor",
    description:
      "Send questions, feedback, or support requests about Shopyor's free online tools.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Shopyor",
    description:
      "Send questions, feedback, or support requests about Shopyor's free online tools.",
  },
};

export default function ContactLayout({ children }) {
  return children;
}
