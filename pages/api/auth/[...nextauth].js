import { initApolloClient } from '#graphql/apollo-client';
import redis from '#libs/redis';
import { gql } from '@apollo/client';
import { UpstashRedisAdapter } from '@next-auth/upstash-redis-adapter';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        email
        username
        firstName
        lastName
        nickname
        bio
        createdAt
        updatedAt
      }
    }
  }
`;

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
        const apolloClient = initApolloClient();
        return apolloClient
          .mutate({
            mutation: LOGIN_MUTATION,
            variables: {
              email: credentials.email,
              password: credentials.password,
            },
          })
          .then(({ data }) => data.login.user);
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
    async session({ session, token }) {
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
