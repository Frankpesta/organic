import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Helper function to get current user from Clerk
export async function getCurrentUser(ctx: any) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new ConvexError("Not authenticated");
  }

  const user = await ctx.db
    .query("users")
    .filter((q: any) => q.eq(q.field("clerkId"), identity.subject))
    .first();

  if (!user) {
    throw new ConvexError("User not found in database");
  }

  return user;
}

// Helper function to verify admin role
export async function requireAdmin(ctx: any) {
  const user = await getCurrentUser(ctx);

  if (user.role !== "admin") {
    throw new ConvexError("Admin access required");
  }

  return user;
}

// Check if current user is admin
export const isAdmin = query({
  handler: async (ctx) => {
    try {
      const user = await getCurrentUser(ctx);
      return { isAdmin: user.role === "admin", user };
    } catch (error) {
      return { isAdmin: false, user: null };
    }
  },
});

// Get current user with role
export const getCurrentUserWithRole = query({
  handler: async (ctx) => {
    try {
      const user = await getCurrentUser(ctx);
      return user;
    } catch (error) {
      return null;
    }
  },
});

// Create or update user on first login
export const createOrUpdateUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .first();

    const now = Date.now();

    if (existingUser) {
      // Update existing user
      await ctx.db.patch(existingUser._id, {
        email: args.email,
        firstName: args.firstName,
        lastName: args.lastName,
        imageUrl: args.imageUrl,
        updatedAt: now,
      });
      return existingUser;
    } else {
      // Create new user with customer role by default
      // Admin role must be assigned manually
      const userId = await ctx.db.insert("users", {
        clerkId: args.clerkId,
        email: args.email,
        firstName: args.firstName,
        lastName: args.lastName,
        imageUrl: args.imageUrl,
        role: "customer",
        createdAt: now,
        updatedAt: now,
      });

      const newUser = await ctx.db.get(userId);

      // Send welcome email for new customers
      if (newUser && newUser.role === "customer") {
        try {
          // Import and call the email function
          const { sendWelcomeEmail } = await import("@/lib/email");
          await sendWelcomeEmail({
            customerName: newUser.firstName || newUser.email,
            customerEmail: newUser.email,
          });
        } catch (emailError) {
          console.error("Failed to send welcome email:", emailError);
          // Don't fail user creation if email fails
        }
      }

      return newUser;
    }
  },
});

// Promote user to admin (can only be done by existing admin)
export const promoteToAdmin = mutation({
  args: {
    userEmail: v.string(),
  },
  handler: async (ctx, args) => {
    // Verify current user is admin
    await requireAdmin(ctx);

    const targetUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.userEmail))
      .first();

    if (!targetUser) {
      throw new ConvexError("User not found");
    }

    await ctx.db.patch(targetUser._id, {
      role: "admin",
      updatedAt: Date.now(),
    });

    return targetUser;
  },
});
