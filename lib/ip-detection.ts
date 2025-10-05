"use server";

interface IPLocationData {
  country: string;
  countryCode: string;
  city?: string;
  region?: string;
}

// IP detection service using ipapi.co (free tier: 1000 requests/day)
export async function detectCountryFromIP(): Promise<IPLocationData | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const response = await fetch("https://ipapi.co/json/", {
      headers: {
        "User-Agent": "HelensBeautySecret/1.0",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 429) {
        console.warn("IP detection rate limited, using fallback");
        return null;
      }
      throw new Error(`HTTP ${response.status}: Failed to fetch IP location`);
    }

    const data = await response.json();

    return {
      country: data.country_name || "United States",
      countryCode: data.country_code || "US",
      city: data.city,
      region: data.region,
    };
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      console.error("IP detection timeout");
    } else {
      console.error("Error detecting country from IP:", error);
    }
    return null;
  }
}

// Alternative service using ip-api.com (free tier: 1000 requests/minute)
export async function detectCountryFromIPAlternative(): Promise<IPLocationData | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const response = await fetch("https://ip-api.com/json/", {
      headers: {
        "User-Agent": "HelensBeautySecret/1.0",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 429) {
        console.warn("IP detection rate limited, using fallback");
        return null;
      }
      throw new Error(`HTTP ${response.status}: Failed to fetch IP location`);
    }

    const data = await response.json();

    if (data.status === "fail") {
      throw new Error(data.message || "Failed to detect location");
    }

    return {
      country: data.country || "United States",
      countryCode: data.countryCode || "US",
      city: data.city,
      region: data.regionName,
    };
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      console.error("IP detection timeout (alternative)");
    } else {
      console.error("Error detecting country from IP (alternative):", error);
    }
    return null;
  }
}

// Cache to prevent excessive API calls
let cachedResult: IPLocationData | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Main function that tries both services with caching
export async function getCountryFromIP(): Promise<IPLocationData | null> {
  const now = Date.now();

  // Return cached result if still valid
  if (cachedResult && now - lastFetchTime < CACHE_DURATION) {
    return cachedResult;
  }

  // Try primary service first
  try {
    const primaryResult = await detectCountryFromIP();
    if (primaryResult) {
      cachedResult = primaryResult;
      lastFetchTime = now;
      return primaryResult;
    }
  } catch (error) {
    console.warn("Primary IP detection failed:", error);
  }

  // Try alternative service
  try {
    const alternativeResult = await detectCountryFromIPAlternative();
    if (alternativeResult) {
      cachedResult = alternativeResult;
      lastFetchTime = now;
      return alternativeResult;
    }
  } catch (error) {
    console.warn("Alternative IP detection failed:", error);
  }

  // Return cached result if available, otherwise default
  if (cachedResult) {
    return cachedResult;
  }

  // Return default if both fail
  return {
    country: "United States",
    countryCode: "US",
    city: "Unknown",
    region: "Unknown",
  };
}
