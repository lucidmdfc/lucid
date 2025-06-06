import { gql } from '@apollo/client';
import { SERVICE_PROVIDER_FRAGMENT } from './fragments';

export const CREATE_SERVICE_PROVIDER = gql`
  mutation CreateServiceProvider(
    $name: String!
    $email: String
    $phone: String!
    $ice: String!
    $address: String
    $contact_person: String
  ) {
    insertIntoservice_providersCollection(
      objects: {
        name: $name
        email: $email
        phone: $phone
        ice: $ice
        address: $address
        contact_person: $contact_person
      }
    ) {
      records {
        ...ServiceProviderFragment
      }
    }
  }
  ${SERVICE_PROVIDER_FRAGMENT}
`;
