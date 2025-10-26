import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { routeAccessMap } from "@/lib/settings";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 🔹 Get JWT token (server-side equivalent of session)
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const role = token?.role; // role added to JWT in NextAuth callbacks

  // console.log("🔹 Middleware token:", token);

  // 🔹 Check route access map
  for (const [pattern, allowedRoles] of Object.entries(routeAccessMap)) {
    const regex = new RegExp(`^${pattern}$`);
    if (regex.test(pathname)) {
      // if no session or role not allowed → redirect to login
      if (!role || !allowedRoles.includes(role)) {
        const redirectUrl = new URL("/signin", req.url);
        redirectUrl.searchParams.set("from", pathname);
        return NextResponse.redirect(redirectUrl);
      }
    }
  }

  // ✅ Allow access if authorized
  return NextResponse.next();
}

// ✅ Apply only to protected routes
export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
  runtime: "nodejs", // 👈 Add this line
};
