import { gql } from '@apollo/client';

export const UTILITIES_FRAGMENT = gql`
  fragment UtilitiesFragment on utilities {
    id
    created_at
    updated_at
  }
`;
