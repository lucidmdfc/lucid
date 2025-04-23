import { gql } from '@apollo/client';
import { EMPLOYEE_FRAGMENT } from './fragments';
export const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee(
    $salaryName: String!
    $salaryFunction: String!
    $email: String!
    $phone: String
    $grossSalary: BigFloat!
    $recruitmentDate: Date!
    $status: String!
  ) {
    insertIntoemployeesCollection(
      objects: [
        {
          salaryName: $salaryName
          salaryFunction: $salaryFunction
          email: $email
          phone: $phone
          grossSalary: $grossSalary
          recruitmentDate: $recruitmentDate
          status: $status
        }
      ]
    ) {
      records {
        ...EmployeeFragment
      }
    }
  }
  ${EMPLOYEE_FRAGMENT}
`;
export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: Int!) {
    deleteFromemployeesCollection(filter: { id: { eq: $id } }) {
      affectedCount
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee(
    $id: Int!
    $salaryName: String!
    $salaryFunction: String!
    $email: String!
    $phone: String
    $grossSalary: BigFloat!
    $recruitmentDate: Date!
    $status: String!
  ) {
    updateemployeesCollection(
      filter: { id: { eq: $id } }
      set: {
        salaryName: $salaryName
        salaryFunction: $salaryFunction
        email: $email
        phone: $phone
        grossSalary: $grossSalary
        recruitmentDate: $recruitmentDate
        status: $status
      }
    ) {
      affectedCount
      records {
        ...EmployeeFragment
      }
    }
  }
  ${EMPLOYEE_FRAGMENT}
`;
