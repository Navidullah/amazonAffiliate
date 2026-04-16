// app/tools/facebook-video-downloader/page.jsx
"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { VideoDownloader } from "@/app/components/video-downloader/VideoDownloader";

// Main component with search params
function FacebookVideoDownloaderContent() {
  const searchParams = useSearchParams();
  const [initialUrl, setInitialUrl] = useState("");

  useEffect(() => {
    const urlParam = searchParams.get("url");
    if (urlParam) {
      setInitialUrl(decodeURIComponent(urlParam));
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Facebook Video Downloader
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Download any Facebook video or reel in HD quality. Fast, free, and
            easy to use.
          </p>
        </div>

        {/* Downloader Component with initial URL */}
        <VideoDownloader initialUrl={initialUrl} />

        {/* Info Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl mb-2">📹</div>
                <h3 className="font-semibold mb-2">HD Quality</h3>
                <p className="text-sm text-muted-foreground">
                  Download videos in original quality up to 4K resolution
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl mb-2">⚡</div>
                <h3 className="font-semibold mb-2">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">
                  Get your download links in seconds with our optimized servers
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl mb-2">🔒</div>
                <h3 className="font-semibold mb-2">Privacy First</h3>
                <p className="text-sm text-muted-foreground">
                  We don't store any videos or personal data
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Usage Instructions */}
        <Card className="mt-12 bg-muted/30">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <InfoIcon className="h-5 w-5 text-primary" />
              How to Download Facebook Videos
            </h3>
            <ol className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-center text-sm font-medium">
                  1
                </span>
                <span>
                  Copy the URL of the Facebook video or reel you want to
                  download
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-center text-sm font-medium">
                  2
                </span>
                <span>
                  Paste the URL in the input field above and click "Analyze
                  Video"
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-center text-sm font-medium">
                  3
                </span>
                <span>
                  Select your preferred quality and click download to save the
                  video
                </span>
              </li>
            </ol>
          </CardContent>
        </Card>

        {/* Tips Section */}
        <Alert className="mt-8 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
          <AlertDescription className="text-sm text-blue-800 dark:text-blue-400">
            💡 <strong>Pro Tip:</strong> You can download Facebook Reels, public
            videos, and even videos from public groups using this tool. Just
            paste the URL and click analyze!
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}

// Loading fallback
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <div className="h-10 w-64 bg-muted animate-pulse rounded-lg mx-auto mb-4"></div>
          <div className="h-5 w-96 bg-muted animate-pulse rounded-lg mx-auto"></div>
        </div>
        <div className="h-96 bg-muted animate-pulse rounded-xl"></div>
      </div>
    </div>
  );
}

// Main exported component with Suspense
export default function FacebookVideoDownloaderPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <FacebookVideoDownloaderContent />
    </Suspense>
  );
}
