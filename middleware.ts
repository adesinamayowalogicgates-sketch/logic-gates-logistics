import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login" || pathname === "/admin/register") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/app") || pathname.startsWith("/admin")) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET
    });

    if (
      pathname.startsWith("/app/login") ||
      pathname.startsWith("/app/register") ||
      pathname.startsWith("/app/verify-otp")
    ) {
      if (token) {
        const url = request.nextUrl.clone();
        url.pathname = "/app/dashboard";
        return NextResponse.redirect(url);
      }
      return NextResponse.next();
    }

    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = pathname.startsWith("/admin") ? "/admin/login" : "/app/login";
      return NextResponse.redirect(url);
    }

    if (pathname.startsWith("/admin")) {
      const email = (token.email as string | undefined) ?? "";
      if (!email.toLowerCase().endsWith("@logicgatesindustries.com")) {
        const url = request.nextUrl.clone();
        url.pathname = "/app";
        url.search = "error=admin_domain_required";
        return NextResponse.redirect(url);
      }
      const role = (token.role as string | undefined)?.toLowerCase();
      if (role !== "admin" && role !== "ops") {
        const url = request.nextUrl.clone();
        url.pathname = "/app";
        url.search = "error=not_authorized";
        return NextResponse.redirect(url);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*", "/admin/:path*"]
};
