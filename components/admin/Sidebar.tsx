"use client";

import {
  BarChart3,
  FileText,
  Globe,
  LayoutDashboard,
  Package,
  Settings,
  Shield,
  ShoppingCart,
  Tag,
  Truck,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Shipping", href: "/admin/shipping", icon: Truck },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Categories", href: "/admin/categories", icon: Tag },
  { name: "Content", href: "/admin/content", icon: FileText },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

// Mobile Sidebar Component
export function MobileSidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        onClick={onClose}
      />

      {/* Mobile Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border lg:hidden">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center justify-between">
            <h1 className="text-xl font-bold text-foreground">
              Admin Dashboard
            </h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-8">
              <li>
                <ul
                  role="list"
                  className="-mx-2 space-y-1 flex flex-col gap-y-3"
                >
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className={cn(
                            isActive
                              ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-colors flex items-center gap-x-3",
                          )}
                        >
                          <item.icon
                            className={cn(
                              isActive
                                ? "text-green-700 dark:text-green-300"
                                : "text-muted-foreground group-hover:text-foreground",
                              "h-4 w-4 shrink-0",
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
              <li className="mt-auto">
                <div className="flex items-center gap-x-4 px-2 py-3 text-sm font-semibold leading-6 text-foreground">
                  <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="sr-only">Your profile</span>
                  <span aria-hidden="true">Admin User</span>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

// Desktop Sidebar Component
export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-card border-r border-border px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center">
          <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-8">
            <li>
              <ul role="list" className="-mx-2 space-y-1 flex flex-col gap-y-3">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          isActive
                            ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted",
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-colors flex items-center gap-x-3",
                        )}
                      >
                        <item.icon
                          className={cn(
                            isActive
                              ? "text-green-700 dark:text-green-300"
                              : "text-muted-foreground group-hover:text-foreground",
                            "h-4 w-4 shrink-0",
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
            <li className="mt-auto">
              <div className="flex items-center gap-x-4 px-2 py-3 text-sm font-semibold leading-6 text-foreground">
                <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <span className="sr-only">Your profile</span>
                <span aria-hidden="true">Admin User</span>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
