import { gql } from '@apollo/client';

export const EXPENSE_CATEGORY_FRAGMENT = gql`
  fragment ExpenseCategoryFragment on ExpenseCategory {
    id
    name
    description
    created_at
    updated_at
  }
`;
