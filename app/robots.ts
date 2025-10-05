import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", "/_next/", "/checkout/", "/profile/"],
    },
    sitemap: "https://helensbeautysecret.com/sitemap.xml",
  };
}
