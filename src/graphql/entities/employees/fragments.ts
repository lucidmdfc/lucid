import { gql } from '@apollo/client';

export const EMPLOYEE_FRAGMENT = gql`
  fragment EmployeeFragment on employees {
    id
    salaryName
    salaryFunction
    email
    phone
    grossSalary
    recruitmentDate
    status
    created_at
    updated_at
  }
`;
