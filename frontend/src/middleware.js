import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { isAdminEmail } from "./lib/clerk";

const isPublicRoute = createRouteMatcher([
  "/",
  "/login",
  "/register",
  "/admin-login",
  "/api/auth/clerk-webhook",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  // 1. If it's a private route and the user is not logged in, redirect them to sign-in
  if (!isPublicRoute(req) && !userId) {
    return redirectToSignIn();
  }

  // 2. If the user is logged in, perform admin checks on /admin or /dashboard routes
  const url = req.nextUrl.clone();
  if (userId && (url.pathname.startsWith("/admin") || url.pathname.startsWith("/dashboard"))) {
    const { clerkClient } = await import("@clerk/nextjs/server");
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const email = user?.primaryEmailAddress?.emailAddress;

    const isAdmin = isAdminEmail(email);

    if (!isAdmin) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};