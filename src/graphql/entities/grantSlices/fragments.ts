import { gql } from '@apollo/client';

export const GRANT_SLICE_FRAGMENT = gql`
  fragment GrantFragment on grant_slices {
    id
    project_id
    amount
    received_date
    status
    created_at
    updated_at
  }
`;
