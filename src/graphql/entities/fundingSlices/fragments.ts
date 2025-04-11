import { gql } from '@apollo/client';

export const FUNDING_SLICE_FRAGMENT = gql`
  fragment FundingSliceFragment on FundingSlice {
    id
    grant_project_agreement_id
    amount
    received_date
    status
    created_at
    updated_at
  }
`;
