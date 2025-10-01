import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { sendWelcomeEmail } from "@/lib/email";

// Send welcome email when a new user is created
export const sendWelcomeEmailToUser = mutation({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    
    if (!user) {
      throw new Error("User not found");
    }

    // Only send welcome email for new customers (not admins)
    if (user.role !== "customer") {
      return { success: false, reason: "Not a customer" };
    }

    try {
      const result = await sendWelcomeEmail({
        customerName: user.firstName || user.email,
        customerEmail: user.email,
      });

      return { success: result.success, error: result.error };
    } catch (error) {
      console.error("Error sending welcome email:", error);
      return { success: false, error: "Failed to send welcome email" };
    }
  },
});

// Send order confirmation email
export const sendOrderConfirmationEmailToUser = mutation({
  args: {
    orderId: v.id("orders"),
  },
  handler: async (ctx, args) => {
    const order = await ctx.db.get(args.orderId);
    
    if (!order) {
      throw new Error("Order not found");
    }

    const user = await ctx.db.get(order.userId);
    
    if (!user) {
      throw new Error("User not found");
    }

    // Get product details
    const productDetails = await Promise.all(
      order.items.map(async (item) => {
        const product = await ctx.db.get(item.productId);
        return {
          name: product?.name || 'Unknown Product',
          quantity: item.quantity,
          price: item.price,
        };
      })
    );

    // Get delivery method details
    let deliveryMethod;
    if (order.deliveryMethodId) {
      const method = await ctx.db.get(order.deliveryMethodId);
      if (method) {
        deliveryMethod = {
          name: method.name,
          estimatedDays: method.estimatedDays,
        };
      }
    }

    try {
      const result = await sendOrderConfirmationEmail({
        orderNumber: order.orderNumber,
        customerName: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email,
        customerEmail: user.email,
        orderDate: new Date(order._creationTime).toLocaleDateString(),
        total: order.total,
        currency: order.currency,
        items: productDetails,
        shippingAddress: order.shippingAddress,
        deliveryMethod,
      });

      return { success: result.success, error: result.error };
    } catch (error) {
      console.error("Error sending order confirmation email:", error);
      return { success: false, error: "Failed to send order confirmation email" };
    }
  },
});

// Send shipping confirmation email
export const sendShippingConfirmationEmailToUser = mutation({
  args: {
    orderId: v.id("orders"),
    trackingNumber: v.optional(v.string()),
    carrier: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const order = await ctx.db.get(args.orderId);
    
    if (!order) {
      throw new Error("Order not found");
    }

    const user = await ctx.db.get(order.userId);
    
    if (!user) {
      throw new Error("User not found");
    }

    // Get product details
    const productDetails = order.items.map((item) => ({
      name: `Product ${item.productId.slice(-8)}`, // Fallback name
      quantity: item.quantity,
    }));

    // Get delivery method for estimated delivery
    let estimatedDelivery = "3-5 business days";
    if (order.deliveryMethodId) {
      const method = await ctx.db.get(order.deliveryMethodId);
      if (method) {
        estimatedDelivery = method.estimatedDays;
      }
    }

    try {
      const result = await sendShippingConfirmationEmail({
        orderNumber: order.orderNumber,
        customerName: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email,
        customerEmail: user.email,
        trackingNumber: args.trackingNumber,
        carrier: args.carrier,
        estimatedDelivery,
        items: productDetails,
        shippingAddress: order.shippingAddress,
      });

      return { success: result.success, error: result.error };
    } catch (error) {
      console.error("Error sending shipping confirmation email:", error);
      return { success: false, error: "Failed to send shipping confirmation email" };
    }
  },
});
