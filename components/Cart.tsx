"use client";

import { useCartStore } from "@/lib/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { X, Plus, Minus, ShoppingBag, CreditCard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { calculatePPP, formatPrice } from "@/lib/ppp";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export function Cart() {
  const { 
    items, 
    isOpen, 
    toggleCart, 
    updateQuantity, 
    removeItem, 
    getTotalPrice, 
    clearCart 
  } = useCartStore();

  const [selectedCountry, setSelectedCountry] = useState('US');
  const [isMounted, setIsMounted] = useState(false);
  
  const subtotal = getTotalPrice();
  const pppResult = calculatePPP(subtotal, selectedCountry);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId);
    toast.success("Item removed from cart");
  };

  const handleClearCart = () => {
    clearCart();
    toast.success("Cart cleared");
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>
            Review your items and proceed to checkout
          </SheetDescription>
        </SheetHeader>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">Add some products to get started</p>
              <Button onClick={toggleCart} className="bg-green-500 hover:bg-green-600 text-white">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 border-b border-gray-100 pb-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {item.name}
                    </h3>
                    {item.variantName && (
                      <p className="text-xs text-gray-500">{item.variantName}</p>
                    )}
                    <p className="text-sm font-semibold text-gray-900">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 p-0"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 p-0"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-gray-400 hover:text-red-500 p-1"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 py-4 space-y-4">
            {/* Country Selection */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Country for pricing:
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full text-sm border border-gray-300 rounded px-2 py-1"
              >
                <option value="US">United States (USD)</option>
                <option value="GB">United Kingdom (GBP)</option>
                <option value="CA">Canada (CAD)</option>
                <option value="AU">Australia (AUD)</option>
                <option value="DE">Germany (EUR)</option>
                <option value="FR">France (EUR)</option>
                <option value="IT">Italy (EUR)</option>
                <option value="ES">Spain (EUR)</option>
                <option value="NL">Netherlands (EUR)</option>
                <option value="BE">Belgium (EUR)</option>
                <option value="NG">Nigeria (NGN)</option>
              </select>
            </div>

            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>{formatPrice(pppResult.adjustedPrice, pppResult.currency)}</span>
            </div>

            {pppResult.adjustedPrice !== pppResult.originalPrice && (
              <div className="text-xs text-gray-600 bg-green-50 p-2 rounded">
                <strong>Local Pricing:</strong> Adjusted for your region
              </div>
            )}
            
            <div className="space-y-2">
                      <Button 
                        asChild
                        className="w-full bg-green-500 hover:bg-green-600 text-white"
                        onClick={toggleCart}
                      >
                        <Link href="/checkout">
                          <CreditCard className="h-4 w-4 mr-2" />
                          Checkout
                        </Link>
                      </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleClearCart}
              >
                Clear Cart
              </Button>
            </div>
            
            <div className="text-center">
              <Link 
                href="/shop" 
                onClick={toggleCart}
                className="text-sm text-green-600 hover:text-green-700"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
