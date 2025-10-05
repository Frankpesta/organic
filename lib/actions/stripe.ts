"use server";

import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { createCheckoutSession } from "@/lib/stripe";

export async function createCheckoutSessionAction(data: {
  orderId: string;
  items: Array<{
    price_data: {
      currency: string;
      product_data: {
        name: string;
        images: string[];
      };
      unit_amount: number;
    };
    quantity: number;
  }>;
  successUrl: string;
  cancelUrl: string;
}) {
  try {
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

    // Create Stripe Checkout Session
    const session = await createCheckoutSession({
      lineItems: data.items,
      successUrl: data.successUrl,
      cancelUrl: data.cancelUrl,
      metadata: {
        orderId: data.orderId,
      },
    });

    // Update order with session ID
    await convex.mutation(api.orders.updateOrderWithSessionId, {
      orderId: data.orderId as any as Id<"orders">,
      sessionId: session.id,
    });

    return { success: true, url: session.url };
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return { success: false, error: "Failed to create checkout session" };
  }
}
