import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireAdmin } from "./auth";

// Get all categories (public)
export const getCategories = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("categories")
      .filter((q) => q.eq(q.field("isActive"), true))
      .order("asc", (q) => q.field("sortOrder"))
      .collect();
  },
});

// Get all categories for admin (including inactive)
export const getAllCategories = query({
  handler: async (ctx) => {
    await requireAdmin(ctx);
    
    return await ctx.db
      .query("categories")
      .order("asc", (q) => q.field("sortOrder"))
      .collect();
  },
});

// Get category by ID
export const getCategoryById = query({
  args: { id: v.id("categories") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Get category by slug
export const getCategoryBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("categories")
      .filter((q) => q.eq(q.field("slug"), args.slug))
      .first();
  },
});

// Create category (admin only)
export const createCategory = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    image: v.optional(v.string()),
    isActive: v.boolean(),
    sortOrder: v.number(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    // Check if slug already exists
    const existingCategory = await ctx.db
      .query("categories")
      .filter((q) => q.eq(q.field("slug"), args.slug))
      .first();

    if (existingCategory) {
      throw new Error("A category with this slug already exists");
    }

    const now = Date.now();
    
    return await ctx.db.insert("categories", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Update category (admin only)
export const updateCategory = mutation({
  args: {
    id: v.id("categories"),
    name: v.optional(v.string()),
    slug: v.optional(v.string()),
    description: v.optional(v.string()),
    image: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
    sortOrder: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    const { id, ...updates } = args;

    // If updating slug, check if it already exists
    if (updates.slug) {
      const existingCategory = await ctx.db
        .query("categories")
        .filter((q) => q.eq(q.field("slug"), updates.slug))
        .first();

      if (existingCategory && existingCategory._id !== id) {
        throw new Error("A category with this slug already exists");
      }
    }

    return await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

// Delete category (admin only)
export const deleteCategory = mutation({
  args: { id: v.id("categories") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    // Check if category has products
    const productsWithCategory = await ctx.db
      .query("products")
      .filter((q) => q.eq(q.field("categoryId"), args.id))
      .first();

    if (productsWithCategory) {
      throw new Error("Cannot delete category that has products. Please reassign or delete the products first.");
    }

    return await ctx.db.delete(args.id);
  },
});

// Get category stats
export const getCategoryStats = query({
  args: { categoryId: v.id("categories") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    const products = await ctx.db
      .query("products")
      .filter((q) => q.eq(q.field("categoryId"), args.categoryId))
      .collect();

    const activeProducts = products.filter(p => p.isActive);
    const totalInventory = products.reduce((sum, p) => sum + p.inventory, 0);

    return {
      totalProducts: products.length,
      activeProducts: activeProducts.length,
      totalInventory,
      averagePrice: products.length > 0 
        ? products.reduce((sum, p) => sum + p.price, 0) / products.length 
        : 0,
    };
  },
});