"use client";

import Image from "next/image";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Star, ZoomIn } from "lucide-react";
import { toast } from "react-toastify";
import { useCart } from "../cart/CartContext";

export default function ProductDetailsClient({ product }) {
  const isAffiliate = product.type === "affiliate";
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, Number(qty));
    toast.success(`Added ${qty} of "${product.title}" to cart!`);
  };

  return (
    <div className="flex flex-col md:flex-row gap-10 w-full max-w-5xl mx-auto">
      {/* LEFT: Card with Image */}
      <div className="w-full md:w-1/2 flex flex-col items-center">
        <Card className="w-full py-0 bg-background max-w-sm shadow-xl border-0 flex flex-col items-center">
          <CardContent className="p-0 py-0 flex flex-col items-center">
            <div className="relative bg-background shadow-md w-full flex items-center justify-center p-2">
              <Image
                src={product.image}
                alt={product.title}
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto max-h-[400px] object-fill transition-all"
                priority
              />
              <Sheet>
                <SheetTrigger asChild>
                  <button className="absolute bottom-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 shadow transition">
                    <ZoomIn size={20} />
                  </button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="flex flex-col items-center"
                >
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={800}
                    height={800}
                    className="rounded-2xl object-contain bg-white w-full max-h-[80vh]"
                  />
                  <div className="mt-2 text-sm text-muted-foreground">
                    Click outside to close
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* RIGHT: Info and Actions */}
      <div className="w-full md:w-1/2 flex flex-col gap-4 max-w-xl">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Category badge */}
          <Badge variant="secondary" className="capitalize text-xs px-3">
            {product.category}
          </Badge>
          {/* Product type badge */}
          <Badge
            variant={isAffiliate ? "default" : "secondary"}
            className={`text-xs ${isAffiliate ? "bg-yellow-400 text-black" : "bg-blue-100 text-blue-700"}`}
          >
            {isAffiliate ? "Amazon Affiliate" : "Pakistan Only"}
          </Badge>
          {/* Ratings for affiliate */}
          {isAffiliate && (
            <Badge
              variant="outline"
              className="text-yellow-500 border-yellow-400 bg-yellow-50"
            >
              <Star size={16} className="inline mr-1 text-yellow-500" />
              {product.affiliate?.rating ?? "-"} / 5
            </Badge>
          )}
          {/* Stock for local products */}
          {!isAffiliate && (
            <Badge
              variant="outline"
              className={`text-xs ${
                product.stock > 0
                  ? "border-green-400 text-green-600 bg-green-50"
                  : "border-red-400 text-red-600 bg-red-50"
              }`}
            >
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </Badge>
          )}
        </div>
        <h1 className="text-3xl font-bold tracking-tight">{product.title}</h1>
        <p className="text-muted-foreground text-base">{product.description}</p>

        {/* Ratings and Reviews */}
        {isAffiliate && (
          <div className="flex items-center gap-2 text-yellow-600 text-base">
            {Array(Math.round(product.affiliate?.rating || 0))
              .fill(0)
              .map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className="text-yellow-500"
                  fill="currentColor"
                />
              ))}
            <span className="text-gray-500 ml-2">
              {product.affiliate?.reviews ?? "0"} Reviews
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-5 mb-2 mt-1">
          {isAffiliate ? (
            <span className="text-xl font-semibold text-primary">
              {product.affiliate?.price ? `$${product.affiliate.price}` : ""}
            </span>
          ) : (
            <span className="text-3xl font-bold text-primary">
              ${product.price}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-3">
          {isAffiliate ? (
            <a
              href={product.affiliate?.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                className="bg-yellow-400 text-black hover:bg-yellow-300 transition font-bold px-8 py-6 text-lg shadow"
                size="lg"
              >
                Buy Here
              </Button>
            </a>
          ) : (
            <form
              onSubmit={handleAddToCart}
              className="flex flex-wrap items-center gap-4"
            >
              <div className="flex items-center gap-2">
                <label className="text-base">Qty</label>
                <Input
                  type="number"
                  min={1}
                  max={product.stock}
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  className="w-16"
                  disabled={product.stock === 0}
                />
              </div>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 font-bold text-lg px-8 py-6 shadow"
                size="lg"
                disabled={product.stock === 0}
              >
                Add to Cart
              </Button>
            </form>
          )}
        </div>
        {/* Add extra features: share, wishlist, etc */}
      </div>
    </div>
  );
}
