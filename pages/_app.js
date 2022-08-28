import '#styles/reset.css';
import { SessionProvider } from 'next-auth/react';
import { useApollo } from '#graphql/apollo-client';
import { ApolloProvider } from '@apollo/client';
import NextLink from 'next/link';
import Link from '@mui/material/Link';
import Head from 'next/head';

Link.defaultProps = {
  component: NextLink,
};

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <SessionProvider
      session={pageProps.session}
      refetchInterval={5 * 60}
      refetchOnWindowFocus
    >
      <ApolloProvider client={apolloClient}>
        <Head>
          <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
        </Head>
        <Component {...pageProps} />
      </ApolloProvider>
    </SessionProvider>
  );
}
