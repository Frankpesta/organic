import { Facebook, Heart, Instagram, Leaf, Twitter, Youtube } from "lucide-react";
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

          {/* Social Links */}
          <div className="flex items-center justify-center space-x-4">
            <Link
              href="https://instagram.com/helensbeautysecret"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-pink-500 transition-colors"
              aria-label="Follow us on Instagram"
            >
              <Instagram className="w-5 h-5" />
            </Link>
            <Link
              href="https://facebook.com/helensbeautysecret"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-blue-600 transition-colors"
              aria-label="Follow us on Facebook"
            >
              <Facebook className="w-5 h-5" />
            </Link>
            <Link
              href="https://twitter.com/helensbeautysecret"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-blue-400 transition-colors"
              aria-label="Follow us on Twitter"
            >
              <Twitter className="w-5 h-5" />
            </Link>
            <Link
              href="https://youtube.com/@helensbeautysecret"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-red-600 transition-colors"
              aria-label="Subscribe to our YouTube channel"
            >
              <Youtube className="w-5 h-5" />
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
