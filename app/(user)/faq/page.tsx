"use client";

import {
  ChevronDown,
  ChevronUp,
  CreditCard,
  HelpCircle,
  Leaf,
  Package,
  RotateCcw,
  Search,
  Shield,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const faqCategories = [
  {
    id: "shipping",
    title: "Shipping & Delivery",
    icon: Truck,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "returns",
    title: "Returns & Exchanges",
    icon: RotateCcw,
    color: "bg-green-100 text-green-600",
  },
  {
    id: "products",
    title: "Products",
    icon: Package,
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: "ingredients",
    title: "Ingredients & Safety",
    icon: Leaf,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    id: "payment",
    title: "Payment & Billing",
    icon: CreditCard,
    color: "bg-red-100 text-red-600",
  },
  {
    id: "account",
    title: "Account & Orders",
    icon: Shield,
    color: "bg-gray-100 text-muted-foreground",
  },
];

const faqs = {
  shipping: [
    {
      question: "How long does shipping take?",
      answer:
        "We offer free standard shipping (5-7 business days) on orders over $50. Express shipping (2-3 business days) is available for $15. International shipping takes 7-14 business days depending on the destination.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes! We ship to over 50 countries worldwide. International shipping rates are calculated at checkout based on your location. All international orders are subject to local customs duties and taxes.",
    },
    {
      question: "Can I track my order?",
      answer:
        "Absolutely! Once your order ships, you'll receive a tracking number via email. You can track your package in real-time through our website or the carrier's website.",
    },
    {
      question: "What if my package is damaged or lost?",
      answer:
        "We're sorry to hear that! Please contact our customer service team immediately with your order number and photos of the damage. We'll send a replacement at no cost to you.",
    },
  ],
  returns: [
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day money-back guarantee on all products. Items must be in their original condition with at least 50% of the product remaining. We'll provide a full refund including shipping costs.",
    },
    {
      question: "How do I return an item?",
      answer:
        "Simply contact our customer service team to initiate a return. We'll provide you with a prepaid return label and instructions. You can also start a return through your account dashboard.",
    },
    {
      question: "Can I exchange a product for a different one?",
      answer:
        "Yes! We offer free exchanges within 30 days of purchase. Contact our customer service team to arrange an exchange. You'll only pay the difference if the new item costs more.",
    },
    {
      question: "How long does it take to process a return?",
      answer:
        "Once we receive your return, we'll process it within 2-3 business days. Refunds will appear on your original payment method within 5-10 business days.",
    },
  ],
  products: [
    {
      question: "Are your products organic?",
      answer:
        "Yes! All our products are made with 100% organic ingredients and are certified organic by leading certification bodies. We never use synthetic chemicals, parabens, or sulfates.",
    },
    {
      question: "Are your products cruelty-free?",
      answer:
        "Absolutely! We are certified cruelty-free by Leaping Bunny and never test our products on animals. We also don't sell in countries that require animal testing.",
    },
    {
      question: "How long do products last?",
      answer:
        "Our products have a shelf life of 24-36 months when stored properly. Each product has a PAO (Period After Opening) symbol indicating how long it's good after opening, typically 12 months.",
    },
    {
      question: "Can I use these products if I have sensitive skin?",
      answer:
        "Yes! Our products are formulated for all skin types, including sensitive skin. However, we recommend doing a patch test before using any new product. If you have specific concerns, consult with a dermatologist.",
    },
  ],
  ingredients: [
    {
      question: "What ingredients do you avoid?",
      answer:
        "We avoid over 1,500 potentially harmful ingredients including parabens, sulfates, phthalates, synthetic fragrances, and artificial colors. Our products are free from all known skin irritants and toxins.",
    },
    {
      question: "Are your products safe for pregnant women?",
      answer:
        "Our products are generally safe for pregnant women, but we recommend consulting with your healthcare provider before using any new skincare products during pregnancy. Avoid products with retinoids and high concentrations of essential oils.",
    },
    {
      question: "Do you use essential oils?",
      answer:
        "We use only pure, therapeutic-grade essential oils in small, safe concentrations. All essential oils are properly diluted and tested for skin sensitivity. If you're sensitive to fragrances, we offer fragrance-free options.",
    },
    {
      question: "Are your products vegan?",
      answer:
        "Yes! All our products are 100% vegan and contain no animal-derived ingredients. We use plant-based alternatives for all traditional animal-based cosmetic ingredients.",
    },
  ],
  payment: [
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Shop Pay. All payments are processed securely through our encrypted payment system.",
    },
    {
      question: "Is my payment information secure?",
      answer:
        "Yes! We use industry-standard SSL encryption and never store your payment information on our servers. All transactions are processed through secure, PCI-compliant payment processors.",
    },
    {
      question: "Do you offer payment plans?",
      answer:
        "Yes! We offer Klarna and Afterpay payment plans for orders over $35. You can split your purchase into 4 interest-free payments. Select this option at checkout.",
    },
    {
      question: "Can I use a discount code with other promotions?",
      answer:
        "Discount codes cannot be combined with other promotions unless specifically stated. However, you can use a discount code with our free shipping offer on orders over $50.",
    },
  ],
  account: [
    {
      question: "How do I create an account?",
      answer:
        "Creating an account is easy! Click 'Sign Up' in the top right corner, enter your email and password, and verify your email address. You can also create an account during checkout.",
    },
    {
      question: "How do I reset my password?",
      answer:
        "Click 'Forgot Password' on the sign-in page and enter your email address. We'll send you a secure link to reset your password. The link expires after 24 hours for security.",
    },
    {
      question: "Can I change my order after placing it?",
      answer:
        "You can modify or cancel your order within 1 hour of placing it if it hasn't been processed yet. After that, please contact our customer service team for assistance.",
    },
    {
      question: "How do I update my account information?",
      answer:
        "Log into your account and go to 'Account Settings' to update your personal information, shipping addresses, and payment methods. Changes are saved automatically.",
    },
  ],
};

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("shipping");
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index],
    );
  };

  const filteredFAQs = faqs[selectedCategory as keyof typeof faqs].filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
              <HelpCircle className="w-4 h-4 mr-2" />
              Help Center
            </Badge>

            <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-6">
              Frequently Asked
              <span className="block bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                Questions
              </span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Find answers to common questions about our products, shipping,
              returns, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="py-12 bg-background border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-4 text-lg border-gray-300 rounded-xl focus:border-green-500 focus:ring-green-500"
            />
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {faqCategories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 rounded-xl text-center transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-green-600 text-white shadow-lg"
                      : "bg-background text-gray-700 hover:bg-green-50 hover:text-green-600"
                  }`}
                >
                  <Icon className="w-8 h-8 mx-auto mb-2" />
                  <span className="text-sm font-medium">{category.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-foreground pr-4">
                    {faq.question}
                  </span>
                  {openItems.includes(index) ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>

                {openItems.includes(index) && (
                  <div className="px-6 pb-4">
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No results found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try searching with different keywords or browse our categories
                above.
              </p>
              <Button
                onClick={() => setSearchTerm("")}
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50"
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Still Need Help */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Still Need Help?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Can't find what you're looking for? Our customer service team is
            here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-background text-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl"
            >
              Contact Support
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-background/10 px-8 py-4 text-lg font-semibold rounded-xl"
            >
              Start Live Chat
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
