// app/tools/facebook-video-downloader/client.jsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { Card, CardContent } from "@/components/ui/card";

const VideoDownloader = dynamic(
  () =>
    import("@/app/components/video-downloader/VideoDownloader").then(
      (mod) => mod.VideoDownloader,
    ),
  { ssr: false, loading: () => <VideoDownloaderSkeleton /> },
);

function VideoDownloaderSkeleton() {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="h-12 bg-muted animate-pulse rounded-lg" />
          <div className="h-24 bg-muted animate-pulse rounded-lg" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function FacebookVideoDownloaderClient() {
  const searchParams = useSearchParams();
  const [initialUrl, setInitialUrl] = useState("");

  useEffect(() => {
    const urlParam = searchParams.get("url");
    if (urlParam) {
      setInitialUrl(decodeURIComponent(urlParam));
    }
  }, [searchParams]);

  return <VideoDownloader initialUrl={initialUrl} />;
}
