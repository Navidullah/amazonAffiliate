"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { toast } from "react-toastify";
import { storage } from "@/lib/firebase"; // <-- Import storage from your utils
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

export default function ProductAddForm({ onSubmit }) {
  const [type, setType] = useState("own");
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

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

  // Handle image file selection
  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    // Do NOT set form.image here – upload on submit!
  }

  // Upload image to Firebase, return URL
  async function uploadImageToFirebase(file) {
    const ext = file.name.split(".").pop();
    const imageRef = ref(storage, `products/${uuidv4()}.${ext}`);
    await uploadBytes(imageRef, file);
    return await getDownloadURL(imageRef);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setUploading(true);
      let imageUrl = form.image;

      // If a new file is selected, upload it!
      if (imageFile) {
        toast.info("Uploading image...");
        imageUrl = await uploadImageToFirebase(imageFile);
      }

      const productData = { ...form, image: imageUrl };

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to add product");

      toast.success("Product added successfully!");
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
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="min-h-screen">
      <Card className="max-w-2xl mx-auto mt-10 shadow-2xl rounded-2xl border-0">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Add Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ...Other fields... */}
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

            {/* ...Affiliate fields... */}

            <Button
              type="submit"
              size="lg"
              className="w-full mt-4"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Add Product"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
