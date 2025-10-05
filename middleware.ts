import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/profile(.*)", "/checkout(.*)"]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { pathname: _pathname } = req.nextUrl;

  // Protect admin routes - require authentication
  if (isAdminRoute(req)) {
    await auth.protect();

    // Additional admin role check will be done in the admin layout
    // using Convex queries to verify admin role
    return NextResponse.next();
  }

  // Handle other protected routes with Clerk
  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
