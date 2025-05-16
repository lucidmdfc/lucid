import { gql } from '@apollo/client';
import { EXPENSE_CLAIM_FRAGMENT } from './fragments';
export const CREATE_EXPENSE_CLAIM = gql`
  mutation CreateExpenseClaim(
    $employee_id: Int!
    $project_id: Int!
    $amount: BigFloat!
    $startDate: Date!
    $endDate: Date
  ) {
    insertIntoexpense_claimsCollection(
      objects: [
        {
          employee_id: $employee_id
          project_id: $project_id
          amount: $amount
          startDate: $startDate
          endDate: $startDate
        }
      ]
    ) {
      records {
        ...ExpenseClaimFragment
      }
    }
  }
  ${EXPENSE_CLAIM_FRAGMENT}
`;
export const DELETE_EXPENSE_CLAIM = gql`
  mutation DeleteExpenseClaim($id: Int!) {
    deleteFromexpense_claimsCollection(filter: { id: { eq: $id } }) {
      affectedCount
    }
  }
`;

export const UPDATE_EXPENSE_CLAIM = gql`
  mutation UpdateExpenseClaim($set: projectsUpdateInput!, $filter: projectsFilter, $atMost: Int!) {
    updateexpense_claimsCollection(set: $set, filter: $filter, atMost: $atMost) {
      records {
        ...ExpenseClaimFragment
      }
    }
  }
  ${EXPENSE_CLAIM_FRAGMENT}
`;
