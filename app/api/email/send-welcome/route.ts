import { type NextRequest, NextResponse } from "next/server";
import {
  sendWelcomeEmail,
  type WelcomeEmailData,
} from "@/lib/services/emailService";

export async function POST(request: NextRequest) {
  try {
    const data: WelcomeEmailData = await request.json();

    // Validate required fields
    if (!data.customerEmail || !data.customerName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const result = await sendWelcomeEmail({
      to: data.customerEmail,
      firstName: data.customerName,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: "Failed to send email", details: result.error },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch (error) {
    console.error("Error in send-welcome API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
