import { mutation } from "./_generated/server";
import { v } from "convex/values";

// One-time script to promote franklinolisaemeka3@gmail.com to admin
// No arguments needed - hardcoded for simplicity
export const promoteMyself = mutation({
  handler: async (ctx) => {
    const email = "franklinolisaemeka3@gmail.com";
    console.log(`Looking for user with email: ${email}`);
    
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), email))
      .first();

    if (!user) {
      throw new Error(`User with email ${email} not found. Please sign in to the main site first to create your account.`);
    }

    if (user.role === "admin") {
      return { message: `User ${email} is already an admin!`, user };
    }

    await ctx.db.patch(user._id, {
      role: "admin",
      updatedAt: Date.now(),
    });

    console.log(`Successfully promoted ${email} to admin`);
    return { message: `Successfully promoted ${email} to admin!`, user };
  },
});

// Alternative: Promote any user by email (with args)
export const promoteUserByEmail = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    console.log(`Looking for user with email: ${args.email}`);
    
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (!user) {
      throw new Error(`User with email ${args.email} not found. Please sign in first.`);
    }

    if (user.role === "admin") {
      return { message: `User ${args.email} is already an admin!`, user };
    }

    await ctx.db.patch(user._id, {
      role: "admin",
      updatedAt: Date.now(),
    });

    console.log(`Successfully promoted ${args.email} to admin`);
    return { message: `Successfully promoted ${args.email} to admin!`, user };
  },
});
