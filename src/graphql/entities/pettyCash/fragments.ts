import { gql } from '@apollo/client';

export const PETTY_CASH_FRAGMENT = gql`
  fragment PettyCashFragment on PettyCash {
    id
    grant_project_agreement_id
    category_id
    amount
    startDate
    motif
    created_at
    updated_at
    project
  }
`;
