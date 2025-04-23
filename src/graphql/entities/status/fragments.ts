import { gql } from '@apollo/client';

export const STATUS_FRAGMENT = gql`
  fragment StatusFragment on status {
    id
    created_at
    name
  }
`;
