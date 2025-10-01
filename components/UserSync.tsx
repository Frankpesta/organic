"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export function UserSync() {
  const { user, isLoaded } = useUser();
  const createOrUpdateUser = useMutation(api.auth.createOrUpdateUser);

  useEffect(() => {
    if (isLoaded && user) {
      // Automatically create/update user in Convex when they sign in
      createOrUpdateUser({
        clerkId: user.id,
        email: user.primaryEmailAddress?.emailAddress || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        imageUrl: user.imageUrl || "",
      }).catch(error => {
        console.error("Failed to sync user:", error);
      });
    }
  }, [isLoaded, user, createOrUpdateUser]);

  return null; // This component doesn't render anything
}
