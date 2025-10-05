"use client";

import { useQuery } from "convex/react";
import {
  Filter,
  Grid,
  Heart,
  List,
  Search,
  ShoppingCart,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WishlistButton } from "@/components/WishlistButton";
import { api } from "@/convex/_generated/api";
import { useCartStore } from "@/lib/stores/cartStore";
import { useProductStore } from "@/lib/stores/productStore";

export default function ShopPage() {
  const {
    products,
    categories,
    loading,
    searchTerm,
    selectedCategory,
    sortBy,
    viewMode,
    setProducts,
    setCategories,
    setLoading,
    setSearchTerm,
    setSelectedCategory,
    setSortBy,
    setViewMode,
    getFilteredProducts,
  } = useProductStore();

  const { getTotalItems, toggleCart } = useCartStore();

  const productsQuery = useQuery(api.products.getProducts, {
    search: searchTerm || undefined,
    categoryId:
      selectedCategory && selectedCategory !== "all"
        ? (selectedCategory as any)
        : undefined,
  });

  const categoriesQuery = useQuery(api.products.getCategories);

  useEffect(() => {
    if (productsQuery) {
      setProducts(productsQuery);
    }
  }, [productsQuery, setProducts]);

  useEffect(() => {
    if (categoriesQuery) {
      setCategories(categoriesQuery);
    }
  }, [categoriesQuery, setCategories]);

  const filteredProducts = getFilteredProducts();

  if (loading || !products || !categories) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Page Header */}
      <div className="bg-muted/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Shop</h1>
          <p className="text-lg text-muted-foreground">
            Discover our collection of organic skincare products
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-card border-b py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product._id} className="group">
                <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-4 relative">
                  {(product as any).imageUrls &&
                  (product as any).imageUrls.length > 0 ? (
                    <Image
                      src={(product as any).imageUrls[0]}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-muted-foreground">No Image</div>
                    </div>
                  )}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <WishlistButton
                      productId={product._id}
                      name={product.name}
                      price={product.price}
                      image={(product as any).imageUrls?.[0] || ""}
                      slug={product.slug}
                      size="sm"
                      variant="outline"
                      className="rounded-full bg-background/80 backdrop-blur-sm"
                    />
                  </div>
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white font-semibold">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-green-600 transition-colors">
                    <Link href={`/shop/${product.slug}`}>{product.name}</Link>
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {product.shortDescription}
                  </p>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">(4.8)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-foreground">
                        ${product.price}
                      </span>
                      {product.comparePrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.comparePrice}
                        </span>
                      )}
                    </div>
                    <Button
                      size="sm"
                      className="bg-green-500 hover:bg-green-600 text-white"
                      disabled={!product.inStock}
                      onClick={() => {
                        useCartStore.getState().addItem({
                          productId: product._id,
                          name: product.name,
                          price: product.price,
                          image: (product as any).imageUrls?.[0] || "",
                          quantity: 1,
                        });
                      }}
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="flex items-center space-x-6 p-6 border border-border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                  {(product as any).imageUrls &&
                  (product as any).imageUrls.length > 0 ? (
                    <Image
                      src={(product as any).imageUrls[0]}
                      alt={product.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-muted-foreground">No Image</div>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    <Link
                      href={`/shop/${product.slug}`}
                      className="hover:text-green-600"
                    >
                      {product.name}
                    </Link>
                  </h3>
                  <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
                    {product.shortDescription}
                  </p>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">(4.8)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-foreground">
                      ${product.price}
                    </span>
                    {product.comparePrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.comparePrice}
                      </span>
                    )}
                    <span
                      className={`text-sm px-2 py-1 rounded-full ${
                        product.inStock
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline" className="rounded-full">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    className="bg-green-500 hover:bg-green-600 text-white"
                    disabled={!product.inStock}
                    onClick={() => {
                      useCartStore.getState().addItem({
                        productId: product._id,
                        name: product.name,
                        price: product.price,
                        image: (product as any).imageUrls?.[0] || "",
                        quantity: 1,
                      });
                    }}
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No products found
            </h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filter criteria.
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("");
              }}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
