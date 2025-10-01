"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, ArrowRight, AlertCircle } from "lucide-react";
import { toast } from "sonner";

// Admin email - only this user can access admin
const ADMIN_EMAIL = "admin@helensbeautysecret.com";

export function AdminAccess() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  const [adminCode, setAdminCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAdminAccess = async () => {
    if (!isSignedIn) {
      toast.error("Please sign in first");
      return;
    }

    // Check if user is the admin
    if (user?.emailAddresses[0]?.emailAddress !== ADMIN_EMAIL) {
      setError("Access denied. This area is restricted to authorized personnel only.");
      toast.error("Access denied");
      return;
    }

    setIsLoading(true);
    setError("");

    // Simulate admin code verification
    if (adminCode === "admin2024" || adminCode === "helen-admin") {
      toast.success("Admin access granted!");
      router.push("/admin");
    } else {
      setError("Invalid admin code. Please try again.");
      toast.error("Invalid admin code");
    }

    setIsLoading(false);
  };

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pt-20">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-red-600" />
            </div>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>
              Please sign in to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={() => router.push("/sign-in")} 
              className="w-full"
            >
              Sign In
            </Button>
            <Button 
              variant="outline" 
              onClick={() => router.push("/sign-up")} 
              className="w-full"
            >
              Sign Up
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center pt-20">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle>Admin Access</CardTitle>
          <CardDescription>
            Enter your admin code to access the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-code">Admin Code</Label>
            <Input
              id="admin-code"
              type="password"
              placeholder="Enter admin code"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdminAccess()}
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button 
            onClick={handleAdminAccess}
            disabled={isLoading || !adminCode}
            className="w-full"
          >
            {isLoading ? "Verifying..." : "Access Admin Panel"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            <p>Don't have an admin code?</p>
            <p>Contact the system administrator</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
