import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUser } from "./auth";

// Get user's orders
export const getUserOrders = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const orders = await ctx.db
      .query("orders")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .order("desc")
      .collect();

    // Get order items for each order
    const ordersWithItems = await Promise.all(
      orders.map(async (order) => {
        const items = await ctx.db
          .query("orderItems")
          .filter((q) => q.eq(q.field("orderId"), order._id))
          .collect();

        return {
          ...order,
          items,
        };
      })
    );

    return ordersWithItems;
  },
});

// Get current user's orders (no args needed)
export const getCurrentUserOrders = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      return [];
    }

    const orders = await ctx.db
      .query("orders")
      .filter((q) => q.eq(q.field("userId"), user._id))
      .order("desc")
      .collect();

    // Get product details for each order
    const ordersWithProducts = await Promise.all(
      orders.map(async (order) => {
        const itemsWithProducts = await Promise.all(
          order.items.map(async (item) => {
            const product = await ctx.db.get(item.productId);
            return {
              ...item,
              product: product ? {
                name: product.name,
                image: product.images?.[0] || null,
                slug: product.slug,
              } : null,
            };
          })
        );

        return {
          ...order,
          items: itemsWithProducts,
        };
      })
    );

    return ordersWithProducts;
  },
});

// Get single order by order number
export const getOrderByNumber = query({
  args: { orderNumber: v.string() },
  handler: async (ctx, args) => {
    const order = await ctx.db
      .query("orders")
      .filter((q) => q.eq(q.field("orderNumber"), args.orderNumber))
      .first();

    if (!order) return null;

    const items = await ctx.db
      .query("orderItems")
      .filter((q) => q.eq(q.field("orderId"), order._id))
      .collect();

    return {
      ...order,
      items,
    };
  },
});

// Create order
export const createOrder = mutation({
  args: {
    userId: v.id("users"),
    items: v.array(v.object({
      productId: v.id("products"),
      variantId: v.optional(v.id("productVariants")),
      quantity: v.number(),
      price: v.number(),
    })),
    shippingAddress: v.object({
      firstName: v.string(),
      lastName: v.string(),
      company: v.optional(v.string()),
      address1: v.string(),
      address2: v.optional(v.string()),
      city: v.string(),
      state: v.string(),
      postalCode: v.string(),
      country: v.string(),
      phone: v.optional(v.string()),
    }),
    billingAddress: v.object({
      firstName: v.string(),
      lastName: v.string(),
      company: v.optional(v.string()),
      address1: v.string(),
      address2: v.optional(v.string()),
      city: v.string(),
      state: v.string(),
      postalCode: v.string(),
      country: v.string(),
      phone: v.optional(v.string()),
    }),
    subtotal: v.number(),
    tax: v.number(),
    shipping: v.number(),
    discount: v.number(),
    total: v.number(),
    currency: v.string(),
    exchangeRate: v.optional(v.number()),
    deliveryMethodId: v.optional(v.id("shippingMethods")),
    stripePaymentIntentId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const orderNumber = `HBS-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create the order
    const orderId = await ctx.db.insert("orders", {
      orderNumber,
      userId: args.userId,
      status: "pending",
      paymentStatus: "pending",
      subtotal: args.subtotal,
      tax: args.tax,
      shipping: args.shipping,
      discount: args.discount,
      total: args.total,
      currency: args.currency,
      exchangeRate: args.exchangeRate,
      deliveryMethodId: args.deliveryMethodId,
      shippingAddress: args.shippingAddress,
      billingAddress: args.billingAddress,
      stripePaymentIntentId: args.stripePaymentIntentId,
      createdAt: now,
      updatedAt: now,
    });

    // Create order items
    for (const item of args.items) {
      const product = await ctx.db.get(item.productId);
      if (!product) continue;

      const variant = item.variantId ? await ctx.db.get(item.variantId) : null;

      await ctx.db.insert("orderItems", {
        orderId,
        productId: item.productId,
        variantId: item.variantId,
        productName: product.name,
        productSku: product.sku,
        variantName: variant?.name,
        price: item.price,
        quantity: item.quantity,
        total: item.price * item.quantity,
      });
    }

    return orderId;
  },
});

// Update order status (Admin)
export const updateOrderStatus = mutation({
  args: {
    orderId: v.id("orders"),
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("shipped"),
      v.literal("delivered"),
      v.literal("cancelled"),
      v.literal("refunded")
    ),
    trackingNumber: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.orderId, {
      status: args.status,
      trackingNumber: args.trackingNumber,
      notes: args.notes,
      updatedAt: Date.now(),
    });
  },
});

// Update payment status
export const updatePaymentStatus = mutation({
  args: {
    orderId: v.id("orders"),
    paymentStatus: v.union(
      v.literal("pending"),
      v.literal("paid"),
      v.literal("failed"),
      v.literal("refunded")
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.orderId, {
      paymentStatus: args.paymentStatus,
      updatedAt: Date.now(),
    });
  },
});

// Admin: Get all orders with filters
export const getAdminOrders = query({
  args: {
    status: v.optional(v.string()),
    paymentStatus: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db.query("orders");

    if (args.status) {
      query = query.filter((q) => q.eq(q.field("status"), args.status));
    }

    if (args.paymentStatus) {
      query = query.filter((q) => q.eq(q.field("paymentStatus"), args.paymentStatus));
    }

    const orders = await query
      .order("desc")
      .take(args.limit || 50);

    // Get order items, user details, and delivery method for each order
    const ordersWithDetails = await Promise.all(
      orders.map(async (order) => {
        const [items, user, deliveryMethod] = await Promise.all([
          ctx.db
            .query("orderItems")
            .filter((q) => q.eq(q.field("orderId"), order._id))
            .collect(),
          ctx.db.get(order.userId),
          order.deliveryMethodId ? ctx.db.get(order.deliveryMethodId) : null,
        ]);

        return {
          ...order,
          items,
          user: user ? {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          } : null,
          deliveryMethod: deliveryMethod ? {
            name: deliveryMethod.name,
            estimatedDays: deliveryMethod.estimatedDays,
            price: deliveryMethod.price,
          } : null,
        };
      })
    );

    return ordersWithDetails;
  },
});

// Get order statistics for admin dashboard
export const getOrderStats = query({
  handler: async (ctx) => {
    const orders = await ctx.db.query("orders").collect();

    const stats = {
      total: orders.length,
      pending: orders.filter(o => o.status === "pending").length,
      processing: orders.filter(o => o.status === "processing").length,
      shipped: orders.filter(o => o.status === "shipped").length,
      delivered: orders.filter(o => o.status === "delivered").length,
      cancelled: orders.filter(o => o.status === "cancelled").length,
      refunded: orders.filter(o => o.status === "refunded").length,
      totalRevenue: orders
        .filter(o => o.paymentStatus === "paid")
        .reduce((sum, o) => sum + o.total, 0),
      averageOrderValue: 0,
    };

    const paidOrders = orders.filter(o => o.paymentStatus === "paid");
    if (paidOrders.length > 0) {
      stats.averageOrderValue = stats.totalRevenue / paidOrders.length;
    }

    return stats;
  },
});

// Find order by Stripe payment intent ID
export const getOrderByPaymentIntentId = query({
  args: { paymentIntentId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("orders")
      .filter((q) => q.eq(q.field("stripePaymentIntentId"), args.paymentIntentId))
      .first();
  },
});

// Find order by Stripe session ID (for checkout sessions)
export const getOrderBySessionId = query({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    const order = await ctx.db
      .query("orders")
      .filter((q) => q.eq(q.field("stripeSessionId"), args.sessionId))
      .first();

    if (!order) return null;

    // Get delivery method details if deliveryMethodId exists
    let deliveryMethod = null;
    if (order.deliveryMethodId) {
      deliveryMethod = await ctx.db.get(order.deliveryMethodId);
    }

    return {
      ...order,
      deliveryMethod,
    };
  },
});

// Update order with Stripe session ID
export const updateOrderWithSessionId = mutation({
  args: {
    orderId: v.id("orders"),
    sessionId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.orderId, {
      stripeSessionId: args.sessionId,
      updatedAt: Date.now(),
    });
  },
});

// Process successful payment
export const processSuccessfulPayment = mutation({
  args: {
    paymentIntentId: v.string(),
    sessionId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Find order by payment intent ID
    const order = await ctx.db
      .query("orders")
      .filter((q) => q.eq(q.field("stripePaymentIntentId"), args.paymentIntentId))
      .first();

    if (!order) {
      throw new Error(`Order not found for payment intent: ${args.paymentIntentId}`);
    }

    // Update payment status to paid
    await ctx.db.patch(order._id, {
      paymentStatus: "paid",
      status: "processing", // Move to processing when payment is confirmed
      updatedAt: Date.now(),
    });

    // If this is a checkout session, also update with session ID
    if (args.sessionId) {
      await ctx.db.patch(order._id, {
        stripeSessionId: args.sessionId,
        updatedAt: Date.now(),
      });
    }

    return order._id;
  },
});

// Process failed payment
export const processFailedPayment = mutation({
  args: { paymentIntentId: v.string() },
  handler: async (ctx, args) => {
    const order = await ctx.db
      .query("orders")
      .filter((q) => q.eq(q.field("stripePaymentIntentId"), args.paymentIntentId))
      .first();

    if (!order) {
      throw new Error(`Order not found for payment intent: ${args.paymentIntentId}`);
    }

    // Update payment status to failed
    await ctx.db.patch(order._id, {
      paymentStatus: "failed",
      status: "cancelled", // Cancel order if payment fails
      updatedAt: Date.now(),
    });

    return order._id;
  },
});

// Get order items
export const getOrderItems = query({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("orderItems")
      .filter((q) => q.eq(q.field("orderId"), args.orderId))
      .collect();
  },
});
