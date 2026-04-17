// app/tools/facebook-video-downloader/page.jsx (Updated with disclaimer)
"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  InfoIcon,
  Download,
  Zap,
  Shield,
  AlertCircle,
  Scale,
} from "lucide-react";

import { VideoDownloader } from "@/app/components/video-downloader/VideoDownloader";
import { CopyrightNotice } from "@/app/components/copyright/CopyRightNotice";

// Disclaimer Component
function CopyrightDisclaimer() {
  return (
    <div className="mt-8 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <p className="font-medium text-amber-800 dark:text-amber-400">
            📋 Copyright & Fair Use Disclaimer
          </p>
          <p className="text-amber-700 dark:text-amber-500">
            This tool is for downloading <strong>publicly available</strong>{" "}
            Facebook videos for
            <strong> personal, non-commercial use only</strong>. You must have
            permission from the content owner before downloading or using any
            video. We do not encourage copyright infringement. All rights belong
            to their respective owners.
          </p>
          <p className="text-amber-700 dark:text-amber-500 mt-2">
            By using this tool, you agree that you will not:
          </p>
          <ul className="list-disc list-inside text-amber-700 dark:text-amber-500 ml-2 space-y-1">
            <li>Download copyrighted content without permission</li>
            <li>Use downloaded videos for commercial purposes</li>
            <li>Redistribute or sell downloaded content</li>
            <li>Claim ownership of downloaded videos</li>
          </ul>
          <p className="text-amber-700 dark:text-amber-500 mt-2">
            <strong>Report Copyright Infringement:</strong> If you believe your
            copyright has been violated, please contact us immediately at{" "}
            <strong>dmca@shopyor.com</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

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

        {/* Disclaimer - Added right after downloader */}
        <CopyrightDisclaimer />

        {/* Info Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Download className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">HD Quality</h3>
                <p className="text-sm text-muted-foreground">
                  Download videos in original quality up to 4K resolution
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">
                  Get your download links in seconds with our optimized servers
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-6 w-6" />
                </div>
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

        {/* Second Disclaimer - Before Copyright Notice */}
        <div className="mt-8 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Scale className="h-5 w-5 text-red-600 dark:text-red-500 flex-shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-medium text-red-800 dark:text-red-400 mb-1">
                ⚠️ Legal Notice
              </p>
              <p className="text-red-700 dark:text-red-500">
                Shopyor is not affiliated with Facebook, Meta, or any
                third-party platforms. This tool is provided "as is" without any
                warranties. Users are solely responsible for complying with all
                applicable laws and Facebook's Terms of Service.
              </p>
            </div>
          </div>
        </div>

        {/* Copyright Notice */}
        <CopyrightNotice />
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
