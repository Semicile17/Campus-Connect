/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { publicRoutes, roleRoutes } from "@/lib/routeAccess";



export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  const cookieToken = req.cookies.get("token")?.value;
  const token = cookieToken;

  console.log(`🔍 Middleware - Path: ${pathname}, Token: ${token ? `Present (${token.length} chars)` : 'Missing'}`);

  // Allow static files and APIs
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.match(/\.(png|jpg|jpeg|svg|css|js|ico|woff2)$/)
  ) {
    return NextResponse.next();
  }

  const isPublicRoute = (publicRoutes as string[]).includes(pathname);

  // If user has token AND is on public route → redirect to dashboard
  if (isPublicRoute && token) {
    try {
      console.log("🔐 Verifying token on public route...");
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      console.log(`✅ Token valid! Role: ${decoded.role}`);
      
      let redirectUrl = "/dashboard/student";
      if (decoded.role === "admin") redirectUrl = "/dashboard/admin";
      if (decoded.role === "faculty") redirectUrl = "/dashboard/faculty";
      
      console.log(`🔄 Redirecting to: ${redirectUrl}`);
      return NextResponse.redirect(new URL(redirectUrl, req.url));
    } catch (error: any) {
      console.log(`❌ Token verification failed: ${error.message}`);
      // Clear invalid token and allow access to public route
      const response = NextResponse.next();
      response.cookies.delete("token");
      return response;
    }
  }

  // If public route and no token → allow access
  if (isPublicRoute && !token) {
    return NextResponse.next();
  }

  // Protected routes require valid token
  if (!token) {
    console.log("🚫 No token for protected route");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Verify token for protected routes
  try {
    console.log("🔐 Verifying token for protected route...");
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    console.log(`✅ Token valid for protected route! Role: ${decoded.role}`);

    const allowedRoutes = roleRoutes[decoded.role as keyof typeof roleRoutes] || [];
    const hasAccess = allowedRoutes.some((r: string) => pathname.startsWith(r));

    if (!hasAccess) {
      console.log(`🚫 Role ${decoded.role} cannot access ${pathname}`);
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    console.log(`✅ Access granted to ${pathname}`);
    return NextResponse.next();
  } catch (error: any) {
    console.log(`❌ Token verification failed for protected route: ${error.message}`);
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.delete("token");
    return response;
  }
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico|api|.*\\..*).*)"],
  runtime: "nodejs",
};