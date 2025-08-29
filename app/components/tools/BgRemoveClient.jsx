// app/components/BackgroundRemoverClient.jsx
"use client";

import { useState } from "react";
import { removeBackground } from "@imgly/background-removal";

export default function BgRemoveClient() {
  const [originalSrc, setOriginalSrc] = useState(null);
  const [processedSrc, setProcessedSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    // Clean up previous object URLs.
    if (originalSrc) URL.revokeObjectURL(originalSrc);
    if (processedSrc) URL.revokeObjectURL(processedSrc);

    setOriginalSrc(URL.createObjectURL(file));
    setLoading(true);
    setError(null);
    try {
      // Configuration: use default CDN for model files.
      const config = {
        output: {
          format: "image/png",
          type: "foreground",
        },
      };
      const blob = await removeBackground(file, config);
      setProcessedSrc(URL.createObjectURL(blob));
    } catch (err) {
      console.error(err);
      setError("Failed to remove background. Please try another image.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section style={{ padding: "2rem" }}>
      <h1>AI Background Remover</h1>
      <p>
        Select an image file to remove its background. The processing happens
        entirely in your browser — no data leaves your computer.
      </p>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ marginBottom: "1rem" }}
      />
      {loading && <p>Processing… please wait.</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        {originalSrc && (
          <figure>
            <figcaption>Original image</figcaption>
            <img
              src={originalSrc}
              alt="original"
              style={{
                maxWidth: "300px",
                border: "1px solid #ccc",
              }}
            />
          </figure>
        )}
        {processedSrc && (
          <figure>
            <figcaption>Processed image</figcaption>
            <img
              src={processedSrc}
              alt="processed"
              style={{
                maxWidth: "300px",
                border: "1px solid #ccc",
              }}
            />
          </figure>
        )}
      </div>
    </section>
  );
}
