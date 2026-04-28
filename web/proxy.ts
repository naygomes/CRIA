import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { TOKEN_COOKIE_NAME } from "@/settings";

export function proxy(request: NextRequest) {
  const token = request.cookies.get(TOKEN_COOKIE_NAME)?.value;

  const isLoginPage = request.nextUrl.pathname === "/login";
  if (isLoginPage && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const isMainPage = request.nextUrl.pathname === "/";
  if (isMainPage && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const isChildPage = request.nextUrl.pathname.startsWith("/child");
  if (isChildPage) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/",
    "/child",
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
};
