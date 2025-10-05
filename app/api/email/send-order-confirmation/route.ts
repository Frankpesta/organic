import { NextRequest, NextResponse } from "next/server";
import { sendOrderConfirmationEmail, OrderConfirmationData } from "@/lib/services/emailService";

export async function POST(request: NextRequest) {
  try {
    const data: OrderConfirmationData = await request.json();

    // Validate required fields
    if (!data.to || !data.orderNumber || !data.customerName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await sendOrderConfirmationEmail(data);

    if (!result.success) {
      return NextResponse.json(
        { error: "Failed to send email", details: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch (error) {
    console.error("Error in send-order-confirmation API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
