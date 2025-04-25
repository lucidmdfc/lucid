import { gql } from '@apollo/client';
import { EXPENSE_CLAIM_FRAGMENT } from './fragments';

export const GET_EXPENSE_CLAIMS = gql`
  query GetExpenseClaims {
    expense_claimsCollection {
      edges {
        node {
          ...ExpenseClaimFragment
        }
      }
    }
  }
  ${EXPENSE_CLAIM_FRAGMENT}
`;
export const GET_EXPENSE_CLAIM = gql`
  query GetExpenceClaimById($id: Int!) {
    expense_claimsCollection(filter: { id: { eq: $id } }, first: 1) {
      edges {
        node {
          ...ExpenseClaimFragment
        }
      }
    }
  }
  ${EXPENSE_CLAIM_FRAGMENT}
`;
