import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '#libs/session';

export default withAuth(
  async function middleware(request: NextRequest): Promise<NextResponse> {
    const cookie = request.headers.get('cookie');
    if (cookie) {
      const session = await getSession(cookie);
      if (session) {
        if (
          ['/sign_in', '/sign_up', '/forgot_password'].some((value) =>
            request.nextUrl.pathname.startsWith(value),
          )
        ) {
          return NextResponse.redirect(new URL('/', request.url));
        }
        return NextResponse.next();
      }
    }
    if (
      ['/sign_in', '/sign_up', '/forgot_password'].some((value) =>
        request.nextUrl.pathname.startsWith(value),
      )
    ) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/sign_in', request.url));
  },
  {
    secret: process.env.JWT_SECRET_KEY,
    pages: {
      signIn: '/sign_in',
    },
    callbacks: {
      authorized: (): boolean => {
        return true;
      },
    },
  },
);

export const config = {
  matcher: ['/sign_in', '/sign_up', '/forgot_password', '/admin'],
};
