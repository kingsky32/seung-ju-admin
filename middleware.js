import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    console.log(req.nextauth.token);
  },
  {
    secret: process.env.JWT_SECRET_KEY,
    pages: {
      signIn: '/sign_in',
    },
    callback: {
      authorized: ({ token }) => {
        console.log(token);
        return true;
      },
    },
  },
);

export const config = {
  matcher: ['/admin'],
};
