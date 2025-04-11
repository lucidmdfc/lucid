import { gql } from '@apollo/client';

export const EMPLOYEE_FRAGMENT = gql`
  fragment EmployeeFragment on Employee {
    id
    salaryName
    salaryFunction
    email
    phone
    salary_transfer
    recruitmentDate
    status
    created_at
    updated_at
  }
`;
