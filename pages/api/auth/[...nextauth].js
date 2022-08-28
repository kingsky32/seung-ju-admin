import { initApolloClient } from '#graphql/apollo-client';
import { gql } from '@apollo/client';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const cookiesPolicy =
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
    : {};

const LoginMutation = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        email
        username
        name
        nickname
        bio
        createdAt
        updatedAt
      }
    }
  }
`;

export default NextAuth({
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
            mutation: LoginMutation,
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
  },
  cookies: cookiesPolicy,
});
