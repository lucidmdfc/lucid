import { gql } from '@apollo/client';
import { PROJECT_FRAGMENT } from '../projects/fragments';
import { EMPLOYEE_FRAGMENT } from '../employees/fragments';

export const EXPENSE_CLAIM_FRAGMENT = gql`
  fragment ExpenseClaimFragment on expense_claims {
    id
    employee_id
    project_id
    projects {
      ...ProjectFragment
    }
    employees {
      ...EmployeeFragment
    }
    amount
    startDate
    endDate
    created_at
    updated_at
    comment
    status
    transport_amount
    accommodation_amount
    meals_amount
    gifts_and_entertainment_amount
    documentation_amount
  }
  ${PROJECT_FRAGMENT}
  ${EMPLOYEE_FRAGMENT}
`;
