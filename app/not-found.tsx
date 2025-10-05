"use client";

import { ArrowLeft, HelpCircle, Home, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-green-600 mb-4">404</div>
          <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-16 h-16 text-green-600" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for. It might have
          been moved, deleted, or doesn't exist.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-semibold rounded-xl"
            >
              <Link href="/">
                <Home className="w-5 h-5 mr-2" />
                Go Home
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 text-lg font-semibold rounded-xl"
            >
              <Link href="/shop">
                <Search className="w-5 h-5 mr-2" />
                Browse Products
              </Link>
            </Button>
          </div>

          <div className="pt-4">
            <Button
              variant="ghost"
              onClick={() => window.history.back()}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Need Help?
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              <Link
                href="/faq"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Check our FAQ
              </Link>{" "}
              for common questions
            </p>
            <p>
              <Link
                href="/contact"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Contact Support
              </Link>{" "}
              if you need assistance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
