import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value || "";

  const isPublicPath = ["/", "/login", "/signup", "/verifyemail"].includes(path);

  if (isPublicPath && token) {
    // Prevent redirect loop: Only redirect if NOT already on "/"
    if (path !== "/") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (!isPublicPath && !token) {
    // Prevent redirect loop: Only redirect if NOT already on "/login"
    if (path !== "/login") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next(); // Allow normal page rendering
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/verifyemail",
    "/profile",
    "/profile/:id",
  ],
};
