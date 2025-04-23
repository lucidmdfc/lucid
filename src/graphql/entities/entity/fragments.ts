import { gql } from '@apollo/client';

export const ENTITY_FRAGMENT = gql`
  fragment EntityFragment on entity {
    id
    fullName
    address
    email
    phone
    created_at
    updated_at
  }
`;
