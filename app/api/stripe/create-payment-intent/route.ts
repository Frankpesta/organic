import { type NextRequest, NextResponse } from "next/server";
import { createPaymentIntent } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency, orderId, userId } = body;

    if (!amount || !currency || !orderId || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const paymentIntent = await createPaymentIntent({
      amount,
      currency,
      metadata: {
        orderId,
        userId,
      },
    });

    return NextResponse.json(paymentIntent);
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return NextResponse.json(
      { error: "Failed to create payment intent" },
      { status: 500 },
    );
  }
}
