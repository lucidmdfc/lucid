import { gql } from '@apollo/client';
import { MEMBER_FRAGMENT } from './fragments';
export const CREATE_MEMBER = gql`
  mutation CreateMember(
    $amount: BigFloat!
    $payment_date: Datetime!
    $rc_cin: String
    $status: Boolean
    $full_name: String
    $phone: String
    $email: String
    $address: String
  ) {
    insertIntomembersCollection(
      objects: [
        {
          amount: $amount
          payment_date: $payment_date
          rc_cin: $rc_cin
          status: $status
          full_name: $full_name
          address: $address
          email: $email
          phone: $phone
        }
      ]
    ) {
      records {
        ...MemberFragment
      }
    }
  }
  ${MEMBER_FRAGMENT}
`;
export const UPDATE_MEMBER = gql`
  mutation UpdateMember($filter: membersFilter, $set: membersUpdateInput!, $atMost: Int = 1) {
    updatemembersCollection(filter: $filter, set: $set, atMost: $atMost) {
      records {
        ...MemberFragment
      }
    }
  }
  ${MEMBER_FRAGMENT}
`;
