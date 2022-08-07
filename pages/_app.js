import '#styles/reset.css';
import NextLink from 'next/link';
import Link from '@mui/material/Link';
import Head from 'next/head';

Link.defaultProps = {
  component: NextLink,
};

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
