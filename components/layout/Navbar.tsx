"use client";

import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import {
  Heart,
  Leaf,
  Menu,
  Search,
  Settings,
  ShoppingCart,
  User,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCartStore } from "@/lib/stores/cartStore";
import { useWishlistStore } from "@/lib/stores/wishlistStore";

export function Navbar() {
  const { getTotalItems, toggleCart } = useCartStore();
  const { getWishlistCount } = useWishlistStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Set mounted state to prevent hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-800 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground group-hover:text-green-600 transition-colors">
              Helen's Beauty
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link
              href="/shop"
              className="text-muted-foreground hover:text-foreground font-medium transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="text-muted-foreground hover:text-foreground font-medium transition-colors"
            >
              About
            </Link>
            <Link
              href="/ingredients"
              className="text-muted-foreground hover:text-foreground font-medium transition-colors"
            >
              Ingredients
            </Link>
            <Link
              href="/sustainability"
              className="text-muted-foreground hover:text-foreground font-medium transition-colors"
            >
              Sustainability
            </Link>
            <Link
              href="/blog"
              className="text-muted-foreground hover:text-foreground font-medium transition-colors"
            >
              Blog
            </Link>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
              <Search className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleCart}
              className="h-9 w-9 p-0 relative"
            >
              <ShoppingCart className="h-4 w-4" />
              {isMounted && getTotalItems() > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                  {getTotalItems()}
                </Badge>
              )}
            </Button>

            {/* Wishlist Button */}
            <Link href="/wishlist">
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 relative"
                title="Wishlist"
              >
                <Heart className="h-4 w-4" />
                {isMounted && getWishlistCount() > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                    {getWishlistCount()}
                  </Badge>
                )}
              </Button>
            </Link>

            <ThemeToggle />

            {/* User Menu */}
            <div className="flex items-center space-x-2">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="hidden sm:flex">
                  Dashboard
                </Button>
              </Link>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8",
                  },
                }}
              />
            </div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden h-9 w-9 p-0"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-6 mt-6">
                  <Link
                    href="/shop"
                    className="text-lg font-medium hover:text-green-600"
                  >
                    Shop
                  </Link>
                  <Link
                    href="/about"
                    className="text-lg font-medium hover:text-green-600"
                  >
                    About
                  </Link>
                  <Link
                    href="/ingredients"
                    className="text-lg font-medium hover:text-green-600"
                  >
                    Ingredients
                  </Link>
                  <Link
                    href="/sustainability"
                    className="text-lg font-medium hover:text-green-600"
                  >
                    Sustainability
                  </Link>
                  <Link
                    href="/blog"
                    className="text-lg font-medium hover:text-green-600"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/dashboard"
                    className="text-lg font-medium hover:text-green-600"
                  >
                    Dashboard
                  </Link>

                  <div className="border-t pt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Theme</span>
                      <ThemeToggle />
                    </div>
                    <div className="flex items-center space-x-2">
                      <SignInButton mode="modal">
                        <Button variant="outline" size="sm">
                          Sign In
                        </Button>
                      </SignInButton>
                      <SignUpButton mode="modal">
                        <Button size="sm">Sign Up</Button>
                      </SignUpButton>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
