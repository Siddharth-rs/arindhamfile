import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  // If user is logged in, token exists
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const { pathname } = req.nextUrl;
  // Allow the requests if the following is true...
  // 1) If the token exists
  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next();
  }

  // Redirect to Login screen if the user doesn't have a token and are requesting a protected route
  if (!token && pathname !== "/login") {
    const absoluteRedirectUrl = req.nextUrl.clone();
    absoluteRedirectUrl.pathname = '/login';
    return NextResponse.redirect(absoluteRedirectUrl);  //  NextResponse.redirect() doesn't take relative URLs, therefore to get absolute URL above 2 lines of code are written
    // return NextResponse.redirect('/login');
  }
}
