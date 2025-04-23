import { gql } from '@apollo/client';

export const MEMBERSHIP_FRAGMENT = gql`
  fragment MembershipFragment on memberships {
    id
    created_at
    member_id
    updated_at
    membership_category
  }
`;
