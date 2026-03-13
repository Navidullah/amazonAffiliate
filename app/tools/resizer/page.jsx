// app/tools/image-resizer/page.jsx

import { ImageResizer } from "./Resizer";

export const metadata = {
  title: "Image Resizer - Resize Images Online",
  description:
    "Resize your images without losing quality. Free online image resizer tool.",
};

export default function ImageResizerPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Image Resizer</h1>
        <p className="text-muted-foreground mb-8">
          Resize your images while maintaining quality. Supports JPG, PNG, and
          WebP formats.
        </p>

        <ImageResizer />

        <div className="mt-12 prose prose-sm dark:prose-invert max-w-none">
          <h2>About this tool</h2>
          <p>
            This image resizer tool helps you resize images while maintaining
            their quality. All processing is done directly in your browser -
            your images never leave your device, ensuring privacy and security.
          </p>

          <h3>Features:</h3>
          <ul>
            <li>Resize by exact dimensions or percentage</li>
            <li>Maintain aspect ratio option</li>
            <li>Choose from common preset sizes</li>
            <li>Adjust output quality</li>
            <li>Support for JPG, PNG, and WebP formats</li>
            <li>Client-side processing (no server upload needed)</li>
          </ul>

          <h3>How to use:</h3>
          <ol>
            <li>Upload your image (max 10MB)</li>
            <li>Choose your desired dimensions or percentage</li>
            <li>Adjust quality if needed</li>
            <li>Click "Resize Image" and download the result</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
