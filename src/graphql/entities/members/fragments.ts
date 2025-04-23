import { gql } from '@apollo/client';

export const MEMBER_FRAGMENT = gql`
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
