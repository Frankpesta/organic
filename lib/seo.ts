import { Metadata } from "next";

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article" | "product";
  price?: number;
  currency?: string;
  availability?: "in stock" | "out of stock";
  brand?: string;
  category?: string;
}

export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    image = "/og-image.jpg",
    url = "https://helensbeautysecret.com",
    type = "website",
    price,
    currency = "USD",
    availability,
    brand = "Helen's Beauty Secret",
    category
  } = config;

  const fullTitle = `${title} | ${brand}`;
  const fullDescription = `${description} | Organic Skincare by ${brand}`;

  const metadata: Metadata = {
    title: fullTitle,
    description: fullDescription,
    keywords: [
      "organic skincare",
      "natural beauty",
      "vegan skincare",
      "clean beauty",
      "Helen's Beauty Secret",
      ...keywords
    ],
    authors: [{ name: brand }],
    creator: brand,
    publisher: brand,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: type === "product" ? "product" : "website",
      locale: "en_US",
      url,
      title: fullTitle,
      description: fullDescription,
      siteName: brand,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      images: [image],
      creator: "@helensbeautysecret",
      site: "@helensbeautysecret",
    },
    alternates: {
      canonical: url,
    },
    other: {
      "google-site-verification": "your-google-verification-code",
    },
  };

  // Add product-specific structured data
  if (type === "product" && price) {
    metadata.other = {
      ...metadata.other,
      "product:price:amount": price.toString(),
      "product:price:currency": currency,
      "product:availability": availability || "in stock",
      "product:brand": brand,
      "product:category": category || "Skincare",
    };
  }

  return metadata;
}

export function generateStructuredData(config: SEOConfig) {
  const {
    title,
    description,
    image = "/og-image.jpg",
    url = "https://helensbeautysecret.com",
    type = "website",
    price,
    currency = "USD",
    availability = "in stock",
    brand = "Helen's Beauty Secret",
    category = "Skincare"
  } = config;

  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": type === "product" ? "Product" : "WebSite",
    name: title,
    description,
    url,
    image,
    brand: {
      "@type": "Brand",
      name: brand,
    },
    publisher: {
      "@type": "Organization",
      name: brand,
      url: "https://helensbeautysecret.com",
      logo: {
        "@type": "ImageObject",
        url: "https://helensbeautysecret.com/logo.png",
      },
    },
  };

  if (type === "product" && price) {
    return {
      ...baseStructuredData,
      "@type": "Product",
      offers: {
        "@type": "Offer",
        price: price,
        priceCurrency: currency,
        availability: `https://schema.org/${availability === "in stock" ? "InStock" : "OutOfStock"}`,
        seller: {
          "@type": "Organization",
          name: brand,
        },
      },
      category,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "24",
      },
    };
  }

  return baseStructuredData;
}

export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateFAQStructuredData(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
