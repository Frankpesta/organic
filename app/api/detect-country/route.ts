import { NextResponse } from "next/server";
import { getCountryFromIP } from "@/lib/ip-detection";

export async function GET() {
  try {
    const locationData = await getCountryFromIP();

    if (!locationData) {
      return NextResponse.json(
        { error: "Failed to detect country" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      country: locationData.country,
      countryCode: locationData.countryCode,
      city: locationData.city,
      region: locationData.region,
    });
  } catch (error) {
    console.error("Country detection error:", error);
    return NextResponse.json(
      { error: "Failed to detect country" },
      { status: 500 },
    );
  }
}
