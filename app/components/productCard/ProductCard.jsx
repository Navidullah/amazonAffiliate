import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function ProductCard({ product }) {
  const isAffiliate = product.type === "affiliate";
  return (
    <Card className="shadow hover:shadow-lg transition-all flex flex-col gap-0 py-0">
      <CardHeader className="p-0 relative">
        <Image
          src={product.image}
          alt={product.title}
          width={100}
          height={50}
          className="h-auto w-full object-contain"
          loading="lazy"
        />
        {/* Type badge */}
        <span className="absolute top-3 right-3 z-10">
          <Badge
            variant={isAffiliate ? "default" : "secondary"}
            className="text-xs"
          >
            {isAffiliate ? "Amazon Affiliate" : "Pakistan Only"}
          </Badge>
        </span>
      </CardHeader>
      <CardContent className="flex flex-col flex-1">
        <CardTitle className="text-[16px] font-semibold line-clamp-2">
          {product.title}
        </CardTitle>
        <div className="text-gray-600 mb-2 line-clamp-2">
          {product.description}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0 mt-auto border-t">
        <span className="font-semibold text-primary">
          {isAffiliate
            ? product.affiliate?.rating
              ? `⭐ ${product.affiliate.rating}`
              : ""
            : product.price
              ? `$${product.price}`
              : ""}
        </span>
        {isAffiliate ? (
          <Link
            href={product.affiliate?.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button>Buy Now</Button>
          </Link>
        ) : (
          <Link href={`/products/${product.slug}`}>
            <Button>View Details</Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
