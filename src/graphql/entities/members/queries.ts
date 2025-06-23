import { gql } from '@apollo/client';
import { MEMBER_FRAGMENT } from './fragments';

export const GET_MEMBERS = gql`
  query GetMembers {
    membersCollection {
      edges {
        node {
          ...MemberFragment
        }
      }
    }
  }
  ${MEMBER_FRAGMENT}
`;

export const GET_MEMBER = gql`
  query GetMember($id: Int!) {
    membersCollection(filter: { id: { eq: $id } }, first: 1) {
      edges {
        node {
          ...MemberFragment
        }
      }
    }
  }
  ${MEMBER_FRAGMENT}
`;
