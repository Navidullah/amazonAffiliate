"use client";

import { useState, useRef } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function ImageResizer() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);

  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [quality, setQuality] = useState(90);
  const [format, setFormat] = useState("jpeg");

  const [lockRatio, setLockRatio] = useState(true);
  const [ratio, setRatio] = useState(null);

  const [originalSize, setOriginalSize] = useState(null);
  const [newSize, setNewSize] = useState(null);

  const [loading, setLoading] = useState(false);

  const fileRef = useRef();

  const handleImage = (file) => {
    if (!file) return;

    setImage(file);

    setPreview(URL.createObjectURL(file));

    setOriginalSize((file.size / 1024).toFixed(2));

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      setWidth(img.width);
      setHeight(img.height);

      setRatio(img.width / img.height);
    };
  };

  const handleResize = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();

    formData.append("image", image);
    formData.append("width", width);
    formData.append("height", height);
    formData.append("quality", quality);
    formData.append("format", format);

    const res = await axios.post("/api/resize", formData, {
      responseType: "blob",
    });

    const blob = res.data;

    setNewSize((blob.size / 1024).toFixed(2));

    const url = URL.createObjectURL(blob);

    setResult(url);

    setLoading(false);
  };

  const handleWidth = (val) => {
    setWidth(val);

    if (lockRatio && ratio) {
      setHeight(Math.round(val / ratio));
    }
  };

  const handleHeight = (val) => {
    setHeight(val);

    if (lockRatio && ratio) {
      setWidth(Math.round(val * ratio));
    }
  };

  const preset = (w, h) => {
    setWidth(w);
    setHeight(h);
  };

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8 bg-white dark:bg-gray-900 shadow-xl rounded-xl">
      <h1 className="text-3xl font-bold text-center">AI Image Resizer</h1>

      {/* Upload */}

      <div
        className="border-2 border-dashed p-6 rounded-lg text-center cursor-pointer"
        onClick={() => fileRef.current.click()}
      >
        {preview ? (
          <img src={preview} className="mx-auto max-h-60" />
        ) : (
          <p>Drag & Drop or Click to Upload Image</p>
        )}

        <Input
          type="file"
          accept="image/*"
          ref={fileRef}
          className="hidden"
          onChange={(e) => handleImage(e.target.files[0])}
        />
      </div>

      {/* Presets */}

      <div className="flex flex-wrap gap-2 justify-center">
        <Button variant="outline" onClick={() => preset(1080, 1080)}>
          Instagram Post
        </Button>

        <Button variant="outline" onClick={() => preset(1280, 720)}>
          YouTube Thumbnail
        </Button>

        <Button variant="outline" onClick={() => preset(820, 312)}>
          Facebook Cover
        </Button>

        <Button variant="outline" onClick={() => preset(1200, 675)}>
          Twitter Post
        </Button>
      </div>

      <form onSubmit={handleResize} className="space-y-6">
        <div className="flex gap-4">
          <div className="w-1/2">
            <Label>Width</Label>

            <Input
              type="number"
              value={width}
              onChange={(e) => handleWidth(e.target.value)}
            />
          </div>

          <div className="w-1/2">
            <Label>Height</Label>

            <Input
              type="number"
              value={height}
              onChange={(e) => handleHeight(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Switch checked={lockRatio} onCheckedChange={setLockRatio} />

          <Label>Lock Aspect Ratio</Label>
        </div>

        {/* Quality */}

        <div>
          <Label>Quality : {quality}%</Label>

          <input
            type="range"
            min="40"
            max="100"
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Format */}

        <div>
          <Label>Output Format</Label>

          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="w-full border rounded-md p-2"
          >
            <option value="jpeg">JPG</option>
            <option value="png">PNG</option>
            <option value="webp">WebP (Best)</option>
          </select>
        </div>

        <Button className="w-full" disabled={loading}>
          {loading ? "Processing..." : "Resize Image"}
        </Button>
      </form>

      {/* Preview */}

      {result && (
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm mb-2">Original</p>

            <img src={preview} className="rounded-lg" />
          </div>

          <div>
            <p className="text-sm mb-2">Resized</p>

            <img src={result} className="rounded-lg" />

            <a
              href={result}
              download="resized-image"
              className="block mt-3 text-center bg-blue-600 text-white py-2 rounded-md"
            >
              Download Image
            </a>
          </div>
        </div>
      )}

      {/* Size Comparison */}

      {originalSize && newSize && (
        <p className="text-center text-sm text-gray-500">
          Original: {originalSize} KB → Resized: {newSize} KB
        </p>
      )}
    </div>
  );
}
