import React from 'react';
import '#styles/reset.css';
import AdminLayout from '#components/layouts/AdminLayout';
import { SessionProvider } from 'next-auth/react';
import { useApollo } from '#graphql/apollo-client';
import { ApolloProvider } from '@apollo/client';
import NextLink from 'next/link';
import Link from '@mui/material/Link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Link.defaultProps = {
  component: NextLink,
};

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const apolloClient = useApollo(pageProps.initialApolloState);
  const Layout = React.useMemo(() => {
    if (router.pathname.startsWith('/admin')) return AdminLayout;
    return React.Fragment;
  }, [router.pathname]);

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
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ToastContainer position="bottom-left" />
      </ApolloProvider>
    </SessionProvider>
  );
}
