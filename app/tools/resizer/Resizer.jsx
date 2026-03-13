// components/tools/image-resizer.jsx
"use client";

import { useState, useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Upload, Download, X, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ImageResizer() {
  const [image, setImage] = useState(null);
  const [originalDimensions, setOriginalDimensions] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [processedBlob, setProcessedBlob] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const canvasRef = useRef(null);

  // Resize options
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [quality, setQuality] = useState(92);
  const [format, setFormat] = useState("image/jpeg");
  const [resizeMode, setResizeMode] = useState("dimensions");
  const [percentage, setPercentage] = useState(50);
  const [resizeAlgorithm, setResizeAlgorithm] = useState("lanczos");
  const [showOriginalSize, setShowOriginalSize] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setError(null);
      setProcessedImage(null);
      setProcessedBlob(null);

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please upload a valid image file");
        return;
      }

      // Validate file size (max 20MB for higher quality images)
      if (file.size > 20 * 1024 * 1024) {
        setError("File size must be less than 20MB");
        return;
      }

      // Create preview
      const preview = URL.createObjectURL(file);
      const imageFile = Object.assign(file, { preview });

      // Get original dimensions
      const img = new window.Image();
      img.onload = () => {
        setOriginalDimensions({ width: img.width, height: img.height });
        setWidth(img.width);
        setHeight(img.height);
      };
      img.src = preview;

      setImage(imageFile);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp", ".bmp", ".tiff"],
    },
    maxFiles: 1,
    maxSize: 20971520, // 20MB
  });

  const handleWidthChange = (newWidth) => {
    setWidth(newWidth);
    if (maintainAspectRatio && originalDimensions) {
      const aspectRatio = originalDimensions.height / originalDimensions.width;
      setHeight(Math.round(newWidth * aspectRatio));
    }
  };

  const handleHeightChange = (newHeight) => {
    setHeight(newHeight);
    if (maintainAspectRatio && originalDimensions) {
      const aspectRatio = originalDimensions.width / originalDimensions.height;
      setWidth(Math.round(newHeight * aspectRatio));
    }
  };

  const handlePercentageChange = (value) => {
    setPercentage(value);
    if (originalDimensions) {
      setWidth(Math.round(originalDimensions.width * (value / 100)));
      setHeight(Math.round(originalDimensions.height * (value / 100)));
    }
  };

  const handlePresetSelect = (preset) => {
    const [w, h] = preset.split("x").map(Number);
    setWidth(w);
    if (maintainAspectRatio && originalDimensions) {
      const aspectRatio = originalDimensions.height / originalDimensions.width;
      setHeight(Math.round(w * aspectRatio));
    } else {
      setHeight(h);
    }
  };

  // Advanced resizing with different algorithms
  const resizeWithAlgorithm = (ctx, img, width, height, algorithm) => {
    // For most cases, standard high-quality resizing is sufficient
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // For better quality when downscaling significantly, we can use
    // a two-step process for certain algorithms
    if (
      algorithm === "lanczos" &&
      (img.width / width > 2 || img.height / height > 2)
    ) {
      // Step down in multiple stages for better quality
      const stages = Math.ceil(
        Math.log2(Math.max(img.width / width, img.height / height)),
      );
      let currentWidth = img.width;
      let currentHeight = img.height;

      // Create temporary canvas for multi-stage resizing
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");

      for (let i = 0; i < stages; i++) {
        const nextWidth = Math.max(width, Math.floor(currentWidth / 2));
        const nextHeight = Math.max(height, Math.floor(currentHeight / 2));

        tempCanvas.width = nextWidth;
        tempCanvas.height = nextHeight;

        tempCtx.imageSmoothingEnabled = true;
        tempCtx.imageSmoothingQuality = "high";

        if (i === 0) {
          tempCtx.drawImage(img, 0, 0, nextWidth, nextHeight);
        } else {
          tempCtx.drawImage(tempCanvas, 0, 0, nextWidth, nextHeight);
        }

        currentWidth = nextWidth;
        currentHeight = nextHeight;
      }

      // Final step to exact dimensions
      ctx.drawImage(tempCanvas, 0, 0, width, height);
    } else {
      // Standard single-step resizing
      ctx.drawImage(img, 0, 0, width, height);
    }
  };

  const resizeImage = async () => {
    if (!image) return;

    setIsProcessing(true);
    setError(null);

    try {
      const img = new window.Image();
      img.src = image.preview;

      await new Promise((resolve) => {
        img.onload = resolve;
      });

      // Create canvas
      const canvas = document.createElement("canvas");
      canvasRef.current = canvas;
      const ctx = canvas.getContext("2d", {
        alpha: format === "image/png" || format === "image/webp",
        // These settings help with quality
        antialias: true,
        depth: true,
        desynchronized: false,
      });

      if (!ctx) {
        throw new Error("Could not get canvas context");
      }

      // Set canvas dimensions
      canvas.width = width;
      canvas.height = height;

      // Apply the selected resizing algorithm
      resizeWithAlgorithm(ctx, img, width, height, resizeAlgorithm);

      // Convert to blob for better quality and file size info
      const blob = await new Promise((resolve) => {
        canvas.toBlob(
          (blob) => resolve(blob),
          format,
          format === "image/png" ? undefined : quality / 100,
        );
      });

      // Create URL for preview
      const processedDataUrl = URL.createObjectURL(blob);
      setProcessedImage(processedDataUrl);
      setProcessedBlob(blob);
    } catch (err) {
      setError("Failed to resize image. Please try again.");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = () => {
    if (!processedBlob) return;

    const link = document.createElement("a");
    link.href = URL.createObjectURL(processedBlob);
    link.download = `resized-${width}x${height}.${format.split("/")[1]}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  const clearImage = () => {
    if (image?.preview) {
      URL.revokeObjectURL(image.preview);
    }
    if (processedImage) {
      URL.revokeObjectURL(processedImage);
    }
    setImage(null);
    setProcessedImage(null);
    setProcessedBlob(null);
    setOriginalDimensions(null);
    setError(null);
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const presetOptions = [
    { label: "Thumbnail (150x150)", value: "150x150" },
    { label: "Small (320x240)", value: "320x240" },
    { label: "Medium (640x480)", value: "640x480" },
    { label: "Large (1024x768)", value: "1024x768" },
    { label: "HD (1280x720)", value: "1280x720" },
    { label: "Full HD (1920x1080)", value: "1920x1080" },
    { label: "4K (3840x2160)", value: "3840x2160" },
  ];

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {!image ? (
          <Card
            {...getRootProps()}
            className={`border-2 border-dashed p-12 text-center cursor-pointer transition-colors ${
              isDragActive
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25"
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">
              {isDragActive ? "Drop your image here" : "Drag & drop an image"}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              or click to browse (max 20MB)
            </p>
          </Card>
        ) : (
          <>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid gap-6 md:grid-cols-2">
              {/* Original Image */}
              <Card className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Original Image</h3>
                  <Button variant="ghost" size="icon" onClick={clearImage}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="relative aspect-video overflow-hidden rounded-lg border">
                  {image && (
                    <Image
                      src={image.preview}
                      alt="Original"
                      fill
                      className="object-contain"
                    />
                  )}
                </div>
                {originalDimensions && (
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Dimensions: {originalDimensions.width} x{" "}
                      {originalDimensions.height} px
                    </p>
                    <p className="text-sm text-muted-foreground">
                      File size: {formatFileSize(image.size)}
                    </p>
                  </div>
                )}
              </Card>

              {/* Resized Image Preview */}
              <Card className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Resized Preview</h3>
                  {processedImage && (
                    <Button variant="outline" size="sm" onClick={downloadImage}>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  )}
                </div>
                <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted">
                  {processedImage ? (
                    <Image
                      src={processedImage}
                      alt="Resized"
                      fill
                      className="object-contain"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                      Preview will appear here
                    </div>
                  )}
                </div>
                {processedImage && processedBlob && (
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-muted-foreground">
                      New Dimensions: {width} x {height} px
                    </p>
                    <p className="text-sm text-muted-foreground">
                      New file size: {formatFileSize(processedBlob.size)}
                    </p>
                    <Button
                      variant="link"
                      size="sm"
                      className="p-0 h-auto text-xs"
                      onClick={() => setShowOriginalSize(!showOriginalSize)}
                    >
                      {showOriginalSize ? "Hide" : "Show"} original size
                      comparison
                    </Button>
                    {showOriginalSize && originalDimensions && (
                      <div className="text-xs text-muted-foreground border rounded p-2 mt-2">
                        <p>
                          Original: {originalDimensions.width} x{" "}
                          {originalDimensions.height} px
                        </p>
                        <p>
                          New: {width} x {height} px
                        </p>
                        <p>
                          Size reduction:{" "}
                          {(
                            (1 -
                              (width * height) /
                                (originalDimensions.width *
                                  originalDimensions.height)) *
                            100
                          ).toFixed(1)}
                          %
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            </div>

            {/* Resize Controls */}
            <Card className="p-6">
              <h3 className="mb-4 font-semibold">Resize Options</h3>

              <Tabs value={resizeMode} onValueChange={(v) => setResizeMode(v)}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="dimensions">Dimensions</TabsTrigger>
                  <TabsTrigger value="percentage">Percentage</TabsTrigger>
                  <TabsTrigger value="preset">Presets</TabsTrigger>
                </TabsList>

                <TabsContent value="dimensions" className="space-y-4 mt-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="width">Width (px)</Label>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Enter the desired width in pixels</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <Input
                        id="width"
                        type="number"
                        min={1}
                        max={originalDimensions?.width * 2 || 7680}
                        value={width}
                        onChange={(e) =>
                          handleWidthChange(Number(e.target.value))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="height">Height (px)</Label>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Enter the desired height in pixels</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <Input
                        id="height"
                        type="number"
                        min={1}
                        max={originalDimensions?.height * 2 || 4320}
                        value={height}
                        onChange={(e) =>
                          handleHeightChange(Number(e.target.value))
                        }
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="maintainAspect"
                      checked={maintainAspectRatio}
                      onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="maintainAspect">
                      Maintain aspect ratio
                    </Label>
                  </div>
                </TabsContent>

                <TabsContent value="percentage" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>Scale: {percentage}%</Label>
                    <Slider
                      value={[percentage]}
                      onValueChange={(value) =>
                        handlePercentageChange(value[0])
                      }
                      min={1}
                      max={200}
                      step={1}
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>1%</span>
                      <span>100%</span>
                      <span>200%</span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="preset" className="space-y-4 mt-4">
                  <Select onValueChange={handlePresetSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a preset size" />
                    </SelectTrigger>
                    <SelectContent>
                      {presetOptions.map((preset) => (
                        <SelectItem key={preset.value} value={preset.value}>
                          {preset.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TabsContent>
              </Tabs>

              {/* Advanced Quality Controls */}
              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Quality: {quality}%</Label>
                    <span className="text-sm text-muted-foreground">
                      {quality >= 90
                        ? "Best"
                        : quality >= 70
                          ? "High"
                          : quality >= 50
                            ? "Medium"
                            : "Low"}
                    </span>
                  </div>
                  <Slider
                    value={[quality]}
                    onValueChange={(value) => setQuality(value[0])}
                    min={60}
                    max={100}
                    step={1}
                  />
                  <p className="text-xs text-muted-foreground">
                    Higher quality = larger file size. 92% is recommended for
                    best balance.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="format">Output Format</Label>
                    <Select value={format} onValueChange={setFormat}>
                      <SelectTrigger id="format">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="image/jpeg">
                          JPEG (Best for photos)
                        </SelectItem>
                        <SelectItem value="image/png">
                          PNG (Best for graphics, transparency)
                        </SelectItem>
                        <SelectItem value="image/webp">
                          WebP (Modern format, smaller size)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="algorithm">Resize Algorithm</Label>
                    <Select
                      value={resizeAlgorithm}
                      onValueChange={setResizeAlgorithm}
                    >
                      <SelectTrigger id="algorithm">
                        <SelectValue placeholder="Select algorithm" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">
                          Standard (Fast)
                        </SelectItem>
                        <SelectItem value="lanczos">
                          Lanczos (Best quality)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      {resizeAlgorithm === "lanczos"
                        ? "Lanczos provides the highest quality but is slower"
                        : "Standard algorithm is faster but may have slight quality loss"}
                    </p>
                  </div>
                </div>
              </div>

              <Button
                className="mt-6 w-full"
                onClick={resizeImage}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Resize Image"
                )}
              </Button>
            </Card>

            {/* Quality Tips */}
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>Tips for best quality:</strong>
                <ul className="list-disc ml-4 mt-2 space-y-1">
                  <li>
                    Use PNG format if you need transparency or sharp
                    text/graphics
                  </li>
                  <li>
                    Use JPEG at 92% quality for photos (best balance of quality
                    and size)
                  </li>
                  <li>
                    Use WebP for modern browsers - it provides better
                    compression
                  </li>
                  <li>For significant size reduction, use Lanczos algorithm</li>
                  <li>
                    Avoid enlarging images beyond 200% as quality will decrease
                  </li>
                </ul>
              </AlertDescription>
            </Alert>
          </>
        )}
      </div>
    </TooltipProvider>
  );
}
