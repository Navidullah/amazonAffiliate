// app/tools/video-to-gif/page.jsx
import { Metadata } from "next";
import VideoToGifConverter from "./video-to-gif-converter";

export const metadata = {
  title: "Convert Video to GIF - Free Online Video to GIF Converter | Shopyor",
  description:
    "Convert any video to high-quality GIF online for free. Fast, secure, and easy to use. Supports MP4, WebM, MOV, and more. No watermarks, no registration required.",
  keywords:
    "video to gif, convert video to gif, gif converter, video to gif online, free gif converter,gif maker,mp4 to gif,happy birthday gif,animated gif maker,gif download",
  openGraph: {
    title: "Free Video to GIF Converter - Create Animated GIFs Online",
    description:
      "Convert your videos to GIFs instantly. High quality, no watermark, completely free.",
    type: "website",
    url: "https://shopyor.com/tools/video-to-gif",
  },
  twitter: {
    card: "summary_large_image",
    title: "Convert Video to GIF - Free Online Tool",
    description: "Transform your videos into animated GIFs in seconds.",
  },
  alternates: {
    canonical: "https://shopyor.com/tools/video-to-gif",
  },
};

export default function VideoToGifPage() {
  return <VideoToGifConverter />;
}
