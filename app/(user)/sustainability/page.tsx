"use client";

import {
  ArrowRight,
  Award,
  CheckCircle,
  Droplets,
  Globe,
  Heart,
  Leaf,
  Recycle,
  Shield,
  Sparkles,
  TreePine,
  Users,
} from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function SustainabilityPage() {
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
              <Sparkles className="w-4 h-4 mr-2" />
              Our Commitment
            </Badge>

            <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-6">
              Caring for Our
              <span className="block bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                Planet
              </span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              We believe that true beauty comes from harmony with nature. Our
              commitment to sustainability goes beyond just our products – it's
              woven into every aspect of our business.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Our Environmental Impact
            </h2>
            <p className="text-xl text-muted-foreground">
              Measurable progress toward a more sustainable future
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Recycle className="w-10 h-10 text-green-600" />
              </div>
              <div className="text-4xl font-bold text-green-600 mb-2">95%</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Recyclable Packaging
              </h3>
              <p className="text-muted-foreground">
                All our packaging is designed to be recycled or composted
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <TreePine className="w-10 h-10 text-green-600" />
              </div>
              <div className="text-4xl font-bold text-green-600 mb-2">
                10,000+
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Trees Planted
              </h3>
              <p className="text-muted-foreground">
                Through our reforestation partnership program
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Droplets className="w-10 h-10 text-green-600" />
              </div>
              <div className="text-4xl font-bold text-green-600 mb-2">50%</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Water Reduction
              </h3>
              <p className="text-muted-foreground">
                Less water used in our manufacturing process
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-10 h-10 text-green-600" />
              </div>
              <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Carbon Neutral
              </h3>
              <p className="text-muted-foreground">
                All operations are carbon neutral through offsets
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainable Practices */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Our Sustainable Practices
            </h2>
            <p className="text-xl text-muted-foreground">
              How we're making a positive impact on the environment
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-6">
                Clean Ingredients
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                We source only the purest, most sustainable ingredients from
                certified organic farms and suppliers who share our commitment
                to environmental responsibility.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700">
                    100% organic and natural ingredients
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700">
                    Fair trade certified suppliers
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700">
                    No harmful chemicals or toxins
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700">
                    Biodegradable formulations
                  </span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-green-100 to-green-200 rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Leaf className="w-24 h-24 mx-auto mb-4" />
                    <h4 className="text-2xl font-bold mb-2">Pure Nature</h4>
                    <p className="text-green-100">Sustainably sourced</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="aspect-square bg-gradient-to-br from-green-100 to-green-200 rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Recycle className="w-24 h-24 mx-auto mb-4" />
                    <h4 className="text-2xl font-bold mb-2">Eco Packaging</h4>
                    <p className="text-green-100">100% recyclable</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h3 className="text-3xl font-bold text-foreground mb-6">
                Eco-Friendly Packaging
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                Our packaging is designed with the environment in mind, using
                recycled materials and innovative designs that minimize waste
                while protecting our products.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700">
                    Recycled and recyclable materials
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700">
                    Minimal packaging design
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700">
                    Biodegradable shipping materials
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700">
                    Refillable product containers
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Our Certifications
            </h2>
            <p className="text-xl text-muted-foreground">
              Recognized by leading environmental and ethical organizations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-24 h-24 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Award className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                USDA Organic
              </h3>
              <p className="text-muted-foreground">
                Certified organic by the United States Department of Agriculture
              </p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Leaping Bunny
              </h3>
              <p className="text-muted-foreground">
                Certified cruelty-free by the Coalition for Consumer Information
                on Cosmetics
              </p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">B Corp</h3>
              <p className="text-muted-foreground">
                Certified B Corporation meeting the highest standards of social
                and environmental performance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Future Goals */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Our 2030 Goals
            </h2>
            <p className="text-xl text-green-100">
              Ambitious targets for a more sustainable future
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">100%</div>
              <div className="text-green-100 text-lg font-semibold mb-2">
                Zero Waste
              </div>
              <div className="text-green-200">
                Achieve zero waste to landfill across all operations
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">50%</div>
              <div className="text-green-100 text-lg font-semibold mb-2">
                Carbon Reduction
              </div>
              <div className="text-green-200">
                Reduce carbon footprint by 50% from 2020 baseline
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">1M</div>
              <div className="text-green-100 text-lg font-semibold mb-2">
                Trees Planted
              </div>
              <div className="text-green-200">
                Plant 1 million trees through our reforestation program
              </div>
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
            Together, we can create a more beautiful and sustainable world.
            Every purchase supports our environmental initiatives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold rounded-xl"
            >
              Shop Sustainable Beauty
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 text-lg font-semibold rounded-xl"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
