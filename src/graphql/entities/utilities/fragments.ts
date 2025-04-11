import { gql } from '@apollo/client';

export const UTILITIES_FRAGMENT = gql`
  fragment UtilitiesFragment on Utilities {
    id
    category
    amount
    date
    created_at
    updated_at
  }
`;
