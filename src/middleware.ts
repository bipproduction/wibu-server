import { NextRequest, NextResponse } from "next/server";
import { SESSION } from "../types/session";

const isAdminRoute = (pathname: string) => {
  return pathname.startsWith("/admin");
};

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  if (!isAdminRoute(pathname)) {
    return NextResponse.next();
  }

  const sessionRes = await fetch(origin + "/api/user/session", {
    headers: request.headers
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
