import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get admin dashboard stats
export const getDashboardStats = query({
  handler: async (ctx) => {
    const [
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
      recentOrders,
      topProducts,
    ] = await Promise.all([
      ctx.db.query("users").collect(),
      ctx.db
        .query("products")
        .filter((q) => q.eq(q.field("isActive"), true))
        .collect(),
      ctx.db.query("orders").collect(),
      ctx.db
        .query("orders")
        .filter((q) => q.eq(q.field("paymentStatus"), "paid"))
        .collect(),
      ctx.db.query("orders").order("desc").take(5),
      ctx.db.query("orderItems").collect(),
    ]);

    // Calculate revenue
    const revenue = totalRevenue.reduce((sum, order) => sum + order.total, 0);

    // Calculate order status breakdown
    const orderStats = {
      pending: totalOrders.filter((o) => o.status === "pending").length,
      processing: totalOrders.filter((o) => o.status === "processing").length,
      shipped: totalOrders.filter((o) => o.status === "shipped").length,
      delivered: totalOrders.filter((o) => o.status === "delivered").length,
      cancelled: totalOrders.filter((o) => o.status === "cancelled").length,
    };

    // Calculate top products
    const productSales = topProducts.reduce(
      (acc, item) => {
        const productId = item.productId;
        if (!acc[productId]) {
          acc[productId] = { productId, totalSold: 0, revenue: 0 };
        }
        acc[productId].totalSold += item.quantity;
        acc[productId].revenue += item.total;
        return acc;
      },
      {} as Record<
        string,
        { productId: string; totalSold: number; revenue: number }
      >,
    );

    const topProductsList = Object.values(productSales)
      .sort((a, b) => b.totalSold - a.totalSold)
      .slice(0, 5);

    // Get product details for top products
    const topProductsWithDetails = await Promise.all(
      topProductsList.map(async (item) => {
        const product = await ctx.db.get(item.productId as any);
        return {
          ...item,
          product: product && 'name' in product
            ? {
                name: (product as any).name || "Unknown Product",
                images: (product as any).images || [],
              }
            : null,
        };
      }),
    );

    // Get recent orders with user details
    const recentOrdersWithUsers = await Promise.all(
      recentOrders.map(async (order) => {
        const user = await ctx.db.get(order.userId);
        return {
          ...order,
          user: user
            ? {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
              }
            : null,
        };
      }),
    );

    return {
      stats: {
        totalUsers: totalUsers.length,
        totalProducts: totalProducts.length,
        totalOrders: totalOrders.length,
        totalRevenue: revenue,
        averageOrderValue:
          totalOrders.length > 0 ? revenue / totalOrders.length : 0,
      },
      orderStats,
      recentOrders: recentOrdersWithUsers,
      topProducts: topProductsWithDetails,
    };
  },
});

// Get all users for admin
export const getUsers = query({
  args: {
    limit: v.optional(v.number()),
    role: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db.query("users");

    if (args.role) {
      query = query.filter((q) => q.eq(q.field("role"), args.role));
    }

    return await query.order("desc").take(args.limit || 50);
  },
});

// Update user role
export const updateUserRole = mutation({
  args: {
    userId: v.id("users"),
    role: v.union(v.literal("customer"), v.literal("admin")),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.userId, {
      role: args.role,
      updatedAt: Date.now(),
    });
  },
});

// Get analytics data
export const getAnalytics = query({
  args: {
    startDate: v.string(),
    endDate: v.string(),
    metric: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const analytics = await ctx.db
      .query("analytics")
      .filter((q) => q.gte(q.field("date"), args.startDate))
      .filter((q) => q.lte(q.field("date"), args.endDate))
      .collect();

    if (args.metric) {
      return analytics.filter((a) => a.metric === args.metric);
    }

    return analytics;
  },
});

// Record analytics event
export const recordAnalytics = mutation({
  args: {
    metric: v.string(),
    value: v.number(),
    metadata: v.optional(
      v.object({
        page: v.optional(v.string()),
        productId: v.optional(v.id("products")),
        categoryId: v.optional(v.id("categories")),
        country: v.optional(v.string()),
      }),
    ),
  },
  handler: async (ctx, args) => {
    const today = new Date().toISOString().split("T")[0];

    // Check if record exists for today
    const existing = await ctx.db
      .query("analytics")
      .filter((q) => q.eq(q.field("date"), today))
      .filter((q) => q.eq(q.field("metric"), args.metric))
      .first();

    if (existing) {
      // Update existing record
      return await ctx.db.patch(existing._id, {
        value: existing.value + args.value,
      });
    } else {
      // Create new record
      return await ctx.db.insert("analytics", {
        date: today,
        metric: args.metric,
        value: args.value,
        metadata: args.metadata,
      });
    }
  },
});

// Get site settings
export const getSettings = query({
  handler: async (ctx) => {
    const settings = await ctx.db.query("settings").collect();

    return settings.reduce(
      (acc, setting) => {
        acc[setting.key] = setting.value;
        return acc;
      },
      {} as Record<string, any>,
    );
  },
});

// Update site settings
export const updateSettings = mutation({
  args: {
    key: v.string(),
    value: v.any(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("settings")
      .filter((q) => q.eq(q.field("key"), args.key))
      .first();

    if (existing) {
      return await ctx.db.patch(existing._id, {
        value: args.value,
        updatedAt: Date.now(),
      });
    } else {
      return await ctx.db.insert("settings", {
        key: args.key,
        value: args.value,
        updatedAt: Date.now(),
      });
    }
  },
});
