"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Head from "next/head";

export default function FreeBackgroundRemover() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setError(null);
    setSuccess(false);
    setResultUrl(null);

    if (rejectedFiles.length > 0) {
      setError("Please upload a valid image (JPEG, PNG) under 5MB");
      return;
    }

    const file = acceptedFiles[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
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
      formData.append("size", "auto");

      const response = await fetch("https://api.remove.bg/v1.0/removebg", {
        method: "POST",
        headers: {
          "X-Api-Key": "wQGpNbfT8QtaRxVkQuNLHu1c",
        },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.errors?.[0]?.title ||
            "Failed to remove background. Please try another image."
        );
      }

      const blob = await response.blob();
      const resultUrl = URL.createObjectURL(blob);
      setResultUrl(resultUrl);
      setSuccess(true);
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "Failed to remove background");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setPreview(null);
    setResultUrl(null);
    setError(null);
    setSuccess(false);
  };

  return (
    <>
      <Head>
        <title>Free Background Remover | Instant Transparent PNGs</title>
        <meta
          name="description"
          content="Remove image backgrounds for free and download transparent PNGs instantly"
        />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              ✨ Free Background Remover
            </h1>
            <p className="text-gray-600 max-w-md mx-auto">
              Upload an image to instantly remove the background and download as
              transparent PNG
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Upload Section */}
            <div className="p-6 md:p-8">
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${
                  isDragActive
                    ? "border-blue-500 bg-blue-50/50"
                    : "border-gray-300 hover:border-blue-400"
                }`}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center space-y-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-12 w-12 transition-colors ${
                      isDragActive ? "text-blue-500" : "text-gray-400"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  {preview ? (
                    <p className="text-sm font-medium text-gray-700">
                      Selected:{" "}
                      <span className="text-blue-600">{image.name}</span>
                    </p>
                  ) : isDragActive ? (
                    <p className="font-medium text-blue-600">
                      Drop your image here
                    </p>
                  ) : (
                    <>
                      <p className="font-medium text-gray-700">
                        Drag & drop an image here
                      </p>
                      <p className="text-sm text-gray-500">
                        or click to browse (max 5MB)
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Status Messages */}
              {error && (
                <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-4">
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 text-red-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="ml-3 text-sm text-red-700">{error}</p>
                  </div>
                </div>
              )}

              {success && (
                <div className="mt-4 bg-green-50 border-l-4 border-green-500 p-4">
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="ml-3 text-sm text-green-700">
                      Background removed successfully!
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleRemoveBackground}
                  disabled={loading || !image}
                  className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                    loading || !image
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md hover:shadow-lg"
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Remove Background"
                  )}
                </button>

                {preview && (
                  <button
                    onClick={handleReset}
                    className="py-3 px-6 rounded-lg font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors duration-200"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Results Section */}
            {preview && (
              <div className="border-t border-gray-200 p-6 md:p-8 bg-gray-50">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Results
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h3 className="text-center font-medium text-gray-700 mb-3">
                      Original Image
                    </h3>
                    <div className="flex justify-center bg-gray-100 rounded p-2">
                      <img
                        src={preview}
                        alt="Original"
                        className="max-h-72 max-w-full rounded object-contain"
                      />
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h3 className="text-center font-medium text-gray-700 mb-3">
                      Transparent Result
                    </h3>
                    <div className="flex justify-center items-center bg-checkerboard h-72 rounded p-2">
                      {resultUrl ? (
                        <img
                          src={resultUrl}
                          alt="Transparent result"
                          className="max-h-72 max-w-full object-contain"
                        />
                      ) : (
                        <div className="text-gray-400 text-center p-8">
                          {loading ? (
                            <span className="flex items-center justify-center gap-2">
                              <svg
                                className="animate-spin h-5 w-5 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Processing your image...
                            </span>
                          ) : (
                            "Your transparent image will appear here"
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {resultUrl && (
                  <div className="mt-8 text-center">
                    <a
                      href={resultUrl}
                      download={`${image.name.replace(
                        /\.[^/.]+$/,
                        ""
                      )}-transparent.png`}
                      className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Download Transparent PNG
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Free service limited to 50 images per month</p>
          </div>
        </div>
      </main>
    </>
  );
}
