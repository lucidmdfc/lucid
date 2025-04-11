import { gql } from '@apollo/client';

export const ENTITY_FRAGMENT = gql`
  fragment EntityFragment on Entity {
    id
    fullName
    address
    email
    phone
    created_at
    updated_at
  }
`;
