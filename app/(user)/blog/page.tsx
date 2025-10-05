"use client";

import {
  ArrowRight,
  Calendar,
  Clock,
  Eye,
  Filter,
  Heart,
  Search,
  Share2,
  Tag,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const blogPosts = [
  {
    id: 1,
    title:
      "The Science Behind Organic Skincare: Why Natural Ingredients Work Better",
    excerpt:
      "Discover the scientific research that proves organic ingredients are more effective than synthetic alternatives for healthy, glowing skin.",
    content: "Full article content...",
    author: "Dr. Sarah Kim",
    authorImage: "/blog/authors/sarah-kim.jpg",
    publishedAt: "2024-01-15",
    readTime: "8 min read",
    category: "Science",
    tags: ["organic", "science", "ingredients", "research"],
    image: "/blog/organic-science.jpg",
    views: 1250,
    likes: 89,
    featured: true,
  },
  {
    id: 2,
    title: "10 Essential Skincare Tips for Sensitive Skin",
    excerpt:
      "Learn how to care for sensitive skin with gentle, effective routines that won't cause irritation or breakouts.",
    content: "Full article content...",
    author: "Helen Chen",
    authorImage: "/blog/authors/helen-chen.jpg",
    publishedAt: "2024-01-12",
    readTime: "6 min read",
    category: "Tips",
    tags: ["sensitive skin", "tips", "routine", "gentle"],
    image: "/blog/sensitive-skin.jpg",
    views: 980,
    likes: 67,
    featured: false,
  },
  {
    id: 3,
    title: "Sustainable Beauty: How to Build an Eco-Friendly Skincare Routine",
    excerpt:
      "Transform your beauty routine into an environmentally conscious practice with these sustainable skincare tips and product recommendations.",
    content: "Full article content...",
    author: "Maria Rodriguez",
    authorImage: "/blog/authors/maria-rodriguez.jpg",
    publishedAt: "2024-01-10",
    readTime: "7 min read",
    category: "Sustainability",
    tags: ["sustainability", "eco-friendly", "environment", "green beauty"],
    image: "/blog/sustainable-beauty.jpg",
    views: 1100,
    likes: 92,
    featured: true,
  },
  {
    id: 4,
    title: "The Complete Guide to Anti-Aging Skincare in Your 30s",
    excerpt:
      "Start your anti-aging routine early with these proven strategies and product recommendations for women in their 30s.",
    content: "Full article content...",
    author: "Dr. Sarah Kim",
    authorImage: "/blog/authors/sarah-kim.jpg",
    publishedAt: "2024-01-08",
    readTime: "9 min read",
    category: "Anti-Aging",
    tags: ["anti-aging", "30s", "prevention", "routine"],
    image: "/blog/anti-aging-30s.jpg",
    views: 1450,
    likes: 105,
    featured: false,
  },
  {
    id: 5,
    title: "Understanding Your Skin Type: A Comprehensive Guide",
    excerpt:
      "Learn how to identify your skin type and choose the right products for optimal skin health and appearance.",
    content: "Full article content...",
    author: "Helen Chen",
    authorImage: "/blog/authors/helen-chen.jpg",
    publishedAt: "2024-01-05",
    readTime: "5 min read",
    category: "Education",
    tags: ["skin type", "guide", "identification", "products"],
    image: "/blog/skin-types.jpg",
    views: 890,
    likes: 54,
    featured: false,
  },
  {
    id: 6,
    title: "The Benefits of Vitamin C in Skincare: A Complete Breakdown",
    excerpt:
      "Explore the powerful benefits of vitamin C in skincare, from brightening to anti-aging, and learn how to use it effectively.",
    content: "Full article content...",
    author: "Dr. Sarah Kim",
    authorImage: "/blog/authors/sarah-kim.jpg",
    publishedAt: "2024-01-03",
    readTime: "6 min read",
    category: "Ingredients",
    tags: ["vitamin c", "ingredients", "brightening", "antioxidants"],
    image: "/blog/vitamin-c.jpg",
    views: 1200,
    likes: 78,
    featured: false,
  },
];

const categories = [
  "All",
  "Science",
  "Tips",
  "Sustainability",
  "Anti-Aging",
  "Education",
  "Ingredients",
];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return (
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
      case "oldest":
        return (
          new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
        );
      case "popular":
        return b.views - a.views;
      case "likes":
        return b.likes - a.likes;
      default:
        return 0;
    }
  });

  const featuredPosts = sortedPosts.filter((post) => post.featured);
  const regularPosts = sortedPosts.filter((post) => !post.featured);

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-green-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge
              variant="secondary"
              className="w-fit bg-green-100 text-green-800 border-green-200 mb-6"
            >
              <Tag className="w-4 h-4 mr-2" />
              Beauty Blog
            </Badge>

            <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-6">
              Beauty & Wellness
              <span className="block bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                Insights
              </span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Discover expert tips, ingredient deep-dives, and the latest in
              clean beauty science to help you achieve your healthiest, most
              radiant skin.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 bg-background border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 border-gray-300 rounded-xl focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-xl px-4 py-2 focus:border-green-500 focus:ring-green-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-xl px-4 py-2 focus:border-green-500 focus:ring-green-500"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="popular">Most Popular</option>
                  <option value="likes">Most Liked</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Featured Articles
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredPosts.slice(0, 2).map((post) => (
                <article
                  key={post.id}
                  className="bg-background rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  <div className="aspect-video bg-gradient-to-br from-green-100 to-green-200 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-green-600 text-white">
                        Featured
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-green-300 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-green-100 text-sm line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {post.author}
                        </p>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(post.publishedAt).toLocaleDateString()}
                          </span>
                          <Clock className="w-4 h-4 ml-2" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{post.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{post.likes}</span>
                        </div>
                      </div>

                      <Button
                        asChild
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Link href={`/blog/${post.id}`}>
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular Posts */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            All Articles
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <article
                key={post.id}
                className="bg-background rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100"
              >
                <div className="aspect-video bg-gradient-to-br from-green-100 to-green-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <Badge
                      variant="secondary"
                      className="bg-background/90 text-gray-700"
                    >
                      {post.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {post.author}
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </span>
                        <Clock className="w-3 h-3 ml-1" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{post.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-3 h-3" />
                        <span>{post.likes}</span>
                      </div>
                    </div>

                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="border-green-600 text-green-600 hover:bg-green-50"
                    >
                      <Link href={`/blog/${post.id}`}>
                        Read
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {regularPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No articles found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search terms or filters to find what you're
                looking for.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Stay Updated
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Get the latest beauty tips, ingredient insights, and exclusive
            offers delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 border-gray-300 rounded-xl focus:border-white focus:ring-white"
            />
            <Button className="bg-background text-green-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-xl">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
