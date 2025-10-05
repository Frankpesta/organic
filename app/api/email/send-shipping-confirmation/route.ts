import { type NextRequest, NextResponse } from "next/server";
import {
  type ShippingConfirmationData,
  sendShippingConfirmationEmail,
} from "@/lib/services/emailService";

export async function POST(request: NextRequest) {
  try {
    const data: ShippingConfirmationData = await request.json();

    // Validate required fields
    if (!data.to || !data.orderNumber || !data.customerName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const result = await sendShippingConfirmationEmail(data);

    if (!result.success) {
      return NextResponse.json(
        { error: "Failed to send email", details: result.error },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch (error) {
    console.error("Error in send-shipping-confirmation API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
