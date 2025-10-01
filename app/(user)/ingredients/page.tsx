"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Leaf, 
  Award, 
  Shield, 
  Sparkles,
  CheckCircle,
  Star,
  Filter,
  X
} from "lucide-react";

const ingredients = [
  {
    id: 1,
    name: "Hyaluronic Acid",
    type: "Hydrating",
    description: "A powerful humectant that can hold up to 1000 times its weight in water, providing intense hydration and plumping effects.",
    benefits: ["Deep hydration", "Plumps skin", "Reduces fine lines", "Improves skin texture"],
    source: "Fermented wheat",
    sustainability: "Eco-friendly fermentation process",
    image: "/ingredients/hyaluronic-acid.jpg",
    rating: 4.9,
    reviews: 1247
  },
  {
    id: 2,
    name: "Vitamin C (Ascorbic Acid)",
    type: "Antioxidant",
    description: "A potent antioxidant that brightens skin, reduces hyperpigmentation, and stimulates collagen production.",
    benefits: ["Brightens complexion", "Reduces dark spots", "Stimulates collagen", "Protects from free radicals"],
    source: "Organic citrus fruits",
    sustainability: "Sustainably sourced from organic farms",
    image: "/ingredients/vitamin-c.jpg",
    rating: 4.8,
    reviews: 892
  },
  {
    id: 3,
    name: "Niacinamide",
    type: "Skin Barrier",
    description: "A form of vitamin B3 that strengthens the skin barrier, reduces inflammation, and minimizes pore appearance.",
    benefits: ["Strengthens skin barrier", "Reduces inflammation", "Minimizes pores", "Controls oil production"],
    source: "Natural fermentation",
    sustainability: "Biodegradable and non-toxic",
    image: "/ingredients/niacinamide.jpg",
    rating: 4.7,
    reviews: 1156
  },
  {
    id: 4,
    name: "Retinol",
    type: "Anti-Aging",
    description: "A derivative of vitamin A that accelerates cell turnover, reduces fine lines, and improves skin texture.",
    benefits: ["Reduces fine lines", "Improves texture", "Increases cell turnover", "Fades age spots"],
    source: "Plant-based synthesis",
    sustainability: "Vegan and cruelty-free",
    image: "/ingredients/retinol.jpg",
    rating: 4.9,
    reviews: 743
  },
  {
    id: 5,
    name: "Ceramides",
    type: "Moisturizing",
    description: "Lipids that naturally occur in the skin barrier, helping to retain moisture and protect against environmental damage.",
    benefits: ["Locks in moisture", "Repairs skin barrier", "Protects from pollution", "Reduces sensitivity"],
    source: "Plant-derived lipids",
    sustainability: "Renewable plant sources",
    image: "/ingredients/ceramides.jpg",
    rating: 4.8,
    reviews: 634
  },
  {
    id: 6,
    name: "Peptides",
    type: "Anti-Aging",
    description: "Amino acid chains that signal skin cells to produce more collagen, resulting in firmer, more youthful-looking skin.",
    benefits: ["Stimulates collagen", "Firms skin", "Reduces wrinkles", "Improves elasticity"],
    source: "Bioengineered from natural amino acids",
    sustainability: "Lab-grown, no animal testing",
    image: "/ingredients/peptides.jpg",
    rating: 4.6,
    reviews: 521
  }
];

const types = ["All", "Hydrating", "Antioxidant", "Skin Barrier", "Anti-Aging", "Moisturizing"];

export default function IngredientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedIngredient, setSelectedIngredient] = useState<typeof ingredients[0] | null>(null);

  const filteredIngredients = ingredients.filter(ingredient => {
    const matchesSearch = ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ingredient.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "All" || ingredient.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-green-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="w-fit bg-green-100 text-green-800 border-green-200 mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Ingredient Spotlight
            </Badge>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-6">
              Pure, Potent
              <span className="block bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                Ingredients
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Discover the powerful, natural ingredients that make our products so effective. 
              Each ingredient is carefully selected for its proven benefits and sustainable sourcing.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-background border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search ingredients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 border-gray-300 rounded-xl focus:border-green-500 focus:ring-green-500"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {types.map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  onClick={() => setSelectedType(type)}
                  className={`rounded-xl px-4 py-2 ${
                    selectedType === type 
                      ? "bg-green-600 text-white" 
                      : "border-gray-300 text-gray-700 hover:bg-green-50"
                  }`}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ingredients Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredIngredients.map((ingredient) => (
              <div 
                key={ingredient.id} 
                className="bg-background rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer group"
                onClick={() => setSelectedIngredient(ingredient)}
              >
                <div className="aspect-square bg-gradient-to-br from-green-100 to-green-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Leaf className="w-16 h-16 mx-auto mb-4" />
                      <h3 className="text-xl font-bold">{ingredient.name}</h3>
                      <p className="text-green-100">{ingredient.type}</p>
                    </div>
                  </div>
                  
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-background/90 text-gray-700">
                      <Star className="w-3 h-3 mr-1" />
                      {ingredient.rating}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {ingredient.type}
                    </Badge>
                    <span className="text-sm text-gray-500">{ingredient.reviews} reviews</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-green-600 transition-colors">
                    {ingredient.name}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {ingredient.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {ingredient.benefits.slice(0, 2).map((benefit, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                        {benefit}
                      </span>
                    ))}
                    {ingredient.benefits.length > 2 && (
                      <span className="text-xs text-gray-500">
                        +{ingredient.benefits.length - 2} more
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Source: {ingredient.source}</span>
                    <Shield className="w-4 h-4 text-green-600" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredient Detail Modal */}
      {selectedIngredient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-background border-b border-gray-100 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">{selectedIngredient.name}</h2>
              <button 
                onClick={() => setSelectedIngredient(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="aspect-square bg-gradient-to-br from-green-100 to-green-200 rounded-xl mb-6 flex items-center justify-center">
                <div className="text-center">
                  <Leaf className="w-20 h-20 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-foreground">{selectedIngredient.name}</h3>
                  <p className="text-green-600 font-medium">{selectedIngredient.type}</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Description</h4>
                  <p className="text-muted-foreground">{selectedIngredient.description}</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-3">Key Benefits</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedIngredient.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Source</h4>
                    <p className="text-muted-foreground">{selectedIngredient.source}</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Sustainability</h4>
                    <p className="text-muted-foreground">{selectedIngredient.sustainability}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {selectedIngredient.rating} ({selectedIngredient.reviews} reviews)
                    </span>
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    Find Products
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Experience the Power of Nature
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Discover our products featuring these incredible ingredients
          </p>
          <Button size="lg" className="bg-background text-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl">
            Shop Now
          </Button>
        </div>
      </section>
    </div>
  );
}
