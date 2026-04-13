import FacebookDownloaderClient from "@/app/components/video-downloader/FacebookDownloaderClient";

/* ✅ SEO METADATA (SERVER SIDE ONLY) */
export const metadata = {
  title: "Facebook Video Downloader HD – Download FB Videos & Reels Free",
  description:
    "Download Facebook videos and reels in HD instantly. Free Facebook video downloader with no watermark.",
  keywords: [
    "facebook video downloader",
    "download facebook videos",
    "facebook reels downloader",
    "fb video download hd",
  ],
  openGraph: {
    title: "Facebook Video Downloader HD",
    description: "Download Facebook videos instantly.",
    url: "https://yourdomain.com/facebook-downloader",
    type: "website",
  },
};

export default function Page() {
  return <FacebookDownloaderClient />;
}
