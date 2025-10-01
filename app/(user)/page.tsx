"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Play, 
  Star,
  Heart,
  ArrowRight,
  Shield,
  Truck,
  RotateCcw,
  Sparkles,
  Leaf,
  Award,
  Users,
  CheckCircle
} from "lucide-react";
import { useCartStore } from "@/lib/stores/cartStore";
import { useProductStore } from "@/lib/stores/productStore";
import { WishlistButton } from "@/components/WishlistButton";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { generateStructuredData, generateBreadcrumbStructuredData, generateFAQStructuredData } from "@/lib/seo";
import { SEOHead } from "@/components/SEOHead";
import { toast } from "sonner";

export default function Home() {
  const { addItem } = useCartStore();
  const { setFeaturedProducts, featuredProducts } = useProductStore();
  
  const products = useQuery(api.products.getFeaturedProducts, { limit: 6 });
  
  useEffect(() => {
    if (products) {
      setFeaturedProducts(products);
    }
  }, [products, setFeaturedProducts]);

  const handleAddToCart = (product: any) => {
    addItem({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: (product as any).imageUrls?.[0] || '',
      quantity: 1,
    });
    toast.success(`${product.name} added to cart!`);
  };

  // Generate structured data for SEO
  const structuredData = generateStructuredData({
    title: "Helen's Beauty Secret - Premium Organic Skincare",
    description: "Transform your skin with our premium organic skincare collection. Clean, effective, and sustainable beauty products crafted with nature's finest ingredients.",
    keywords: ["premium organic skincare", "clean beauty", "sustainable skincare", "natural beauty", "Helen's Beauty Secret"],
    url: "https://helensbeautysecret.com",
    type: "website",
  });

  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: "Home", url: "https://helensbeautysecret.com" },
  ]);

  const faqData = generateFAQStructuredData([
    {
      question: "Are Helen's Beauty Secret products truly organic?",
      answer: "Yes, all our products are certified organic and made with 100% natural ingredients. We're committed to clean, sustainable beauty."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship worldwide with local pricing adjustments to ensure fair access to our premium skincare products."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day satisfaction guarantee. If you're not completely satisfied, we'll provide a full refund."
    }
  ]);

  return (
    <>
      <SEOHead 
        structuredData={structuredData}
        breadcrumbData={breadcrumbData}
        faqData={faqData}
      />
      <div className="min-h-screen bg-background pt-16">

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 dark:from-green-950/20 via-background to-green-50 dark:to-green-950/20"></div>
          
          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-32 h-32 bg-green-100 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute top-40 right-20 w-24 h-24 bg-green-200 rounded-full opacity-30 animate-pulse delay-1000"></div>
            <div className="absolute bottom-40 left-20 w-40 h-40 bg-green-100 rounded-full opacity-15 animate-pulse delay-2000"></div>
            <div className="absolute bottom-20 right-10 w-28 h-28 bg-green-200 rounded-full opacity-25 animate-pulse delay-3000"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <Badge variant="secondary" className="w-fit bg-green-100 text-green-800 border-green-200">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Premium Organic Skincare
                  </Badge>
                  
                  <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight">
                    Transform Your
                    <span className="block bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                      Skin Naturally
                    </span>
                  </h1>
                  
                  <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                    Discover the power of premium organic skincare. Clean, effective, and sustainable beauty products that deliver real results.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/shop">
                    <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                      Shop Collection
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300">
                    Watch Story
                    <Play className="ml-2 h-5 w-5" />
                  </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 pt-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">50K+</div>
                      <div className="text-sm text-muted-foreground">Happy Customers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">100%</div>
                      <div className="text-sm text-muted-foreground">Organic</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">4.9★</div>
                      <div className="text-sm text-muted-foreground">Rating</div>
                    </div>
                </div>
              </div>

              {/* Right Content - Product Showcase */}
              <div className="relative">
                <div className="relative z-10">
                  {/* Main Product Image */}
                  <div className="relative w-full h-96 lg:h-[500px] bg-gradient-to-br from-green-100 dark:from-green-900/30 to-green-200 dark:to-green-800/30 rounded-3xl overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-64 h-80 bg-background/90 rounded-2xl shadow-xl flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-32 h-40 bg-gradient-to-br from-green-200 to-green-300 rounded-xl mx-auto mb-4 flex items-center justify-center">
                            <Leaf className="w-16 h-16 text-green-600" />
                          </div>
                          <p className="text-sm font-medium text-foreground">Premium Serum</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Floating Badge */}
                    <div className="absolute top-6 right-6 bg-background/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-semibold">4.9</span>
                      </div>
                    </div>
                  </div>

                  {/* Floating Product Cards */}
                  <div className="absolute -top-4 -left-4 w-24 h-32 bg-card rounded-2xl shadow-lg p-4 transform rotate-12 hover:rotate-0 transition-transform duration-300">
                    <div className="w-full h-16 bg-green-100 rounded-lg mb-2 flex items-center justify-center">
                      <Award className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-xs font-medium text-foreground">Award Winner</p>
                  </div>

                  <div className="absolute -bottom-4 -right-4 w-24 h-32 bg-card rounded-2xl shadow-lg p-4 transform -rotate-12 hover:rotate-0 transition-transform duration-300">
                    <div className="w-full h-16 bg-green-100 rounded-lg mb-2 flex items-center justify-center">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-xs font-medium text-foreground">50K+ Users</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-16 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Trusted by Beauty Experts</h2>
              <p className="text-lg text-muted-foreground">Why professionals choose our products</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              <Card className="text-center group hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Shield className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Certified Organic</h3>
                  <p className="text-muted-foreground">100% organic ingredients verified by leading certification bodies</p>
                </CardContent>
              </Card>
              
              <Card className="text-center group hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Truck className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Free Shipping</h3>
                  <p className="text-muted-foreground">Complimentary worldwide shipping on orders over $50</p>
                </CardContent>
              </Card>
              
              <Card className="text-center group hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <RotateCcw className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">30-Day Returns</h3>
                  <p className="text-muted-foreground">Not satisfied? Return within 30 days for a full refund</p>
                </CardContent>
              </Card>
              
              <Card className="text-center group hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Heart className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Cruelty-Free</h3>
                  <p className="text-muted-foreground">Never tested on animals, always tested on humans</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="w-fit bg-green-100 text-green-800 border-green-200 mb-4">
                Featured Collection
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Our Best Sellers
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover our most loved products, carefully crafted with premium organic ingredients
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.slice(0, 6).map((product, index) => (
                <Card key={product._id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative aspect-square bg-muted overflow-hidden">
                    {(product as any).imageUrls && (product as any).imageUrls.length > 0 ? (
                      <Image
                        src={(product as any).imageUrls[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                          <Leaf className="w-8 h-8 text-green-600" />
                        </div>
                      </div>
                    )}
                    
                    {/* Badge */}
                    {index < 3 && (
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-green-600 text-white">
                          Best Seller
                        </Badge>
                      </div>
                    )}
                    
                    {/* Quick Actions */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex flex-col space-y-2">
                        <WishlistButton
                          productId={product._id}
                          name={product.name}
                          price={product.price}
                          image={(product as any).imageUrls?.[0] || ''}
                          slug={product.slug}
                          size="sm"
                          variant="outline"
                          className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm"
                        />
                        <Button size="sm" variant="secondary" className="w-10 h-10 rounded-full">
                          <Star className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">(24)</span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-green-600 transition-colors">
                      <Link href={`/shop/${product.slug}`}>
                        {product.name}
                      </Link>
                    </h3>
                    
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{product.shortDescription}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-foreground">${product.price}</span>
                        {product.comparePrice && (
                          <span className="text-lg text-muted-foreground line-through">
                            ${product.comparePrice}
                          </span>
                        )}
                      </div>
                      
                      <Button 
                        className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-6 py-2 font-semibold transition-all duration-300 hover:scale-105"
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.inStock}
                      >
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/shop">
                <Button size="lg" variant="outline" className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300">
                  View All Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-green-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Ready to Transform Your Skin?
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have discovered the power of organic skincare
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop">
                <Button size="lg" className="bg-background text-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-background/10 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}