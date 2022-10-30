import redis from '#libs/redis';
import { UpstashRedisAdapter } from '@next-auth/upstash-redis-adapter';
import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  adapter: UpstashRedisAdapter(redis, {
    baseKeyPrefix: '',
    accountKeyPrefix: 'user:account:',
    accountByUserIdPrefix: 'user:account:by-user-id:',
    emailKeyPrefix: 'user:email:',
    sessionKeyPrefix: 'user:session:',
    sessionByUserIdKeyPrefix: 'user:session:by-user-id:',
    userKeyPrefix: 'user:',
    verificationTokenKeyPrefix: 'user:token:',
  }),
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  secret: process.env.JWT_SECRET_KEY,
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user) return null;
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );
        if (!isValid) return null;
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (session?.user) {
        session.user.id = token.uid;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
  pages: {
    signIn: '/sign_in',
    newUser: '/sign_up',
  },
  cookies:
    process.env.NODE_ENV === 'development'
      ? {
          sessionToken: {
            name: `_Secure_next-auth.session-token`,
            options: {
              httpOnly: true,
              sameSite: 'None',
              path: '/',
              secure: true,
            },
          },
        }
      : {},
});
