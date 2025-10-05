import { create } from "zustand";

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  comparePrice?: number;
  sku: string;
  images: string[];
  categoryId: string;
  isActive: boolean;
  isFeatured: boolean;
  inStock: boolean;
  inventory: number;
  ingredients: string[];
  skinTypes: string[];
  benefits: string[];
  howToUse?: string;
  createdAt: number;
  updatedAt: number;
}

interface ProductStore {
  products: Product[];
  featuredProducts: Product[];
  categories: any[];
  loading: boolean;
  searchTerm: string;
  selectedCategory: string;
  sortBy: string;
  viewMode: "grid" | "list";

  setProducts: (products: Product[]) => void;
  setFeaturedProducts: (products: Product[]) => void;
  setCategories: (categories: any[]) => void;
  setLoading: (loading: boolean) => void;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string) => void;
  setSortBy: (sort: string) => void;
  setViewMode: (mode: "grid" | "list") => void;

  getFilteredProducts: () => Product[];
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  featuredProducts: [],
  categories: [],
  loading: false,
  searchTerm: "",
  selectedCategory: "",
  sortBy: "featured",
  viewMode: "grid",

  setProducts: (products) => set({ products }),
  setFeaturedProducts: (products) => set({ featuredProducts: products }),
  setCategories: (categories) => set({ categories }),
  setLoading: (loading) => set({ loading }),
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  setSortBy: (sortBy) => set({ sortBy }),
  setViewMode: (viewMode) => set({ viewMode }),

  getFilteredProducts: () => {
    const { products, searchTerm, selectedCategory, sortBy } = get();

    let filtered = products.filter((product) => product.isActive);

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.ingredients.some((ingredient) =>
            ingredient.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.categoryId === selectedCategory,
      );
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered.sort((a, b) => b.createdAt - a.createdAt);
        break;
      default:
        filtered.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return b.createdAt - a.createdAt;
        });
        break;
    }

    return filtered;
  },
}));
