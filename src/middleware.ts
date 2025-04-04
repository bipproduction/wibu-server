import { NextRequest, NextResponse } from "next/server";
import { SESSION } from "../types/session";

const url = process.env.BASE_URL;

if (!url) {
  throw new Error("NEXT_PUBLIC_WIBU_URL is not defined");
}

const isAdminRoute = (pathname: string) => {
  return pathname.startsWith("/admin");
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isAdminRoute(pathname)) {
    return NextResponse.next();
  }

  const fetchHeaders = new Headers(request.headers);
  fetchHeaders.delete("connection"); // Hapus header Connection

  const sessionRes = await fetch(url + "/api/user/session", {
    headers: fetchHeaders,
  });
  const session: SESSION | null = await sessionRes.json().catch(() => null);

  if (!session?.user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
