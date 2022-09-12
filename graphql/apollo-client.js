import React from 'react';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

let apolloClient = null;

function createApolloClient() {
  return new ApolloClient({
    uri: process.env.NEXT_PUBLIC_APOLLO_CLIENT_URI,
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: `${process.env.NEXT_PUBLIC_APOLLO_CLIENT_URI}/api/graphql`,
      credentials: 'same-origin',
    }),
    cache: new InMemoryCache(),
    connectToDevTools: process.env.NODE_ENV === 'development',
  });
}

export function initApolloClient(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    const extract = _apolloClient.extract();
    _apolloClient.cache.restore({ ...initialState, ...extract });
  }

  if (typeof window === 'undefined') return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState = null) {
  return React.useMemo(() => initApolloClient(initialState), [initialState]);
}

export default apolloClient;
