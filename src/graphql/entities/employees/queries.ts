import { gql } from '@apollo/client';
import { EMPLOYEE_FRAGMENT } from './fragments';

export const GET_EMPLOYEES = gql`
  query GetEmployees(
    $filter: employeesFilter
    $first: Int
    $offset: Int
    $orderBy: [employeesOrderBy!]
  ) {
    employeesCollection(filter: $filter, first: $first, offset: $offset, orderBy: $orderBy) {
      edges {
        node {
          ...EmployeeFragment
        }
      }
    }
  }
  ${EMPLOYEE_FRAGMENT}
`;

export const GET_EMPLOYEE = gql`
  query GetEmployee($id: Int!) {
    employeesCollection(filter: { id: { eq: $id } }, first: 1) {
      edges {
        node {
          ...EmployeeFragment
        }
      }
    }
  }
  ${EMPLOYEE_FRAGMENT}
`;
