import { gql } from '@apollo/client';

export const UTILITY_GRANT_ALLOCATION_FRAGMENT = gql`
  fragment UtilityGrantAllocationFragment on utility_grant_allocations {
    id
    utility_id
    grant_project_agreement_id
    allocation_percentage
    amount
    created_at
    updated_at
    project_id
  }
`;
