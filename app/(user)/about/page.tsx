"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Leaf, 
  Award, 
  Users, 
  Heart, 
  Shield, 
  Sparkles,
  ArrowRight,
  CheckCircle,
  Star,
  Globe,
  Recycle
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-green-50 dark:from-green-950/20 via-background to-green-50 dark:to-green-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="w-fit bg-green-100 text-green-800 border-green-200 mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Our Story
            </Badge>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-6">
              Born from a
              <span className="block bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                Love for Nature
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Helen's Beauty Secret was founded on the belief that true beauty comes from nature. 
              We create premium organic skincare products that deliver real results while respecting 
              our planet and all its inhabitants.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                To revolutionize the beauty industry by creating clean, effective, and sustainable 
                skincare products that empower people to look and feel their best while protecting 
                our planet for future generations.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700">100% Organic Ingredients</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700">Cruelty-Free & Vegan</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700">Sustainable Packaging</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700">Scientifically Proven Results</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-green-100 to-green-200 rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Leaf className="w-24 h-24 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Pure Nature</h3>
                    <p className="text-green-100">Handpicked ingredients</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-xl text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Leaf className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Purity</h3>
              <p className="text-muted-foreground">
                We use only the purest, most potent organic ingredients, 
                carefully sourced from trusted suppliers around the world.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Heart className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Compassion</h3>
              <p className="text-muted-foreground">
                We believe in cruelty-free beauty and ethical practices that 
                respect all living beings and the environment.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Recycle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Sustainability</h3>
              <p className="text-muted-foreground">
                We're committed to sustainable practices, from ingredient 
                sourcing to packaging, to protect our planet for future generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-muted-foreground">
              The passionate people behind Helen's Beauty Secret
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-32 h-32 bg-gradient-to-br from-green-100 to-green-200 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-105 transition-transform">
                <div className="w-24 h-24 bg-green-300 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-800">H</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Helen Chen</h3>
              <p className="text-green-600 font-medium mb-2">Founder & CEO</p>
              <p className="text-muted-foreground text-sm">
                A passionate advocate for clean beauty with over 15 years of experience 
                in cosmetic chemistry and sustainable skincare.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-32 h-32 bg-gradient-to-br from-green-100 to-green-200 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-105 transition-transform">
                <div className="w-24 h-24 bg-green-300 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-800">S</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Dr. Sarah Kim</h3>
              <p className="text-green-600 font-medium mb-2">Head of Research</p>
              <p className="text-muted-foreground text-sm">
                A dermatologist and cosmetic scientist who ensures our products 
                are both safe and effective through rigorous testing.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-32 h-32 bg-gradient-to-br from-green-100 to-green-200 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-105 transition-transform">
                <div className="w-24 h-24 bg-green-300 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-800">M</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Maria Rodriguez</h3>
              <p className="text-green-600 font-medium mb-2">Sustainability Director</p>
              <p className="text-muted-foreground text-sm">
                Leads our sustainability initiatives and ensures our supply chain 
                meets the highest ethical and environmental standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Our Impact
            </h2>
            <p className="text-xl text-green-100">
              Making a difference, one product at a time
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">50K+</div>
              <div className="text-green-100">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">100%</div>
              <div className="text-green-100">Organic Ingredients</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">0</div>
              <div className="text-green-100">Animal Testing</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">95%</div>
              <div className="text-green-100">Recyclable Packaging</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Be part of the clean beauty revolution. Discover products that are good 
            for you and good for the planet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold rounded-xl">
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 text-lg font-semibold rounded-xl">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
