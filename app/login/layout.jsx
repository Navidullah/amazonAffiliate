// app/login/layout.jsx  (SERVER component — don't add "use client")
export const metadata = {
  title: "Login | Shopyor",
  description:
    "Sign in to your Shopyor account to comment, save favorites, and use member features.",
  alternates: { canonical: "/login" },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-snippet": -1,
      "max-image-preview": "none",
      "max-video-preview": -1,
    },
  },
};

export default function LoginLayout({ children }) {
  return children;
}
