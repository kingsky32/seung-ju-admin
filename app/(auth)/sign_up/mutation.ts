import { gql } from '@apollo/client';

export const JOIN_MUTATION = gql`
  mutation join(
    $firstName: String!
    $lastName: String!
    $nickname: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    join(
      firstName: $firstName
      lastName: $lastName
      nickname: $nickname
      username: $username
      email: $email
      password: $password
    ) {
      id
    }
  }
`;
