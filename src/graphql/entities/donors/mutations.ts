import { gql } from '@apollo/client';
import { DONOR_FRAGMENT } from './fragments';
export const CREATE_DONOR = gql`
  mutation CreateDonor($name: String!, $email: String!, $phone: String, $note: String) {
    insertIntodonorsCollection(
      objects: [{ name: $name, email: $email, phone: $phone, note: $note }]
    ) {
      records {
        ...DonorFragment
      }
    }
  }
  ${DONOR_FRAGMENT}
`;

export const UPDATE_DONOR = gql`
  mutation UpdateDonor($set: donorsUpdateInput!, $filter: donorsFilter, $atMost: Int!) {
    updatedonorsCollection(set: $set, filter: $filter, atMost: $atMost) {
      records {
        ...DonorFragment
      }
    }
  }
  ${DONOR_FRAGMENT}
`;
export const DELETE_DONOR = gql`
  mutation DeleteDonor($id: Int!) {
    deleteFromdonorsCollection(filter: { id: { eq: $id } }) {
      affectedCount
    }
  }
`;
