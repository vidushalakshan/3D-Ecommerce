// middleware.js
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/login", "/register", "/admin-login"],
  ignoredRoutes: ["/api/auth/clerk-webhook"],
  async afterAuth(auth, req) {
    const url = req.nextUrl.clone();

    if (auth.userId && (url.pathname.startsWith("/admin") || url.pathname.startsWith("/dashboard"))) {
      const user = await auth.getUser();
      const isAdmin = user?.primaryEmailAddress?.emailAddress
        ? require("./lib/clerk").isAdminEmail(
            user.primaryEmailAddress.emailAddress
          )
        : false;

      if (!isAdmin) {
        url.pathname = "/";
        return Response.redirect(url);
      }
    }
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};