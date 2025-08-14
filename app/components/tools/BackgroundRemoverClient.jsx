"use client";
import { useState, useCallback, useMemo, useEffect } from "react";
import { useDropzone } from "react-dropzone";

export default function BackgroundRemoverClient() {
  const [image, setImage] = useState(null);
  const [resultBlob, setResultBlob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const preview = useMemo(
    () => (image ? URL.createObjectURL(image) : null),
    [image]
  );
  const resultUrl = useMemo(
    () => (resultBlob ? URL.createObjectURL(resultBlob) : null),
    [resultBlob]
  );
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
  }, [preview, resultUrl]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setError(null);
    setSuccess(false);
    setResultBlob(null);

    if (rejectedFiles?.length) {
      setError("Please upload a valid image (JPEG/PNG) under 5MB");
      return;
    }
    const file = acceptedFiles?.[0];
    if (file) setImage(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
    maxSize: 5 * 1024 * 1024,
    multiple: false,
  });

  const handleRemoveBackground = async () => {
    if (!image) return;
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const formData = new FormData();
      formData.append("image_file", image);
      const res = await fetch("/api/background-remove", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        let msg = "Failed to remove background. Please try another image.";
        try {
          const j = await res.json();
          msg = j?.error || msg;
        } catch {}
        throw new Error(msg);
      }
      const blob = await res.blob();
      setResultBlob(blob);
      setSuccess(true);
    } catch (e) {
      setError(e.message || "Failed to remove background");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setResultBlob(null);
    setError(null);
    setSuccess(false);
  };

  return (
    <div className="bg-transparent rounded-xl shadow-lg overflow-hidden">
      {/* Upload */}
      <div className="p-6 md:p-8">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${
            isDragActive
              ? "border-cyan-500 bg-cyan-50/50 dark:bg-cyan-900/20"
              : "border-gray-300 hover:border-cyan-400"
          }`}
          aria-label="Upload an image to remove background"
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center space-y-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-12 w-12 ${
                isDragActive ? "text-cyan-500" : "text-gray-400"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            {image ? (
              <p className="text-sm font-medium">
                Selected: <span className="text-cyan-600">{image.name}</span>
              </p>
            ) : isDragActive ? (
              <p className="font-medium text-cyan-600">Drop your image here</p>
            ) : (
              <>
                <p className="font-medium">Drag & drop an image here</p>
                <p className="text-sm text-gray-500">
                  or click to browse (max 5MB)
                </p>
              </>
            )}
          </div>
        </div>

        {/* Notices */}
        {error && (
          <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-4 text-sm text-red-700">
            {error}
          </div>
        )}
        {success && (
          <div className="mt-4 bg-green-50 border-l-4 border-green-500 p-4 text-sm text-green-700">
            Background removed successfully!
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleRemoveBackground}
            disabled={loading || !image}
            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
              loading || !image
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white shadow-md hover:shadow-lg"
            }`}
          >
            {loading ? "Processing..." : "Remove Background"}
          </button>

          {image && (
            <button
              onClick={handleReset}
              className="py-3 px-6 rounded-lg font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors duration-200"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      {image && (
        <div className="border-t border-gray-200 p-6 md:p-8 bg-gray-50 dark:bg-white/5">
          <h2 className="text-xl font-semibold mb-6">Results</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-neutral-900 rounded-lg p-4 shadow-sm">
              <h3 className="text-center font-medium mb-3">Original Image</h3>
              <div className="flex justify-center bg-gray-100 dark:bg-neutral-800 rounded p-2">
                {preview && (
                  <img
                    src={preview}
                    alt="Original"
                    className="max-h-72 max-w-full rounded object-contain"
                  />
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-900 rounded-lg p-4 shadow-sm">
              <h3 className="text-center font-medium mb-3">
                Transparent Result
              </h3>
              <div
                className="flex justify-center items-center h-72 rounded p-2"
                style={{
                  backgroundImage:
                    "linear-gradient(45deg,#eee 25%,transparent 25%),linear-gradient(-45deg,#eee 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#eee 75%),linear-gradient(-45deg,transparent 75%,#eee 75%)",
                  backgroundSize: "20px 20px",
                  backgroundPosition: "0 0,0 10px,10px -10px,-10px 0",
                }}
              >
                {resultUrl ? (
                  <img
                    src={resultUrl}
                    alt="Transparent result"
                    className="max-h-72 max-w-full object-contain"
                  />
                ) : (
                  <span className="text-gray-400">
                    Your transparent image will appear here
                  </span>
                )}
              </div>
            </div>
          </div>

          {resultUrl && (
            <div className="mt-8 text-center">
              <a
                href={resultUrl}
                download={`${(image.name || "image").replace(/\.[^/.]+$/, "")}-transparent.png`}
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Download Transparent PNG
              </a>
            </div>
          )}
        </div>
      )}

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Free service limited to 50 images per month</p>
      </div>
    </div>
  );
}
