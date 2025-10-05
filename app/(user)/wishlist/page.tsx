"use client";

import {
  ArrowLeft,
  Heart,
  Package,
  ShoppingCart,
  Star,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCartStore } from "@/lib/stores/cartStore";
import { useWishlistStore } from "@/lib/stores/wishlistStore";

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const { addItem } = useCartStore();
  const [isRemoving, setIsRemoving] = useState<string | null>(null);

  const handleMoveToCart = (item: any) => {
    addItem({
      productId: item.productId,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    });
    removeItem(item.productId);
    toast.success(`${item.name} moved to cart!`);
  };

  const handleRemoveItem = async (productId: string) => {
    setIsRemoving(productId);
    // Add a small delay for better UX
    setTimeout(() => {
      removeItem(productId);
      toast.success("Removed from wishlist");
      setIsRemoving(null);
    }, 300);
  };

  const handleClearWishlist = () => {
    if (confirm("Are you sure you want to clear your wishlist?")) {
      clearWishlist();
      toast.success("Wishlist cleared");
    }
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link href="/shop">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Shop
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Heart className="w-6 h-6 text-red-500 fill-current" />
              <h1 className="text-3xl font-bold text-foreground">
                My Wishlist
              </h1>
            </div>
          </div>
          <p className="text-muted-foreground">
            {items.length} {items.length === 1 ? "item" : "items"} in your
            wishlist
          </p>
        </div>

        {items.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Your wishlist is empty
              </h3>
              <p className="text-muted-foreground mb-6">
                Start adding items you love to your wishlist
              </p>
              <Link href="/shop">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <Package className="w-4 h-4 mr-2" />
                  Start Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Actions */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                <Button
                  onClick={handleClearWishlist}
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                {items.length} {items.length === 1 ? "item" : "items"}
              </div>
            </div>

            {/* Wishlist Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((item) => (
                <Card
                  key={item.productId}
                  className="group hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div className="aspect-square bg-muted relative">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-12 h-12 text-muted-foreground" />
                      </div>
                    )}

                    {/* Remove Button */}
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                      onClick={() => handleRemoveItem(item.productId)}
                      disabled={isRemoving === item.productId}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>

                    {/* Wishlist Badge */}
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-red-500 text-white">
                        <Heart className="w-3 h-3 mr-1 fill-current" />
                        Saved
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-green-600 transition-colors">
                          <Link href={`/shop/${item.slug}`}>{item.name}</Link>
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 text-yellow-400 fill-current"
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            (24)
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-foreground">
                          ${item.price}
                        </span>
                        <Button
                          onClick={() => handleMoveToCart(item)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                          size="sm"
                        >
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 flex justify-center">
              <Link href="/shop">
                <Button variant="outline" size="lg">
                  <Package className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
