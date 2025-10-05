"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/lib/stores/wishlistStore";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  productId: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  size?: "sm" | "default" | "lg";
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive";
  className?: string;
}

export function WishlistButton({
  productId,
  name,
  price,
  image,
  slug,
  size = "sm",
  variant = "outline",
  className,
}: WishlistButtonProps) {
  const { items, addItem, removeItem } = useWishlistStore();
  const [isAnimating, setIsAnimating] = useState(false);

  const isInWishlist = items.some((item) => item.productId === productId);

  const handleToggle = () => {
    setIsAnimating(true);

    if (isInWishlist) {
      removeItem(productId);
      toast.success(`${name} removed from wishlist`);
    } else {
      addItem({
        productId,
        name,
        price,
        image,
        slug,
      });
      toast.success(`${name} added to wishlist!`);
    }

    // Reset animation after a short delay
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <Button
      size={size}
      variant={variant}
      onClick={handleToggle}
      className={cn(
        "transition-all duration-300 hover:scale-105",
        isInWishlist && "text-red-500 hover:text-red-600",
        isAnimating && "scale-110",
        className,
      )}
    >
      <Heart
        className={cn(
          "w-4 h-4 transition-all duration-300",
          isInWishlist && "fill-current",
        )}
      />
    </Button>
  );
}
