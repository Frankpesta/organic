import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { Cart } from "@/components/Cart";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { UserSync } from "@/components/UserSync";
import { PPPProvider } from "@/lib/contexts/PPPContext";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Helen's Beauty Secret - Organic Skincare",
  description:
    "Discover the transformative power of organic skincare. Pure, potent ingredients to revitalize your complexion with gentle, effective care.",
  keywords: [
    "organic skincare",
    "natural beauty",
    "vegan skincare",
    "clean beauty",
    "Helen's Beauty Secret",
  ],
  authors: [{ name: "Helen's Beauty Secret" }],
  openGraph: {
    title: "Helen's Beauty Secret - Organic Skincare",
    description:
      "Discover the transformative power of organic skincare. Pure, potent ingredients to revitalize your complexion.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Helen's Beauty Secret - Organic Skincare",
    description:
      "Discover the transformative power of organic skincare. Pure, potent ingredients to revitalize your complexion.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable} antialiased`}>
        <ClerkProvider>
          <ConvexClientProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <PPPProvider>
                <div className="min-h-screen flex flex-col">
                  <main className="flex-1">{children}</main>
                </div>
                <Cart />
                <UserSync />
                <Toaster position="top-right" richColors />
              </PPPProvider>
            </ThemeProvider>
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
