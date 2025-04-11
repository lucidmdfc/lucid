import { gql } from '@apollo/client';

export const STATUS_FRAGMENT = gql`
  fragment StatusFragment on Status {
    id
    created_at
    name
  }
`;
