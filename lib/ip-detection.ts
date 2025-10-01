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
    const response = await fetch('https://ipapi.co/json/', {
      headers: {
        'User-Agent': 'HelensBeautySecret/1.0'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch IP location');
    }
    
    const data = await response.json();
    
    return {
      country: data.country_name || 'United States',
      countryCode: data.country_code || 'US',
      city: data.city,
      region: data.region,
    };
  } catch (error) {
    console.error('Error detecting country from IP:', error);
    return null;
  }
}

// Alternative service using ip-api.com (free tier: 1000 requests/minute)
export async function detectCountryFromIPAlternative(): Promise<IPLocationData | null> {
  try {
    const response = await fetch('http://ip-api.com/json/', {
      headers: {
        'User-Agent': 'HelensBeautySecret/1.0'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch IP location');
    }
    
    const data = await response.json();
    
    if (data.status === 'fail') {
      throw new Error(data.message || 'Failed to detect location');
    }
    
    return {
      country: data.country || 'United States',
      countryCode: data.countryCode || 'US',
      city: data.city,
      region: data.regionName,
    };
  } catch (error) {
    console.error('Error detecting country from IP (alternative):', error);
    return null;
  }
}

// Main function that tries both services
export async function getCountryFromIP(): Promise<IPLocationData | null> {
  // Try primary service first
  const primaryResult = await detectCountryFromIP();
  if (primaryResult) {
    return primaryResult;
  }
  
  // Fallback to alternative service
  const alternativeResult = await detectCountryFromIPAlternative();
  if (alternativeResult) {
    return alternativeResult;
  }
  
  // Return default if both fail
  return {
    country: 'United States',
    countryCode: 'US',
  };
}