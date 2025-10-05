interface CountryData {
  code: string;
  name: string;
  currency: string;
  exchangeRate: number;
  pppMultiplier: number;
  isActive: boolean;
}

interface PPPResult {
  originalPrice: number;
  adjustedPrice: number;
  currency: string;
  exchangeRate: number;
  pppMultiplier: number;
  country: string;
}

// Default PPP data (in production, this would come from your database)
const DEFAULT_COUNTRIES: CountryData[] = [
  {
    code: "US",
    name: "United States",
    currency: "USD",
    exchangeRate: 1.0,
    pppMultiplier: 1.0,
    isActive: true,
  },
  {
    code: "GB",
    name: "United Kingdom",
    currency: "GBP",
    exchangeRate: 0.79,
    pppMultiplier: 0.85,
    isActive: true,
  },
  {
    code: "CA",
    name: "Canada",
    currency: "CAD",
    exchangeRate: 1.35,
    pppMultiplier: 1.1,
    isActive: true,
  },
  {
    code: "AU",
    name: "Australia",
    currency: "AUD",
    exchangeRate: 1.52,
    pppMultiplier: 1.2,
    isActive: true,
  },
  {
    code: "DE",
    name: "Germany",
    currency: "EUR",
    exchangeRate: 0.92,
    pppMultiplier: 0.9,
    isActive: true,
  },
  {
    code: "FR",
    name: "France",
    currency: "EUR",
    exchangeRate: 0.92,
    pppMultiplier: 0.9,
    isActive: true,
  },
  {
    code: "IT",
    name: "Italy",
    currency: "EUR",
    exchangeRate: 0.92,
    pppMultiplier: 0.85,
    isActive: true,
  },
  {
    code: "ES",
    name: "Spain",
    currency: "EUR",
    exchangeRate: 0.92,
    pppMultiplier: 0.8,
    isActive: true,
  },
  {
    code: "NL",
    name: "Netherlands",
    currency: "EUR",
    exchangeRate: 0.92,
    pppMultiplier: 0.95,
    isActive: true,
  },
  {
    code: "BE",
    name: "Belgium",
    currency: "EUR",
    exchangeRate: 0.92,
    pppMultiplier: 0.9,
    isActive: true,
  },
  {
    code: "IN",
    name: "India",
    currency: "INR",
    exchangeRate: 83.0,
    pppMultiplier: 0.3,
    isActive: true,
  },
  {
    code: "BR",
    name: "Brazil",
    currency: "BRL",
    exchangeRate: 5.2,
    pppMultiplier: 0.4,
    isActive: true,
  },
  {
    code: "MX",
    name: "Mexico",
    currency: "MXN",
    exchangeRate: 17.5,
    pppMultiplier: 0.5,
    isActive: true,
  },
  {
    code: "JP",
    name: "Japan",
    currency: "JPY",
    exchangeRate: 150.0,
    pppMultiplier: 0.8,
    isActive: true,
  },
  {
    code: "KR",
    name: "South Korea",
    currency: "KRW",
    exchangeRate: 1300.0,
    pppMultiplier: 0.7,
    isActive: true,
  },
  {
    code: "CN",
    name: "China",
    currency: "CNY",
    exchangeRate: 7.2,
    pppMultiplier: 0.6,
    isActive: true,
  },
  {
    code: "NG",
    name: "Nigeria",
    currency: "NGN",
    exchangeRate: 1600.0,
    pppMultiplier: 0.25,
    isActive: true,
  },
];

export function getCountryByCode(code: string): CountryData | null {
  if (!code || typeof code !== "string") {
    return null;
  }

  return (
    DEFAULT_COUNTRIES.find(
      (country) =>
        country.code.toLowerCase() === code.toLowerCase() && country.isActive,
    ) || null
  );
}

export function getAllCountries(): CountryData[] {
  return DEFAULT_COUNTRIES.filter((country) => country.isActive);
}

export function calculatePPP(
  price: number,
  countryCode: string,
  baseCurrency: string = "USD",
): PPPResult {
  const country = getCountryByCode(countryCode);

  if (!country) {
    // Fallback to US pricing if country not found
    return {
      originalPrice: price,
      adjustedPrice: price,
      currency: baseCurrency,
      exchangeRate: 1.0,
      pppMultiplier: 1.0,
      country: "US",
    };
  }

  // Convert to local currency first
  const localPrice = price * country.exchangeRate;

  // Apply PPP adjustment
  const pppAdjustedPrice = localPrice * country.pppMultiplier;

  return {
    originalPrice: price,
    adjustedPrice: Math.round(pppAdjustedPrice * 100) / 100, // Round to 2 decimal places
    currency: country.currency,
    exchangeRate: country.exchangeRate,
    pppMultiplier: country.pppMultiplier,
    country: country.name,
  };
}

export function formatPrice(price: number, currency: string): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(price);
}

export function getCurrencySymbol(currency: string): string {
  const symbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    CAD: "C$",
    AUD: "A$",
    INR: "₹",
    BRL: "R$",
    MXN: "$",
    KRW: "₩",
    CNY: "¥",
    NGN: "₦",
  };

  return symbols[currency] || currency;
}

export function detectUserCountry(): string {
  // In a real application, you would use a geolocation service
  // For now, we'll return a default
  return "US";
}

export function getRecommendedCountries(): CountryData[] {
  // Return most popular countries for the business
  const popularCodes = [
    "US",
    "GB",
    "CA",
    "AU",
    "DE",
    "FR",
    "IT",
    "ES",
    "NL",
    "BE",
  ];
  return DEFAULT_COUNTRIES.filter(
    (country) => popularCodes.includes(country.code) && country.isActive,
  );
}
