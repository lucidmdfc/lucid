import { gql } from '@apollo/client';

export const EMPLOYEE_GRANT_ALLOCATION_FRAGMENT = gql`
  fragment EmployeeGrantAllocationFragment on EmployeeGrantAllocation {
    id
    employee_id
    project_id
    allocation_percentage
    effective_from
    effective_to
    created_at
    updated_at
    grant_project_agreement_id
  }
`;
