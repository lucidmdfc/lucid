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
