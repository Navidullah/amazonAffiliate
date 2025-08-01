import DownloadButton from "@/app/components/pdf/DownloadButton";
import { ConnectToDB } from "@/lib/db";
import PdfModel from "@/lib/models/PdfModel";

import { format } from "date-fns";

export default async function PDFPage({ params }) {
  const { id } = params; // ✅ use this instead of params.id directly

  await ConnectToDB();
  const pdf = await PdfModel.findById(id);

  if (!pdf) return <p className="text-red-600 p-6">PDF not found</p>;

  // Increment view count
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/pdf-stats`, {
    method: "POST",
    body: JSON.stringify({ id: pdf._id, type: "view" }),
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:to-gray-800 px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            📄 {pdf.title}
          </h1>
          <div className="space-x-2">
            <DownloadButton pdfId={pdf._id.toString()} url={pdf.url} />
          </div>
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-400">
          Uploaded on: {format(new Date(pdf.createdAt), "dd MMM yyyy")} | 👁️{" "}
          {pdf.views} views | ⬇️ {pdf.downloads} downloads
        </div>

        <div className="rounded overflow-hidden shadow-lg border bg-white dark:bg-gray-900">
          <iframe
            src={pdf.url}
            width="100%"
            height="800px"
            className="w-full"
            allow="autoplay"
          />
        </div>
      </div>
    </div>
  );
}
