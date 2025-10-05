"use server";

import { auth } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { revalidatePath } from "next/cache";
import { api } from "@/convex/_generated/api";
import { sendOrderConfirmationEmail } from "@/lib/services/emailService";

export async function createOrder(formData: {
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone?: string;
  };
  billingAddress: {
    firstName: string;
    lastName: string;
    address1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone?: string;
  };
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  currency: string;
  notes?: string;
  deliveryMethodId?: string;
}) {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

    // Get or create user in Convex
    let convexUser = await convex.query(api.users.getUserByClerkId, {
      clerkId: userId,
    });

    if (!convexUser) {
      // Create user if doesn't exist
      const newUserId = await convex.mutation(api.users.createUser, {
        clerkId: userId,
        email: "", // Will be updated via webhook
        firstName: "",
        lastName: "",
        imageUrl: "",
        role: "customer",
      });
      convexUser = await convex.query(api.users.getUserByClerkId, {
        clerkId: userId,
      });
    }

    if (!convexUser) {
      throw new Error("Failed to create or retrieve user");
    }

    // Create order
    const orderId = await convex.mutation(api.orders.createOrder, {
      userId: convexUser._id,
      items: formData.items.map((item) => ({
        ...item,
        productId: item.productId as any,
      })),
      shippingAddress: formData.shippingAddress,
      billingAddress: formData.billingAddress,
      subtotal: formData.subtotal,
      tax: formData.tax,
      shipping: formData.shipping,
      discount: formData.discount,
      total: formData.total,
      currency: formData.currency,
      exchangeRate: formData.currency !== "usd" ? 1.0 : undefined, // Store exchange rate for non-USD currencies
      deliveryMethodId: formData.deliveryMethodId as any,
      stripePaymentIntentId: undefined,
    });

    // Get the created order with details for email
    let order;
    try {
      order = await convex.query(api.orders.getOrderById, { orderId });
    } catch (error) {
      console.warn(
        "getOrderById function not available, skipping email:",
        error,
      );
      order = null;
    }

    if (order && convexUser.email) {
      // Get product details for email
      const productDetails = await Promise.all(
        formData.items.map(async (item) => {
          const product = await convex.query(api.products.getProduct, {
            productId: item.productId as any,
          });
          return {
            name: product?.name || "Unknown Product",
            quantity: item.quantity,
            price: item.price,
          };
        }),
      );

      // Get delivery method details
      let deliveryMethod;
      if (formData.deliveryMethodId) {
        const method = await convex.query(api.shipping.getShippingMethod, {
          methodId: formData.deliveryMethodId as any,
        });
        if (method) {
          deliveryMethod = {
            name: method.name,
            estimatedDays: method.estimatedDays,
          };
        }
      }

      // Send order confirmation email
      try {
        await sendOrderConfirmationEmail({
          orderNumber: order.orderNumber,
          customerName: `${formData.shippingAddress.firstName} ${formData.shippingAddress.lastName}`,
          customerEmail: convexUser.email,
          orderDate: new Date().toLocaleDateString(),
          total: formData.total,
          currency: formData.currency,
          items: productDetails,
          shippingAddress: formData.shippingAddress,
          deliveryMethod,
        });
      } catch (emailError) {
        console.error("Failed to send order confirmation email:", emailError);
        // Don't fail the order creation if email fails
      }
    }

    revalidatePath("/admin/orders");
    return { success: true, orderId };
  } catch (error) {
    console.error("Error creating order:", error);
    return { success: false, error: "Failed to create order" };
  }
}

export async function getOrderBySessionId(sessionId: string) {
  try {
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

    const order = await convex.query(api.orders.getOrderBySessionId, {
      sessionId,
    });

    if (!order) {
      return { success: false, error: "Order not found" };
    }

    // Get order items
    const items = await convex.query(api.orders.getOrderItems, {
      orderId: order._id,
    });

    return {
      success: true,
      order: {
        ...order,
        items,
      },
    };
  } catch (error) {
    console.error("Error fetching order details:", error);
    return { success: false, error: "Failed to fetch order details" };
  }
}
