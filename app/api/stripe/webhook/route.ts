import { ConvexHttpClient } from "convex/browser";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { api } from "@/convex/_generated/api";
import { stripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  // Initialize Convex client
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

  if (!signature) {
    return NextResponse.json(
      { error: "No signature provided" },
      { status: 400 },
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("Payment succeeded:", paymentIntent.id);

        try {
          await convex.mutation(api.orders.processSuccessfulPayment, {
            paymentIntentId: paymentIntent.id,
          });
          console.log(
            "Order updated successfully for payment intent:",
            paymentIntent.id,
          );
        } catch (error) {
          console.error(
            "Failed to update order for payment intent:",
            paymentIntent.id,
            error,
          );
        }

        break;
      }

      case "payment_intent.payment_failed": {
        const failedPayment = event.data.object as Stripe.PaymentIntent;
        console.log("Payment failed:", failedPayment.id);

        try {
          await convex.mutation(api.orders.processFailedPayment, {
            paymentIntentId: failedPayment.id,
          });
          console.log("Order updated for failed payment:", failedPayment.id);
        } catch (error) {
          console.error(
            "Failed to update order for failed payment:",
            failedPayment.id,
            error,
          );
        }

        break;
      }

      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("Checkout completed:", session.id);

        try {
          // For checkout sessions, we need to find the order by session ID
          const order = await convex.query(api.orders.getOrderBySessionId, {
            sessionId: session.id,
          });

          if (order) {
            // Update the order status to processing
            await convex.mutation(api.orders.updateOrderStatus, {
              orderId: order._id,
              status: "processing",
            });
            console.log("Order updated for checkout session:", session.id);
          } else {
            console.log("No order found for checkout session:", session.id);
          }
        } catch (error) {
          console.error(
            "Failed to process checkout session:",
            session.id,
            error,
          );
        }

        break;
      }

      case "checkout.session.expired": {
        const expiredSession = event.data.object as Stripe.Checkout.Session;
        console.log("Checkout session expired:", expiredSession.id);

        try {
          const order = await convex.query(api.orders.getOrderBySessionId, {
            sessionId: expiredSession.id,
          });

          if (order) {
            await convex.mutation(api.orders.updateOrderStatus, {
              orderId: order._id,
              status: "cancelled",
            });
            console.log(
              "Order cancelled for expired session:",
              expiredSession.id,
            );
          }
        } catch (error) {
          console.error(
            "Failed to process expired checkout session:",
            expiredSession.id,
            error,
          );
        }

        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 },
    );
  }
}
