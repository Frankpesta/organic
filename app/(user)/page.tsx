"use client";

import { useQuery } from "convex/react";
import {
  ArrowRight,
  Award,
  CheckCircle,
  ChevronDown,
  Clock,
  Globe,
  Heart,
  Leaf,
  MessageCircle,
  Minus,
  Package,
  Play,
  Plus,
  RotateCcw,
  Search,
  Shield,
  Sparkles,
  Star,
  Truck,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SEOHead } from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { WishlistButton } from "@/components/WishlistButton";
import { api } from "@/convex/_generated/api";
import {
  generateBreadcrumbStructuredData,
  generateFAQStructuredData,
  generateStructuredData,
} from "@/lib/seo";
import { useCartStore } from "@/lib/stores/cartStore";
import { useProductStore } from "@/lib/stores/productStore";

export default function Home() {
  const { addItem } = useCartStore();
  const { setFeaturedProducts, featuredProducts } = useProductStore();

  const products = useQuery(api.products.getFeaturedProducts, { limit: 6 });
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [faqSearch, setFaqSearch] = useState("");

  useEffect(() => {
    if (products) {
      setFeaturedProducts(products);
    }
  }, [products, setFeaturedProducts]);

  // FAQ Data
  const faqData = [
    {
      category: "Products",
      icon: Package,
      questions: [
        {
          question: "Are Helen's Beauty Secret products truly organic?",
          answer:
            "Yes, all our products are certified organic and made with 100% natural ingredients. We're committed to clean, sustainable beauty and work with certified organic suppliers.",
        },
        {
          question: "What skin types are your products suitable for?",
          answer:
            "Our products are formulated for all skin types including sensitive, oily, dry, and combination skin. Each product clearly indicates the recommended skin types on the packaging.",
        },
        {
          question: "Do you test on animals?",
          answer:
            "Never! We are 100% cruelty-free and never test our products on animals. We only test on humans who volunteer to try our products.",
        },
      ],
    },
    {
      category: "Shipping & Delivery",
      icon: Truck,
      questions: [
        {
          question: "Do you offer international shipping?",
          answer:
            "Yes, we ship worldwide with local pricing adjustments to ensure fair access to our premium skincare products. Shipping times vary by location.",
        },
        {
          question: "How long does shipping take?",
          answer:
            "Domestic orders typically arrive within 3-5 business days. International orders take 7-14 business days depending on your location.",
        },
        {
          question: "Is there free shipping?",
          answer:
            "Yes! We offer free worldwide shipping on orders over $50. For orders under $50, shipping is $9.99.",
        },
      ],
    },
    {
      category: "Returns & Exchanges",
      icon: RotateCcw,
      questions: [
        {
          question: "What is your return policy?",
          answer:
            "We offer a 30-day satisfaction guarantee. If you're not completely satisfied, we'll provide a full refund. Returns must be in original packaging.",
        },
        {
          question: "How do I return a product?",
          answer:
            "Simply contact our customer service team with your order number, and we'll provide you with a prepaid return label and instructions.",
        },
        {
          question: "Can I exchange a product for a different one?",
          answer:
            "Yes! We offer exchanges within 30 days of purchase. Contact our customer service team to arrange an exchange.",
        },
      ],
    },
    {
      category: "General",
      icon: MessageCircle,
      questions: [
        {
          question: "How do I contact customer service?",
          answer:
            "You can reach us via email at support@helensbeautysecret.com, through our contact form, or by phone at 1-800-BEAUTY. We typically respond within 24 hours.",
        },
        {
          question: "Do you offer samples?",
          answer:
            "Yes! We offer sample sizes of our most popular products. You can request samples when you place an order or contact us directly.",
        },
        {
          question: "Are your products safe for pregnant women?",
          answer:
            "Most of our products are safe for pregnant women, but we recommend consulting with your healthcare provider before using any new skincare products during pregnancy.",
        },
      ],
    },
  ];

  const filteredFAQs = faqData
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
          q.answer.toLowerCase().includes(faqSearch.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0);

  const handleAddToCart = (product: any) => {
    addItem({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: (product as any).imageUrls?.[0] || "",
      quantity: 1,
    });
    toast.success(`${product.name} added to cart!`);
  };

  // Generate structured data for SEO
  const structuredData = generateStructuredData({
    title: "Helen's Beauty Secret - Premium Organic Skincare",
    description:
      "Transform your skin with our premium organic skincare collection. Clean, effective, and sustainable beauty products crafted with nature's finest ingredients.",
    keywords: [
      "premium organic skincare",
      "clean beauty",
      "sustainable skincare",
      "natural beauty",
      "Helen's Beauty Secret",
    ],
    url: "https://helensbeautysecret.com",
    type: "website",
  });

  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: "Home", url: "https://helensbeautysecret.com" },
  ]);

  const seoFaqData = generateFAQStructuredData([
    {
      question: "Are Helen's Beauty Secret products truly organic?",
      answer:
        "Yes, all our products are certified organic and made with 100% natural ingredients. We're committed to clean, sustainable beauty.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship worldwide with local pricing adjustments to ensure fair access to our premium skincare products.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day satisfaction guarantee. If you're not completely satisfied, we'll provide a full refund.",
    },
  ]);

  return (
    <>
      <SEOHead
        structuredData={structuredData}
        breadcrumbData={breadcrumbData}
        faqData={seoFaqData}
      />
      <div className="min-h-screen bg-background pt-16">
        {/* Hero Section - Redesigned */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Advanced Background with Parallax Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-950/30 dark:via-green-950/20 dark:to-teal-950/30"></div>

          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Floating Orbs with Different Sizes and Speeds */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-teal-400/30 to-cyan-400/30 rounded-full blur-lg animate-pulse delay-1000"></div>
            <div className="absolute bottom-40 left-20 w-40 h-40 bg-gradient-to-r from-green-300/15 to-emerald-300/15 rounded-full blur-2xl animate-pulse delay-2000"></div>
            <div className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-r from-teal-300/25 to-cyan-300/25 rounded-full blur-lg animate-pulse delay-3000"></div>

            {/* Additional Floating Elements */}
            <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-gradient-to-r from-green-200/40 to-emerald-200/40 rounded-full blur-sm animate-bounce delay-500"></div>
            <div className="absolute top-2/3 right-1/3 w-20 h-20 bg-gradient-to-r from-teal-200/30 to-cyan-200/30 rounded-full blur-md animate-bounce delay-1500"></div>
          </div>

          {/* Glass Morphism Overlay */}
          <div className="absolute inset-0 bg-white/5 dark:bg-black/5 backdrop-blur-[1px]"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content - Enhanced */}
              <div className="space-y-10">
                <div className="space-y-8">
                  {/* Animated Badge */}
                  <div className="inline-block">
                    <Badge
                      variant="secondary"
                      className="w-fit bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 group"
                    >
                      <Sparkles className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                      Premium Organic Skincare
                    </Badge>
                  </div>

                  {/* Enhanced Typography with Staggered Animation */}
                  <div className="space-y-4">
                    <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                      <span className="block opacity-0 animate-fade-in-up">
                        Transform Your
                      </span>
                      <span className="block bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent opacity-0 animate-fade-in-up delay-200">
                        Skin Naturally
                      </span>
                    </h1>

                    <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full opacity-0 animate-fade-in-up delay-400"></div>
                  </div>

                  <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl opacity-0 animate-fade-in-up delay-600">
                    Discover the power of premium organic skincare. Clean,
                    effective, and sustainable beauty products that deliver real
                    results for radiant, healthy skin.
                  </p>
                </div>

                {/* Enhanced CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-6 opacity-0 animate-fade-in-up delay-800">
                  <Link href="/shop">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-10 py-5 text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 group transform hover:scale-105"
                    >
                      <Zap className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                      Shop Collection
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-950/20 px-10 py-5 text-lg font-semibold rounded-2xl transition-all duration-300 group transform hover:scale-105 backdrop-blur-sm"
                  >
                    <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    Watch Story
                  </Button>
                </div>

                {/* Enhanced Stats with Icons */}
                <div className="grid grid-cols-3 gap-8 pt-8 opacity-0 animate-fade-in-up delay-1000">
                  <div className="text-center group">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                      <Users className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="text-3xl font-bold text-green-600">
                      50K+
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Happy Customers
                    </div>
                  </div>
                  <div className="text-center group">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                      <Leaf className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="text-3xl font-bold text-green-600">
                      100%
                    </div>
                    <div className="text-sm text-muted-foreground">Organic</div>
                  </div>
                  <div className="text-center group">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                      <Star className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="text-3xl font-bold text-green-600">
                      4.9★
                    </div>
                    <div className="text-sm text-muted-foreground">Rating</div>
                  </div>
                </div>
              </div>

              {/* Right Content - 3D Product Showcase */}
              <div className="relative">
                <div className="relative z-10">
                  {/* Main Product Showcase with 3D Effect */}
                  <div className="relative w-full h-96 lg:h-[600px] group">
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-200/50 via-emerald-200/30 to-teal-200/50 dark:from-green-800/30 dark:via-emerald-800/20 dark:to-teal-800/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>

                    {/* Main Container */}
                    <div className="relative w-full h-full bg-gradient-to-br from-white/90 to-green-50/90 dark:from-gray-900/90 dark:to-green-950/90 rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-500 backdrop-blur-sm border border-white/20">
                      {/* Product Display */}
                      <div className="absolute inset-0 flex items-center justify-center p-8">
                        <div className="w-72 h-80 bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-green-900 rounded-2xl shadow-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                          <div className="text-center">
                            <div className="w-40 h-48 bg-gradient-to-br from-green-200 via-emerald-200 to-teal-200 dark:from-green-700 dark:via-emerald-700 dark:to-teal-700 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:rotate-3 transition-transform duration-500">
                              <Leaf className="w-20 h-20 text-green-600 dark:text-green-400" />
                            </div>
                            <p className="text-lg font-semibold text-foreground">
                              Premium Serum
                            </p>
                            <p className="text-sm text-muted-foreground mt-2">
                              Organic & Natural
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Floating Rating Badge */}
                      <div className="absolute top-6 right-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-semibold">4.9</span>
                        </div>
                      </div>

                      {/* Floating Elements */}
                      <div className="absolute top-4 left-4 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                      <div className="absolute bottom-4 right-4 w-2 h-2 bg-emerald-400 rounded-full animate-ping delay-1000"></div>
                    </div>

                    {/* Floating Product Cards with Enhanced 3D Effect */}
                    <div className="absolute -top-6 -left-6 w-28 h-36 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl p-4 transform rotate-12 hover:rotate-0 transition-all duration-500 group-hover:scale-110 backdrop-blur-sm border border-white/20">
                      <div className="w-full h-20 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-800 dark:to-emerald-800 rounded-xl mb-3 flex items-center justify-center">
                        <Award className="w-8 h-8 text-green-600 dark:text-green-400" />
                      </div>
                      <p className="text-xs font-medium text-foreground text-center">
                        Award Winner
                      </p>
                    </div>

                    <div className="absolute -bottom-6 -right-6 w-28 h-36 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl p-4 transform -rotate-12 hover:rotate-0 transition-all duration-500 group-hover:scale-110 backdrop-blur-sm border border-white/20">
                      <div className="w-full h-20 bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-800 dark:to-cyan-800 rounded-xl mb-3 flex items-center justify-center">
                        <Globe className="w-8 h-8 text-teal-600 dark:text-teal-400" />
                      </div>
                      <p className="text-xs font-medium text-foreground text-center">
                        Global Shipping
                      </p>
                    </div>

                    {/* Additional Floating Element */}
                    <div className="absolute top-1/2 -right-8 w-20 h-20 bg-gradient-to-br from-green-100/80 to-emerald-100/80 dark:from-green-800/80 dark:to-emerald-800/80 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                      <Clock className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
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
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Trusted by Beauty Experts
              </h2>
              <p className="text-lg text-muted-foreground">
                Why professionals choose our products
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <Card className="text-center group hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Shield className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Certified Organic
                  </h3>
                  <p className="text-muted-foreground">
                    100% organic ingredients verified by leading certification
                    bodies
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center group hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Truck className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Free Shipping
                  </h3>
                  <p className="text-muted-foreground">
                    Complimentary worldwide shipping on orders over $50
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center group hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <RotateCcw className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    30-Day Returns
                  </h3>
                  <p className="text-muted-foreground">
                    Not satisfied? Return within 30 days for a full refund
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center group hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Heart className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Cruelty-Free
                  </h3>
                  <p className="text-muted-foreground">
                    Never tested on animals, always tested on humans
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge
                variant="secondary"
                className="w-fit bg-green-100 text-green-800 border-green-200 mb-4"
              >
                Featured Collection
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Our Best Sellers
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover our most loved products, carefully crafted with premium
                organic ingredients
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.slice(0, 6).map((product, index) => (
                <Card
                  key={product._id}
                  className="group hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="relative aspect-square bg-muted overflow-hidden">
                    {(product as any).imageUrls &&
                    (product as any).imageUrls.length > 0 ? (
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
                          image={(product as any).imageUrls?.[0] || ""}
                          slug={product.slug}
                          size="sm"
                          variant="outline"
                          className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm"
                        />
                        <Button
                          size="sm"
                          variant="secondary"
                          className="w-10 h-10 rounded-full"
                        >
                          <Star className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-2">
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

                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-green-600 transition-colors">
                      <Link href={`/shop/${product.slug}`}>{product.name}</Link>
                    </h3>

                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {product.shortDescription}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-foreground">
                          ${product.price}
                        </span>
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
                        {product.inStock ? "Add to Cart" : "Out of Stock"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/shop">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
                >
                  View All Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-900 dark:to-green-950/20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge
                variant="secondary"
                className="w-fit bg-green-100 text-green-800 border-green-200 mb-4"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Frequently Asked Questions
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Got Questions?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Find answers to common questions about our products, shipping,
                and more
              </p>
            </div>

            {/* FAQ Search */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  value={faqSearch}
                  onChange={(e) => setFaqSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-border rounded-2xl bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {/* FAQ Categories */}
            <div className="space-y-8">
              {filteredFAQs.map((category, categoryIndex) => (
                <div key={category.category} className="space-y-4">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-800 dark:to-emerald-800 rounded-2xl flex items-center justify-center">
                      <category.icon className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">
                      {category.category}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {category.questions.map((faq, faqIndex) => {
                      const globalIndex = categoryIndex * 10 + faqIndex;
                      const isOpen = openFAQ === globalIndex;

                      return (
                        <Card
                          key={faqIndex}
                          className="overflow-hidden hover:shadow-lg transition-all duration-300"
                        >
                          <button
                            className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-inset"
                            onClick={() =>
                              setOpenFAQ(isOpen ? null : globalIndex)
                            }
                          >
                            <div className="flex items-center justify-between">
                              <h4 className="text-lg font-semibold text-foreground pr-4">
                                {faq.question}
                              </h4>
                              <div className="flex-shrink-0">
                                {isOpen ? (
                                  <Minus className="w-5 h-5 text-green-600" />
                                ) : (
                                  <Plus className="w-5 h-5 text-muted-foreground" />
                                )}
                              </div>
                            </div>
                          </button>

                          <div
                            className={`overflow-hidden transition-all duration-300 ${
                              isOpen
                                ? "max-h-96 opacity-100"
                                : "max-h-0 opacity-0"
                            }`}
                          >
                            <div className="px-6 pb-6">
                              <div className="w-full h-px bg-border mb-4"></div>
                              <p className="text-muted-foreground leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact CTA */}
            <div className="text-center mt-16">
              <Card className="max-w-2xl mx-auto bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 border-green-200 dark:border-green-800">
                <CardContent className="p-8">
                  <MessageCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Still have questions?
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Can't find what you're looking for? Our customer service
                    team is here to help!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/contact">
                      <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl">
                        Contact Us
                      </Button>
                    </Link>
                    <Link href="/faq">
                      <Button
                        variant="outline"
                        className="border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-950/20 px-8 py-3 rounded-xl"
                      >
                        View All FAQs
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
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
              Join thousands of satisfied customers who have discovered the
              power of organic skincare
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop">
                <Button
                  size="lg"
                  className="bg-background text-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-background/10 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
                >
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
