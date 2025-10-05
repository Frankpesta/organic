import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get user's cart
export const getCart = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const cartItems = await ctx.db
      .query("cartItems")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();

    // Get product details for each cart item
    const cartWithProducts = await Promise.all(
      cartItems.map(async (item) => {
        const [product, variant] = await Promise.all([
          ctx.db.get(item.productId),
          item.variantId ? ctx.db.get(item.variantId) : null,
        ]);

        if (!product) return null;

        return {
          ...item,
          product: {
            _id: product._id,
            name: product.name,
            slug: product.slug,
            images: product.images,
            price: product.price,
            inStock: product.inStock,
            inventory: product.inventory,
          },
          variant: variant
            ? {
                _id: variant._id,
                name: variant.name,
                price: variant.price,
                attributes: variant.attributes,
              }
            : null,
        };
      }),
    );

    return cartWithProducts.filter(Boolean);
  },
});

// Add item to cart
export const addToCart = mutation({
  args: {
    userId: v.id("users"),
    productId: v.id("products"),
    variantId: v.optional(v.id("productVariants")),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    // Check if item already exists in cart
    const existingItem = await ctx.db
      .query("cartItems")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .filter((q) => q.eq(q.field("productId"), args.productId))
      .filter((q) => q.eq(q.field("variantId"), args.variantId))
      .first();

    if (existingItem) {
      // Update quantity
      return await ctx.db.patch(existingItem._id, {
        quantity: existingItem.quantity + args.quantity,
        updatedAt: Date.now(),
      });
    } else {
      // Add new item
      return await ctx.db.insert("cartItems", {
        userId: args.userId,
        productId: args.productId,
        variantId: args.variantId,
        quantity: args.quantity,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    }
  },
});

// Update cart item quantity
export const updateCartItemQuantity = mutation({
  args: {
    cartItemId: v.id("cartItems"),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    if (args.quantity <= 0) {
      // Remove item if quantity is 0 or negative
      return await ctx.db.delete(args.cartItemId);
    }

    return await ctx.db.patch(args.cartItemId, {
      quantity: args.quantity,
      updatedAt: Date.now(),
    });
  },
});

// Remove item from cart
export const removeFromCart = mutation({
  args: { cartItemId: v.id("cartItems") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.cartItemId);
  },
});

// Clear user's cart
export const clearCart = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const cartItems = await ctx.db
      .query("cartItems")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();

    await Promise.all(cartItems.map((item) => ctx.db.delete(item._id)));

    return true;
  },
});

// Get cart count
export const getCartCount = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const cartItems = await ctx.db
      .query("cartItems")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();

    return cartItems.reduce((total, item) => total + item.quantity, 0);
  },
});
