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
