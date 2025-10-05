import { v } from "convex/values";
import { action } from "./_generated/server";

// Send order confirmation email
export const sendOrderConfirmationEmail = action({
  args: {
    to: v.string(),
    orderNumber: v.string(),
    customerName: v.string(),
    orderDate: v.string(),
    items: v.array(v.object({
      name: v.string(),
      quantity: v.number(),
      price: v.number(),
      image: v.optional(v.string()),
    })),
    subtotal: v.number(),
    shipping: v.number(),
    tax: v.number(),
    total: v.number(),
    shippingAddress: v.object({
      firstName: v.string(),
      lastName: v.string(),
      address: v.string(),
      city: v.string(),
      state: v.string(),
      zipCode: v.string(),
      country: v.string(),
    }),
    billingAddress: v.object({
      firstName: v.string(),
      lastName: v.string(),
      address: v.string(),
      city: v.string(),
      state: v.string(),
      zipCode: v.string(),
      country: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/emails/order-confirmation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(args),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Failed to send order confirmation email:', error);
      throw new Error('Failed to send order confirmation email');
    }
  },
});

// Send welcome email
export const sendWelcomeEmail = action({
  args: {
    to: v.string(),
    firstName: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/emails/welcome`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(args),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Failed to send welcome email:', error);
      throw new Error('Failed to send welcome email');
    }
  },
});

// Send shipping confirmation email
export const sendShippingConfirmationEmail = action({
  args: {
    to: v.string(),
    orderNumber: v.string(),
    customerName: v.string(),
    trackingNumber: v.string(),
    carrier: v.string(),
    estimatedDelivery: v.string(),
    items: v.array(v.object({
      name: v.string(),
      quantity: v.number(),
      image: v.optional(v.string()),
    })),
    shippingAddress: v.object({
      firstName: v.string(),
      lastName: v.string(),
      address: v.string(),
      city: v.string(),
      state: v.string(),
      zipCode: v.string(),
      country: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/emails/shipping-confirmation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(args),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Failed to send shipping confirmation email:', error);
      throw new Error('Failed to send shipping confirmation email');
    }
  },
});
