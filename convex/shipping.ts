import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get all active shipping methods
export const getShippingMethods = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("shippingMethods")
      .filter((q) => q.eq(q.field("isActive"), true))
      .order("asc")
      .collect();
  },
});

// Get shipping methods by country
export const getShippingMethodsByCountry = query({
  args: { countryCode: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("shippingMethods")
      .filter((q) => q.eq(q.field("isActive"), true))
      .filter((q) => 
        q.or(
          q.eq(q.field("countryCode"), args.countryCode),
          q.eq(q.field("countryCode"), "ALL")
        )
      )
      .order("asc")
      .collect();
  },
});

// Admin: Create shipping method
export const createShippingMethod = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    countryCode: v.string(), // "ALL" for international
    price: v.number(),
    freeShippingThreshold: v.optional(v.number()),
    estimatedDays: v.string(),
    isActive: v.boolean(),
    sortOrder: v.number(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    return await ctx.db.insert("shippingMethods", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Admin: Update shipping method
export const updateShippingMethod = mutation({
  args: {
    id: v.id("shippingMethods"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    countryCode: v.optional(v.string()),
    price: v.optional(v.number()),
    freeShippingThreshold: v.optional(v.number()),
    estimatedDays: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
    sortOrder: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    
    return await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

// Admin: Delete shipping method
export const deleteShippingMethod = mutation({
  args: { id: v.id("shippingMethods") },
  handler: async (ctx, args) => {
    // Soft delete by setting isActive to false
    return await ctx.db.patch(args.id, {
      isActive: false,
      updatedAt: Date.now(),
    });
  },
});

// Calculate shipping cost for an order
export const calculateShippingCost = query({
  args: {
    countryCode: v.string(),
    orderTotal: v.number(),
  },
  handler: async (ctx, args) => {
    const shippingMethods = await ctx.db
      .query("shippingMethods")
      .filter((q) => q.eq(q.field("isActive"), true))
      .filter((q) => 
        q.or(
          q.eq(q.field("countryCode"), args.countryCode),
          q.eq(q.field("countryCode"), "ALL")
        )
      )
      .order("asc")
      .collect();

    if (shippingMethods.length === 0) {
      return null;
    }

    // Find the cheapest method
    let cheapestMethod = shippingMethods[0];
    let cheapestPrice = cheapestMethod.price;

    for (const method of shippingMethods) {
      // Check if free shipping applies
      if (method.freeShippingThreshold && args.orderTotal >= method.freeShippingThreshold) {
        return {
          method: method,
          cost: 0,
          isFree: true,
        };
      }

      // Find cheapest paid option
      if (method.price < cheapestPrice) {
        cheapestMethod = method;
        cheapestPrice = method.price;
      }
    }

    return {
      method: cheapestMethod,
      cost: cheapestPrice,
      isFree: false,
    };
  },
});
