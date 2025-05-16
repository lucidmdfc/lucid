import * as Types from 'src/types/generatedTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export const ClientFragmentFragmentDoc = gql`
    fragment ClientFragment on clients {
  id
  entity_id
  created_at
  updated_at
  ice
}
    `;
export const DonorFragmentFragmentDoc = gql`
    fragment DonorFragment on donors {
  id
  name
  email
  phone
  created_at
  updated_at
  note
}
    `;
export const EmployeeGrantAllocationFragmentFragmentDoc = gql`
    fragment EmployeeGrantAllocationFragment on employee_grant_allocations {
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
export const EntityFragmentFragmentDoc = gql`
    fragment EntityFragment on entity {
  id
  fullName
  address
  email
  phone
  created_at
  updated_at
}
    `;
export const ExpenseCategoryFragmentFragmentDoc = gql`
    fragment ExpenseCategoryFragment on expense_categories {
  id
  name
  description
  created_at
  updated_at
}
    `;
export const ProjectFragmentFragmentDoc = gql`
    fragment ProjectFragment on projects {
  id
  name
  description
  start_date
  end_date
  project_budget
  created_at
  updated_at
  status
  note
  contact_person_email
  contact_person_name
}
    `;
export const EmployeeFragmentFragmentDoc = gql`
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
export const ExpenseClaimFragmentFragmentDoc = gql`
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
    ${ProjectFragmentFragmentDoc}
${EmployeeFragmentFragmentDoc}`;
export const GrantProjectAgreementFragmentFragmentDoc = gql`
    fragment GrantProjectAgreementFragment on grant_project_agreement {
  id
  project_id
  grant
  agreement_date
  created_at
  updated_at
  donor_id
}
    `;
export const GrantFragmentFragmentDoc = gql`
    fragment GrantFragment on grant_slices {
  id
  project_id
  amount
  received_date
  status
  created_at
  updated_at
}
    `;
export const IssuedInvoiceFragmentFragmentDoc = gql`
    fragment IssuedInvoiceFragment on issued_invoices {
  id
  client_id
  project_id
  amount
  issue_date
  due_date
  billingStatus
  created_at
  updated_at
  designation
}
    `;
export const MemberFragmentFragmentDoc = gql`
    fragment MemberFragment on members {
  id
  amount
  payment_date
  created_at
  updated_at
  rc_cin
  payment_method
  status
  full_name
  address
  email
  phone
}
    `;
export const MembershipFragmentFragmentDoc = gql`
    fragment MembershipFragment on memberships {
  id
  created_at
  member_id
  updated_at
  membership_category
}
    `;
export const PettyCashFragmentFragmentDoc = gql`
    fragment PettyCashFragment on petty_cash {
  id
  grant_project_agreement_id
  category_id
  amount
  startDate
  motif
  created_at
  updated_at
  project
}
    `;
export const ProviderInvoiceFragmentFragmentDoc = gql`
    fragment ProviderInvoiceFragment on provider_invoices {
  id
  service_provider_id
  project_id
  invoice_number
  amount
  issue_date
  due_date
  payment_date
  status
  created_at
  updated_at
}
    `;
export const ProvidersInvoiceProjectFragmentFragmentDoc = gql`
    fragment ProvidersInvoiceProjectFragment on providers_invoice_project {
  id
  created_at
  updated_at
  provider_invoice_id
  project_id
}
    `;
export const ServiceProviderFragmentFragmentDoc = gql`
    fragment ServiceProviderFragment on service_providers {
  id
  name
  email
  phone
  created_at
  updated_at
  ice
  depositedDate
  dueDate
  amount
  status_id
}
    `;
export const StatusFragmentFragmentDoc = gql`
    fragment StatusFragment on status {
  id
  created_at
  name
}
    `;
export const UtilitiesFragmentFragmentDoc = gql`
    fragment UtilitiesFragment on utilities {
  id
  created_at
  updated_at
}
    `;
export const UtilityGrantAllocationFragmentFragmentDoc = gql`
    fragment UtilityGrantAllocationFragment on utility_grant_allocations {
  id
  utility_id
  grant_project_agreement_id
  allocation_percentage
  amount
  created_at
  updated_at
  project_id
}
    `;
export const CreateDonorDocument = gql`
    mutation CreateDonor($name: String!, $email: String!, $phone: String, $note: String) {
  insertIntodonorsCollection(
    objects: [{name: $name, email: $email, phone: $phone, note: $note}]
  ) {
    records {
      ...DonorFragment
    }
  }
}
    ${DonorFragmentFragmentDoc}`;
export type CreateDonorMutationFn = Apollo.MutationFunction<Types.CreateDonorMutation, Types.CreateDonorMutationVariables>;

/**
 * __useCreateDonorMutation__
 *
 * To run a mutation, you first call `useCreateDonorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDonorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDonorMutation, { data, loading, error }] = useCreateDonorMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      phone: // value for 'phone'
 *      note: // value for 'note'
 *   },
 * });
 */
export function useCreateDonorMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateDonorMutation, Types.CreateDonorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateDonorMutation, Types.CreateDonorMutationVariables>(CreateDonorDocument, options);
      }
export type CreateDonorMutationHookResult = ReturnType<typeof useCreateDonorMutation>;
export type CreateDonorMutationResult = Apollo.MutationResult<Types.CreateDonorMutation>;
export type CreateDonorMutationOptions = Apollo.BaseMutationOptions<Types.CreateDonorMutation, Types.CreateDonorMutationVariables>;
export const UpdateDonorDocument = gql`
    mutation UpdateDonor($set: donorsUpdateInput!, $filter: donorsFilter, $atMost: Int!) {
  updatedonorsCollection(set: $set, filter: $filter, atMost: $atMost) {
    records {
      ...DonorFragment
    }
  }
}
    ${DonorFragmentFragmentDoc}`;
export type UpdateDonorMutationFn = Apollo.MutationFunction<Types.UpdateDonorMutation, Types.UpdateDonorMutationVariables>;

/**
 * __useUpdateDonorMutation__
 *
 * To run a mutation, you first call `useUpdateDonorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDonorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDonorMutation, { data, loading, error }] = useUpdateDonorMutation({
 *   variables: {
 *      set: // value for 'set'
 *      filter: // value for 'filter'
 *      atMost: // value for 'atMost'
 *   },
 * });
 */
export function useUpdateDonorMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateDonorMutation, Types.UpdateDonorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateDonorMutation, Types.UpdateDonorMutationVariables>(UpdateDonorDocument, options);
      }
export type UpdateDonorMutationHookResult = ReturnType<typeof useUpdateDonorMutation>;
export type UpdateDonorMutationResult = Apollo.MutationResult<Types.UpdateDonorMutation>;
export type UpdateDonorMutationOptions = Apollo.BaseMutationOptions<Types.UpdateDonorMutation, Types.UpdateDonorMutationVariables>;
export const DeleteDonorDocument = gql`
    mutation DeleteDonor($id: Int!) {
  deleteFromdonorsCollection(filter: {id: {eq: $id}}) {
    affectedCount
  }
}
    `;
export type DeleteDonorMutationFn = Apollo.MutationFunction<Types.DeleteDonorMutation, Types.DeleteDonorMutationVariables>;

/**
 * __useDeleteDonorMutation__
 *
 * To run a mutation, you first call `useDeleteDonorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDonorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDonorMutation, { data, loading, error }] = useDeleteDonorMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteDonorMutation(baseOptions?: Apollo.MutationHookOptions<Types.DeleteDonorMutation, Types.DeleteDonorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DeleteDonorMutation, Types.DeleteDonorMutationVariables>(DeleteDonorDocument, options);
      }
export type DeleteDonorMutationHookResult = ReturnType<typeof useDeleteDonorMutation>;
export type DeleteDonorMutationResult = Apollo.MutationResult<Types.DeleteDonorMutation>;
export type DeleteDonorMutationOptions = Apollo.BaseMutationOptions<Types.DeleteDonorMutation, Types.DeleteDonorMutationVariables>;
export const GetDonorsDocument = gql`
    query GetDonors {
  donorsCollection {
    edges {
      node {
        ...DonorFragment
      }
    }
  }
}
    ${DonorFragmentFragmentDoc}`;

/**
 * __useGetDonorsQuery__
 *
 * To run a query within a React component, call `useGetDonorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDonorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDonorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDonorsQuery(baseOptions?: Apollo.QueryHookOptions<Types.GetDonorsQuery, Types.GetDonorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.GetDonorsQuery, Types.GetDonorsQueryVariables>(GetDonorsDocument, options);
      }
export function useGetDonorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.GetDonorsQuery, Types.GetDonorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.GetDonorsQuery, Types.GetDonorsQueryVariables>(GetDonorsDocument, options);
        }
export function useGetDonorsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.GetDonorsQuery, Types.GetDonorsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.GetDonorsQuery, Types.GetDonorsQueryVariables>(GetDonorsDocument, options);
        }
export type GetDonorsQueryHookResult = ReturnType<typeof useGetDonorsQuery>;
export type GetDonorsLazyQueryHookResult = ReturnType<typeof useGetDonorsLazyQuery>;
export type GetDonorsSuspenseQueryHookResult = ReturnType<typeof useGetDonorsSuspenseQuery>;
export type GetDonorsQueryResult = Apollo.QueryResult<Types.GetDonorsQuery, Types.GetDonorsQueryVariables>;
export const GetDonorByIdDocument = gql`
    query GetDonorById($id: Int!) {
  donorsCollection(filter: {id: {eq: $id}}, first: 1) {
    edges {
      node {
        ...DonorFragment
      }
    }
  }
}
    ${DonorFragmentFragmentDoc}`;

/**
 * __useGetDonorByIdQuery__
 *
 * To run a query within a React component, call `useGetDonorByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDonorByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDonorByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetDonorByIdQuery(baseOptions: Apollo.QueryHookOptions<Types.GetDonorByIdQuery, Types.GetDonorByIdQueryVariables> & ({ variables: Types.GetDonorByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.GetDonorByIdQuery, Types.GetDonorByIdQueryVariables>(GetDonorByIdDocument, options);
      }
export function useGetDonorByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.GetDonorByIdQuery, Types.GetDonorByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.GetDonorByIdQuery, Types.GetDonorByIdQueryVariables>(GetDonorByIdDocument, options);
        }
export function useGetDonorByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.GetDonorByIdQuery, Types.GetDonorByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.GetDonorByIdQuery, Types.GetDonorByIdQueryVariables>(GetDonorByIdDocument, options);
        }
export type GetDonorByIdQueryHookResult = ReturnType<typeof useGetDonorByIdQuery>;
export type GetDonorByIdLazyQueryHookResult = ReturnType<typeof useGetDonorByIdLazyQuery>;
export type GetDonorByIdSuspenseQueryHookResult = ReturnType<typeof useGetDonorByIdSuspenseQuery>;
export type GetDonorByIdQueryResult = Apollo.QueryResult<Types.GetDonorByIdQuery, Types.GetDonorByIdQueryVariables>;
export const CreateEmployeeDocument = gql`
    mutation CreateEmployee($salaryName: String!, $salaryFunction: String!, $email: String!, $phone: String, $grossSalary: BigFloat!, $recruitmentDate: Date!, $status: String!) {
  insertIntoemployeesCollection(
    objects: [{salaryName: $salaryName, salaryFunction: $salaryFunction, email: $email, phone: $phone, grossSalary: $grossSalary, recruitmentDate: $recruitmentDate, status: $status}]
  ) {
    records {
      ...EmployeeFragment
    }
  }
}
    ${EmployeeFragmentFragmentDoc}`;
export type CreateEmployeeMutationFn = Apollo.MutationFunction<Types.CreateEmployeeMutation, Types.CreateEmployeeMutationVariables>;

/**
 * __useCreateEmployeeMutation__
 *
 * To run a mutation, you first call `useCreateEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEmployeeMutation, { data, loading, error }] = useCreateEmployeeMutation({
 *   variables: {
 *      salaryName: // value for 'salaryName'
 *      salaryFunction: // value for 'salaryFunction'
 *      email: // value for 'email'
 *      phone: // value for 'phone'
 *      grossSalary: // value for 'grossSalary'
 *      recruitmentDate: // value for 'recruitmentDate'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useCreateEmployeeMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateEmployeeMutation, Types.CreateEmployeeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateEmployeeMutation, Types.CreateEmployeeMutationVariables>(CreateEmployeeDocument, options);
      }
export type CreateEmployeeMutationHookResult = ReturnType<typeof useCreateEmployeeMutation>;
export type CreateEmployeeMutationResult = Apollo.MutationResult<Types.CreateEmployeeMutation>;
export type CreateEmployeeMutationOptions = Apollo.BaseMutationOptions<Types.CreateEmployeeMutation, Types.CreateEmployeeMutationVariables>;
export const DeleteEmployeeDocument = gql`
    mutation DeleteEmployee($id: Int!) {
  deleteFromemployeesCollection(filter: {id: {eq: $id}}) {
    affectedCount
  }
}
    `;
export type DeleteEmployeeMutationFn = Apollo.MutationFunction<Types.DeleteEmployeeMutation, Types.DeleteEmployeeMutationVariables>;

/**
 * __useDeleteEmployeeMutation__
 *
 * To run a mutation, you first call `useDeleteEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEmployeeMutation, { data, loading, error }] = useDeleteEmployeeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteEmployeeMutation(baseOptions?: Apollo.MutationHookOptions<Types.DeleteEmployeeMutation, Types.DeleteEmployeeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DeleteEmployeeMutation, Types.DeleteEmployeeMutationVariables>(DeleteEmployeeDocument, options);
      }
export type DeleteEmployeeMutationHookResult = ReturnType<typeof useDeleteEmployeeMutation>;
export type DeleteEmployeeMutationResult = Apollo.MutationResult<Types.DeleteEmployeeMutation>;
export type DeleteEmployeeMutationOptions = Apollo.BaseMutationOptions<Types.DeleteEmployeeMutation, Types.DeleteEmployeeMutationVariables>;
export const UpdateEmployeeDocument = gql`
    mutation UpdateEmployee($id: Int!, $salaryName: String!, $salaryFunction: String!, $email: String!, $phone: String, $grossSalary: BigFloat!, $recruitmentDate: Date!, $status: String!) {
  updateemployeesCollection(
    filter: {id: {eq: $id}}
    set: {salaryName: $salaryName, salaryFunction: $salaryFunction, email: $email, phone: $phone, grossSalary: $grossSalary, recruitmentDate: $recruitmentDate, status: $status}
  ) {
    affectedCount
    records {
      ...EmployeeFragment
    }
  }
}
    ${EmployeeFragmentFragmentDoc}`;
export type UpdateEmployeeMutationFn = Apollo.MutationFunction<Types.UpdateEmployeeMutation, Types.UpdateEmployeeMutationVariables>;

/**
 * __useUpdateEmployeeMutation__
 *
 * To run a mutation, you first call `useUpdateEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEmployeeMutation, { data, loading, error }] = useUpdateEmployeeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      salaryName: // value for 'salaryName'
 *      salaryFunction: // value for 'salaryFunction'
 *      email: // value for 'email'
 *      phone: // value for 'phone'
 *      grossSalary: // value for 'grossSalary'
 *      recruitmentDate: // value for 'recruitmentDate'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdateEmployeeMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateEmployeeMutation, Types.UpdateEmployeeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateEmployeeMutation, Types.UpdateEmployeeMutationVariables>(UpdateEmployeeDocument, options);
      }
export type UpdateEmployeeMutationHookResult = ReturnType<typeof useUpdateEmployeeMutation>;
export type UpdateEmployeeMutationResult = Apollo.MutationResult<Types.UpdateEmployeeMutation>;
export type UpdateEmployeeMutationOptions = Apollo.BaseMutationOptions<Types.UpdateEmployeeMutation, Types.UpdateEmployeeMutationVariables>;
export const GetEmployeesDocument = gql`
    query GetEmployees($filter: employeesFilter, $first: Int, $offset: Int, $orderBy: [employeesOrderBy!]) {
  employeesCollection(
    filter: $filter
    first: $first
    offset: $offset
    orderBy: $orderBy
  ) {
    edges {
      node {
        ...EmployeeFragment
      }
    }
  }
}
    ${EmployeeFragmentFragmentDoc}`;

/**
 * __useGetEmployeesQuery__
 *
 * To run a query within a React component, call `useGetEmployeesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEmployeesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEmployeesQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      first: // value for 'first'
 *      offset: // value for 'offset'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useGetEmployeesQuery(baseOptions?: Apollo.QueryHookOptions<Types.GetEmployeesQuery, Types.GetEmployeesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.GetEmployeesQuery, Types.GetEmployeesQueryVariables>(GetEmployeesDocument, options);
      }
export function useGetEmployeesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.GetEmployeesQuery, Types.GetEmployeesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.GetEmployeesQuery, Types.GetEmployeesQueryVariables>(GetEmployeesDocument, options);
        }
export function useGetEmployeesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.GetEmployeesQuery, Types.GetEmployeesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.GetEmployeesQuery, Types.GetEmployeesQueryVariables>(GetEmployeesDocument, options);
        }
export type GetEmployeesQueryHookResult = ReturnType<typeof useGetEmployeesQuery>;
export type GetEmployeesLazyQueryHookResult = ReturnType<typeof useGetEmployeesLazyQuery>;
export type GetEmployeesSuspenseQueryHookResult = ReturnType<typeof useGetEmployeesSuspenseQuery>;
export type GetEmployeesQueryResult = Apollo.QueryResult<Types.GetEmployeesQuery, Types.GetEmployeesQueryVariables>;
export const GetEmployeeDocument = gql`
    query GetEmployee($id: Int!) {
  employeesCollection(filter: {id: {eq: $id}}, first: 1) {
    edges {
      node {
        ...EmployeeFragment
      }
    }
  }
}
    ${EmployeeFragmentFragmentDoc}`;

/**
 * __useGetEmployeeQuery__
 *
 * To run a query within a React component, call `useGetEmployeeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEmployeeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEmployeeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetEmployeeQuery(baseOptions: Apollo.QueryHookOptions<Types.GetEmployeeQuery, Types.GetEmployeeQueryVariables> & ({ variables: Types.GetEmployeeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.GetEmployeeQuery, Types.GetEmployeeQueryVariables>(GetEmployeeDocument, options);
      }
export function useGetEmployeeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.GetEmployeeQuery, Types.GetEmployeeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.GetEmployeeQuery, Types.GetEmployeeQueryVariables>(GetEmployeeDocument, options);
        }
export function useGetEmployeeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.GetEmployeeQuery, Types.GetEmployeeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.GetEmployeeQuery, Types.GetEmployeeQueryVariables>(GetEmployeeDocument, options);
        }
export type GetEmployeeQueryHookResult = ReturnType<typeof useGetEmployeeQuery>;
export type GetEmployeeLazyQueryHookResult = ReturnType<typeof useGetEmployeeLazyQuery>;
export type GetEmployeeSuspenseQueryHookResult = ReturnType<typeof useGetEmployeeSuspenseQuery>;
export type GetEmployeeQueryResult = Apollo.QueryResult<Types.GetEmployeeQuery, Types.GetEmployeeQueryVariables>;
export const CreateExpenseClaimDocument = gql`
    mutation CreateExpenseClaim($employee_id: Int!, $project_id: Int!, $amount: BigFloat!, $startDate: Date!, $endDate: Date) {
  insertIntoexpense_claimsCollection(
    objects: [{employee_id: $employee_id, project_id: $project_id, amount: $amount, startDate: $startDate, endDate: $startDate}]
  ) {
    records {
      ...ExpenseClaimFragment
    }
  }
}
    ${ExpenseClaimFragmentFragmentDoc}`;
export type CreateExpenseClaimMutationFn = Apollo.MutationFunction<Types.CreateExpenseClaimMutation, Types.CreateExpenseClaimMutationVariables>;

/**
 * __useCreateExpenseClaimMutation__
 *
 * To run a mutation, you first call `useCreateExpenseClaimMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExpenseClaimMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExpenseClaimMutation, { data, loading, error }] = useCreateExpenseClaimMutation({
 *   variables: {
 *      employee_id: // value for 'employee_id'
 *      project_id: // value for 'project_id'
 *      amount: // value for 'amount'
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *   },
 * });
 */
export function useCreateExpenseClaimMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateExpenseClaimMutation, Types.CreateExpenseClaimMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateExpenseClaimMutation, Types.CreateExpenseClaimMutationVariables>(CreateExpenseClaimDocument, options);
      }
export type CreateExpenseClaimMutationHookResult = ReturnType<typeof useCreateExpenseClaimMutation>;
export type CreateExpenseClaimMutationResult = Apollo.MutationResult<Types.CreateExpenseClaimMutation>;
export type CreateExpenseClaimMutationOptions = Apollo.BaseMutationOptions<Types.CreateExpenseClaimMutation, Types.CreateExpenseClaimMutationVariables>;
export const DeleteExpenseClaimDocument = gql`
    mutation DeleteExpenseClaim($id: Int!) {
  deleteFromexpense_claimsCollection(filter: {id: {eq: $id}}) {
    affectedCount
  }
}
    `;
export type DeleteExpenseClaimMutationFn = Apollo.MutationFunction<Types.DeleteExpenseClaimMutation, Types.DeleteExpenseClaimMutationVariables>;

/**
 * __useDeleteExpenseClaimMutation__
 *
 * To run a mutation, you first call `useDeleteExpenseClaimMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteExpenseClaimMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteExpenseClaimMutation, { data, loading, error }] = useDeleteExpenseClaimMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteExpenseClaimMutation(baseOptions?: Apollo.MutationHookOptions<Types.DeleteExpenseClaimMutation, Types.DeleteExpenseClaimMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DeleteExpenseClaimMutation, Types.DeleteExpenseClaimMutationVariables>(DeleteExpenseClaimDocument, options);
      }
export type DeleteExpenseClaimMutationHookResult = ReturnType<typeof useDeleteExpenseClaimMutation>;
export type DeleteExpenseClaimMutationResult = Apollo.MutationResult<Types.DeleteExpenseClaimMutation>;
export type DeleteExpenseClaimMutationOptions = Apollo.BaseMutationOptions<Types.DeleteExpenseClaimMutation, Types.DeleteExpenseClaimMutationVariables>;
export const GetExpenseClaimsDocument = gql`
    query GetExpenseClaims {
  expense_claimsCollection {
    edges {
      node {
        ...ExpenseClaimFragment
      }
    }
  }
}
    ${ExpenseClaimFragmentFragmentDoc}`;

/**
 * __useGetExpenseClaimsQuery__
 *
 * To run a query within a React component, call `useGetExpenseClaimsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExpenseClaimsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExpenseClaimsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetExpenseClaimsQuery(baseOptions?: Apollo.QueryHookOptions<Types.GetExpenseClaimsQuery, Types.GetExpenseClaimsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.GetExpenseClaimsQuery, Types.GetExpenseClaimsQueryVariables>(GetExpenseClaimsDocument, options);
      }
export function useGetExpenseClaimsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.GetExpenseClaimsQuery, Types.GetExpenseClaimsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.GetExpenseClaimsQuery, Types.GetExpenseClaimsQueryVariables>(GetExpenseClaimsDocument, options);
        }
export function useGetExpenseClaimsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.GetExpenseClaimsQuery, Types.GetExpenseClaimsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.GetExpenseClaimsQuery, Types.GetExpenseClaimsQueryVariables>(GetExpenseClaimsDocument, options);
        }
export type GetExpenseClaimsQueryHookResult = ReturnType<typeof useGetExpenseClaimsQuery>;
export type GetExpenseClaimsLazyQueryHookResult = ReturnType<typeof useGetExpenseClaimsLazyQuery>;
export type GetExpenseClaimsSuspenseQueryHookResult = ReturnType<typeof useGetExpenseClaimsSuspenseQuery>;
export type GetExpenseClaimsQueryResult = Apollo.QueryResult<Types.GetExpenseClaimsQuery, Types.GetExpenseClaimsQueryVariables>;
export const GetExpenceClaimByIdDocument = gql`
    query GetExpenceClaimById($id: Int!) {
  expense_claimsCollection(filter: {id: {eq: $id}}, first: 1) {
    edges {
      node {
        ...ExpenseClaimFragment
      }
    }
  }
}
    ${ExpenseClaimFragmentFragmentDoc}`;

/**
 * __useGetExpenceClaimByIdQuery__
 *
 * To run a query within a React component, call `useGetExpenceClaimByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExpenceClaimByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExpenceClaimByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetExpenceClaimByIdQuery(baseOptions: Apollo.QueryHookOptions<Types.GetExpenceClaimByIdQuery, Types.GetExpenceClaimByIdQueryVariables> & ({ variables: Types.GetExpenceClaimByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.GetExpenceClaimByIdQuery, Types.GetExpenceClaimByIdQueryVariables>(GetExpenceClaimByIdDocument, options);
      }
export function useGetExpenceClaimByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.GetExpenceClaimByIdQuery, Types.GetExpenceClaimByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.GetExpenceClaimByIdQuery, Types.GetExpenceClaimByIdQueryVariables>(GetExpenceClaimByIdDocument, options);
        }
export function useGetExpenceClaimByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.GetExpenceClaimByIdQuery, Types.GetExpenceClaimByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.GetExpenceClaimByIdQuery, Types.GetExpenceClaimByIdQueryVariables>(GetExpenceClaimByIdDocument, options);
        }
export type GetExpenceClaimByIdQueryHookResult = ReturnType<typeof useGetExpenceClaimByIdQuery>;
export type GetExpenceClaimByIdLazyQueryHookResult = ReturnType<typeof useGetExpenceClaimByIdLazyQuery>;
export type GetExpenceClaimByIdSuspenseQueryHookResult = ReturnType<typeof useGetExpenceClaimByIdSuspenseQuery>;
export type GetExpenceClaimByIdQueryResult = Apollo.QueryResult<Types.GetExpenceClaimByIdQuery, Types.GetExpenceClaimByIdQueryVariables>;
export const CreateGrantAgreementDocument = gql`
    mutation CreateGrantAgreement($donor_id: Int!, $project_id: Int!, $grant: BigFloat!, $agreement_date: Date!) {
  insertIntogrant_project_agreementCollection(
    objects: [{donor_id: $donor_id, project_id: $project_id, grant: $grant, agreement_date: $agreement_date}]
  ) {
    records {
      ...GrantProjectAgreementFragment
    }
  }
}
    ${GrantProjectAgreementFragmentFragmentDoc}`;
export type CreateGrantAgreementMutationFn = Apollo.MutationFunction<Types.CreateGrantAgreementMutation, Types.CreateGrantAgreementMutationVariables>;

/**
 * __useCreateGrantAgreementMutation__
 *
 * To run a mutation, you first call `useCreateGrantAgreementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGrantAgreementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGrantAgreementMutation, { data, loading, error }] = useCreateGrantAgreementMutation({
 *   variables: {
 *      donor_id: // value for 'donor_id'
 *      project_id: // value for 'project_id'
 *      grant: // value for 'grant'
 *      agreement_date: // value for 'agreement_date'
 *   },
 * });
 */
export function useCreateGrantAgreementMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateGrantAgreementMutation, Types.CreateGrantAgreementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateGrantAgreementMutation, Types.CreateGrantAgreementMutationVariables>(CreateGrantAgreementDocument, options);
      }
export type CreateGrantAgreementMutationHookResult = ReturnType<typeof useCreateGrantAgreementMutation>;
export type CreateGrantAgreementMutationResult = Apollo.MutationResult<Types.CreateGrantAgreementMutation>;
export type CreateGrantAgreementMutationOptions = Apollo.BaseMutationOptions<Types.CreateGrantAgreementMutation, Types.CreateGrantAgreementMutationVariables>;
export const GetGrantProjectAgreementDocument = gql`
    query GetGrantProjectAgreement {
  grant_project_agreementCollection {
    edges {
      node {
        ...GrantProjectAgreementFragment
      }
    }
  }
}
    ${GrantProjectAgreementFragmentFragmentDoc}`;

/**
 * __useGetGrantProjectAgreementQuery__
 *
 * To run a query within a React component, call `useGetGrantProjectAgreementQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGrantProjectAgreementQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGrantProjectAgreementQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetGrantProjectAgreementQuery(baseOptions?: Apollo.QueryHookOptions<Types.GetGrantProjectAgreementQuery, Types.GetGrantProjectAgreementQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.GetGrantProjectAgreementQuery, Types.GetGrantProjectAgreementQueryVariables>(GetGrantProjectAgreementDocument, options);
      }
export function useGetGrantProjectAgreementLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.GetGrantProjectAgreementQuery, Types.GetGrantProjectAgreementQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.GetGrantProjectAgreementQuery, Types.GetGrantProjectAgreementQueryVariables>(GetGrantProjectAgreementDocument, options);
        }
export function useGetGrantProjectAgreementSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.GetGrantProjectAgreementQuery, Types.GetGrantProjectAgreementQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.GetGrantProjectAgreementQuery, Types.GetGrantProjectAgreementQueryVariables>(GetGrantProjectAgreementDocument, options);
        }
export type GetGrantProjectAgreementQueryHookResult = ReturnType<typeof useGetGrantProjectAgreementQuery>;
export type GetGrantProjectAgreementLazyQueryHookResult = ReturnType<typeof useGetGrantProjectAgreementLazyQuery>;
export type GetGrantProjectAgreementSuspenseQueryHookResult = ReturnType<typeof useGetGrantProjectAgreementSuspenseQuery>;
export type GetGrantProjectAgreementQueryResult = Apollo.QueryResult<Types.GetGrantProjectAgreementQuery, Types.GetGrantProjectAgreementQueryVariables>;
export const DeleteGrantSliceDocument = gql`
    mutation DeleteGrantSlice($id: Int!) {
  deleteFromgrant_slicesCollection(filter: {id: {eq: $id}}) {
    affectedCount
  }
}
    `;
export type DeleteGrantSliceMutationFn = Apollo.MutationFunction<Types.DeleteGrantSliceMutation, Types.DeleteGrantSliceMutationVariables>;

/**
 * __useDeleteGrantSliceMutation__
 *
 * To run a mutation, you first call `useDeleteGrantSliceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteGrantSliceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteGrantSliceMutation, { data, loading, error }] = useDeleteGrantSliceMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteGrantSliceMutation(baseOptions?: Apollo.MutationHookOptions<Types.DeleteGrantSliceMutation, Types.DeleteGrantSliceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DeleteGrantSliceMutation, Types.DeleteGrantSliceMutationVariables>(DeleteGrantSliceDocument, options);
      }
export type DeleteGrantSliceMutationHookResult = ReturnType<typeof useDeleteGrantSliceMutation>;
export type DeleteGrantSliceMutationResult = Apollo.MutationResult<Types.DeleteGrantSliceMutation>;
export type DeleteGrantSliceMutationOptions = Apollo.BaseMutationOptions<Types.DeleteGrantSliceMutation, Types.DeleteGrantSliceMutationVariables>;
export const UpdateGrantSliceDocument = gql`
    mutation UpdateGrantSlice($id: Int!, $amount: BigFloat!, $received_date: Datetime!) {
  updategrant_slicesCollection(
    filter: {id: {eq: $id}}
    set: {amount: $amount, received_date: $received_date}
  ) {
    affectedCount
    records {
      id
      amount
      received_date
    }
  }
}
    `;
export type UpdateGrantSliceMutationFn = Apollo.MutationFunction<Types.UpdateGrantSliceMutation, Types.UpdateGrantSliceMutationVariables>;

/**
 * __useUpdateGrantSliceMutation__
 *
 * To run a mutation, you first call `useUpdateGrantSliceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGrantSliceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGrantSliceMutation, { data, loading, error }] = useUpdateGrantSliceMutation({
 *   variables: {
 *      id: // value for 'id'
 *      amount: // value for 'amount'
 *      received_date: // value for 'received_date'
 *   },
 * });
 */
export function useUpdateGrantSliceMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateGrantSliceMutation, Types.UpdateGrantSliceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateGrantSliceMutation, Types.UpdateGrantSliceMutationVariables>(UpdateGrantSliceDocument, options);
      }
export type UpdateGrantSliceMutationHookResult = ReturnType<typeof useUpdateGrantSliceMutation>;
export type UpdateGrantSliceMutationResult = Apollo.MutationResult<Types.UpdateGrantSliceMutation>;
export type UpdateGrantSliceMutationOptions = Apollo.BaseMutationOptions<Types.UpdateGrantSliceMutation, Types.UpdateGrantSliceMutationVariables>;
export const CreateGrantSliceDocument = gql`
    mutation CreateGrantSlice($project_id: Int!, $amount: BigFloat!, $received_date: Datetime!, $status: String!) {
  insertIntogrant_slicesCollection(
    objects: {project_id: $project_id, amount: $amount, received_date: $received_date, status: $status}
  ) {
    records {
      id
      amount
      received_date
      status
      project_id
    }
  }
}
    `;
export type CreateGrantSliceMutationFn = Apollo.MutationFunction<Types.CreateGrantSliceMutation, Types.CreateGrantSliceMutationVariables>;

/**
 * __useCreateGrantSliceMutation__
 *
 * To run a mutation, you first call `useCreateGrantSliceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGrantSliceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGrantSliceMutation, { data, loading, error }] = useCreateGrantSliceMutation({
 *   variables: {
 *      project_id: // value for 'project_id'
 *      amount: // value for 'amount'
 *      received_date: // value for 'received_date'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useCreateGrantSliceMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateGrantSliceMutation, Types.CreateGrantSliceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateGrantSliceMutation, Types.CreateGrantSliceMutationVariables>(CreateGrantSliceDocument, options);
      }
export type CreateGrantSliceMutationHookResult = ReturnType<typeof useCreateGrantSliceMutation>;
export type CreateGrantSliceMutationResult = Apollo.MutationResult<Types.CreateGrantSliceMutation>;
export type CreateGrantSliceMutationOptions = Apollo.BaseMutationOptions<Types.CreateGrantSliceMutation, Types.CreateGrantSliceMutationVariables>;
export const GetGrantsByProjectIdDocument = gql`
    query GetGrantsByProjectId($projectId: Int!) {
  grant_slicesCollection(filter: {project_id: {eq: $projectId}}) {
    edges {
      node {
        ...GrantFragment
      }
    }
  }
}
    ${GrantFragmentFragmentDoc}`;

/**
 * __useGetGrantsByProjectIdQuery__
 *
 * To run a query within a React component, call `useGetGrantsByProjectIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGrantsByProjectIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGrantsByProjectIdQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useGetGrantsByProjectIdQuery(baseOptions: Apollo.QueryHookOptions<Types.GetGrantsByProjectIdQuery, Types.GetGrantsByProjectIdQueryVariables> & ({ variables: Types.GetGrantsByProjectIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.GetGrantsByProjectIdQuery, Types.GetGrantsByProjectIdQueryVariables>(GetGrantsByProjectIdDocument, options);
      }
export function useGetGrantsByProjectIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.GetGrantsByProjectIdQuery, Types.GetGrantsByProjectIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.GetGrantsByProjectIdQuery, Types.GetGrantsByProjectIdQueryVariables>(GetGrantsByProjectIdDocument, options);
        }
export function useGetGrantsByProjectIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.GetGrantsByProjectIdQuery, Types.GetGrantsByProjectIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.GetGrantsByProjectIdQuery, Types.GetGrantsByProjectIdQueryVariables>(GetGrantsByProjectIdDocument, options);
        }
export type GetGrantsByProjectIdQueryHookResult = ReturnType<typeof useGetGrantsByProjectIdQuery>;
export type GetGrantsByProjectIdLazyQueryHookResult = ReturnType<typeof useGetGrantsByProjectIdLazyQuery>;
export type GetGrantsByProjectIdSuspenseQueryHookResult = ReturnType<typeof useGetGrantsByProjectIdSuspenseQuery>;
export type GetGrantsByProjectIdQueryResult = Apollo.QueryResult<Types.GetGrantsByProjectIdQuery, Types.GetGrantsByProjectIdQueryVariables>;
export const CreateProjectDocument = gql`
    mutation CreateProject($name: String!, $description: String, $start_date: Date!, $end_date: Date!, $project_budget: BigFloat!, $status: Boolean, $note: String, $contact_person_email: String, $contact_person_name: String) {
  insertIntoprojectsCollection(
    objects: [{name: $name, description: $description, start_date: $start_date, end_date: $end_date, project_budget: $project_budget, status: $status, note: $note, contact_person_email: $contact_person_email, contact_person_name: $contact_person_name}]
  ) {
    records {
      ...ProjectFragment
    }
  }
}
    ${ProjectFragmentFragmentDoc}`;
export type CreateProjectMutationFn = Apollo.MutationFunction<Types.CreateProjectMutation, Types.CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      start_date: // value for 'start_date'
 *      end_date: // value for 'end_date'
 *      project_budget: // value for 'project_budget'
 *      status: // value for 'status'
 *      note: // value for 'note'
 *      contact_person_email: // value for 'contact_person_email'
 *      contact_person_name: // value for 'contact_person_name'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateProjectMutation, Types.CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateProjectMutation, Types.CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<Types.CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<Types.CreateProjectMutation, Types.CreateProjectMutationVariables>;
export const UpdateProjectDocument = gql`
    mutation UpdateProject($set: projectsUpdateInput!, $filter: projectsFilter, $atMost: Int!) {
  updateprojectsCollection(set: $set, filter: $filter, atMost: $atMost) {
    records {
      id
      name
      description
      start_date
      end_date
      project_budget
      status
      note
      contact_person_email
      contact_person_name
    }
  }
}
    `;
export type UpdateProjectMutationFn = Apollo.MutationFunction<Types.UpdateProjectMutation, Types.UpdateProjectMutationVariables>;

/**
 * __useUpdateProjectMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectMutation, { data, loading, error }] = useUpdateProjectMutation({
 *   variables: {
 *      set: // value for 'set'
 *      filter: // value for 'filter'
 *      atMost: // value for 'atMost'
 *   },
 * });
 */
export function useUpdateProjectMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateProjectMutation, Types.UpdateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateProjectMutation, Types.UpdateProjectMutationVariables>(UpdateProjectDocument, options);
      }
export type UpdateProjectMutationHookResult = ReturnType<typeof useUpdateProjectMutation>;
export type UpdateProjectMutationResult = Apollo.MutationResult<Types.UpdateProjectMutation>;
export type UpdateProjectMutationOptions = Apollo.BaseMutationOptions<Types.UpdateProjectMutation, Types.UpdateProjectMutationVariables>;
export const DeleteProjectDocument = gql`
    mutation DeleteProject($id: Int!) {
  deleteFromprojectsCollection(filter: {id: {eq: $id}}) {
    affectedCount
  }
}
    `;
export type DeleteProjectMutationFn = Apollo.MutationFunction<Types.DeleteProjectMutation, Types.DeleteProjectMutationVariables>;

/**
 * __useDeleteProjectMutation__
 *
 * To run a mutation, you first call `useDeleteProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectMutation, { data, loading, error }] = useDeleteProjectMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProjectMutation(baseOptions?: Apollo.MutationHookOptions<Types.DeleteProjectMutation, Types.DeleteProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DeleteProjectMutation, Types.DeleteProjectMutationVariables>(DeleteProjectDocument, options);
      }
export type DeleteProjectMutationHookResult = ReturnType<typeof useDeleteProjectMutation>;
export type DeleteProjectMutationResult = Apollo.MutationResult<Types.DeleteProjectMutation>;
export type DeleteProjectMutationOptions = Apollo.BaseMutationOptions<Types.DeleteProjectMutation, Types.DeleteProjectMutationVariables>;
export const GetProjectsDocument = gql`
    query GetProjects {
  projectsCollection {
    edges {
      node {
        ...ProjectFragment
      }
    }
  }
}
    ${ProjectFragmentFragmentDoc}`;

/**
 * __useGetProjectsQuery__
 *
 * To run a query within a React component, call `useGetProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProjectsQuery(baseOptions?: Apollo.QueryHookOptions<Types.GetProjectsQuery, Types.GetProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.GetProjectsQuery, Types.GetProjectsQueryVariables>(GetProjectsDocument, options);
      }
export function useGetProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.GetProjectsQuery, Types.GetProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.GetProjectsQuery, Types.GetProjectsQueryVariables>(GetProjectsDocument, options);
        }
export function useGetProjectsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.GetProjectsQuery, Types.GetProjectsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.GetProjectsQuery, Types.GetProjectsQueryVariables>(GetProjectsDocument, options);
        }
export type GetProjectsQueryHookResult = ReturnType<typeof useGetProjectsQuery>;
export type GetProjectsLazyQueryHookResult = ReturnType<typeof useGetProjectsLazyQuery>;
export type GetProjectsSuspenseQueryHookResult = ReturnType<typeof useGetProjectsSuspenseQuery>;
export type GetProjectsQueryResult = Apollo.QueryResult<Types.GetProjectsQuery, Types.GetProjectsQueryVariables>;
export const GetProjectByIdDocument = gql`
    query GetProjectById($id: Int!) {
  projectsCollection(filter: {id: {eq: $id}}, first: 1) {
    edges {
      node {
        ...ProjectFragment
      }
    }
  }
}
    ${ProjectFragmentFragmentDoc}`;

/**
 * __useGetProjectByIdQuery__
 *
 * To run a query within a React component, call `useGetProjectByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProjectByIdQuery(baseOptions: Apollo.QueryHookOptions<Types.GetProjectByIdQuery, Types.GetProjectByIdQueryVariables> & ({ variables: Types.GetProjectByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.GetProjectByIdQuery, Types.GetProjectByIdQueryVariables>(GetProjectByIdDocument, options);
      }
export function useGetProjectByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.GetProjectByIdQuery, Types.GetProjectByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.GetProjectByIdQuery, Types.GetProjectByIdQueryVariables>(GetProjectByIdDocument, options);
        }
export function useGetProjectByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.GetProjectByIdQuery, Types.GetProjectByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.GetProjectByIdQuery, Types.GetProjectByIdQueryVariables>(GetProjectByIdDocument, options);
        }
export type GetProjectByIdQueryHookResult = ReturnType<typeof useGetProjectByIdQuery>;
export type GetProjectByIdLazyQueryHookResult = ReturnType<typeof useGetProjectByIdLazyQuery>;
export type GetProjectByIdSuspenseQueryHookResult = ReturnType<typeof useGetProjectByIdSuspenseQuery>;
export type GetProjectByIdQueryResult = Apollo.QueryResult<Types.GetProjectByIdQuery, Types.GetProjectByIdQueryVariables>;
export const GetStatusDocument = gql`
    query GetStatus {
  statusCollection {
    edges {
      node {
        ...StatusFragment
      }
    }
  }
}
    ${StatusFragmentFragmentDoc}`;

/**
 * __useGetStatusQuery__
 *
 * To run a query within a React component, call `useGetStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStatusQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetStatusQuery(baseOptions?: Apollo.QueryHookOptions<Types.GetStatusQuery, Types.GetStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.GetStatusQuery, Types.GetStatusQueryVariables>(GetStatusDocument, options);
      }
export function useGetStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.GetStatusQuery, Types.GetStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.GetStatusQuery, Types.GetStatusQueryVariables>(GetStatusDocument, options);
        }
export function useGetStatusSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.GetStatusQuery, Types.GetStatusQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.GetStatusQuery, Types.GetStatusQueryVariables>(GetStatusDocument, options);
        }
export type GetStatusQueryHookResult = ReturnType<typeof useGetStatusQuery>;
export type GetStatusLazyQueryHookResult = ReturnType<typeof useGetStatusLazyQuery>;
export type GetStatusSuspenseQueryHookResult = ReturnType<typeof useGetStatusSuspenseQuery>;
export type GetStatusQueryResult = Apollo.QueryResult<Types.GetStatusQuery, Types.GetStatusQueryVariables>;