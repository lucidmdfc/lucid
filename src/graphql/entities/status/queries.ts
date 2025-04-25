import { gql } from '@apollo/client';
import { STATUS_FRAGMENT } from './fragments';

export const GET_STATUS = gql`
  query GetStatus {
    statusCollection {
      edges {
        node {
          ...StatusFragment
        }
      }
    }
  }
  ${STATUS_FRAGMENT}
`;
