import { getSessionCookie } from 'better-auth/cookies';
import { type NextRequest, NextResponse } from 'next/server';

export async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  const pathName = request.nextUrl.pathname;

  const isLoginRoute = pathName.startsWith('/login');
  const isProtectedRoute =
    pathName.startsWith('/dashboard') || pathName.startsWith('/admin');

  if (!sessionCookie && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (sessionCookie && isLoginRoute) {
    if (request.nextUrl.searchParams.get('session_expired') === 'true') {
      const response = NextResponse.next();
      response.cookies.delete('__Secure-better-auth.session_token');
      response.cookies.delete('__Secure-better-auth.session_data');
      return response;
    }
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/login'],
};
