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

      const cookieOptions = {
        path: '/',
        maxAge: 0,
        expires: new Date(0),
        httpOnly: true,
        secure: true,
        sameSite: 'lax' as const,
      };

      response.cookies.set(
        '__Secure-better-auth.session_token',
        '',
        cookieOptions,
      );
      response.cookies.set(
        '__Secure-better-auth.session_data',
        '',
        cookieOptions,
      );

      return response;
    }
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login', '/register'],
};
