"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils"; // Optional, for classnames utility
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Upload } from "lucide-react";
import { toast } from "react-toastify";

export default function ProductAddForm({ onSubmit }) {
  const [type, setType] = useState("own");
  const [imageFile, setImageFile] = useState(null);

  // You might want to manage form state with a lib (formik, react-hook-form) in production
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    image: "",
    price: "",
    category: "",
    stock: "",
    type: "own",
    affiliate: {
      asin: "",
      url: "",
      rating: "",
      reviews: "",
    },
  });

  function handleChange(e) {
    const { name, value } = e.target;
    if (name.startsWith("affiliate.")) {
      setForm((prev) => ({
        ...prev,
        affiliate: {
          ...prev.affiliate,
          [name.split(".")[1]]: value,
        },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  function handleTypeChange(value) {
    setType(value);
    setForm((prev) => ({
      ...prev,
      type: value,
    }));
  }

  // Handle image upload (simulate here, use your backend or Firebase for production)
  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    // You can handle upload here and set image URL
    setForm((prev) => ({ ...prev, image: file.name }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    toast.info("Adding product...");
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to add product");
      toast.success("Product added successfully!");
      // Optionally reset form:
      setForm({
        title: "",
        slug: "",
        description: "",
        image: "",
        price: "",
        category: "",
        stock: "",
        type: "own",
        affiliate: {
          asin: "",
          url: "",
          rating: "",
          reviews: "",
        },
      });
      setImageFile(null);
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <div className="min-h-screen">
      {" "}
      <Card className="max-w-2xl mx-auto mt-10 shadow-2xl rounded-2xl border-0">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Add Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="title" className="mb-1">
                  Title
                </Label>
                <Input
                  name="title"
                  id="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="slug" className="mb-1">
                  Slug
                </Label>
                <Input
                  name="slug"
                  id="slug"
                  value={form.slug}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="category" className="mb-1">
                  Category
                </Label>
                <Input
                  name="category"
                  id="category"
                  value={form.category}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="price" className="mb-1">
                  Price
                </Label>
                <Input
                  name="price"
                  id="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                  min={0}
                  step={0.01}
                />
              </div>
              <div>
                <Label htmlFor="stock" className="mb-1">
                  Stock
                </Label>
                <Input
                  name="stock"
                  id="stock"
                  type="number"
                  value={form.stock}
                  onChange={handleChange}
                  min={0}
                />
              </div>
              <div>
                <Label htmlFor="type" className="mb-1">
                  Product Type
                </Label>
                <Select value={type} onValueChange={handleTypeChange}>
                  <SelectTrigger id="type">
                    <span className="capitalize">{type}</span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="own">Own Product</SelectItem>
                    <SelectItem value="affiliate">Affiliate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description" className="mb-1">
                Description
              </Label>
              <Textarea
                name="description"
                id="description"
                rows={3}
                value={form.description}
                onChange={handleChange}
                placeholder="Enter product description"
              />
            </div>

            {/* Image Upload */}
            <div>
              <Label className="mb-1">Image</Label>
              <div className="flex items-center gap-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-auto"
                />
                {imageFile && (
                  <span className="text-sm text-gray-500">
                    {imageFile.name}
                  </span>
                )}
                <Upload className="ml-2 text-muted-foreground" />
              </div>
            </div>

            {/* Affiliate Fields (show only if affiliate) */}
            {type === "affiliate" && (
              <div className="border-t pt-5 mt-4 grid grid-cols-1 md:grid-cols-2 gap-5 bg-gray-50 dark:bg-zinc-900 rounded-xl">
                <div>
                  <Label htmlFor="affiliate.asin">ASIN</Label>
                  <Input
                    name="affiliate.asin"
                    id="affiliate.asin"
                    value={form.affiliate.asin}
                    onChange={handleChange}
                    required={type === "affiliate"}
                  />
                </div>
                <div>
                  <Label htmlFor="affiliate.url">Affiliate URL</Label>
                  <Input
                    name="affiliate.url"
                    id="affiliate.url"
                    value={form.affiliate.url}
                    onChange={handleChange}
                    required={type === "affiliate"}
                  />
                </div>
                <div>
                  <Label htmlFor="affiliate.rating">Rating</Label>
                  <Input
                    name="affiliate.rating"
                    id="affiliate.rating"
                    type="number"
                    min={0}
                    max={5}
                    step={0.1}
                    value={form.affiliate.rating}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="affiliate.reviews">Reviews</Label>
                  <Input
                    name="affiliate.reviews"
                    id="affiliate.reviews"
                    type="number"
                    min={0}
                    value={form.affiliate.reviews}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            <Button type="submit" size="lg" className="w-full mt-4">
              Add Product
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
