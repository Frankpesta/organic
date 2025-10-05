"use client";

import Head from "next/head";

interface SEOHeadProps {
  structuredData?: any;
  breadcrumbData?: any;
  faqData?: any;
}

export function SEOHead({
  structuredData,
  breadcrumbData,
  faqData,
}: SEOHeadProps) {
  return (
    <Head>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}
      {breadcrumbData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbData),
          }}
        />
      )}
      {faqData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqData),
          }}
        />
      )}
    </Head>
  );
}
