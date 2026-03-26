import { getSessionCookie } from 'better-auth/cookies';
import { type NextRequest, NextResponse } from 'next/server';

export async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  const pathName = request.nextUrl.pathname;

  const authRoutes = ['/login', '/register'];
  const protectedRoutes = ['/admin'];

  const isAuthRoute = authRoutes.some((route) => pathName.startsWith(route));

  // TODO: add path on protected route for user's page when we have it
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathName.startsWith(route),
  );

  if (!sessionCookie && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (sessionCookie && isAuthRoute) {
    if (
      pathName.startsWith('/login') &&
      request.nextUrl.searchParams.get('session_expired') === 'true'
    ) {
      const response = NextResponse.next();
      response.cookies.delete('__Secure-better-auth.session_token');
      response.cookies.delete('__Secure-better-auth.session_data');
      return response;
    }
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login', '/register'],
};
