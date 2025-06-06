import { gql } from '@apollo/client';

export const SERVICE_PROVIDER_FRAGMENT = gql`
  fragment ServiceProviderFragment on service_providers {
    id
    phone
    address
    contact_person
    ice
    name
    email
    created_at
    updated_at
  }
`;
