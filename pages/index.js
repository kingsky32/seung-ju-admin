import { gql, useQuery } from '@apollo/client';
import { Button } from '@mui/material';
import React from 'react';
import { signIn, useSession } from 'next-auth/react';

const USER_QUERY = gql`
  query User($id: ID!) {
    user(id: $id) {
      email
      username
      name
      nickname
      bio
    }
  }
`;

export default function HomePage() {
  const { data: session, status } = useSession();
  const { data } = useQuery(USER_QUERY, {
    variables: {
      id: 'cl7d02nk90000i9wseocaps2u',
    },
  });
  console.log('!!!', data);

  React.useEffect(() => {}, []);

  return (
    <div>
      <Button onClick={() => signIn('Credentials')}>Sign in</Button>
    </div>
  );
}
