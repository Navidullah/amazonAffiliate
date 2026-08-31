"use client";

import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const PDFJS_VERSION = "3.11.174";

export default function BookReader({ slug, title }) {
  // Custom toolbar deliberately omits Download/Print/Open — a UX deterrent
  // against casual copying, not real DRM (the PDF can still be screenshotted).
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: (defaultTabs) => defaultTabs.filter((tab) => tab.title !== "Attachment"),
    renderToolbar: (Toolbar) => (
      <Toolbar>
        {(slots) => {
          const {
            CurrentPageInput,
            GoToNextPage,
            GoToPreviousPage,
            NumberOfPages,
            Zoom,
            ZoomIn,
            ZoomOut,
          } = slots;
          return (
            <div className="flex w-full items-center justify-center gap-3 px-2">
              <div className="flex items-center gap-1">
                <GoToPreviousPage />
                <CurrentPageInput /> / <NumberOfPages />
                <GoToNextPage />
              </div>
              <div className="flex items-center gap-1">
                <ZoomOut />
                <Zoom />
                <ZoomIn />
              </div>
            </div>
          );
        }}
      </Toolbar>
    ),
  });

  return (
    <div className="h-[80vh] w-full overflow-hidden rounded-3xl border border-gray-200/70 dark:border-white/10">
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${PDFJS_VERSION}/build/pdf.worker.min.js`}>
        <Viewer
          fileUrl={`/api/books/${slug}/stream`}
          plugins={[defaultLayoutPluginInstance]}
          renderError={() => (
            <div className="flex h-full items-center justify-center text-sm text-gray-500">
              Couldn&apos;t load &quot;{title}&quot;. Please try again later.
            </div>
          )}
        />
      </Worker>
    </div>
  );
}
