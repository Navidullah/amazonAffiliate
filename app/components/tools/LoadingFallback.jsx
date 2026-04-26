// app/tools/facebook-video-downloader/components/LoadingFallback.jsx
export function LoadingFallback() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <div className="h-10 w-64 bg-muted animate-pulse rounded-lg mx-auto mb-4"></div>
          <div className="h-5 w-96 bg-muted animate-pulse rounded-lg mx-auto"></div>
        </div>
        <div className="space-y-6">
          <div className="h-96 bg-muted animate-pulse rounded-xl"></div>
          <div className="h-48 bg-muted animate-pulse rounded-xl"></div>
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-48 bg-muted animate-pulse rounded-xl"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
