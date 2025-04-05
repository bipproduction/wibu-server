import { NextRequest, NextResponse } from "next/server";
import { SESSION } from "../types/session";

const url = process.env.BASE_URL;

if (!url) {
  throw new Error("NEXT_PUBLIC_WIBU_URL is not defined");
}

const isAdminRoute = (pathname: string) => {
  return pathname.startsWith("/admin");
};

const isLoginRoute = (pathname: string) => {
  return pathname === "/login" || pathname.startsWith("/login/");
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware untuk non-admin routes
  if (!isAdminRoute(pathname) && !isLoginRoute(pathname)) {
    return NextResponse.next();
  }

  // Ambil session
  const fetchHeaders = new Headers(request.headers);
  fetchHeaders.delete("connection");

  let session: SESSION | null = null;
  try {
    const sessionRes = await fetch(`${url}/api/user/session`, {
      headers: fetchHeaders,
      credentials: "include", // Pastikan cookie disertakan
    });
    
    if (!sessionRes.ok) {
      throw new Error("Session fetch failed");
    }
    
    session = await sessionRes.json();
  } catch (error) {
    console.error("Error fetching session:", error);
  }

  // Handle login route
  if (isLoginRoute(pathname)) {
    if (session?.user) {
      // Jika sudah login, redirect ke admin dashboard
      const redirectUrl = new URL("/admin", request.url);
      return NextResponse.redirect(redirectUrl);
    }
    // Jika belum login, izinkan akses ke login page
    return NextResponse.next();
  }

  // Handle admin routes
  if (isAdminRoute(pathname)) {
    if (!session?.user) {
      // Jika belum login, redirect ke login dengan return URL
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    // Jika sudah login, izinkan akses
    return NextResponse.next();
  }

  // Default case
  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};