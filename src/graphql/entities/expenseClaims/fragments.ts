import { gql } from '@apollo/client';

export const EXPENSE_CLAIM_FRAGMENT = gql`
  fragment ExpenseClaimFragment on expense_claims {
    id
    employee_id
    project_id
    category_id
    amount
    startDate
    endDate
    created_at
    updated_at
    comment
    status_id
  }
`;
