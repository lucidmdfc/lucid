import { gql } from '@apollo/client';
import { SERVICE_PROVIDER_FRAGMENT } from './fragments';

export const GET_SERVICE_PROVIDERS = gql`
  query GetServiceProviders {
    service_providersCollection {
      edges {
        node {
          ...ServiceProviderFragment
        }
      }
    }
  }
  ${SERVICE_PROVIDER_FRAGMENT}
`;
