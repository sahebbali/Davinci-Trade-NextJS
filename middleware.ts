// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getToken } from "next-auth/jwt"; // or any session system you use
import { routeAccessMap } from "@/lib/settings";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 🔹 Get user token/session
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("User Token:", token);
  const userRole = token?.role || "user";

  // 🔹 Check if this route has access rules
  for (const [pattern, allowedRoles] of Object.entries(routeAccessMap)) {
    const regex = new RegExp(`^${pattern}$`);
    if (regex.test(pathname)) {
      // Check access
      if (!allowedRoles.includes(userRole)) {
        const redirectUrl = new URL("/login", req.url);
        redirectUrl.searchParams.set("from", pathname);
        return NextResponse.redirect(redirectUrl);
      }
    }
  }

  return NextResponse.next();
}

// ✅ Apply to all routes that need protection
export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
