import { type NextRequest, NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const checkPath = path === "/login" || path === "/signup" || path === "/";
  const tokenValue = request.cookies.get("token")?.value || "";

  if (checkPath && tokenValue) {
    return NextResponse.redirect(new URL("/task", request.url));
  }
  if (!checkPath && !tokenValue) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/signup", "/login", "/task"],
};
