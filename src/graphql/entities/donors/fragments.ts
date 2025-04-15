import { gql } from '@apollo/client';

export const DONOR_FRAGMENT = gql`
  fragment DonorFragment on donors {
    id
    name
    email
    phone
    created_at
    updated_at
    note
  }
`;
