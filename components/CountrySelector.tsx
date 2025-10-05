"use client";

import { Check, Globe, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  calculatePPP,
  formatPrice,
  getAllCountries,
  getCurrencySymbol,
} from "@/lib/ppp";

interface CountrySelectorProps {
  selectedCountry: string;
  onCountryChange: (country: string) => void;
  showPrice?: boolean;
  samplePrice?: number;
  className?: string;
}

export function CountrySelector({
  selectedCountry,
  onCountryChange,
  showPrice = false,
  samplePrice = 50,
  className = "",
}: CountrySelectorProps) {
  const [detectedCountry, setDetectedCountry] = useState<string>("US");
  const [isDetecting, setIsDetecting] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const availableCountries = getAllCountries();

  // Detect user's country on mount
  useEffect(() => {
    const detectCountry = async () => {
      try {
        const response = await fetch("/api/detect-country");
        if (response.ok) {
          const data = await response.json();
          if (data.countryCode) {
            setDetectedCountry(data.countryCode);
            // Auto-select detected country if no country is selected yet
            if (selectedCountry === "US") {
              onCountryChange(data.countryCode);
            }
          }
        }
      } catch (error) {
        console.error("Failed to detect country:", error);
      } finally {
        setIsDetecting(false);
      }
    };

    detectCountry();
  }, [selectedCountry, onCountryChange]);

  const currentCountryData = availableCountries.find(
    (c) => c.code === selectedCountry,
  );
  const detectedCountryData = availableCountries.find(
    (c) => c.code === detectedCountry,
  );

  if (isDetecting) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-500"></div>
        <span className="text-sm text-muted-foreground">
          Detecting your location...
        </span>
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Current Selection Display */}
      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">
            {currentCountryData?.name || "United States"}
          </span>
          <Badge variant="secondary" className="text-xs">
            {getCurrencySymbol(currentCountryData?.currency || "USD")}
          </Badge>
          {detectedCountry !== selectedCountry && (
            <Badge variant="outline" className="text-xs text-green-600">
              Auto-detected: {detectedCountryData?.name}
            </Badge>
          )}
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="h-8">
              <Globe className="h-3 w-3 mr-1" />
              Change
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Select Your Country</DialogTitle>
              <DialogDescription>
                Choose your country to see local pricing and shipping options.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* Detected Country Option */}
              {detectedCountryData && detectedCountry !== selectedCountry && (
                <div className="p-3 border border-green-200 rounded-lg bg-green-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-green-600" />
                      <span className="font-medium">
                        {detectedCountryData.name}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {getCurrencySymbol(detectedCountryData.currency)}
                      </Badge>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => {
                        onCountryChange(detectedCountry);
                        setIsOpen(false);
                      }}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Check className="h-3 w-3 mr-1" />
                      Use This
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    We detected this based on your location
                  </p>
                </div>
              )}

              {/* Country Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Select Country
                </label>
                <Select value={selectedCountry} onValueChange={onCountryChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a country" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCountries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        <div className="flex items-center justify-between w-full">
                          <span>{country.name}</span>
                          <span className="ml-2 text-muted-foreground">
                            {getCurrencySymbol(country.currency)}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Preview */}
              {showPrice && samplePrice > 0 && (
                <div className="p-3 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">
                    Price Preview
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Sample Product</span>
                    <div className="text-right">
                      <div className="font-medium">
                        {selectedCountry
                          ? formatPrice(
                              calculatePPP(samplePrice, selectedCountry)
                                .adjustedPrice,
                              calculatePPP(samplePrice, selectedCountry)
                                .currency,
                            )
                          : formatPrice(samplePrice, "USD")}
                      </div>
                      {selectedCountry &&
                        calculatePPP(samplePrice, selectedCountry)
                          .adjustedPrice !==
                          calculatePPP(samplePrice, selectedCountry)
                            .originalPrice && (
                          <div className="text-xs text-muted-foreground line-through">
                            {formatPrice(
                              calculatePPP(samplePrice, selectedCountry)
                                .originalPrice,
                              "USD",
                            )}
                          </div>
                        )}
                    </div>
                  </div>
                  {selectedCountry &&
                    calculatePPP(samplePrice, selectedCountry).adjustedPrice !==
                      calculatePPP(samplePrice, selectedCountry)
                        .originalPrice && (
                      <div className="text-xs text-green-600 mt-1">
                        ✓ Local pricing applied
                      </div>
                    )}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* PPP Notice */}
      {currentCountryData && currentCountryData.code !== "US" && (
        <div className="text-xs text-muted-foreground bg-green-50 dark:bg-green-950 p-2 rounded">
          <strong>Local Pricing:</strong> Prices are adjusted for your region to
          provide fair, local pricing.
        </div>
      )}
    </div>
  );
}
