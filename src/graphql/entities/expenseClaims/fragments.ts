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
    status_id
    transport_amount
    transport_document
    accommodation_amount
    accommodation_document
    meals_amount
    meals_document
    gifts_and_entertainment_amount
    gifts_and_entertainment_document
    documentation_amount
    documentation_document
  }
  ${PROJECT_FRAGMENT}
  ${EMPLOYEE_FRAGMENT}
`;
