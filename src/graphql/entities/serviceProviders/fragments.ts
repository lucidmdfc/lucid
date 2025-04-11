import { gql } from '@apollo/client';

export const SERVICE_PROVIDER_FRAGMENT = gql`
  fragment ServiceProviderFragment on ServiceProvider {
    id
    name
    email
    phone
    created_at
    updated_at
    ice
    depositedDate
    dueDate
    amount
    status_id
  }
`;
