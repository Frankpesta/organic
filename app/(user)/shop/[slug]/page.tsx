"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CountrySelector } from "@/components/CountrySelector";
import { generateMetadata, generateStructuredData } from "@/lib/seo";
import { calculatePPP, formatPrice } from "@/lib/ppp";
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2,
  Truck,
  Shield,
  RotateCcw,
  CheckCircle
} from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/lib/stores/cartStore";
import { WishlistButton } from "@/components/WishlistButton";
import { toast } from "sonner";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [selectedCountry, setSelectedCountry] = useState('US');
  const { addItem } = useCartStore();

  const product = useQuery(api.products.getProductBySlug, { slug });

  if (!product) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  const pppResult = calculatePPP(product.price, selectedCountry);
  
  const handleAddToCart = () => {
    addItem({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.imageUrls?.[0] || '',
      quantity: 1,
    });
    toast.success(`${product.name} added to cart!`);
  };

  const structuredData = generateStructuredData({
    title: product.name,
    description: product.description,
    image: product.imageUrls?.[0] || '/og-image.jpg',
    url: `https://helensbeautysecret.com/shop/${product.slug}`,
    type: 'product',
    price: pppResult.adjustedPrice,
    currency: pppResult.currency,
    availability: product.inStock ? 'in stock' : 'out of stock',
    brand: "Helen's Beauty Secret",
    category: product.category?.name || 'Skincare',
    keywords: product.metaKeywords || [],
  });

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
          <Link href="/shop">
            <Button className="bg-green-500 hover:bg-green-600 text-white">
              Back to Shop
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Breadcrumb */}
      <div className="bg-muted/50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-foreground">Shop</Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              {product.imageUrls && product.imageUrls.length > 0 && product.imageUrls[0] ? (
                <Image
                  src={product.imageUrls[0]}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-muted-foreground text-lg">No Image Available</div>
                </div>
              )}
            </div>
            {product.imageUrls && product.imageUrls.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.imageUrls.slice(1, 5).map((image, index) => (
                  <div key={index} className="aspect-square bg-muted rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 2}`}
                      width={150}
                      height={150}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-muted-foreground">(4.8) • 24 reviews</span>
              </div>
              <div className="space-y-4">
                {/* Country Selector */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Select your country for local pricing:
                  </label>
                  <CountrySelector
                    selectedCountry={selectedCountry}
                    onCountryChange={setSelectedCountry}
                    showPrice={true}
                    samplePrice={product.price}
                  />
                </div>

                {/* Price Display */}
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-foreground">
                    {formatPrice(pppResult.adjustedPrice, pppResult.currency)}
                  </span>
                  {pppResult.adjustedPrice !== pppResult.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      {formatPrice(pppResult.originalPrice, 'USD')}
                    </span>
                  )}
                  {product.comparePrice && (
                    <span className="bg-destructive/10 text-destructive text-sm font-medium px-2 py-1 rounded">
                      Save {formatPrice(product.comparePrice - product.price, 'USD')}
                    </span>
                  )}
                </div>

                {/* PPP Notice */}
                {pppResult.adjustedPrice !== pppResult.originalPrice && (
                  <div className="text-sm text-muted-foreground bg-green-50 dark:bg-green-950 p-3 rounded-lg">
                    <strong>Local Pricing:</strong> This price has been adjusted for your region to provide fair, local pricing.
                  </div>
                )}
              </div>
            </div>

            <div>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {/* Key Benefits */}
            {product.benefits && product.benefits.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Key Benefits</h3>
                <ul className="space-y-2">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Ingredients */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Key Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.slice(0, 6).map((ingredient, index) => (
                    <span
                      key={index}
                      className="bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Button 
                  size="lg" 
                  className="bg-green-500 hover:bg-green-600 text-white flex-1"
                  disabled={!product.inStock}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
                <WishlistButton
                  productId={product._id}
                  name={product.name}
                  price={product.price}
                  image={product.imageUrls?.[0] || ''}
                  slug={product.slug}
                  size="lg"
                  variant="outline"
                  className="px-6"
                />
                <Button size="lg" variant="outline" className="px-6">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-2 text-sm">
                {product.inStock ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-green-700">In Stock ({product.inventory} available)</span>
                  </>
                ) : (
                  <>
                    <div className="h-4 w-4 rounded-full bg-red-500"></div>
                    <span className="text-red-700">Out of Stock</span>
                  </>
                )}
              </div>
            </div>

            {/* Trust Signals */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <Truck className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Free Shipping</p>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Secure Payment</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">30-Day Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button className="border-green-500 text-green-600 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm">
                Description
              </button>
              <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm">
                Ingredients
              </button>
              <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm">
                How to Use
              </button>
              <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm">
                Reviews (24)
              </button>
            </nav>
          </div>

          <div className="py-8">
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
              
              {product.howToUse && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">How to Use</h3>
                  <p className="text-gray-700 leading-relaxed">{product.howToUse}</p>
                </div>
              )}

              {product.ingredients && product.ingredients.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Full Ingredient List</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {product.ingredients.join(", ")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
