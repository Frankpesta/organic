"use client";

import { DollarSign, Globe, MapPin } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { calculatePPP, formatPrice, getCurrencySymbol } from "@/lib/ppp";

interface PPTToggleProps {
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
  detectedCountry: string | null;
  samplePrice: number;
  className?: string;
}

export function PPTToggle({
  isEnabled,
  onToggle,
  detectedCountry,
  samplePrice,
  className = "",
}: PPTToggleProps) {
  const [isDetecting, setIsDetecting] = useState(false);

  const handleToggle = (checked: boolean) => {
    if (checked && !detectedCountry) {
      setIsDetecting(true);
      // Trigger country detection
      fetch("/api/detect-country")
        .then((response) => response.json())
        .then((data) => {
          if (data.countryCode) {
            onToggle(true);
          }
        })
        .catch((error) => {
          console.error("Failed to detect country:", error);
          onToggle(false);
        })
        .finally(() => {
          setIsDetecting(false);
        });
    } else {
      onToggle(checked);
    }
  };

  const pppResult =
    detectedCountry && isEnabled
      ? calculatePPP(samplePrice, detectedCountry)
      : {
          adjustedPrice: samplePrice,
          currency: "USD",
          originalPrice: samplePrice,
        };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Toggle Section */}
      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center space-x-3">
          <Globe className="h-5 w-5 text-green-600" />
          <div>
            <Label htmlFor="ppp-toggle" className="text-base font-medium">
              Regional Pricing (PPP)
            </Label>
            <p className="text-sm text-muted-foreground">
              {detectedCountry
                ? `Detected: ${detectedCountry}`
                : "Auto-detect your location for local pricing"}
            </p>
          </div>
        </div>
        <Switch
          id="ppp-toggle"
          checked={isEnabled}
          onCheckedChange={handleToggle}
          disabled={isDetecting}
        />
      </div>

      {/* Price Preview */}
      {isEnabled && detectedCountry && (
        <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">Local Pricing</span>
            </div>
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-800 border-green-200"
            >
              {getCurrencySymbol(pppResult.currency)}
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Original Price:
              </span>
              <span className="text-sm font-medium">
                {formatPrice(pppResult.originalPrice, "USD")}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Local Price:
              </span>
              <span className="text-lg font-bold text-green-600">
                {formatPrice(pppResult.adjustedPrice, pppResult.currency)}
              </span>
            </div>
            {pppResult.adjustedPrice !== pppResult.originalPrice && (
              <div className="text-xs text-green-700 dark:text-green-300">
                <DollarSign className="h-3 w-3 inline mr-1" />
                Adjusted for your region's purchasing power
              </div>
            )}
          </div>
        </div>
      )}

      {isDetecting && (
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-500"></div>
          <span>Detecting your location...</span>
        </div>
      )}
    </div>
  );
}
