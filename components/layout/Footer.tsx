import { Heart, Leaf } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          {/* Brand */}
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-green-600 rounded-md flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-foreground">
              Helen's Beauty Secret
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center space-x-6 text-sm text-muted-foreground">
            <Link
              href="/about"
              className="hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="/shop"
              className="hover:text-foreground transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/contact"
              className="hover:text-foreground transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/faq"
              className="hover:text-foreground transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="/privacy"
              className="hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-foreground transition-colors"
            >
              Terms
            </Link>
          </div>

          {/* Copyright */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Heart className="w-4 h-4 text-red-500" />
            <span>&copy; 2024 Helen's Beauty Secret</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
