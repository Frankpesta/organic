import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get all active products with pagination
export const getProducts = query({
  args: {
    limit: v.optional(v.number()),
    categoryId: v.optional(v.id("categories")),
    isFeatured: v.optional(v.boolean()),
    search: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db.query("products");

    // Apply filters
    if (args.categoryId) {
      query = query.filter((q) => q.eq(q.field("categoryId"), args.categoryId));
    }

    if (args.isFeatured !== undefined) {
      query = query.filter((q) => q.eq(q.field("isFeatured"), args.isFeatured));
    }

    if (args.search) {
      query = query.filter((q) => 
        q.or(
          q.eq(q.field("name"), args.search),
          q.eq(q.field("description"), args.search),
          q.eq(q.field("shortDescription"), args.search)
        )
      );
    }

    // Always filter for active products
    query = query.filter((q) => q.eq(q.field("isActive"), true));

    const products = await query
      .order("desc")
      .take(args.limit || 20);

    // Convert storage IDs to URLs for each product
    const productsWithUrls = await Promise.all(
      products.map(async (product) => {
        let imageUrls: (string | null)[] = [];
        
        if (product.images && product.images.length > 0) {
          // Check if images are storage IDs or URLs (backward compatibility)
          if (typeof product.images[0] === 'string' && product.images[0].startsWith('http')) {
            // Old format: direct URLs
            imageUrls = product.images as string[];
          } else {
            // New format: storage IDs
            imageUrls = await Promise.all(
              product.images.map(async (storageId) => {
                try {
                  const url = await ctx.storage.getUrl(storageId);
                  return url;
                } catch (error) {
                  console.error("Error getting URL for storage ID:", storageId, error);
                  return null;
                }
              })
            );
          }
        }
        
        return {
          ...product,
          imageUrls: imageUrls.filter(Boolean), // Remove null URLs
        };
      })
    );

    return productsWithUrls;
  },
});

// Get single product by slug
export const getProductBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const product = await ctx.db
      .query("products")
      .filter((q) => q.eq(q.field("slug"), args.slug))
      .first();

    if (!product) return null;

    // Convert storage IDs to URLs for the product
    let imageUrls: (string | null)[] = [];
    
    if (product.images && product.images.length > 0) {
      // Check if images are storage IDs or URLs (backward compatibility)
      if (typeof product.images[0] === 'string' && product.images[0].startsWith('http')) {
        // Old format: direct URLs
        imageUrls = product.images as string[];
      } else {
        // New format: storage IDs
        imageUrls = await Promise.all(
          product.images.map(async (storageId) => {
            try {
              const url = await ctx.storage.getUrl(storageId);
              return url;
            } catch (error) {
              console.error("Error getting URL for storage ID:", storageId, error);
              return null;
            }
          })
        );
      }
    }

    // Get product variants
    const variants = await ctx.db
      .query("productVariants")
      .filter((q) => q.eq(q.field("productId"), product._id))
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();

    // Get product reviews
    const reviews = await ctx.db
      .query("reviews")
      .filter((q) => q.eq(q.field("productId"), product._id))
      .filter((q) => q.eq(q.field("isApproved"), true))
      .order("desc")
      .take(10);

    // Get category
    const category = await ctx.db.get(product.categoryId);

    return {
      ...product,
      imageUrls: imageUrls.filter(Boolean), // Remove null URLs
      variants,
      reviews,
      category,
    };
  },
});

// Get featured products
export const getFeaturedProducts = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("products")
      .filter((q) => q.eq(q.field("isFeatured"), true))
      .filter((q) => q.eq(q.field("isActive"), true))
      .order("desc")
      .take(args.limit || 6);
  },
});

// Get categories
export const getCategories = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("categories")
      .filter((q) => q.eq(q.field("isActive"), true))
      .order("asc")
      .collect();
  },
});

// Admin: Create product
export const createProduct = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    shortDescription: v.string(),
    price: v.number(),
    comparePrice: v.optional(v.number()),
    sku: v.string(),
    images: v.array(v.union(v.string(), v.id("_storage"))),
    categoryId: v.id("categories"),
    isActive: v.boolean(),
    isFeatured: v.boolean(),
    inventory: v.number(),
    weight: v.optional(v.number()),
    dimensions: v.optional(v.object({
      length: v.number(),
      width: v.number(),
      height: v.number(),
    })),
    ingredients: v.array(v.string()),
    skinTypes: v.array(v.string()),
    benefits: v.array(v.string()),
    howToUse: v.optional(v.string()),
    seoTitle: v.optional(v.string()),
    seoDescription: v.optional(v.string()),
    metaKeywords: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    return await ctx.db.insert("products", {
      ...args,
      inStock: args.inventory > 0,
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Admin: Update product
export const updateProduct = mutation({
  args: {
    id: v.id("products"),
    name: v.optional(v.string()),
    slug: v.optional(v.string()),
    description: v.optional(v.string()),
    shortDescription: v.optional(v.string()),
    price: v.optional(v.number()),
    comparePrice: v.optional(v.number()),
    sku: v.optional(v.string()),
    images: v.optional(v.array(v.union(v.string(), v.id("_storage")))),
    categoryId: v.optional(v.id("categories")),
    isActive: v.optional(v.boolean()),
    isFeatured: v.optional(v.boolean()),
    inventory: v.optional(v.number()),
    weight: v.optional(v.number()),
    dimensions: v.optional(v.object({
      length: v.number(),
      width: v.number(),
      height: v.number(),
    })),
    ingredients: v.optional(v.array(v.string())),
    skinTypes: v.optional(v.array(v.string())),
    benefits: v.optional(v.array(v.string())),
    howToUse: v.optional(v.string()),
    seoTitle: v.optional(v.string()),
    seoDescription: v.optional(v.string()),
    metaKeywords: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    
    // Update inventory affects inStock status
    if (updates.inventory !== undefined) {
      (updates as any).inStock = updates.inventory > 0;
    }

    return await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

// Admin: Delete product
export const deleteProduct = mutation({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    // Soft delete by setting isActive to false
    return await ctx.db.patch(args.id, {
      isActive: false,
      updatedAt: Date.now(),
    });
  },
});

// Get product reviews
export const getProductReviews = query({
  args: {
    productId: v.id("products"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const reviews = await ctx.db
      .query("reviews")
      .filter((q) => q.eq(q.field("productId"), args.productId))
      .filter((q) => q.eq(q.field("isApproved"), true))
      .order("desc")
      .take(args.limit || 10);

    // Get user details for each review
    const reviewsWithUsers = await Promise.all(
      reviews.map(async (review: any) => {
        const user = await ctx.db.get(review.userId);
        return {
          ...review,
          user: user ? {
            firstName: (user as any).firstName,
            lastName: (user as any).lastName,
            imageUrl: (user as any).imageUrl,
          } : null,
        };
      })
    );

    return reviewsWithUsers;
  },
});

// Add product review
export const addReview = mutation({
  args: {
    productId: v.id("products"),
    userId: v.id("users"),
    rating: v.number(),
    title: v.string(),
    comment: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    return await ctx.db.insert("reviews", {
      ...args,
      isVerified: true, // Assuming user has purchased the product
      isApproved: false, // Require admin approval
      helpful: 0,
      createdAt: now,
      updatedAt: now,
    });
  },
});
