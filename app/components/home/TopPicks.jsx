"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge"; // Make sure you have this import

export default function TopPicks({ products, category = "all" }) {
  // Convert category to lowercase for comparison
  const selected = category.toLowerCase();

  // Filter products
  const filteredProducts =
    selected === "all"
      ? products
      : products.filter(
          (product) => product.category?.toLowerCase() === selected
        );

  // Show only the top 3 picks or any number, or all if fewer
  const displayProducts = filteredProducts;

  return (
    <section className="py-12 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        🔥 Top Picks for You
      </h2>
      {displayProducts.length === 0 ? (
        <div className="text-center text-muted-foreground py-10">
          No products found in this category.
        </div>
      ) : (
        <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
          {displayProducts.map((product, idx) => {
            const isAffiliate = product.type === "affiliate";
            return (
              <motion.div
                key={product.slug}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.18 }}
              >
                <Card className="shadow-lg rounded-2xl border-0 overflow-hidden group hover:scale-[1.03] transition">
                  <CardContent className="p-0">
                    <Link href={`/products/${product.slug}`}>
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-56 object-contain bg-white transition group-hover:scale-105"
                      />
                    </Link>
                    <div className="p-4 flex flex-col gap-2">
                      <div className="flex gap-2 mb-1">
                        {/* Category badge */}
                        <Badge
                          variant="secondary"
                          className="capitalize text-xs"
                        >
                          {product.category}
                        </Badge>
                        {/* Type badge */}
                        <Badge
                          variant={isAffiliate ? "default" : "secondary"}
                          className={`text-xs ${isAffiliate ? "bg-yellow-400 text-black" : "bg-blue-100 text-blue-700"}`}
                        >
                          {isAffiliate ? "Amazon Affiliate" : "Pakistan Only"}
                        </Badge>
                      </div>
                      <h3 className="font-bold text-lg">{product.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        {isAffiliate && product.affiliate?.rating && (
                          <span className="flex items-center text-yellow-500">
                            <Star size={16} className="mr-1" />
                            {product.affiliate.rating}
                          </span>
                        )}
                        <span className="text-primary font-semibold">
                          ${product.price || product.affiliate?.price || "—"}
                        </span>
                      </div>
                      {isAffiliate ? (
                        <a
                          href={product.affiliate.url}
                          target="_blank"
                          rel="noopener"
                          className="block mt-3"
                        >
                          <Button className="w-max md:w-full">
                            Buy on Amazon
                          </Button>
                        </a>
                      ) : (
                        <Link
                          href={`/products/${product.slug}`}
                          className="block mt-3"
                        >
                          <Button className="w-max md:w-full" variant="default">
                            View Details
                          </Button>
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}
