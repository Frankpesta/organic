"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "@/lib/utils";

// Re-export all chart components from recharts
export {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Radar,
  RadarChart,
  ReferenceArea,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

// Import ResponsiveContainer for internal use
import { ResponsiveContainer as RechartsResponsiveContainer } from "recharts";

// Custom chart components
export const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: any;
    children: React.ReactElement;
  }
>(({ className, children, config, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("w-full", className)} {...props}>
      <RechartsResponsiveContainer width="100%" height="100%">
        {children}
      </RechartsResponsiveContainer>
    </div>
  );
});
ChartContainer.displayName = "ChartContainer";

export const ChartTooltip = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    active?: boolean;
    payload?: any[];
    label?: string;
    accessibilityLayer?: boolean;
    allowEscapeViewBox?: boolean;
    viewBox?: any;
    coordinate?: any;
    offset?: any;
  }
>(
  (
    {
      className,
      active,
      payload,
      label,
      accessibilityLayer,
      allowEscapeViewBox,
      // Filter out other Recharts internal props
      viewBox,
      coordinate,
      offset,
      ...props
    },
    ref,
  ) => {
    if (!active || !payload?.length) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border bg-background p-2 shadow-md",
          className,
        )}
        {...props}
      >
        <div className="grid gap-2">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                {label}
              </span>
              <span className="font-bold text-muted-foreground">
                {payload[0]?.value}
              </span>
            </div>
          </div>
          <div className="grid gap-2">
            {payload.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <div className="flex w-full flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[0.70rem] text-muted-foreground">
                      {item.name}
                    </span>
                    <span className="text-[0.70rem] font-bold">
                      {item.value}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
);
ChartTooltip.displayName = "ChartTooltip";

export const ChartLegend = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: any;
  }
>(({ className, config, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex items-center justify-center gap-4", className)}
      {...props}
    >
      {config.map((item: any, index: number) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-sm text-muted-foreground">{item.name}</span>
        </div>
      ))}
    </div>
  );
});
ChartLegend.displayName = "ChartLegend";
