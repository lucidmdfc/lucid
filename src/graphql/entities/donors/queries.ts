import { gql } from '@apollo/client';
import { DONOR_FRAGMENT } from './fragments';

export const GET_DONORS = gql`
  query GetDonors {
    donorsCollection {
      edges {
        node {
          ...DonorFragment
        }
      }
    }
  }
  ${DONOR_FRAGMENT}
`;
export const GET_DONOR_BY_ID = gql`
  query GetDonorById($id: String!) {
    donorsCollection(filter: { id: { eq: $id } }, first: 1) {
      edges {
        node {
          ...DonorFragment
        }
      }
    }
  }
  ${DONOR_FRAGMENT}
`;
