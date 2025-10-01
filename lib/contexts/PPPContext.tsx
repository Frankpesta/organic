"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getCountryByCode } from "@/lib/ppp";

interface PPPContextType {
  selectedCountry: string | null;
  isLoading: boolean;
  setSelectedCountry: (country: string | null) => void;
}

const PPPContext = createContext<PPPContextType | undefined>(undefined);

export function PPPProvider({ children }: { children: ReactNode }) {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Auto-detect country on mount
    const detectCountry = async () => {
      try {
        const response = await fetch('/api/detect-country');
        if (response.ok) {
          const data = await response.json();
          if (data.country) {
            setSelectedCountry(data.country);
          }
        }
      } catch (error) {
        console.error('Failed to detect country:', error);
        // Fallback to US if detection fails
        setSelectedCountry('US');
      } finally {
        setIsLoading(false);
      }
    };

    detectCountry();
  }, []);

  return (
    <PPPContext.Provider value={{ selectedCountry, isLoading, setSelectedCountry }}>
      {children}
    </PPPContext.Provider>
  );
}

export function usePPP() {
  const context = useContext(PPPContext);
  if (context === undefined) {
    throw new Error('usePPP must be used within a PPPProvider');
  }
  return context;
}